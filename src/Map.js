import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaBeer, FaMarker } from "react-icons/fa";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { haversineDistance } from "./function";
import axios from "axios";
import toast from "react-hot-toast";

function Map() {
  const fillBlueOptions = { color: "blue" };
  const fillYellowOptions = { color: "yellow" };
  const fillRedOptions = { color: "red" };
  const fillGreenOptions = { color: "green" };
  const fillBlackOptions = { color: "black" };

  const center = {
    lat: 4.2105,
    lng: 101.9758,
  };

  const second = {
    lat: 2.877699533432209,
    lng: 102.79926969150273,
  };

  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center)
  const [evidence, setEvidence] = useState([])
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setMapCenter(marker.getLatLng())
        }
      },
    }),
    []
  );

  const calculateResult = () => {
    console.log("a", haversineDistance(center, second));
  };

  console.log("position", position);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    setMapCenter({lat: latitude, lng: longitude})
    setPosition({lat: latitude, lng: longitude})

    console.log("user location", latitude, longitude);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  const createChallenge = () => {
    const accessToken = localStorage.getItem("access_token");

    // Create a FormData object
    const formData = new FormData();

    // Append each File object to the FormData object
    for (let i = 0; i < evidence.length; i++) {
      formData.append(`file[${i}]`, evidence[i]);  // Adjust the key and append the actual file
    }
    // formData.append(`file`, evidence);
    formData.append('lat', position.lat)
    formData.append('lng', position.lng)

    axios
      .post(`${process.env.REACT_APP_API_HOSTNAME}/api/challenge/new`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success("Success create challenge");
        // Additional logic after a successful challenge creation
      })
      .catch((err) => {
        toast.error("Error create challenge");
        console.error(err);
        // Additional error handling if needed
      });
  };

  const uploadFile = (e) => {
    setEvidence(e.target.files)
  }

  console.log(evidence);
  function MyComponent() {
    const map = useMapEvents({
      click() {
        map.flyTo(position, map.getZoom())
      }
    })
  }

  useEffect(() => {
    calculateResult();
  }, []);

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center p-0 ">
      <div className="w-full h-full flex justify-center items-center my-2 ">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ width: "95%", height: "95%" }}
        >
                <MyComponent />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          ></Marker>
          {/* <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={second}
            ref={markerRef}
          >
             <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          <Circle
            center={position}
            pathOptions={fillGreenOptions}
            radius={10000}
          />
          <Circle
            center={position}
            pathOptions={fillRedOptions}
            radius={100000}
          />
          <Circle
            center={position}
            pathOptions={fillYellowOptions}
            radius={50000}
          />
          <Circle
            center={position}
            pathOptions={fillBlueOptions}
            radius={30000}
          />
          <Circle
            center={position}
            pathOptions={fillBlackOptions}
            radius={200000}
          />
        </MapContainer>
      </div>
      <div className="w-full border-gray-300 lg:w-2/6 mb-4 flex flex-col justify-center items-center">
        <div className="border border-gray-300 rounded-md p-4 mb-5 w-5/6">
          <p className="text-md sm:text-lg font-bold mb-2">Evidence</p>
          <form>
            <input type="file" name="evidence" onChange={(e) => uploadFile(e)} multiple></input>
          </form>
          {/* Display selected file names */}
          {evidence.length > 0 && (
            <div>
              <p>Selected Files:</p>
              <ul>
                {Array.from(evidence).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-10 border-gray-300 border rounded-md p-4 mb-5 w-5/6">
          <p className="text-md sm:text-lg font-bold">Coordinate</p>
          <p className="text-xs sm:text-lg">Latitude : {position.lat}</p>
          <p className="text-xs sm:text-lg">Longitude : {position.lng}</p>
        </div>
        <button
          className="border border-gray-400 p-4 w-5/6 md:w-5/6 bg-gray-500 text-white font-bold hover:bg-gray-400 cursor-pointer text-xs sm:text-sm rounded-md"
          onClick={() => createChallenge()}
        >
          Challenge
        </button>
        <button
          className="border border-gray-400 p-4 w-5/6 md:w-5/6 bg-gray-500 text-white font-bold hover:bg-gray-400 cursor-pointer text-xs sm:text-sm rounded-md"
          onClick={() => handleLocationClick()}
        >
          Current location
        </button>
      </div>
    </div>
  );
}

export default Map;
