import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { FaBeer, FaMarker } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Map from "./Map";
import Sidebar from "./Sidebar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Guess from "./Guess";
import GuessPage from "./GuessPage";
import Login from "./Login";

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

  let isAuth = localStorage.getItem('user');
  return (
    <>
      <div className="App">
        {isAuth ? (
          <div className="flex flex-col md:flex-row m-auto border h-screen bg-gray-100">
            <BrowserRouter>
              <div className="w-full md:w-1/6 p-4 flex justify-center items-center">
                <Sidebar />
              </div>
              <Routes>
                <Route path="*" element={<Navigate to="/challenge" />} />
                <Route element={<Map />} path="/challenge" />
                <Route element={<Guess />} path="/guess" />
                <Route element={<GuessPage />} path="/guess/:id" />
                <Route element={<Leaderboard />} path="/ranking" />
              </Routes>
            </BrowserRouter>
            {/* <div className="w-5/6 p-4">
              <Map />
            </div> */}
          </div>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route element={<Login />} path="/login" />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </div>
    </>
  );
}

export default App;
