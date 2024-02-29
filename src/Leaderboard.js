import React from "react";
import { FaCrown } from "react-icons/fa";

const Leaderboard = () => {
  const playerStat = [
    {
      name: "Abu",
      guess: 1500,
      point: 1000,
    },
    {
      name: "Charlie",
      guess: 1400,
      point: 1200,
    },
    {
      name: "Bob",
      guess: 1600,
      point: 800,
    },
    {
      name: "David",
      guess: 1550,
      point: 1100,
    },
    {
      name: "Eva",
      guess: 1450,
      point: 950,
    },
    {
      name: "Frank",
      guess: 1650,
      point: 750,
    },
    {
      name: "Grace",
      guess: 1520,
      point: 1050,
    },
    {
      name: "Hank",
      guess: 1420,
      point: 1150,
    },
    {
      name: "Ivy",
      guess: 1580,
      point: 850,
    },
    {
      name: "Jack",
      guess: 1470,
      point: 980,
    },
    {
        name: "Eva",
        guess: 1450,
        point: 950,
      },
      {
        name: "Frank",
        guess: 1650,
        point: 750,
      },
      {
        name: "Grace",
        guess: 1520,
        point: 1050,
      },
      {
        name: "Hank",
        guess: 1420,
        point: 1150,
      },
      {
        name: "Ivy",
        guess: 1580,
        point: 850,
      },
      {
        name: "Jack",
        guess: 1470,
        point: 980,
      },
    // Add more players as needed, and ensure the array is sorted by points in descending order
  ];

  const getRank = (id) => {
    if(id == 0) {
        return <FaCrown className="text-orange-600 ml-3" />
    } else if (id == 1){
        return <FaCrown className="text-gray-600 ml-3" />
    } else if (id == 2) {
        return <FaCrown className="text-orange-800 ml-3" />
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-center py-10">
        <p className="text-lg sm:text-2xl font-bold mb-10">Ranking</p>
        <div></div>
        <div className="w-5/6 flex flex-col gap-3 overflow-scroll h-screen">
            <div className="p-4 flex">
              <p className="font-bold text-lg w-3/5"></p>
              <p className="font-bold text-md sm:text-lg w-1/5">Guess</p>
              <p className="font-bold text-md sm:text-lg w-1/5">Points</p>
            </div>
          {playerStat.map((stat, id) => (
            <div className="border p-4 flex rounded-sm border-gray-300 ">
              <p className="font-bold text-md sm:text-lg w-3/5 flex items-center">{stat.name} {getRank(id)} </p>
              <p className="font-bold text-md sm:text-lg w-1/5">{stat.guess}</p>
              <p className="font-bold text-md sm:text-lg w-1/5">{stat.point}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
