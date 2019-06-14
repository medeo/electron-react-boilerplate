import log from 'electron-log'
import noble from '@abandonware/noble'
import createNobleWithBindings from '@abandonware/noble/with-bindings'
import Bindings from '@medeo/bled-bindings'
import Store from 'electron-store'
import schema from './schema'
import NobleGAPManager from './shim/main/NobleGAPManager'


// wait for the window to display the app before starting bluetooth
const run = async ({ webContents }) => {

  const store = new Store({ schema })
  log.info(`config file is located at ${store.path}`)

  webContents.on('did-finish-load', async () => {
    try {
      log.info('retrieving port property from config file')
      const port = store.get("port")
      const useBuiltIn = store.get("useBuiltInBluetooth")
      if (useBuiltIn === true) {
        log.info("starting bluetooth using builtIn")
        const nobleGAPManager = new NobleGAPManager(webContents, noble)
      } else if (port != null) {
        log.info(`starting bluetooth using dongle (${port})`)
        const bindings = new Bindings(port)
        const nobleGAPManager = new NobleGAPManager(webContents, createNobleWithBindings(bindings))
      } else {
        log.warn(`port property is not defined in ${store.path}`)
        log.warn('bluetooth will not be started')
        return
      }
    } catch (error) {
      log.error('Something went wrong will starting bluetooth...')
      log.error(error)
    }
  })

}


export default run
