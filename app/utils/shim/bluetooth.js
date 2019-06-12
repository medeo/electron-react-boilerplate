import { ipcRenderer } from 'electron'
import BluetoothDevice from './BluetoothDevice'
import debug from 'debug'

const log = debug('noble:bluetooth-shim:bluetooth')


const uuidRegex = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/g)

const assertParametersAreUUID = (rawValue) => {
  if (typeof rawValue === 'string' && uuidRegex.test(rawValue) === false || typeof rawValue !== 'number') {
    throw new Error(`${rawValue} is not a valid UUID... It must be a valid UUID alias (e.g. 0x1234), UUID (lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb')`)
  }
}


/**
 * overrides the requestDevice method. In chrome this method is responsible for
 * opening a popup which lists every devices that match the given options.
 *
 * So far it is better to set the acceptAllDevices option, as the bluetooth
 * dongle does not deal with advertised services...
 *
 * @param options
 * @returns {Promise<*>}
 */
//TODO: investigate why advertised services are not showing when using the dongle
const requestDevice = async (options) => new Promise((resolve) => {
  log(`requestDevice has been called with: `, options)
  if (options.filters != null) {
    const filter = options.filters.find(f => f.services != null)
    if(filter != null && Array.isArray(filter.services)) {
      log(filter)
      filter.services.map(s => assertParametersAreUUID(s))
      console.warn('using advertised services as a filter is not supported with the bled dongle')
    }
  }
  log(`requesting scan...`)
  ipcRenderer.send('startScan', options)
  const listener = (e, ...nobleArgs) => {
    const eventName = nobleArgs.shift()
    if (eventName === 'discover') {
      const peripheral = nobleArgs.shift()
      const device = new BluetoothDevice(peripheral)
      log(`${device.name || device.id} successfully scanned`)
      ipcRenderer.removeListener('noble', listener)
      return resolve(device)
    }
  }
  ipcRenderer.on('noble', listener)
})

navigator.bluetooth.requestDevice = requestDevice
