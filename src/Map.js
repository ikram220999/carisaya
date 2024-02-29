import logo from "./logo.svg";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { FaBeer, FaMarker } from "react-icons/fa";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function Map() {

  const fillBlueOptions = { color: 'blue' }
  const fillYellowOptions = { color: 'yellow' }
  const fillRedOptions = { color: 'red' }
  const fillGreenOptions = { color: 'green' }


  const center = {
    lat: 4.2105,
    lng: 101.9758,
  };
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  console.log("position", position);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center p-0">
      <div className="w-full lg:w-5/6 h-full flex justify-center items-center">
        <MapContainer
          center={[4.2105, 101.9758]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ width: "90%", height: "90%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? "Marker is draggable"
                  : "Click here to make marker draggable"}
              </span>
            </Popup>
          </Marker>
          <Circle center={position} pathOptions={fillGreenOptions} radius={1000} />
          <Circle center={position} pathOptions={fillRedOptions} radius={100000} />
          <Circle center={position} pathOptions={fillYellowOptions} radius={50000} />
          <Circle center={position} pathOptions={fillBlueOptions} radius={10000} />

        </MapContainer>
      </div>
      <div className="w-full lg:w-2/6 mb-4 flex flex-col justify-center items-center">
        <div className="border p-4 mb-5 w-5/6">
        <p className="text-lg font-semibold mb-2">Evidence</p>
          <form>
            <input type="file" multiple></input>
          </form>
        </div>
        <div className="mb-10 border p-4 mb-5 w-5/6">
          <p className="text-lg font-semibold">Coordinate</p>
          <p>Latitude : {position.lat}</p>
          <p>Longitude : {position.lng}</p>

        </div>
        <button className="border border-gray-500 p-4 w-5/6 md:w-5/6">
          Challenge
        </button>
      </div>
    </div>
  );
}

export default Map;
