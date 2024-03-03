import React, { useCallback, useMemo, useRef, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { haversineDistance } from "./function";

const PopupMap = (props) => {
  const [submit, setSubmit] = useState(false);
  const [resultAvailable, setResultAvailable] = useState(false);
  const [center, setCenter] = useState({
    lat: 4.2105,
    lng: 101.9758,
  })

  const [point, setPoint] = useState(0);
  const [distance, setDistance] = useState(0)

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

  const fillBlueOptions = { color: "blue" };
  const fillYellowOptions = { color: "yellow" };
  const fillRedOptions = { color: "red" };
  const fillGreenOptions = { color: "green" };
  const fillBlackOptions = { color: "black" };

  const second = {
    lat: 2.877699533432209,
    lng: 102.79926969150273,
  };

  console.log("position", position);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const calculatePoint = (distance) => {
    if(distance <= 10){
        return 10;
    } else if (distance > 10 && distance <= 30){
        return 8
    } else if (distance > 30 && distance <= 50) {
        return 7
    } else if (distance > 50 && distance <= 100){
        return 5
    } else if (distance > 100 && distance <= 200) {
        return 3
    } else {
        return 1
    }
  }

  const handleSubmit = () => {
    setDraggable(false);
    let distance = haversineDistance(position, second)
    setCenter(position)
    setDistance(distance)
    setPoint(calculatePoint(distance))
    setSubmit(true);
    setTimeout(() => {
      setResultAvailable(true);
      setSubmit(false);
    }, 3000);
  };

  return (
    <>
      <div class="fixed z-10 inset-0 overflow-y-auto h-full w-full">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 h-full sm:w-5/6 m-auto">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-scroll shadow-xl transform transition-all h-full sm:my-8 sm:align-middle sm:max-w-5/6 -w-md w-full sm:w-full sm:p-6 h-full">
            <div class="sm:flex sm:items-start h-5/6">
              <div className="w-full h-full lg:w-5/6 flex justify-center items-center my-2 sm:h-full m-auto">
                {submit ? (
                  <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                ) : (
                  <MapContainer
                    center={[4.2105, 101.9758]}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ width: "100%", height: "90%" }}
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
                    ></Marker>
                    {resultAvailable ? (
                      <>
                        <Marker
                          draggable={draggable}
                          eventHandlers={eventHandlers}
                          position={second}
                          ref={markerRef}
                        >
                          <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                        </Marker>
                        <Circle
                          center={second}
                          pathOptions={fillGreenOptions}
                          radius={10000}
                        />
                        <Circle
                          center={second}
                          pathOptions={fillRedOptions}
                          radius={100000}
                        />
                        <Circle
                          center={second}
                          pathOptions={fillYellowOptions}
                          radius={50000}
                        />
                        <Circle
                          center={second}
                          pathOptions={fillBlueOptions}
                          radius={30000}
                        />
                        <Circle
                          center={second}
                          pathOptions={fillBlackOptions}
                          radius={200000}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </MapContainer>
                )}
              </div>
            </div>
            {resultAvailable ? (
              <>
                <p className="w-full text-center m-auto mb-4">Congratulations. Your guess location is about <span className="font-bold mx-2">{' ' + Math.round(distance) + ' '}</span> kilometers away from the target location.</p>
              <div class="mt-0 sm:mt-4 sm:flex sm:flex-row-reverse justify-center items-center mb-4">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={() => props.setIsGuess(false)}
                    >
                      Collect {point} points 
                    </button>
                  </span>
                </div></>
             ) : (
              <>
                <div class="mt-0 sm:mt-4 sm:flex sm:flex-row-reverse justify-center items-center">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={() => handleSubmit()}
                    >
                      Confirm
                    </button>
                  </span>
                  <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={() => props.setIsGuess(false)}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupMap;
