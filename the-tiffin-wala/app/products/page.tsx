import ProductsPage from "@/components/products/ProductsPage";
import { tssurl } from "../port";
import axios from "axios";


interface ProductType {
    pid: string;
    product_name: string;
    unit_price: number;
    category:string;
    draft: string;
    sub_category:string;
    size: { name: string }[];
    discount: number;
    discount_type: "Amount" | "Percentage";
    reward_points: number;
    rating: string;
    variants?: { ThumbImg?: string[] }[];
  }


const getalltheproducts = async () => {
    const response = await axios.get<ProductType[]>(`${tssurl}/productcat/products`);
    const filteredData = response.data.filter((item) => item.draft === "false");
    return filteredData;
}





export default async function Products() {

 
    
    const products = await getalltheproducts()
    
    // const getlikedproduct = await getLikedProducts(MID)

    return (
        <div>
            <ProductsPage products={products}  />
        </div>
    )
}