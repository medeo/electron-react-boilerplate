import { ipcRenderer } from 'electron'
import BluetoothRemoteGATTCharacteristic from './BluetoothRemoteGATTCharacteristic'
import debug from "debug"
const log = debug('noble:bluetooth-shim:BluetoothRemoteGATTService')

class BluetoothRemoteGATTService {
  constructor(device, nobleService) {
    this.device = device
    this.uuid = nobleService.uuid
  }

  getCharacteristics = async () => new Promise(resolve => {
    ipcRenderer.send('discoverCharacteristics', this.device._peripheral, this.uuid)
    log(`trying to get characteristics from ${this.uuid}...`)
    const listener = (e, ...nobleArgs) => {
      const eventName = nobleArgs.shift()
      if (eventName === 'characteristicsDiscovered') {
        const characteristics = nobleArgs.shift()
        log(`characteristics successfully retrieved ${characteristics.map(c => c.uuid)}`)
        log('removing listener...')
        ipcRenderer.removeListener('noble', listener)
        return resolve(characteristics.map(c => new BluetoothRemoteGATTCharacteristic(this, c)))
      }
    }
    ipcRenderer.on('noble', listener)
  })
}
export default BluetoothRemoteGATTService
