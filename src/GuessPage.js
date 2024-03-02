import ProgressBar from "@ramonak/react-progress-bar";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "./progressBar.css";
import mg from "./img/mg.jpeg";
import mg2 from "./img/mg2.jpeg";
import PopupMap from "./PopupMap";

const GuessPage = () => {
  const center = {
    lat: 4.2105,
    lng: 101.9758,
  };
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const [accuracy, setAccuracy] = useState(100);
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

  const [isGuess, setIsGuess] = useState(false)

  const handleIsGuess = () => {

  }

  console.log("position", position);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center p-0 overflow-scroll">
        <div className="w-full h-full sm:h-full lg:w-2/6 mb-4 flex flex-col justify-center items-center overflow-y-scroll">
          {/* <div className="w-full h-full lg:w-2/6 mb-4 flex flex-col justify-center items-center"> */}
            <div className="mb-10   mb-5 w-5/6 overflow-scroll">
            <p className="sm:text-lg font-semibold">Evidence</p>
              {/* <div className="w-5/6 border h-full"> */}
                <img src={mg} alt="img" className="h-60 w-full"></img>
                <img src={mg2} alt="img" className="h-60 w-full"></img>
                
              {/* </div> */}
            </div>
       
            
            <button className="border border-gray-500 p-4 w-5/6 md:w-5/6 hover:bg-gray-100 cursor-pointer text-xs sm:text-lg mb-3" onClick={() => setIsGuess((prev) => !prev)}>
              Guess
            </button>
            <div className="py-3 px-2 w-5/6 flex flex-col justify-center items-center border border-2 border-gray-300">
              <p className="text-sm font-bold mb-2">Accuracy</p>
              <ProgressBar completed={accuracy} className="w-full" />
            </div>
          {/* </div> */}
         
        </div>
      </div>
    </>
  );
};

export default GuessPage;
