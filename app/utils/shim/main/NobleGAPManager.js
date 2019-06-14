import NobleIPCConnector from './NobleIPCConnector'
import NoblePeripheralManager from './NoblePeripheralManager'
import debug from "debug"
const log = debug('bluetooth:gap-manager')

class NobleGAPManager extends NobleIPCConnector {
  constructor(webContents, noble) {
    super(webContents)

    this.noble = noble;

    this.noble.on('stateChange', state => this.sendToRenderer('stateChange', state))
    this.knownPeripheral = []

    this.ipcMain.on('startScan', (event, options) => {
      this.resetNobleScanner()
      this.options = options
      // we need the options in the peripheralDiscoverHandler to recover namePrefix, name or services...
      log('startScanning for devices using the following options:\n%O', options)
      this.noble.on('discover', this.peripheralDiscoverHandler)
      this.noble.startScanning([], true)
    })

    this.ipcMain.on('connect', (event, peripheral) => {
      const noblePeripheralManager = new NoblePeripheralManager(webContents, this.noble, peripheral)
      noblePeripheralManager.connect();
    })
  }

  resetNobleScanner = () => {
    log('resetting Noble Scanner...')
    this.knownPeripheral = []
    this.noble.removeAllListeners('discover')
    this.noble.stopScanning()
  }

  peripheralDiscoverHandler = (peripheral) => {
    const { filters } = this.options
    const namePrefixes = filters.filter(f => f.namePrefix != null).map(f => f.namePrefix)
    const servicesUuids = filters.filter(f => f.services != null).flatMap(f => f.services).map(uuid => typeof uuid === "number" ? uuid.toString(16) : uuid)
    if (this.knownPeripheral.includes(peripheral.id) === false) {
      this.knownPeripheral.push(peripheral.id)
      log(`New device scanned: ${peripheral.rssi}db\t${peripheral.advertisement.localName|| peripheral.id}`)
      if (peripheral.advertisement.localName != null && namePrefixes.find(prefix => peripheral.advertisement.localName.startsWith(prefix))) {
        log(`${peripheral.advertisement.localName} was matched against localName filters`)
        return this.sendToRenderer('discover', peripheral)
      }

      if (peripheral.advertisement.servicesUuids != null && servicesUuids.find(uuid => peripheral.advertisement.servicesUuids.includes(uuid))) {
        log(`${peripheral.advertisement.localName|| peripheral.id} was matched against servicesUuids filters`)
        return this.sendToRenderer('discover', peripheral)
      }
    }
  }
}

export default NobleGAPManager
