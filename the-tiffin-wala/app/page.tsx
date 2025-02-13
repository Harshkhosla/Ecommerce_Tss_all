import BestSellers from "@/components/home/BestSeller";
import Collection from "@/components/home/Collection";
import Grid from "@/components/home/Grid";
import NewsLetter from "@/components/home/NewsLetter";
import Offer from "@/components/home/Offer";
import axios from "axios";
import { tssurl } from "./port";
import Slider from "@/components/home/Slider";


const fetchData = async () => {
  try {
    const response = await axios.get(`${tssurl}/home`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${tssurl}/top3products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

const fetchfooter = async () => {
  try {
    const response = await axios.get(`${tssurl}/footer`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};


const fetchBanners = async () => {
  try {
    const response = await axios.get(`${tssurl}/banners`);
    return response.data.banners || [];

  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

export default async function Home() {
  const homeData = await fetchData()
  const productData = await fetchProducts()
  const footerData = await fetchfooter()
  const banners = await fetchBanners()
  
  return (
    < >
      < Slider bannerdata={banners}/>/
      <Offer offerArea={homeData?.OfferArea} />
      <Collection collectionArea={homeData?.CollectionArea} />
      <BestSellers bestseller={productData} />
      <Grid data={homeData.GridArea} />
      <NewsLetter data={footerData} />
    </>
  );
}
