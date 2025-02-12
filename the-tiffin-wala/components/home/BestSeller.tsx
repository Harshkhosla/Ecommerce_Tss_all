"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';

const BestSellers = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderCarouselItems = () => {
    if (!Array.isArray(data)) {
      return null;
    }

    return data.map((card, i) => (
      <Carousel.Item key={i} style={{ height: '35rem' }}>
        <Image src={card.variants[0].ThumbImg?.[0]} fluid />
        <p>{card.product_name}</p>
        <Link href={`/productDetails/${card.pid}`}>Shop Now</Link>
      </Carousel.Item>
    ));
  };

  return (
    <Container fluid>
      <div className="mob-head">
        <Row className="bestsellers">
          <h5>OUR BEST SELLERS HIGHLIGHTS</h5>
          {Array.isArray(data) &&
            data.map((card, index) => (
              <Col md={4} key={index}>
                <Image src={card.variants[0].ThumbImg?.[0]} fluid />
                <p>{card.product_name}</p>
                <Link href={`/productDetails/${card.pid}`}>Shop Now</Link>
              </Col>
            ))}
        </Row>
      </div>
      <div className="web-head">
        <div className="bestsellers">
          <h5>OUR BEST SELLERS HIGHLIGHTS</h5>
        </div>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          pause="hover"
          className="web-head bestsellers mt-0"
          style={{ marginBottom: '5rem' }}
        >
          {renderCarouselItems()}
        </Carousel>
      </div>
    </Container>
  );
};

export default BestSellers;
