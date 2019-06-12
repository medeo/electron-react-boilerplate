import { ipcRenderer } from 'electron'
import debug from "debug"
const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTCharacteristic')

class BluetoothRemoteGATTCharacteristic extends EventTarget {
  constructor(service, nobleCharacteristic) {
    super();
    this.dataListener = (e, ...nobleArgs) => {
      log(`notification received for ${this.uuid}`)
      const eventName = nobleArgs.shift()
      if(eventName === 'data') {
        const characteristic = nobleArgs.shift();
        if(this.uuid === characteristic.uuid) {
          const uint8Array = nobleArgs.shift();
          this.value = new DataView(uint8Array.buffer)
          this.dispatchEvent(new Event('characteristicvaluechanged'))
        }
      }
    }
    this.service = service
    this.uuid = nobleCharacteristic.uuid
    this.properties = nobleCharacteristic.properties
  }

  writeValue = async (value) => new Promise(resolve => {
    ipcRenderer.send('write', this.service, this.uuid, value)
  })

  startNotifications = async () => new Promise(resolve => {
    ipcRenderer.send('notify', this.service, this.uuid)
    log(`starting notifications for ${this.uuid}`)
    const listener = (e, ...nobleArgs) => {
      const eventName = nobleArgs.shift()
      if (eventName === 'notified') {
        const characteristic = nobleArgs.shift()
        log(`notifications successfully started for ${this.uuid}`)
        ipcRenderer.removeListener('noble', listener)
        return resolve(characteristic)
      }
    }
    ipcRenderer.on('noble', this.dataListener)
    ipcRenderer.on('noble', listener)
  })
  stopNotifications =  () => {
    log(`stopping notifications for ${this.uuid}`)
    ipcRenderer.removeListener('noble', this.dataListener)
  }

}

export default BluetoothRemoteGATTCharacteristic
