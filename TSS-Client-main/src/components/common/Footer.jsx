import { useState, useEffect } from 'react';
import { Nav, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import tssurl from '../../port';
import Support from '../support/support';

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${tssurl}/footer`);
        const data = await res.json();
        setFooterLinks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="mob-head">
        <footer className="bg-light pt-5 mt-0">
          <Support />
          <Container>
            <Row>
              <Col md="2">
                <h4>Home</h4>
                {footerLinks?.footer?.QuickLinks?.slice(0, 4)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Col>
              <Col md="3">
                <h4>Policies</h4>
                {footerLinks?.footer?.QuickLinks?.slice(4, 8)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Col>
              <Col md="2">
                <h4>Help Center</h4>
                {footerLinks?.footer?.QuickLinks?.slice(8)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Col>
              <Col md="2"></Col>
              <Col md="3">
                <h4>Follow Us On Social Media</h4>
                {footerLinks?.footer && (
                  <div className="social">
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
              </Col>
            </Row>
            <Row className="cpr fs-6">
              <p>{footerLinks?.footer?.footer}</p>
            </Row>
          </Container>
        </footer>
      </div>
      <div className="web-head">
        <footer>
          <Support />
          <Container className="px-3">
            <Tabs
              defaultActiveKey="tss"
              id="fill-tab"
              className="prodTabs footTabs my-2"
              fill
            >
              <Tab eventKey="tss" title="TSS" style={{ textAlign: 'start' }}>
                {footerLinks?.footer?.QuickLinks?.slice(0, 4)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Tab>
              <Tab
                eventKey="policies"
                title="Policies"
                style={{ textAlign: 'start' }}
              >
                {footerLinks?.footer?.QuickLinks?.slice(4, 8)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Tab>
              <Tab
                eventKey="Help Center"
                title="Help Center"
                style={{ textAlign: 'start' }}
              >
                {footerLinks?.footer?.QuickLinks?.slice(8)?.map(
                  (item, index) => (
                    <h5 key={index}>
                      <Nav.Link href={item.page}>{item.Name}</Nav.Link>
                    </h5>
                  )
                )}
              </Tab>
            </Tabs>
            <Row className="cpr fs-6">
              <p>{footerLinks?.footer?.footer}</p>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default Footer;
