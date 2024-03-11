import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {

  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  console.log("input", input);

    const login = () => {
      axios.post(`${process.env.REACT_APP_API_HOSTNAME}/api/auth/login`, input
      ).then((res) => {
        console.log(res);
        if(res.status == 200) {
          localStorage.setItem("access_token", res.data.access_token)
          localStorage.setItem("userType", "main")
          localStorage.setItem("userId", res.data.user.id)
          toast.success("Success login")
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Error login")
      })  
      // window.location.reload()
    }

    const loginGuest = () => {
      localStorage.setItem("userType", "guest")
      localStorage.setItem("userId", 0)

      toast.success("Login as guest")
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  return (
    <>
      <div className="m-auto bg-gray-100 h-screen flex flex-col">
        <div className="m-auto w-3/4 md:h-1/4 md:w-1/4 flex flex-col gap-4">
            <p className="md:text-2xl font-bold mb-3">CariSaya</p>
          <input className=" border rounded-md px-4 py-3 border-gray-300 md:text-lg" placeholder="username" name="username" onChange={handleChange}></input>
          <input className=" border rounded-md px-4 py-3 border-gray-300 mb-5 md:text-lg" placeholder="password" name="password" onChange={handleChange}></input>
          <button className=" border rounded-md px-4 py-3 bg-gray-500 text-white font-bold md:text-lg" onClick={() => login()}>Login</button>
          <button className=" border rounded-md px-4 py-3 bg-gray-200 text-gray-500 font-bold md:text-lg" onClick={() => loginGuest()}>Continue as guess</button>

        </div>
      </div>
    </>
  );
};

export default Login;
