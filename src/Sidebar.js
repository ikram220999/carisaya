import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  const list = [
    {
        url: "/challenge",
        name: "Challenge",
    },
    {
      url: "/guess",
      name: "Guess",
    },
    {
      url: "/leaderboard",
      name: "Leaderboard",
    },
  ];

  return (
    <>
      <div className="flex flex-row md:flex-col items-center justify-center w-full gap-4 m-auto">
        {list.map((l) => (
          <>
          {currentUrl == l.url ? (
             <Link to={l.url} className="border border-2 rounded-sm border-gray-500 bg-gray-500 text-white p-4 text-md sm:text-lg w-1/3 md:w-full cursor-pointer">
             <div className="">{l.name}</div>
             </Link>
          ) : (

            <Link to={l.url} className="border border-2 rounded-sm border-gray-500 p-4 text-md sm:text-lg w-1/3 md:w-full cursor-pointer">
            <div className="">{l.name}</div>
            </Link>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
