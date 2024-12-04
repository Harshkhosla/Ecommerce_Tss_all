import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import tssurl from "../../port";
import zxcvbn from "zxcvbn";

const Register = () => {
  const [authMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordError(
      password !== value ? "Passwords do not match" : "Passwords match"
    );
  };

  const handlePasswordStrength = (e) => {
    const { value } = e.target;
    setPassword(value);
    const strengthScore = zxcvbn(value).score;
    setPasswordStrength(getPasswordStrengthLabel(strengthScore));
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const PassStrength = ({ strength }) => {
    return (
      <div
        className={`password-strength-indicator ${getStrengthClass(strength)}`}
      >
        {strength && <span>{`Password Strength: ${strength}`}</span>}
      </div>
    );
  };

  const getStrengthClass = (strength) => {
    switch (strength) {
      case "Weak":
        return "weak";
      case "Fair":
        return "fair";
      case "Good":
        return "good";
      case "Strong":
        return "strong";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (authMode === "signup" && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const formData = { email, name, password, mobileNo };
      const url = `${tssurl}/auth/Signup`;

      const response = await axios.post(url, formData);
      if (response.status === 201 && authMode === "signup") {
        setName("");
        setEmail("");
        setPassword("");
        setMobileNo("");
        setConfirmPassword("");
        toast.success("Email Verification Sent");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
        navigate("/");
      } else {
        toast.error("Operation Unsuccessful", response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
      <Modal.Body className="pb-0 mb-0">
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Group controlId="formBasicMobileNo">
            <Form.Label>Phone No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Label>Password</Form.Label>
          <InputGroup controlId="formBasicPassword">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                handlePasswordStrength(e);
                setPassword(e.target.value);
              }}
              required
            />
            <InputGroup.Text
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          <small className="password-validation-message text-muted">
            <PassStrength strength={passwordStrength} />
          </small>
          <div className="pt-2" />
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup controlId="formBasicConfirmPassword">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <InputGroup.Text
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
          <div
            className={`password-validation-message ${passwordError === "Passwords match"
                ? "text-success"
                : "text-danger"
              }`}
          >
            {passwordError}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="flex">
        <Button className="loginbtn" variant="dark" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Register;
