"use client";
import { useState } from "react";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import zxcvbn from "zxcvbn";
import { tssurl } from "@/app/port";
import { useRouter } from "next/navigation";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();

  const validateEmail = (email:string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError(value !== password ? "Passwords do not match" : "");
  };

  const handlePasswordStrength = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const strengthScore = zxcvbn(value).score;
    setPasswordStrength(getPasswordStrengthLabel(strengthScore));
  };

  const getPasswordStrengthLabel = (score:number) => {
    const strengthLabels = ["Weak", "Weak", "Fair", "Good", "Strong"];
    return strengthLabels[score] || "";
  };

  const getStrengthClass = (strength: "Weak" | "Fair" | "Good" | "Strong"): string => {
    return {
      Weak: "weak",
      Fair: "fair",
      Good: "good",
      Strong: "strong",
    }[strength] || "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const formData = { email, name, password, mobileNo };
      const response = await axios.post(`${tssurl}/auth/Signup`, formData);

      if (response.status === 201) {
        toast.success("Email Verification Sent");
        setName("");
        setEmail("");
        setPassword("");
        setMobileNo("");
        setConfirmPassword("");

        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.data.message || "Operation Unsuccessful");
      }
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
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicMobileNo" className="mt-3">
            <Form.Label>Phone No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordStrength}
                required
              />
              <InputGroup.Text
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
            {passwordStrength && (
              <small className={`password-strength ${getStrengthClass(passwordStrength as "Weak" | "Fair" | "Good" | "Strong")}`}>
                Password Strength: {passwordStrength}
              </small>
            )}
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
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
            {passwordError && (
              <small className={`password-validation-message ${passwordError === "Passwords do not match" ? "text-danger" : "text-success"}`}>
                {passwordError}
              </small>
            )}
          </Form.Group>

          <Modal.Footer className="d-flex justify-content-center mt-4">
            <Button className="loginbtn" variant="dark" type="submit">
              Sign Up
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Register;
