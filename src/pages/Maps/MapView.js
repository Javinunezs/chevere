import React from "react";
import { Marker, Popup, MapContainer, TileLayer} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import "leaflet/dist/leaflet.css";



function MapView(){

  const position = [51.505, -0.09];

  //Sacado de la documentacion de leaflet
  return(
        
        <div className="pt-20"> 
        <MapContainer id="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          </div> 
  )
};

export default MapView;