import { useEffect } from 'react';
import Offer from '../components/home/Offer';
import Slider from '../components/home/Slider';
import Collection from '../components/home/Collection';
import BestSellers from '../components/home/BestSellers';
import Event from '../components/home/Event';
import Grid from '../components/home/Grid';
import NewsLetter from '../components/home/NewsLetter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooterData, fetchHomeData, fetchProductData } from '../redux/counterSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { footerData, homeData, productData, error ,statusproducts}  = useSelector((state) => state.Store);
  
  useEffect(() => {
    dispatch(fetchFooterData());
    dispatch(fetchHomeData());
    dispatch(fetchProductData());
  }, [dispatch]);

  if (statusproducts?.statusproducts==="loading") {
    return <div className='container'>
    ...loading
      </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="homee">
      <Slider />
      {homeData?.OfferArea ? <Offer data={homeData.OfferArea} /> : <p>Loading Offers...</p>}
      <Collection data={homeData?.CollectionArea} />
      <BestSellers data={productData} />
      <Event data={homeData.EventArea} />
      <Grid data={homeData.GridArea} />
      <NewsLetter data={footerData} />
    </div>
  );
};

export default HomePage;
