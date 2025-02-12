
import { tssurl } from '@/app/port';
import Link from 'next/link';
import { Row, Col, Container } from 'react-bootstrap';



const Tags =  ({data}) => {
  console.log(data,"sachjbscv");
  

  return (
    <Container fluid className="tags">
      {/* <Row className="scrolling-row">
        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title1}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagdata.page1} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>

        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title2}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagdata.page2} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagdata.Title3}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagdata.page3} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Tags;
