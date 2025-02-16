"use client";

import { useState } from "react";
import { Button, Form, Row, Col, Modal, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Register from "./Register";
import { tssurl } from "@/app/port"; 

import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
  };

  const handleShow = () => setShow(true);

  const handleForgetPasswordModalClose = () => {
    setForgetPasswordModal(false);
    setEmail("");
  };

  const handleForgetPasswordModalShow = () => {
    setForgetPasswordModal(true);
    setShow(false);
  };

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const res = await axios.post(`${tssurl}/auth/forgot-password`, { email });
      toast.success(res.data.message);
      handleForgetPasswordModalClose();
    } catch (error) {
      toast.error("Failed to send email");
      console.log(error)
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("sdvjhsbvdjbh");

    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const formData = { email, password };
      const url = `${tssurl}/auth/Login`;
      const response = await axios.post(url, formData);
      const authToken = response?.data?.authToken;
      const mID = response?.data?.mid;

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        toast.success("Login Successful");
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("MID", mID);

        const lastApiCallLoginDate = localStorage.getItem("lastApiCallLoginDate");
        const today = new Date().toISOString().slice(0, 10);

        if (lastApiCallLoginDate !== today) {
          await axios.post(`${tssurl}/user/chit`, { mid: mID });
          localStorage.setItem("lastApiCallLoginDate", today);
        }
        router.prefetch('/');

      } else {
        toast.error(response.data.message || "Operation Unsuccessful");
      }
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <FaUser size={15} style={{ cursor: "pointer" }} onClick={handleShow} />

      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="auth">
          <Modal.Title>
            <Row>
              <Col
                onClick={() => setAuthMode("signin")}
                className={authMode === "signin" ? "active" : ""}
              >
                Login
              </Col>
              <Col
                onClick={() => setAuthMode("signup")}
                className={authMode === "signup" ? "active" : ""}
              >
                Register
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <div>
          {/* <GoogleAuth authMode={authMode} /> */}
        </div>
        {authMode === "signin" ? (
          <>
            <Modal.Body className="pb-0 mb-0"> 
              <Form onClick={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputGroup.Text
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Text
                  className="flex my-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleForgetPasswordModalShow}
                >
                  <strong>Forgot Password?</strong>
                </Form.Text>

                <Modal.Footer className="flex">
                  <Button className="loginbtn" variant="dark" type="submit">
                    Log In
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>


          </>
        ) : (
          <Register  />
        )}
      </Modal>

      {/* Forget Password Modal */}
      <Modal show={forgetPasswordModal} onHide={handleForgetPasswordModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSendEmail}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="dark" type="submit">
                Reset Password
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
