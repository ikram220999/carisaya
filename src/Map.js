import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { FaBeer, FaMarker } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function Map() {
  const [markers, setMarker] = useState([]);

  const onMapClick = (e) => {
    console.log("e", e);
    setMarker((current) => [
      ...current,
      {
        lat: e.lat,
        lng: e.lng,
      },
    ]);
  };

  const defaultProps = {
    center: {
      lat: 59.955413,
      lng: 30.337844,
    },
    zoom: 11,
  };
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
