import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      console.log(response.data);
      dispatch(setAuthUser(response.data))
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-purple-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center text-gray-300 ">Login</h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email*</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="username*"
              className="bg-white text-black w-full input input-bordered h-9"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password*</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="password*"
              className="bg-white text-black w-full input input-bordered h-9"
            />
          </div>

          <div className="flex items-center gap-1 w-full mx-auto">
            <p>Don't have an Account? </p>
            <Link to="/register" className="text-center">
              {" "}
              SignUp
            </Link>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700 bg-white text-black">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
