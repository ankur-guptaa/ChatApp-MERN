import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const { setAuthUser, setUserId } = useAuthContext();

  const Submit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }
      );
      if (!res.data.token) {
        throw new Error("Token does not Generated.");
      }
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setAuthUser(res.data.token);
      setUserId(res.data.userId);
    } catch (error) {
      console.log(error.messsage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen gap-24">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl">Welcome to</h1>
        <h1 className="text-6xl">ChatApp</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" text-3xl font-semibold pb-5">SignUP</h1>
        <form className="flex flex-col gap-5 min-w-80" onSubmit={Submit}>
          <div className="">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Confirm Password</label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <input
                type="radio"
                name="radio-1"
                className="radio"
                onChange={() => {
                  setGender("Male");
                }}
              />
              <label>Male</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="radio-1"
                className="radio"
                onChange={() => {
                  setGender("Female");
                }}
              />
              <label>Female</label>
            </div>
          </div>
          <div>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </div>
          <div className="">
            <button className="btn btn-neutral w-full max-w-xs">SignUP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
