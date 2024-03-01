import React from "react";
import { FaCrown } from "react-icons/fa";
import mg from './img/mg.jpeg'
import mg2 from './img/mg2.jpeg'


const Guess = () => {
  
  let data = [1,1,1,1,1,1,1,1]

  return (
    <>
    <div className="w-full">
      {data.map((data) => (
        <div className="border m-2 p-4 flex flex-col">
            <div className="h-60 border border-red-400 mb-4 flex gap-2 overflow-scroll">
              <img src={mg} alt="img"></img>
              <img src={mg2} alt="img"></img>
            </div>
            <div>
              <button className="p-3 border w-full border-gray-400">Guess</button>
            </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Guess;
