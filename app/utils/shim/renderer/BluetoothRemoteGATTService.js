import { ipcRenderer } from 'electron'
import debug from 'debug'
import BluetoothRemoteGATTCharacteristic from './BluetoothRemoteGATTCharacteristic'
import NobleEventListener from './NobleEventListener'

import { transformNobleUUIDToWebBluetooth } from '../uuid'
const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTService')

class BluetoothRemoteGATTService extends NobleEventListener {
  constructor(gattServer, nobleService) {
    super()
    this.device = gattServer.device
    this.uuid = transformNobleUUIDToWebBluetooth(nobleService.uuid)
  }

  getCharacteristics = async () => new Promise(resolve => {
    const handleCharacteristicDiscover = (characteristics) => {
      log(`characteristics successfully retrieved ${characteristics.map(c => c.uuid.toString(16))}`)
      this.removeListener('characteristicsDiscovered', handleCharacteristicDiscover)
      return resolve(characteristics.map(c => new BluetoothRemoteGATTCharacteristic(this, c)))
    }

    ipcRenderer.send('discoverCharacteristics', this.device.id, this.uuid)
    log(`trying to get characteristics from ${this.uuid}...`)
    this.on('characteristicsDiscovered', handleCharacteristicDiscover)
  })
}

export default BluetoothRemoteGATTService
