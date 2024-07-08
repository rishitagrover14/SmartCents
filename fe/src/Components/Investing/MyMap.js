import React, { useState } from "react";
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import './MyMap.css'
import { useNavigate } from "react-router-dom";
import CoinsDeductPopup from "./CoinsDeductPopup";
import NavBlack from "../navbarBlack/NavBlack";
const customIcon = new Icon({
   iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  // iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};
const markers = [
  {
    geocode: [28.6139, 77.2088],
    popUp: "Area:33*33m,Price:$10,000"
  },
  {
    geocode: [19.7515,75.7139],
    popUp: "Area:50*50m,Price:$15000"
  },
  {
    geocode: [20.2376, 84.2700],
    popUp: "Area:25*25m,Price:$7500"
  },
  {
    geocode: [22.9734,78.6569],
    popUp: "Area:40*40m,Price:$13000"
  },
  {
    geocode: [26.8467,  80.9462],
    popUp: "Area:80*80m,Price:$25000"
  },
  {
    geocode: [27.0238, 74.2179],
    popUp: "Area:75*75m,Price:$22000"
  },
  {
    geocode: [22.6708,  71.5724],
    popUp: "Area:20*20m,Price:$5000"
  },
  {
    geocode: [32.1024,  77.5619],
    popUp: "Area:100*100m,Price:$30000"
  },
  {
    geocode: [25.9644, 85.2722],
    popUp: "Area:120*120m,Price:$43000"
  },
  {
    geocode: [22.9868,  87.8550],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [26.4833, 76.7340],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [24.5854, 73.7125],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [19.1485,  77.3191],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [31.1471,  75.3412],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [15.3173,   75.7139],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [25.4670,   91.3662],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [26.2006,   92.9376],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [12.9716,   77.5946],
    popUp: "Area:60*60m,Price:$21000"
  },
  {
    geocode: [13.0843,   80.2705],
    popUp: "Area:60*60m,Price:$21000"
  },

];
function MyMap() {
  const [showCoinsDeductPopup, setShowCoinsDeductPopup] = useState(false);
  const navigation=useNavigate();
  const position = [21.0000, 78.0000];
  const handleBuyButton = ()=>{
    setShowCoinsDeductPopup(true);
  }
  const handleCoinsDeductConfirm = async () => {
    const investmentPoints = 50;
    const token = sessionStorage.getItem("token"); // or wherever you're storing the JWT

    try {
      const response = await fetch('http://localhost:4000/api/v1/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : "",
        },
        body: JSON.stringify({ investmentPoints }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Investment successful:', result);
        // Update UI accordingly
      } else {
        console.error('Investment failed:', result.message);
      }
    } catch (error) {
      console.error('Error during investment:', error);
    }
    setShowCoinsDeductPopup(false);
    navigation('/onbuy');
};
  const handleCoinsDeductCancel = () => {
    setShowCoinsDeductPopup(false);
};
  return (
    <div className="mapstext">
    <NavBlack/>
    <MapContainer
      className="map"
      center={position}
      zoom={10}
      style={{ height: 800, width: "100%" }}
    >
      <TileLayer
        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}
           <button className='buttt'onClick={handleBuyButton}>Buy</button>
           
            </Popup>
          </Marker>
        ))}
         </MarkerClusterGroup>
    </MapContainer>
    {showCoinsDeductPopup && (
                <CoinsDeductPopup
                    onConfirm={handleCoinsDeductConfirm}
                    onCancel={handleCoinsDeductCancel}
                />
            )}
    </div>
  );
}



export default MyMap;