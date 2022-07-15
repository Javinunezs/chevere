import React, {useState, useEffect} from "react";
import "./MapPage.css";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, InfoWindow } from '@react-google-maps/api';
import Posts from '../Posts/Posts';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
//import {apiKey} from "./api.js"
//import {mapConfig} from "./map-config";

//const apiKey =  process.env.GOOGLE_MAPS_API_KEY;


const libraries = ["places"]; //static array

const position = {
  lat: 37.18817,
  lng: -3.60667,
};

function MapView() {
  const [searchBox, setSearchBox] = useState();
  const [map, setMap] = useState();
  const [point, setPoint] = useState();
  
  const [posts, setPosts] = useState([]);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const place = places[0];
    const location ={
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    setPoint(location);
    console.log(place);
    console.log(location);
    map.panTo(location);
  }


  useEffect(()=>{
    const evtsRef = collection(db,"Posts");
    const dt = new Date();
    dt.setDate(dt.getDate() -1 ); // day before
    const q = query(evtsRef, where("date", ">", dt),orderBy("date", "asc"));
    onSnapshot(q,(snapshot)=>{
        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(posts);
        console.log(posts);
    });
  },[]);



  return (
<div className='map'>


    

          <GoogleMap
            onLoad={(ref) => setMap(ref)}
            mapContainerStyle={{width: "100%", height: "100%"}}
            center={position}
            zoom={15}
          >
            <div className='address'>
              <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={onPlacesChanged}>
                <input className='addressField' placeholder="Inserte Ubicación"/>
              </StandaloneSearchBox>

             
              
              {posts.map(({id, location, date, sport, title}) => (
           
                
           <Link to={`/post/${id}`}>
                  <Marker key={id} position={(location)} onClick={() => handleActiveMarker(id)}>
                    
                  {activeMarker === id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{title} <br className="pt-2"/>
                          {(date.toDate().toDateString())}  {(date.toDate().toLocaleTimeString())}
                          <br className="pt-2"/>
                          {(sport)}
                        </div>
                      </InfoWindow>
                    ) : null}
                   
                  </Marker>
                  </Link>
                 
                 
              ))
              }
              
            

            </div>
          </GoogleMap>
          


    </div>
  );
}

export default MapView

















