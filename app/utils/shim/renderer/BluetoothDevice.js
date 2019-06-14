import BluetoothRemoteGATTServer from './BluetoothRemoteGATTServer'
import debug from "debug"
const log = debug('bluetooth:renderer:BluetoothDevice')

export class BluetoothDevice {
  constructor(peripheral) {
    this.id = peripheral.id
    this.name = peripheral.advertisement.localName
    this.uuids = peripheral.advertisement.serviceUuids
    this._peripheral = peripheral
    log(`discovering peripheral:\t${this.name|| this.id}`)
    log(`\t\texposed services: ${this.uuids}`)
    this.gatt = new BluetoothRemoteGATTServer(this)
  }
}

export default BluetoothDevice
