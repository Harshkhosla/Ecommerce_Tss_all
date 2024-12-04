import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tssurl from '../../port';

const Tags = () => {
  const [tagdata, setTagData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/auth/promocode`);
        const result = await response.json();
        setTagData(result);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Container fluid className="tags">
      <Row className="scrolling-row">
        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title1}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link to={tagdata.page1} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>

        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title2}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link to={tagdata.page2} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title3}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link to={tagdata.page3} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;
