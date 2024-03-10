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
            <p className="text-lg font-bold">Cari saya</p>
          <input className=" border rounded-md px-4 py-3" placeholder="username"></input>
          <input className=" border rounded-md px-4 py-3" placeholder="password"></input>
          <button className=" border rounded-md px-4 py-3 bg-gray-500 text-white font-bold md:text-lg" onClick={() => login()}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
