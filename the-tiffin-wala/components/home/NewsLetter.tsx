"use client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

interface FooterData {
  Title?: string;
  Subtitle?: string;
}

interface NewsLetterProps {
  data?: {
    footer?: FooterData;
  };
}

const NewsLetter: React.FC<NewsLetterProps> = ({ data }) => {
  return (
    <Container fluid>
      <Row className="newsletter">
        <Col md="6">
          <h4>{data?.footer?.Title}</h4>
          <h5>{data?.footer?.Subtitle}</h5>
        </Col>
        <Col md="6">
          <Form.Group controlId="formNews" className="d-flex">
            <Form.Control type="email" placeholder="Email Id" />
            <Button variant="dark" size="lg">
              Subscribe
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsLetter;
