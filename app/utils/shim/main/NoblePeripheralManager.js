import { ipcMain } from 'electron'

import debug from "debug"
import { transformWebBluetoothUUIDtoNoble } from '../uuid'
import NobleIPCConnector from './NobleIPCConnector'
const log = debug('bluetooth:peripheral-manager')

class NoblePeripheralManager extends NobleIPCConnector {
  constructor(webContents, noble, peripheral) {
    super(webContents)
    this.noble = noble
    //peripheral should be retrieve from noble._peripheral because it loses
    //its event emitter properties when it is send back and forth to the renderer
    this.peripheral = this.noble._peripherals[peripheral.id]
    log(`connecting to ${this.peripheral.id}...`)
    this.peripheral.once('connect', () => {
      log(`connected to ${this.peripheral.id}, stopping gap scanner...`)
      this.noble.stopScanning()
      this.sendToRenderer('connect', this.peripheral)
    })
    this.peripheral.once('disconnect', () => {
      log(`disconnected from ${this.peripheral.id}`)
      this.sendToRenderer('disconnect', this.peripheral)
    })
  }


  connect = () => {
    ipcMain.once('discoverServices', (event, p) => {
      this.peripheral.once('servicesDiscover', (services) => {
        log(`Following services uuids were discovered:\n%O`, services.map(s => s.uuid))
        ipcMain.once('discoverCharacteristics', (event, deviceId, wbServiceUUID) => {
          //peripheral should be retrieve from noble._peripheral because it loses
          //its event emitter properties when it is send back and forth to the renderer
          const nobleServiceUUID = transformWebBluetoothUUIDtoNoble(wbServiceUUID)
          const service = this.peripheral.services.find(s => s.uuid === nobleServiceUUID)
          if (service != null) {
            service.on('characteristicsDiscover', (characteristics) => {
              log(`Following characteristics uuids were discovered:\n%O`, characteristics.map(c => c.uuid))
              this.sendToRenderer('characteristicsDiscovered', characteristics)
              ipcMain.once('notify', (event, deviceId, wbServiceUUID, wbCharacteristicUUID) => {
                //peripheral should be retrieve from noble._peripheral because it loses
                //its event emitter properties when it is send back and forth to the renderer
                const nobleServiceUUID = transformWebBluetoothUUIDtoNoble(wbServiceUUID)
                const nobleCharacteristicUUID = transformWebBluetoothUUIDtoNoble(wbCharacteristicUUID)

                const nobleService = this.peripheral.services.find(s => s.uuid === nobleServiceUUID)
                if (nobleService == null) {
                  log(`${wbServiceUUID} service was not found, exiting notify handler...`)
                  return
                }
                const nobleCharacteristic = nobleService.characteristics.find(c => c.uuid === nobleCharacteristicUUID)
                if (nobleCharacteristic == null) {
                  log(`${wbCharacteristicUUID} characteristic was not found, exiting notify handler...`)
                  return
                }

                nobleCharacteristic.on('data', (data) => {
                  this.sendToRenderer('data', nobleCharacteristic, data)
                })
               /* nobleCharacteristic.once('notify', () => {
                  log(`notifications requested for ${wbCharacteristicUUID}...`)
                })*/
                log(`Requesting notifications for ${wbCharacteristicUUID}...`)
                nobleCharacteristic.subscribe()
                this.sendToRenderer('notified', nobleCharacteristic)
              })

              ipcMain.on('write', (event, deviceId, wbServiceUUID, wbCharacteristicUUID, value) => {
                //peripheral should be retrieve from noble._peripheral because it loses
                //its event emitter properties when it is send back and forth to the renderer
                const nobleServiceUUID = transformWebBluetoothUUIDtoNoble(wbServiceUUID)
                const nobleCharacteristicUUID = transformWebBluetoothUUIDtoNoble(wbCharacteristicUUID)
                const nobleService = this.peripheral.services.find(s => s.uuid === nobleServiceUUID)
                if (nobleService == null) {
                  log(`${wbServiceUUID} service was not found, exiting notify handler...`)
                  return
                }
                const nobleCharacteristic = nobleService.characteristics.find(c => c.uuid === nobleCharacteristicUUID)
                if (nobleCharacteristic == null) {
                  log(`${wbCharacteristicUUID} characteristic was not found, exiting notify handler...`)
                  return
                }
                nobleCharacteristic.write(value, false)
              })
            })
            log(`Discovering characteristics for service [${nobleServiceUUID}]...`)
            service.discoverCharacteristics()
          } else {
            log(`${nobleServiceUUID} was not found in device ${deviceId}`)
          }
        })

        this.sendToRenderer('servicesDiscovered', services)
      })
      log(`Discovering services of ${this.peripheral.id}...`)
      this.peripheral.discoverServices()
    })
    this.peripheral.connect()
  }
}

export default NoblePeripheralManager
