"use client";

import { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";

const tssurl = "https://brand.mycarebilling.com/api/client"; 

const Slider = () => {
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${tssurl}/banners`);
      setBanners(response.data.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Carousel pause="hover" className="mt-1">
      {banners?.map((bData, index) => (
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
