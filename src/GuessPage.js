import ProgressBar from "@ramonak/react-progress-bar";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import './progressBar.css'

const GuessPage = () => {

    const center = {
        lat: 4.2105,
        lng: 101.9758,
      };
      const [draggable, setDraggable] = useState(true);
      const [position, setPosition] = useState(center);
      const [accuracy, setAccuracy] = useState(100)
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
        <>
            <div className="w-full h-full flex flex-col md:flex-row justify-center items-center p-0">
      <div className="w-full lg:w-5/6 h-full flex justify-center items-center my-2">
        <MapContainer
          center={[4.2105, 101.9758]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ width: "95%", height: "95%" }}
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
          </Marker>
        </MapContainer>
      </div>
      <div className="w-full lg:w-2/6 mb-4 flex flex-col justify-center items-center">
        <div className="mb-10 border p-4 mb-5 w-5/6">
          <p className="sm:text-lg font-semibold">Coordinate</p>
          <p className="text-xs sm:text-lg">Latitude : {position.lat}</p>
          <p className="text-xs sm:text-lg">Longitude : {position.lng}</p>

        </div>
        <button className="border border-gray-500 p-4 w-5/6 md:w-5/6 hover:bg-gray-100 cursor-pointer text-xs sm:text-lg mb-3">
          Guess
        </button>
        <div className="py-3 px-2 w-5/6 flex flex-col justify-center items-center border border-2 border-gray-300">
            <p className="text-sm font-bold mb-2">Accuracy</p>
            <ProgressBar completed={accuracy} className="w-full"
            />
        </div>
      </div>
    </div>
        </>
    )
}

export default  GuessPage