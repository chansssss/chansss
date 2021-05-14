import { getLatLngObj } from 'tle.js'

function getSatPoint(tle) {
  const latLonObj = getLatLngObj(tle, +new Date())
  return [latLonObj.lng, latLonObj.lat]
}

export { getSatPoint }
