import { ipcRenderer } from 'electron'

/**
 * Utility class that simplify the use of ipcRenderer and noble together
 */
class NobleEventListener extends EventTarget {
  on = (eventName, callback) =>
    ipcRenderer.on('noble', (e, ...nobleArgs) => {
      if (eventName === nobleArgs.shift()) {
        return callback(...nobleArgs)
      }
    })
  removeListener = (eventName, listener) => {
    ipcRenderer.removeListener('noble', listener)
  }
}

export default NobleEventListener
