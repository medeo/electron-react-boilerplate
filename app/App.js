// @flow
import * as React from 'react'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import debug from 'debug'
import './utils/shim/renderer/bluetooth'

const log = debug('noble:renderer')

const Layout = styled.div`
background: papayawhip;
color: red;
`




const SERVICES_UUIDS = [0x1809, 0x1810, 0x181d, "00001523-1212-efde-1523-785feabcd123"]
const CHARACTERISTICS_UUIDS = [0x2a1c, 0x2a35, 0x2a9d, "00001524-1212-efde-1523-785feabcd123"]
const MAC_ADDRESSES = [
  "c0:26:df:02:0b:0c",
  "5c:31:3e:03:73:ea",
  "b4:99:4c:5a:be:32"
]


const appendChecksum = (command) => {
  const checksum = command.reduce((elem, acc)=> (elem + acc) & 0xff)
  return new Uint8Array([...command, checksum])
}
const fora = (characteristic) => {
  const value = new Uint8Array(characteristic.value.buffer);
  const ack = value[1]
  window.characteristic = characteristic
  let command
  switch(ack){
    case 0x2B: //READ_STORAGE_NUMBER_OF_DATA
      let numberOfData = value[2];
      log("read storage number of data: "+numberOfData)
      command = appendChecksum([0x51, 0x26, 0, 0, 0, 0, 0xa3])
      characteristic.writeValue(command)
      return;
    case 0x26: //READ_STORAGE_DATA
      console.log('read_storage_data', value)
      command = appendChecksum([0x51, 0x50, 0, 0, 0, 0, 0xa3])
      characteristic.writeValue(command)
    return
    case 0x28: // SERIAL
      command = appendChecksum([0x51, 0x2B, 0, 0, 0, 0, 0xa3])
      characteristic.writeValue(command)
      return;
    case 0x50: //TURN_OFF
      return;
    case 0x52: //CLEAR_MEMORY
     // sendTurnOff(characteristic: characteristic)
      return;
    default:
      console.log(characteristic.value)
      command = appendChecksum([0x51, 0x28, 0, 0, 0, 0, 0xa3])
      characteristic.writeValue(command)
      return;
}
}

const HelloWorld = () => <div>
  <button onClick={async () => {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{services:SERVICES_UUIDS}, {namePrefix: "DIAMOND MOBILE"}, {namePrefix: "A&D"}]
    })
    await device.gatt.connect()
    const services = await device.gatt.getPrimaryServices()
    const service = services.find(s => {
      return SERVICES_UUIDS.includes(s.uuid)
    })
    if (service == null) {
      console.log("could not find service")
      return
    }
    const characteristics = await service.getCharacteristics()

    const characteristic = characteristics.find(c => CHARACTERISTICS_UUIDS.includes(c.uuid))
    if(characteristic == null) {
      console.log('could not find characteristic')
      return
    }
    characteristic.addEventListener('characteristicvaluechanged', async event =>  {
      fora(event.target)
     // await characteristic.stopNotifications()
    })
    await characteristic.startNotifications()
  }
  }>démarrer
  </button>
</div>

const App = ({ store }) =>
  <Provider store={store}>
    <Layout>
      <Router>
        <HelloWorld default/>
      </Router>
    </Layout>
  </Provider>


export default App
