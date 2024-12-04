import { useState, useEffect } from "react";
import { Accordion, Nav, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaMessage,
} from "react-icons/fa6";
import tssurl from "../../port";
import { toast } from "react-toastify";
import Login from "../auth/Login";

const Sidebar = ({ showNav, setShowNav, head, activeKey }) => {
  const [footerLinks, setFooterLinks] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken && authToken !== "";
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("MID");
    setIsLoggedIn(false);
    toast.success("Logout successfully");
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${tssurl}/footer`);
        const data = await res.json();
        setFooterLinks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="section">
      <div className={showNav ? "sidenav active" : "sidenav"}>
        <div className="sidehead">
          <p className="fs-5 me-5">Shop by Category</p>
          {!isLoggedIn ? <Login data={show} handleShow={handleShow} /> : null}

          <FaTimes onClick={() => setShowNav(false)} size="25" />
        </div>
        <hr className="my-0" />
        {head && (
          <Accordion defaultActiveKey={activeKey} flush>
            {head.map((menu) => (
              <Accordion.Item
                key={menu.MLink}
                eventKey={menu.MLink}
                title={menu.Mname}
              >
                <Accordion.Header className="fw-bold">
                  {menu.Mname}
                </Accordion.Header>
                <Accordion.Body>
                  <Nav>
                    {menu?.nav_link?.map((item, index) => (
                      <Nav.Link
                        key={`${item?.link}-${index}`}
                        href={`/products/${item.link}`}
                        style={{ fontSize: "1.1rem" }}
                      >
                        {item.name}
                      </Nav.Link>
                    ))}
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        <Nav className="">
          {isLoggedIn ? (
            <>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    className="py-2 d-flex justify-content-between"
                    style={{
                      fontSize: "1rem",
                      fontFamily: "unset",
                      borderBottom: "0.25rem",
                    }}
                  >
                    MY ACCOUNT
                    <FaUser size="20" className="my-0 mx-2" color="gray" />
                  </Accordion.Header>
                  <Accordion.Body>
                    <Nav>
                      <Nav.Link href="/profile">Profile</Nav.Link>
                      <Nav.Link href="/changepassword">
                        Change Password
                      </Nav.Link>
                      <Nav.Link href="/Order-History">Orders</Nav.Link>
                      <Nav.Link href="/PaymentOptions">
                        Payment Options
                      </Nav.Link>
                      <Nav.Link href="/RewardPoints">Reward Points</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Nav.Link
                href="/ContactUs"
                className="py-2 mx-4 d-flex justify-content-between"
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "unset",
                  borderBottom: "0.25rem",
                }}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                className="py-2 mx-4 d-flex justify-content-between"
                style={{
                  fontSize: "1rem",
                  fontFamily: "unset",
                  borderBottom: "0.25rem",
                }}
              >
                Log Out
                <FaSignOutAlt size="20" className="my-1" color="gray" />
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                href="/ContactUs"
                className="py-2 mx-4 d-flex justify-content-between"
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "unset",
                  borderBottom: "0.25rem",
                }}
              >
                Contact Us
              </Nav.Link>
            </>
          )}
        </Nav>

        <Row className="text-center my-2 mt-3">
          {footerLinks?.footer && (
            <div className="social-icons">
              <Link to={footerLinks.footer.facebook} target="_blank">
                <FaFacebook size={30} />
              </Link>
              <Link to={footerLinks.footer.twitter} target="_blank">
                <FaXTwitter size={30} />
              </Link>
              <Link to={footerLinks.footer.insta} target="_blank">
                <FaInstagram size={30} />
              </Link>
              <Link to="." target="_blank">
                <FaLinkedin size={30} />
              </Link>
            </div>
          )}
        </Row>
        <Row className="cpr fs-6 text-center mt-2 mb-1">
          <p>{footerLinks?.footer?.footer}</p>
        </Row>
      </div>
    </div>
  );
};

export default Sidebar;
