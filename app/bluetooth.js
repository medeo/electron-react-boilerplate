import noble from '@abandonware/noble'
//import createNobleWithBindings from '@abandonware/noble/with-bindings'
//import Bindings from '@medeo/bled-bindings'
import debug from 'debug'
import { ipcMain } from 'electron'

/*
const bindings = new Bindings('/dev/tty.usbmodem11')
const noble = createNobleWithBindings(bindings)
*/

const log = debug('bluetooth:main')

const run = async ({ webContents }) => {
  log('running')
  // wait for the window to display the app before starting bluetooth
  webContents.on('did-finish-load', async () => {
    test(webContents)
  })

}


const test = async (webContents) => {

  noble.on('stateChange', function(state) {
    webContents.send('noble', 'stateChange', state)
  })
  ipcMain.on('startScan', (event, options) => {
    const { acceptAllDevices = false, filters = [] } = options
    const servicesFilter = filters.find(f => f.services != null)
    if (acceptAllDevices === true) {
      //maybe should trigger something else to detect the device using advertisment name..
      noble.startScanning()
    } else if (servicesFilter != null ){
      noble.startScanning(servicesFilter)
    }
  })

  ipcMain.once('connect', (event, p) => {
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    const peripheral = noble._peripherals[p.id]
    //console.log(noble)
    peripheral.once('connect', function() {
      webContents.send('noble', 'connect', peripheral)
    })
    peripheral.connect()
  })

  ipcMain.once('discoverServices', (event, p) => {
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    const peripheral = noble._peripherals[p.id]
    console.log(p.id)
    peripheral.once('servicesDiscover', (services) => {
      webContents.send('noble', 'servicesDiscovered', services)
    })
    peripheral.discoverServices()
  })

  ipcMain.once('discoverCharacteristics', (event, p, uuid) => {
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    const peripheral = noble._peripherals[p.id]
    const service = peripheral.services.find(s => s.uuid === uuid)
    if (service != null) {
      service.on('characteristicsDiscover', (characteristics) => {
        webContents.send('noble', 'characteristicsDiscovered', characteristics)
      })
      service.discoverCharacteristics()
    } else {
      console.log("not found")
    }
  })


  ipcMain.once('notify', (event, s, uuid) => {
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    const peripheral = noble._peripherals[s.device.id]
    const service = peripheral.services.find(e => e.uuid === s.uuid)
    if(service == null) return
    const characteristic = service.characteristics.find(c=> c.uuid === uuid)
    if(characteristic== null) return
    characteristic.on('data', data => {
      console.log(data)
      webContents.send('noble', 'data', characteristic, data/*new DataView(data)*/)
    })
    characteristic.on('notify', data => {
      console.log(data)
        webContents.send('noble', 'notified', characteristic)
      })
    characteristic.subscribe()
  })

  ipcMain.on('write', (event, s, uuid, value) => {
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    const peripheral = noble._peripherals[s.device.id]
    const service = peripheral.services.find(e => e.uuid === s.uuid)
    if(service == null) return
    const characteristic = service.characteristics.find(c=> c.uuid === uuid)
    if(characteristic== null) return
    console.log(value)
    characteristic.write(value, false)
  })

  noble.on('scanStart', function() {
    webContents.send('noble', 'scanStart')
  })

  noble.on('scanStop', function() {
    webContents.send('noble', 'scanStop')
  })


  noble.on('discover', function(peripheral) {
    console.log(peripheral.id, peripheral.advertisement.localName)
    //if(peripheral.address === '5c:31:3e:03:73:ea')
   // if(peripheral.address === 'b4:99:4c:5a:be:32')
    if( peripheral.advertisement.localName != null && peripheral.advertisement.localName.trim() === 'DIAMOND MOBILE') {
      webContents.send('noble', 'discover', peripheral)
    } else if(peripheral.address === 'c0:26:df:02:0b:0c') {
      webContents.send('noble', 'discover', peripheral)
    }

    peripheral.on('disconnect', function() {
      webContents.send('noble', 'disconnect', peripheral)
    })

    peripheral.on('rssiUpdate', function(rssi) {
      webContents.send('noble', 'RSSI update', rssi)
    })

  })
}


export default run
