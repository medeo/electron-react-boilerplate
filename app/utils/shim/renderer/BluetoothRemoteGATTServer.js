import { ipcRenderer } from 'electron'
import debug from 'debug'
import BluetoothRemoteGATTService from './BluetoothRemoteGATTService'
import NobleEventListener from './NobleEventListener'

const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTServer')

//TODO: if gattserverdisconnected is triggered while another eventListener is set, then we need to remove that listener
class BluetoothRemoteGATTServer extends NobleEventListener {
  constructor(device) {
    super()
    this.device = device
    this.connected = false
    const disconnectionListener = (peripheral) => {
      if (this.device.id !== peripheral.uuid)
        return
      this.connected = false
      this.dispatchEvent(new Event('gattserverdisconnected'))
      ipcRenderer.removeAllListeners('noble')
      log('disconnected from device')
    }
    this.on('disconnect', disconnectionListener)
  }

  connect = async () => new Promise(resolve => {
    log(`trying to connect to ${this.device.name || this.device.id}`)
    ipcRenderer.send('connect', this.device._peripheral)
    const listener = () => {
      log('successfully connected to device')
      this.connected = true
      this.removeListener('connect', listener)
      resolve(this)
    }
    this.on('connect', listener)
  })

  getPrimaryServices = async () => new Promise(resolve => {
    log(`trying to get primary services from ${this.device.name || this.device.id}`)
    ipcRenderer.send('discoverServices', this.device._peripheral)
    const listener = (services) => {
      ipcRenderer.removeListener('servicesDiscovered', listener)
      log(`services successfully discovered: ${services.map(s => s.uuid.toString(16))}`)
      log('removing listener...')
      resolve(services.map(s => new BluetoothRemoteGATTService(this, s)))
    }
    this.on('servicesDiscovered', listener)
  })
}

export default BluetoothRemoteGATTServer
