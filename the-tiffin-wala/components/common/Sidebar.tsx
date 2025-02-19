"use client";
import { useState, useEffect } from "react";
import { Accordion, Nav, Row } from "react-bootstrap";
import { FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { tssurl } from "@/app/port";
import Login from "../auth/Login";

const Sidebar = ({ showNav, setShowNav, head, activeKey }) => {
  const [footerLinks, setFooterLinks] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // useEffect(() => {
  //   setIsLoggedIn(!!localStorage.getItem("authToken"));
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("MID");
    setIsLoggedIn(false);
    toast.success("Logout successfully");
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
          {!isLoggedIn ? <Login /> : null}
          <FaTimes onClick={() => setShowNav(false)} size="25" />
        </div>
        <hr className="my-0" />
        {head && (
          <Accordion defaultActiveKey={activeKey} flush>
            {head.map((menu) => (
              <Accordion.Item key={menu.MLink} eventKey={menu.MLink}>
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
        <Nav>
          {isLoggedIn ? (
            <>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="py-2">
                    MY ACCOUNT
                    <FaUser size="20" className="my-0 mx-2" color="gray" />
                  </Accordion.Header>
                  <Accordion.Body>
                    <Nav>
                      <Nav.Link href="/profile">Profile</Nav.Link>
                      <Nav.Link href="/changepassword">Change Password</Nav.Link>
                      <Nav.Link href="/Order-History">Orders</Nav.Link>
                      <Nav.Link href="/PaymentOptions">Payment Options</Nav.Link>
                      <Nav.Link href="/RewardPoints">Reward Points</Nav.Link>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Nav.Link href="/ContactUs" className="py-2 mx-4">
                Contact Us
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="py-2 mx-4">
                Log Out
                <FaSignOutAlt size="20" className="my-1" color="gray" />
              </Nav.Link>
            </>
          ) : (
            <Nav.Link href="/ContactUs" className="py-2 mx-4">
              Contact Us
            </Nav.Link>
          )}
        </Nav>

        <Row className="text-center my-2 mt-3">
          {footerLinks?.footer && (
            <div className="social-icons">
              {footerLinks.footer.facebook && (
                <a href={footerLinks.footer.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} />
                </a>
              )}
              {footerLinks.footer.twitter && (
                <a href={footerLinks.footer.twitter} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter size={30} />
                </a>
              )}
              {footerLinks.footer.insta && (
                <a href={footerLinks.footer.insta} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
              )}
              {footerLinks.footer.linkedin && (
                <a href={footerLinks.footer.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              )}
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
