"use client";

import Link from 'next/link';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';

type GridItem = {
  url: string;
};

type GridData = {
  image1?: GridItem;
  image2?: GridItem;
  image3?: GridItem;
  image4?: GridItem;
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  link4?: string;
};

type GridProps = {
  data?: GridData;
};

const Grid: React.FC<GridProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { image1, image2, image3, image4, title1, title2, title3, title4, link1, link2, link3, link4 } = data;

  const carouselItems = [
    { image: image1, title: title1, link: link1 },
    { image: image2, title: title2, link: link2 },
    { image: image3, title: title3, link: link3 },
    { image: image4, title: title4, link: link4 },
  ];

  return (
    <Container fluid className="grid">
      <h4 className="mob-head">More To Explore</h4>
      <Row key={1} className="mob-head">
        <Col md={5}>
          {image1?.url && <Image src={image1.url} alt='clothing' fluid />}
          {link1 && title1 && (
            <Link href={link1} passHref>
              <p className="gtitle">{title1}</p>
            </Link>
          )}
        </Col>
        <Col md={7}>
          {image2?.url && <Image src={image2.url} alt='clothing' fluid />}
          {link2 && title2 && (
            <Link href={link2} passHref>
              <p className="gtitle">{title2}</p>
            </Link>
          )}
        </Col>
      </Row>
      <Row key={2} className="mob-head">
        <Col md={7}>
          {image3?.url && <Image src={image3.url} alt='clothing' fluid />}
          {link3 && title3 && (
            <Link href={link3} passHref>
              <p className="gtitle">{title3}</p>
            </Link>
          )}
        </Col>
        <Col md={5}>
          {image4?.url && <Image src={image4.url} alt='clothing' fluid />}
          {link4 && title4 && (
            <Link href={link4} passHref>
              <p className="gtitle">{title4}</p>
            </Link>
          )}
        </Col>
      </Row>
      <Carousel pause="hover" className="web-head">
        {carouselItems.map((item, index) => (
          item.image?.url && item.link && item.title ? (
            <Carousel.Item key={index}>
              <Image src={item.image.url} alt={`carousel${index}`} className="d-block w-100" />
              <Carousel.Caption>
                <Link href={item.link} passHref>
                  <p className="gtitle">{item.title}</p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ) : null
        ))}
      </Carousel>
    </Container>
  );
};

export default Grid;
