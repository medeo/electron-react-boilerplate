import { ipcRenderer } from 'electron'
import BluetoothRemoteGATTService from './BluetoothRemoteGATTService'
import debug from "debug"
const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTServer')


//TODO: if gattserverdisconnected is triggered while another eventListener is set, then we need to remove that listener
class BluetoothRemoteGATTServer extends EventTarget {
  constructor(device) {
    super();
    this.device = device
    this.connected = false
    const disconnectionListener = (e, ...nobleArgs) => {
      const eventName = nobleArgs.shift()
      if (eventName === 'disconnect') {
        const peripheral = nobleArgs.shift();
        if(this.device.id === peripheral.uuid) {
          this.connected = false
          this.dispatchEvent(new Event('gattserverdisconnected'))
          ipcRenderer.removeListener('noble', disconnectionListener)
          log('disconnected from device')
        }
      }
    }
    ipcRenderer.on('noble', disconnectionListener)
  }

  connect = async () => new Promise(resolve => {
    log(`trying to connect to ${this.device.name || this.device.id}`)
    ipcRenderer.send('connect', this.device._peripheral)
    const listener = (e, ...nobleArgs) => {
      const eventName = nobleArgs.shift()
      if (eventName === 'connect') {
        this.connected = true
        log('successfully connected to device')
        log('removing listener...')
        ipcRenderer.removeListener('noble', listener)
        return resolve(this)
      }
    }
    ipcRenderer.on('noble', listener)
  })

  getPrimaryServices = async () => new Promise(resolve => {
    log(`trying to get primary services from ${this.device.name || this.device.id}`)
    ipcRenderer.send('discoverServices', this.device._peripheral)
    const listener = (e, ...nobleArgs) => {
      const eventName = nobleArgs.shift()
      if (eventName === 'servicesDiscovered') {
        ipcRenderer.removeListener('noble', listener)
        const services = nobleArgs.shift()
        log(`services successfully discovered: ${services.map(s =>s.uuid)}`)
        log('removing listener...')
        return resolve(services.map(s => new BluetoothRemoteGATTService(this.device, s)))
      }
    }
    ipcRenderer.on('noble', listener)
  })
}

export default BluetoothRemoteGATTServer
