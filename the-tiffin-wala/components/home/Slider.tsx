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

const Slider = ({ bannerdata }: SliderProps) => {
  return (
<>
  <Carousel pause="hover" className="mt-1">
    {bannerdata.map((bData, index) => (
      <Carousel.Item 
        key={index} 
        style={{ 
          height: "85vh",
          maxHeight: "900px"
        }}
        className="slider-item"
      >
        <Image 
          src={bData.banner_image.url} 
          alt={`slider${index}`} 
          fluid 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
          }} 
        />
        <Carousel.Caption>
          <h2 style={{ fontSize: "1.5rem" }}>{bData.banner_title}</h2> 
          <p style={{ fontSize: "1rem" }}>{bData.sub_title}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
</>
  );
};

export default Slider;
