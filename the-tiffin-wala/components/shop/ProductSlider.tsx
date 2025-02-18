import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, } from "react-icons/fa";
import Link from "next/link";

const ProductsSlider = ({ data }) => {
  const  cardslide = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992.5,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 567.5,
        settings: {
          centerMode: true,
          slidesToShow: 1,
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
          {data.map((item, index) => (
            <Col key={index} className="mb-4">
              <Card>
                <Link href={`/productDetails/${item.pid}`}>
                  <Image
                    src={item?.variants?.[0]?.ThumbImg}
                    alt={item?.sub_category}
                    className="card-image "
                  />
                </Link>
                <Card.Title className="card-heading pb-3 fw-semibold">
                  {item?.sub_category}
                </Card.Title>
              </Card>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default ProductsSlider;
