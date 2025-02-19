"use client"
import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import ShopTags from "../../components/common/Tags";
import { toast } from "react-toastify";
import axios from "axios";
import { tssurl } from "../port";
import Sidebar from "@/components/profile/Sidebar";
import { Info } from "@/components/types";

const Contact = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phn, setPhn] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState<Info>();

  const authToken = localStorage.getItem("authToken");
  const MID = localStorage.getItem("MID");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestData = {
      mid: MID,
      email: mail,
      contactNo: phn,
      name: name,
      message: message,
    };

    try {
      await axios.post(`${tssurl}/contacts/contact`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      toast.success("Message sent successfully");
      setMail("");
      setName("");
      setPhn("");
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${tssurl}/contacts/contact`);
      const result = await response.json();
      setInfo(result?.[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <Container fluid>
        <Row>
          {/* <ShopTags /> */}
        </Row>

        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-5">
            <h2 className="fw-bold">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="row py-3">
                <div className="col-md-5">
                  <p className="mb-2">Your Name</p>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="form-control form-control-lg border-success"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <p className="mt-3 mb-2">Your Email Address</p>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="form-control form-control-lg border-success"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                  <p className="mt-3 mb-2">Phone No.</p>
                  <input
                    type="tel"
                    placeholder="Enter phone no"
                    className="form-control form-control-lg border-success"
                    value={phn}
                    onChange={(e) => setPhn(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <p className="mb-2">Message</p>
                  <textarea
                    className="h-75 w-100 form-control border-success"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <Button type="submit" className="shadow-none mt-3 text-white px-3 rounded-0" style={{ backgroundColor: "orange" }}>
                    Submit
                  </Button>
                </div>
              </div>
            </form>

            <div className="d-flex mt-4 flex-wrap justify-content-between">
              <div className="col-md-8">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      className="gmap_iframe"
                      width="100%"
                      title="map"
                      src={`https://maps.google.com/maps?width=800&height=500&hl=en&q=${encodeURIComponent(info?.officeAddress || "Default Location")}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center">
                <div className="contact-container">
                  <div className="upper-div">
                    <h4 className="fw-bold">Contact Information</h4>
                    <hr />
                    <p><span className="fw-bold">Email:</span> {info?.email}</p>
                    <p><span className="fw-bold">Contact Number:</span> {info?.contactNo}</p>
                    <p><span className="fw-bold">Tel Number:</span> {info?.contactNo}</p>
                  </div>
                  <div className="lower-div mt-5">
                    <h4 className="fw-bold">Address</h4>
                    <hr />
                    <p><span className="fw-bold">Address:</span> {info?.address}</p>
                    <p><span className="fw-bold">Home Address:</span> {info?.officeAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
