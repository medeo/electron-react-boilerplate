import { ipcMain } from 'electron'

class NobleIPCConnector{
  constructor(webContents) {
    this.sendToRenderer = (...args) => webContents.send('noble', ...args)
    this.ipcMain = ipcMain
  }
}

export default NobleIPCConnector
