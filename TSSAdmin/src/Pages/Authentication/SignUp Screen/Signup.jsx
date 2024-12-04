import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
//   const [result, setResult] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    setUsername("");
    // try {
    //   const response = await axios
    //     .post("http://localhost:4000/", { username, password })
    //     .then((res) => {
    //       console.log(res);
    //       if ((res?.data == "Login successfull")) {
    //         setResult("Login Successfull")
    //         navigate("/main");
    //       }
    //     }); // Login .
    // } catch (error) {
    //   setResult(error.response.data); 
    // }
    // console.log(`Submitting ${username} and ${password}`);
  };

  return (
    <div className="login">
      <div className="login_box">
        <img className="logo" src="/images/logo.png" alt=""/>
        <div className="login_header">
          <h1 className="headl">Two-Step Verification</h1>
          <div className="signup">
            Let Us Thanks for keeping your account secure. Check your mobile device: (XXX)-XXX-0099
          </div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Your Verification Code
              <input
                className="input_edit"
                placeholder="6-digit code"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <div className="submit">
              <button className="login_button" type="submit" style={{width:152}}>
                Sign In Securely
              </button>
              <Link to="/" className="forgot" style={{right:110}}>
                Cancel
              </Link>
            </div>
            <div className="result">
              {/* {result} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;