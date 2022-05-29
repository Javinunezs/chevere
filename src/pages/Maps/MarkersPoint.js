import React from 'react'
import {Marker} from "react-leaflet"
import "leaflet/dist/leaflet"

function MarkersPoint() {
  return (
    <Marker center={{lat: '51.52437', lng:'1341053'}}>MarkersPoint</Marker>
  )
}

export default MarkersPoint