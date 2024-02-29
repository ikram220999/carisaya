import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { FaBeer, FaMarker } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Map from "./Map";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Guess from "./Guess";

function App() {
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
    <>
      <div className="App">
        <div className="flex flex-col md:flex-row m-auto border h-screen">
         
          <BrowserRouter>
          <div className="w-full md:w-1/6 p-4 flex justify-center items-center">
            <Sidebar />
          </div>
            <Routes>
              <Route element={<Map />} path="/challenge" />
              <Route element={<Guess />} path="/guess" />
              <Route element={<Leaderboard />} path="/leaderboard" />
            </Routes>
          </BrowserRouter>
          {/* <div className="w-5/6 p-4">
            <Map />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
