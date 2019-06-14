
export const regex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/g

export const transformWebBluetoothUUIDtoNoble = (webBluetoothUUID) => {
  if(typeof webBluetoothUUID === 'number') {
    return webBluetoothUUID.toString(16)
  } else if ((webBluetoothUUID.match(regex)) != null) {
    return webBluetoothUUID.replace(/-/g, '')
  } else {
    throw new Error(`unable to transform ${webBluetoothUUID}`)
  }

}


export const transformNobleUUIDToWebBluetooth = (nobleUUID) => {
  if (typeof nobleUUID === 'string' && nobleUUID.length === 4) {
    return parseInt(nobleUUID, 16)
  }
  if (typeof nobleUUID === 'string' && nobleUUID.length === 32) {
    const array = nobleUUID.split('')
    array.splice(8, 0, '-')
    array.splice(13, 0, '-')
    array.splice(18, 0, '-')
    array.splice(23, 0, '-')
    return array.join('')
  }
  throw new Error(`unable to transform ${nobleUUID}`)
}

