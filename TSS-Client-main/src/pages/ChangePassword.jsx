import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../components/profile/Sidebar";
import ShopTags from "../components/common/Tags";
import { toast } from "react-toastify";
import tssurl from "../port";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");
    const mid = localStorage.getItem("MID");

    if (passwords.newPassword === passwords.confirmPassword) {
      try {
        const response = await axios.post(
          `${tssurl}/auth/change-password`,
          {
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
            mid: mid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Password changed successfully");
          toast.success("Password changed successfully");
        } else {
          console.error("Failed to change password");
          toast.error("Failed to change password");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error changing password");
      }
    } else {
      toast.error("Passwords do not match");
    }

    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Container fluid>
      <Row>
        <ShopTags />
      </Row>

      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="narrow-form-container">
          <div className="shadow rounded p-3 bg-white">
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <div className="text-secondary fw-semibold fs-4 border-1 border-bottom">
                    Change Password
                  </div>
                  <p className="mb-2">Current Password</p>
                  <input
                    placeholder="Current Password"
                    className="form-control form-control-lg border-success"
                    type="text"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    required
                  />

                  <p className="mt-3 mb-2">New Password</p>
                  <input
                    type="text"
                    placeholder="New Password"
                    id="newPassword"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                    className="form-control form-control-lg border-success"
                  />
                  <p className="mt-3 mb-2">Confirm Password</p>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg border-success"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <Button
                    className="shadow-none mt-4 text-white px-5 rounded-0"
                    style={{ backgroundColor: "orange", color: "#fff" }}
                    variant="contained"
                    color="themeColor"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
