import { ipcRenderer } from 'electron'
import debug from 'debug'
import { transformNobleUUIDToWebBluetooth } from '../uuid'
import NobleEventListener from './NobleEventListener'

const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTCharacteristic')

class BluetoothRemoteGATTCharacteristic extends NobleEventListener {
  constructor(service, nobleCharacteristic) {
    super()
    this.dataListener = (characteristic, data) => {
      if (this.uuid === transformNobleUUIDToWebBluetooth(characteristic.uuid)) {
        this.value = new DataView(data.buffer)
        this.dispatchEvent(new Event('characteristicvaluechanged'))
      }
    }

    this.service = service
    this.uuid = transformNobleUUIDToWebBluetooth(nobleCharacteristic.uuid)
    this.properties = nobleCharacteristic.properties
  }

  writeValue = async (value) => new Promise(resolve => {
    ipcRenderer.send('write', this.service.device.id, this.service.uuid, this.uuid, value)
  })

  startNotifications = async () => new Promise(resolve => {
    ipcRenderer.send('notify', this.service.device.id, this.service.uuid, this.uuid)
    log(`starting notifications for ${this.uuid.toString(16)}`)
    const listener = (characteristic) => {
      log(`notifications successfully started for ${this.uuid.toString(16)}`)
      ipcRenderer.removeListener('noble', listener)
      resolve(characteristic)
    }

    this.on('data', this.dataListener)
    this.on('notified', listener)
  })

  stopNotifications = () => {
    log(`stopping notifications for ${this.uuid}`)
    ipcRenderer.removeAllListeners('noble')
  }

}

export default BluetoothRemoteGATTCharacteristic
