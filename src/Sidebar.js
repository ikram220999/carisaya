import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
            <Link to={l.url} className="border border-2 rounded-sm border-gray-500 p-4 text-md sm:text-lg w-1/4 md:w-full cursor-pointer">
          <div className="">{l.name}</div>
            </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
