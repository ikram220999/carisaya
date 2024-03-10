import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  const list = [
    {
      url: "/challenge",
      name: "Challenge",
      login: true,
    },
    {
      url: "/guess",
      name: "Guess",
      login: false,
    },
    {
      url: "/ranking",
      name: "Ranking",
      login: false,
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  let isAuth = localStorage.getItem("userType");

  return (
    <>
      {isAuth == "main" ? (
        <div className="flex flex-row md:flex-col items-center justify-center w-full gap-4 m-auto">
          {list.map((l) => (
            <>
              {currentUrl == l.url ? (
                <Link
                  to={l.url}
                  className="border border-2 rounded-md border-gray-600 bg-gray-600 text-white p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer "
                >
                  <div className="">{l.name}</div>
                </Link>
              ) : (
                <Link
                  to={l.url}
                  className="border border-2 rounded-md border-gray-600 p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer hover:bg-gray-200"
                >
                  <div className="">{l.name}</div>
                </Link>
              )}
            </>
          ))}

          <button
            className="border border-2 border-red-600 rounded-md text-white p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer hover:bg-red-400 bg-red-500"
            onClick={() => logout()}
          >
            <div className="">{"Logout"}</div>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-row md:flex-col items-center justify-center w-full gap-4 m-auto">
            {list.map((l) => (
              <>
                {currentUrl == l.url ? (
                  <>
                    {!l.login ? (
                      <Link
                        to={l.url}
                        className="border border-2 rounded-md border-gray-600 bg-gray-600 text-white p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer "
                      >
                        <div className="">{l.name}</div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {!l.login ? (
                      <Link
                        to={l.url}
                        className="border border-2 rounded-md border-gray-600 p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer hover:bg-gray-200"
                      >
                        <div className="">{l.name}</div>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            ))}

            <button
              className="border border-2 border-red-600 rounded-md text-white p-4 text-xs sm:text-lg w-1/3 md:w-full cursor-pointer hover:bg-red-400 bg-red-500"
              onClick={() => logout()}
            >
              <div className="">{"Logout"}</div>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
