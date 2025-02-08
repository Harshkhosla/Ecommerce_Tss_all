import {  useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBannersData } from '../../redux/counterSlice';

const Slider = () => {
  const dispatch = useDispatch()
  const  {banners}  = useSelector((state) => state.Store);

  useEffect(() => {
    dispatch(fetchBannersData())
  }, [dispatch]);

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
