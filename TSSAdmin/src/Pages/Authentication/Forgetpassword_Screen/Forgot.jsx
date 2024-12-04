import React, { useState } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url1 } from "../../../UI/port";

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/forgot_password_admin?email=${email}`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      })
        .then((response) => {
          setEmail("");
          setResult("Email has been sent , please check and login");
        })
    } catch (err) {
      // console.log("Problem", err);
      setResult("Operation failed");
    };
  };

  return (
    <div className="login">
      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt="" />
        <div className="login_header">
          <h1 className="headl">Forgot Password</h1>
          <div className="signup">Let Us Help You</div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Enter Your Registered Email Address
              <input
                className="input_edit"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <div className="submit">
              <button
                className="login_button"
                type="submit"
                style={{ width: "150px" }}>
                Reset Password
              </button>
              <Link to="/" className="forgot" style={{ right: 110 }}>
                Login
              </Link>
            </div>
            <div className="result">{result}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
