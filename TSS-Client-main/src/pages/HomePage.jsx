import { useEffect, useState } from 'react';
import axios from 'axios';
import tssurl from '../port';
import Offer from '../components/home/Offer';
import Slider from '../components/home/Slider';
import Collection from '../components/home/Collection';
import BestSellers from '../components/home/BestSellers';
import Event from '../components/home/Event';
import Grid from '../components/home/Grid';
import NewsLetter from '../components/home/NewsLetter';

const HomePage = () => {
  const [sample, setSample] = useState({
    footerData: {},
    homeData: {},
    product: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${tssurl}/footer`);
        setSample((prevState) => ({
          ...prevState,
          footerData: response1.data,
        }));
      } catch (error) {
        setError(error.message || 'An error occurred');
      }

      try {
        const response2 = await axios.get(`${tssurl}/home`);
        setSample((prevState) => ({ ...prevState, homeData: response2.data }));
      } catch (error) {
        setError(error.message || 'An error occurred');
      }

      try {
        const response3 = await axios.get(`${tssurl}/top3products`);
        setSample((prevState) => ({ ...prevState, product: response3.data }));
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="homee">
      <Slider />
      <Offer data={sample.homeData.OfferArea} />
      <Collection data={sample.homeData.CollectionArea} />
      <BestSellers data={sample.product} />
      <Event data={sample.homeData.EventArea} />
      <Grid data={sample.homeData.GridArea} />
      <NewsLetter data={sample.footerData} />
    </div>
  );
};

export default HomePage;
