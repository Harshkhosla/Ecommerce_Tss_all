import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Sidebar from "../components/profile/Sidebar";
import ShopTags from "../components/common/Tags";
import { toast } from "react-toastify";
import tssurl from "../port";
import axios from "axios";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phn, setPhn] = useState("");
  const [message, setMessage] = useState("");

  const authToken = localStorage.getItem("authToken");
  const MID = localStorage.getItem("MID");
  const [Info, setInfo] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      mid: MID,
      email: mail,
      contactNo: phn,
      name: name,
      message: message,
    };

    try {
      const response = await axios.post(`${tssurl}/contacts/contact`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });

      toast.success("Message send Successfully")
      setMail('');
      setName('');
      setPhn('');
      setMessage('');
    } catch (err) {
      console.log(err);

    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${tssurl}/contacts/contact`);
      const result = await response.json();
      setInfo(result?.[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

      <Helmet>
        <title>{Info?.SEOArea?.metaTitle || 'Contact Us'}</title>
        <meta name="description" content={Info?.SEOArea?.metaDescription || 'Contact us for more details'} />
        <meta name="keywords" content={Info?.SEOArea?.metaKeywords || 'contact, support, help'} />
        <meta property="og:image" content={Info?.SEOArea?.images1 || ''} />
      </Helmet>
      <Container fluid>
        <Row>
          <ShopTags />
        </Row>

        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-5">
            <h2 className="fw-bold">Get in Touch</h2>

            <form onSubmit={handleSubmit}>
              <div className="row py-3">
                <div></div>
                <div className="col-md-5">
                  <p className="mb-2">Your name</p>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="form-control form-control-lg border-success"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="mt-3 mb-2">Your email address</p>
                  <input
                    type="text"
                    placeholder="Enter email address"
                    className="form-control form-control-lg border-success"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <p className="mt-3 mb-2">Phone No.</p>
                  <input
                    type="text"
                    placeholder="Enter phone no"
                    className="form-control form-control-lg border-success"
                    value={phn}
                    onChange={(e) => setPhn(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <p className="mb-2">Message</p>
                  <textarea
                    className="h-75 w-100 form-control border-success"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <Button
                    className="shadow-none mt-3 text-white px-3 rounded-0"
                    variant="contained"
                    style={{
                      backgroundColor: "orange",
                      color: "#fff",
                    }}
                    size="large"
                    onClick={handleSubmit}
                  >
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
                      src={`https://maps.google.com/maps?width=800&height=500&hl=en&q=${encodeURIComponent(Info?.officeAddress || "Default Location")}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center ">
                <div class="contact-container">
                  <div class="upper-div">
                    <h4 className="fw-bold">Contact Information</h4>
                    <hr />
                    <p>
                      <span className="fw-bold">Email:</span> {Info?.email}
                    </p>
                    <p>
                      <span className="fw-bold">Contact Number:</span>{" "}
                      {Info?.contactNo}
                    </p>
                    <p>
                      <span className="fw-bold">Tel Number:</span>    {Info?.contactNo}
                    </p>
                  </div>
                  <div class="lower-div mt-5">
                    <h4 className="fw-bold">Address</h4>
                    <hr />
                    <p>
                      {" "}
                      <span className="fw-bold">Address: </span>{Info?.address}
                    </p>
                    <p>
                      <span className="fw-bold">Home Address:</span> {Info?.officeAddress}
                    </p>
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
