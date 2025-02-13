import Link from 'next/link';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';


interface OfferArea {
  image: { url: string };
  Title: string;
  Name: string;
  Offer: string;
  Subtitle: string;
  Subtitle1: string;
}

interface OfferProps {
  offerArea: OfferArea;
}

const Offer = ({
  offerArea: { image, Title, Name, Offer, Subtitle, Subtitle1 },
}: OfferProps) => {
  return (
    <Container fluid>
      <Row className="bg-light offer">
        <Col md={4} className="text-center mob-head">
          <Image src={image.url} fluid alt='kdshjcb' />
        </Col>
        <Col md={4} className="m-auto">
          <Card className="off-card">
            <h5>{Title}</h5>
            <h2>{Name}</h2>
            <div className="flex">
              <hr />
              <p>With</p>
              <hr />
            </div>
            <h1>{Offer}</h1>
            <h6>{Subtitle}</h6>
            <Link href={Subtitle1}>
              <Button variant="light">SHOP NOW</Button>
            </Link>
            <small>*Terms and Conditions apply</small>
          </Card>
        </Col>
        <Col md={4} className="text-end mt-auto mob-head">
          <Image src={image.url} fluid alt='dsvvds' />
        </Col>
      </Row>
    </Container>
  );
};

export default Offer;
