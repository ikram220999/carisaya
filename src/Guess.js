import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import mg from './img/mg.jpeg'
import mg2 from './img/mg2.jpeg'
import { Link } from "react-router-dom";
import PopupMap from "./PopupMap";


const Guess = () => {
  
  let data = [1,1,1,1,1,1,1,1]
  const [isGuess, setIsGuess] = useState(false)


  return (
    <>
    <div className="w-full overflow-scroll">
      {data.map((data) => (
        <div className="border m-4 border-2 border-gray-300 p-4 flex flex-col  rounded-md  shadow-xs">
            <div className="h-40 sm:h-60  mb-4 flex gap-2 overflow-scroll">
              <img src={mg} alt="img"></img>
              <img src={mg2} alt="img"></img>
            </div>
            <div>
              {/* <Link to={"/guess/1"}> */}
                <button className="p-3 border w-full border-2 rounded-md border-gray-400 cursor-pointer hover:bg-gray-200" onClick={() => setIsGuess((prev) => !prev)}>Guess</button>
              {/* </Link> */}
            </div>
            {isGuess ? (
            <PopupMap setIsGuess={setIsGuess}/>
          ) : ("")}
        </div>
      ))}
    </div>
    </>
  );
};

export default Guess;
