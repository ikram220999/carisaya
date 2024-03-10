import React from "react";

const Login = () => {

    const login = () => {
        localStorage.setItem('user', 'kambing')
        window.location.reload()
    }
  return (
    <>
      <div className="m-auto bg-gray-100 h-screen flex flex-col">
        <div className="m-auto w-2/4 md:h-1/4 md:w-1/4 flex flex-col gap-4">
            <p className="text-lg font-bold mb-3">CariSaya</p>
          <input className=" border rounded-md px-4 py-3 border-gray-300" placeholder="username"></input>
          <input className=" border rounded-md px-4 py-3 border-gray-300 mb-5" placeholder="password "></input>
          <button className=" border rounded-md px-4 py-3 bg-gray-500 text-white font-bold md:text-lg" onClick={() => login()}>Login</button>
          <button className=" border rounded-md px-4 py-3 bg-gray-200 text-gray-500 font-bold md:text-lg" onClick={() => login()}>Continue as guess</button>

        </div>
      </div>
    </>
  );
};

export default Login;
