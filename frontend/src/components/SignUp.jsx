import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-purple-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center text-gray-300 ">
          SignUp
        </h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name*</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              value={user.fullname}
              type="text"
              placeholder="fullname*"
              className="bg-white text-black w-full input input-bordered h-9"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email*</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type="password"
              placeholder="password*"
              className="bg-white text-black w-full input input-bordered h-9"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password*</span>
            </label>
            <input
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
              value={user.confirmpassword}
              type="password"
              placeholder="confirm password*"
              className="bg-white text-black w-full input input-bordered h-9"
            />
          </div>

          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male: </p>
              <input
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                type="checkbox"
                className="checkbox  border-2 border-white mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female: </p>
              <input
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                type="checkbox"
                className="checkbox  border-2 border-white mx-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 w-full mx-auto">
            <p>Already have an Account? </p>
            <Link to="/login" className="text-center">
              {" "}
              Login
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700 bg-white text-black"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
