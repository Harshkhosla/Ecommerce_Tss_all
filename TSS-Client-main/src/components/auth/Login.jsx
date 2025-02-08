import { useState } from "react";
import { Button, Form, Row, Col, Modal, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import tssurl, { tssurl2 } from "../../port";
import GoogleAuth from "./GoogleAuth";
import Register from "./Register";

const Login = ({ data }) => {
  const [show, setShow] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleForgetPasswordModalClose = () => setForgetPasswordModal(false);
  const handleForgetPasswordModalShow = () => {
    setForgetPasswordModal(true);
    setShow(false);
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${tssurl}/auth/forgot-password`, { email });
      toast.success(res.data.message);
      handleForgetPasswordModalClose();
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  const handleSubmit = async (e) => {
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

      if (response.status === 200 && authMode === "signin") {
        setEmail("");
        setPassword("");
        toast.success("Login Successful");
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("MID", mID);

        const lastApiCallLoginDate = localStorage.getItem('lastApiCallLoginDate');
        const today = new Date().toISOString().slice(0, 10);
        if (lastApiCallLoginDate !== today) {
          await axios.post(`${tssurl2}/user/chit`, { mid: mID });
          localStorage.setItem('lastApiCallLoginDate', today);
        }
        window.location.reload(true);
      } else {
        toast.error("Operation Unsuccessful", response.data.message);
      }
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
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
          <GoogleAuth authMode={authMode} />
        </div>
        {authMode === "signin" ? (
          <>
            <Modal.Body className="pb-0 mb-0">
              <Form onSubmit={handleSubmit}>
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
                <div className="pt-2" />
                <Form.Label>Password</Form.Label>
                <InputGroup controlId="formBasicPassword">
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
                <Form.Text
                  className="flex my-3"
                  style={{ cursor: "pointer" }}
                  onClick={handleForgetPasswordModalShow}
                >
                  <strong>Forgot Password?</strong>
                </Form.Text>
              </Form>
            </Modal.Body>
            <Modal.Footer className="flex">
              <Button
                className="loginbtn"
                variant="dark"
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <Register authMode={authMode} />
        )}
      </Modal>
      <Modal
        show={forgetPasswordModal}
        onHide={handleForgetPasswordModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleForgetPasswordModalClose();
              handleSendEmail(e);
            }}
          >
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit" onClick={handleSendEmail}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
