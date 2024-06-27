import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser, setUserId } = useAuthContext();

  const Submit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          userName,
          password,
        }
      );
      if (!res) {
        throw new Error("Authentication Fails.");
      }
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setAuthUser(res.data.token);
      setUserId(res.data.userId);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen gap-24">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl">Welcome to</h1>
        <h1 className="text-6xl">ChatApp</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" text-3xl font-semibold pb-5">Login</h1>
        <form className="flex flex-col gap-5 min-w-80" onSubmit={Submit}>
          <div className="">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              // value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              // value={setPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700">
              Create One
            </Link>
          </div>
          <div className="">
            <button className="btn btn-neutral w-full max-w-xs">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
