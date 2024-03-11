import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import mg from "./img/mg.jpeg";
import mg2 from "./img/mg2.jpeg";
import { Link } from "react-router-dom";
import PopupMap from "./PopupMap";
import axios from "axios";

const Guess = () => {
  let data = [1];
  const [isGuess, setIsGuess] = useState(false);
  const [challenge, setChallenge] = useState([]);

  const fetchChallenge = () => {
    const userId = localStorage.getItem("userId");

    axios
      .post(`${process.env.REACT_APP_API_HOSTNAME}/api/challenge/all`, {userId: userId})
      .then((res) => {
        console.log("res", res);
        setChallenge(res.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchChallenge();
  }, []);

  return (
    <>
      <div className="w-full overflow-scroll">
        {challenge.map((data) => (
          <div className="border m-4 p-4 flex flex-col  rounded-md  shadow-md">
            <div className="h-40 sm:h-60  mb-4 flex gap-2 overflow-scroll">
              {data.attachment
                ? data.attachment.map((att) => (
                    <img
                      src={`${process.env.REACT_APP_API_HOSTNAME}${att.location}`}
                      alt="img"
                    ></img>
                  ))
                : ""}
            </div>
            <div>
              {/* <Link to={"/guess/1"}> */}
              <button
                className="border rounded-md px-4 py-2 bg-gray-300 text-gray-500 md:text-lg w-full hover:bg-gray-200"
                onClick={() => setIsGuess((prev) => !prev)}
              >
                Guess
              </button>
              {/* </Link> */}
            </div>
            {isGuess ? <PopupMap setIsGuess={setIsGuess} /> : ""}
          </div>
        ))}
      </div>
    </>
  );
};

export default Guess;
