"use client"
import { Carousel, Image } from "react-bootstrap";

interface Banner {
  banner_image: { url: string };
  banner_title: string;
  sub_title: string;
}


interface SliderProps {
  bannerdata: Banner[];
}

const Slider = ({bannerdata}:SliderProps) => {
  return ( 
    <Carousel pause="hover" className="mt-1">
      {bannerdata.map((bData, index) => (
        <Carousel.Item key={index}>
          <Image src={bData.banner_image.url} alt={`slider${index}`} fluid />
          <Carousel.Caption>
            <h2>{bData.banner_title}</h2>
            <p>{bData.sub_title}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
