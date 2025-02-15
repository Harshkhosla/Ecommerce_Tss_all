import { tssurl } from "@/app/port";
import ProductDetailsPage from "@/components/products/ProductDetailsPage";
import { ProductType } from "@/components/types";
import axios from "axios";




const getAllProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get<ProductType[]>(`${tssurl}/productcat/products`);
    const filteredData = response.data.filter((item) => item.draft === "false");
    return filteredData;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};


export default async function ProductDetail() {
  const products = await getAllProducts();

  return (
    <div>
      <ProductDetailsPage products={products} />
    </div>
  );
}
