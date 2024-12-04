import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Grid = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    image1,
    image2,
    image3,
    image4,
    title1,
    title2,
    title3,
    title4,
    link1,
    link2,
    link3,
    link4,
  } = data;

  const renderCarouselItems = () => {
    const carouselItems = [
      { image: image1, title: title1, link: link1 },
      { image: image2, title: title2, link: link2 },
      { image: image3, title: title3, link: link3 },
      { image: image4, title: title4, link: link4 },
    ];

    return carouselItems.map((item, index) => (
      <Carousel.Item key={index}>
        <img
          src={item.image?.url}
          alt={`carousel${index}`}
          className="d-block w-100"
        />
        <Carousel.Caption>
          <Link to={item.link}>
            <p className="gtitle">{item.title}</p>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  };

  return (
    <Container fluid className="grid">
      <h4 className="mob-head">More To Explore</h4>
      <Row key={1} className="mob-head">
        <Col md={5}>
          <Image src={image1?.url} fluid />
          <Link to={link1}>
            <p className="gtitle">{title1}</p>
          </Link>
        </Col>
        <Col md={7}>
          <Image src={image2?.url} fluid />
          <Link to={link2}>
            <p className="gtitle">{title2}</p>
          </Link>
        </Col>
      </Row>
      <Row key={2} className="mob-head">
        <Col md={7}>
          <Image src={image3?.url} fluid />
          <Link to={link3}>
            <p className="gtitle">{title3}</p>
          </Link>
        </Col>
        <Col md={5}>
          <Image src={image4?.url} fluid />
          <Link to={link4}>
            <p className="gtitle">{title4}</p>
          </Link>
        </Col>
      </Row>
      <Carousel pause="hover" className="web-head">
        {renderCarouselItems()}
      </Carousel>
    </Container>
  );
};

export default Grid;
