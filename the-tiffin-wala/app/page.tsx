import BestSellers from "@/components/home/BestSeller";
import Collection from "@/components/home/Collection";
import Grid from "@/components/home/Grid";
import NewsLetter from "@/components/home/NewsLetter";
import Offer from "@/components/home/Offer";
import Slider from "@/components/home/Slider";
import axios from "axios";


const tssurl = "https://brand.mycarebilling.com/api/client";

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
export default async function Home() {
  const homeData = await fetchData()
  const productData = await fetchProducts()
  const footerData = await fetchfooter()
  return (
    < >
      < Slider />
      <Offer data={homeData?.OfferArea} />
      <Collection data={homeData?.CollectionArea} />
      <BestSellers data={productData} />
      <Grid data={homeData.GridArea} />
      <NewsLetter data={footerData} />
    </>
  );
}
