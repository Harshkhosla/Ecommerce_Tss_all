import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from '@mui/icons-material/Close';
import { getUserLogin } from "../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { tssurl, url1 } from "../../../UI/port";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userManagement.users);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [result, setResult] = useState(false);
  const [resultr, setResultr] = useState("");

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/home')
    }
  }, []);
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("uname", username);
    formData.append("password", password);
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/admin/login`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      })

        .then(async (response) => {
          setUsername("");
          setPassword("");
          // console.log(response);
          const token = response.data.authToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("uid", response.data.uid);
          await dispatch(getUserLogin(response.data.uid))
          setResult("Logged in Successfully");
          sessionStorage.setItem('jwt', token);
          navigate("/home");
        })
    }
    catch (err) {
      // console.log(err);
      setResult(true);
      setResultr(err.response.data.msg);
    };
  };
  useEffect(() => {
    if (result == true) {
      let login = document.getElementById('login');
      setTimeout(() => {
        login.style.transition = '0.5s';
        login.style.opacity = '0';
      }, 1400);
      setTimeout(() => {
        login.style.display = 'none';
        setResult(false)
      }, 1500);
    }

  }, [result])
  return (

    <div className="login">
      {result == true ? (<>
        <div className="fixed top-0 end-0 m-5 mt-3 z-50 min-w-[5rem]" id="login">
          <div className="bg-red-500 text-white px-6 py-4 border-0 rounded relative alert-dismissible flex justify-between" role="alert">
            <span className="font-semibold">Login Failed ! </span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              data-dismiss="alert"
              aria-label="Close"
            ></button>
            <p> &ensp; {resultr}</p>
          </div>
        </div>
      </>) : (null)}

      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt="" />
        <div className="login_header">
          <h1 className="headl">Login</h1>
          {/* <div className="signup"> */}
          {/* Need an account? <a href="/register">Sign Up</a> */}
          {/* </div> */}
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Username
              <input
                className="input_edit"
                required
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label className="input">
              Password
              <input
                className="input_edit"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              // required
              />
            </label>
            <br />
            <div className="submit">
              <button
                // onSubmit={handleSubmit}
                className="login_button"
                type="submit">
                Login
              </button>
              <Link to="/reset" className="forgot">
                Forgot Password?
              </Link>
            </div>
            <div className="result">{result}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
