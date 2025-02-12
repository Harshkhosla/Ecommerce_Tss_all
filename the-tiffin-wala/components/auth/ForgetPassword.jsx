import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import tssurl from "../../port";
import zxcvbn from "zxcvbn";

const ForgetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordError(
      newPassword !== value ? "Passwords do not match" : "Passwords match"
    );
  };

  const handlePasswordStrength = (e) => {
    const { value } = e.target;
    setNewPassword(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { newpassword: newPassword };
      const response = await axios.post(
        `${tssurl}/auth/reset-password?token=`,
        data
      );
      if (response.status === 200) {
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password Changed Successfully");
      } else {
        toast.error("Operation Unsuccessful", response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center  vh-80">
      <div className="col-md-4 ">
        <div className="text-center fs-1 fw-bold">Reset Password</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => handlePasswordStrength(e)}
                required
              />
            </InputGroup>
          </Form.Group>
          <small className="password-validation-message text-muted">
            {passwordStrength && (
              <span>Password Strength: {passwordStrength}</span>
            )}
          </small>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </InputGroup>
          </Form.Group>
          <div
            className={`password-validation-message ${newPassword !== confirmPassword ? "text-danger" : "text-success"
              }`}
          >
            {passwordError}
          </div>
          <Button className="loginbtn mt-2" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
