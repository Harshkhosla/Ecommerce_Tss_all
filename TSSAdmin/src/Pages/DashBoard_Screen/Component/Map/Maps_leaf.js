import React from 'react'
import { useState, useEffect } from 'react';
import { tssurl } from '../../../../UI/port';
import "./map.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon, marker, point } from "leaflet";

const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./placeholder.png"),
  iconSize: [38, 38] // size of the icon
});


function Maps_leaf() {
  // const [data, setData] = useState(null);
  // const data =JSON.parse(dummyData[0])
  // // console.log(data);
  const [markers, setMarkers] = useState([]);

  // console.log(markers);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${tssurl}/user/visitor-log/all`)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()
        // console.log("lak", data);
        // const data1 =JSON.parse(data)
        // setMarkers(dummyData);
        setMarkers(data);
        // setMarkers(data);
      } catch (error) {
        // console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])
  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2.5}>
        <TileLayer
          //Open street map
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

          //Mapbox 
          url="https://api.mapbox.com/styles/v1/lakshya1802/clsbhctt701mb01r48dsdcmw5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGFrc2h5YTE4MDIiLCJhIjoiY2xzYmdxdWZiMDI2YTJpbWgwaGJkaHhodyJ9.fyZEGlacwuzcbcznePy_cg"
          attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"

        />
        {markers.map((marker, index) => (
          
          <Marker key={index} position={[marker.address.latitude, marker.address.longitude]} icon={customIcon}>
            <Popup>
              <div>
                <p><b>Country:</b> {marker.address.country}</p>
                <p><b>Quantity:</b> {marker.dailyOrderQuantity}</p>
                </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Maps_leaf
