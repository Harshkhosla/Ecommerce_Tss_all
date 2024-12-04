import { Container, Row, Col, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Looks = ({ data }) => {
  let cardslide = {
    dots: false,
    infinite: true,
    speed: 750,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1250,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: (
      <div className="custom-prev-arrow">
        <button className="rounded-pill btn btn-light home-slide-btn">
          <FaChevronLeft />
        </button>
      </div>
    ),
    nextArrow: (
      <div className="custom-next-arrow">
        <button className="rounded-pill btn btn-light home-slide-btn">
          <FaChevronRight />
        </button>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1199.5,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992.5,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 567.5,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          arrows: false,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: function (i) {
      return <div>{i + 1}</div>;
    },
  };

  return (
    <Container fluid>
      <Row className="main-slide">
        <Slider {...cardslide}>
          {data?.[0]?.map((item, index) => (
            <Col md={2} xs={4} key={index}>
              <Container className="my-3">
                <p className="mb-1">{index + 1}</p>
                {item?.thumbnail && (
                  <Image
                    className="w-100"
                    style={{ height: '20rem' }}
                    src={item.thumbnail.url}
                    alt={`Thumbnail ${index}`}
                  />
                )}
              </Container>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export const LooksData = ({ data }) => {
  return (
    <>
      <Row className="looksdata">
        {data?.[0]?.map((item, index) => (
          <Col md={3} xs={6}>
            <Container className="my-3" key={index}>
              <p className="mb-1">{index + 1}</p>
              {item?.thumbnail && (
                <Image
                  className="w-100"
                  src={item.thumbnail.url}
                  alt={`Thumbnail ${index}`}
                />
              )}
            </Container>
          </Col>
        ))}
      </Row>
    </>
  );
};
