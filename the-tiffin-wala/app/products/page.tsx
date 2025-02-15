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


const getLikedProducts = async (MID: string | null): Promise<string[]> => {
    if (!MID) {
        console.warn("MID is missing, returning empty liked products.");
        return [];
    }

    try {
        const response = await axios.get<{ likedProducts: string[] }>(`${tssurl}/liked/liked-products/${MID}`);
        console.log(response, "sdvkjndsvkjnvs");

        return response.data.likedProducts.filter((item) => item !== null);
    } catch (error) {
        console.error("Error fetching liked products:", error);
        return [];
    }
};



export default async function Products() {

    let MID: string | null = null;
    if (typeof window !== "undefined") {
        MID = localStorage.getItem("MID");
    }
    const products = await getalltheproducts()
    const getlikedproduct = await getLikedProducts(MID)

    return (
        <div>
            <ProductsPage products={products} likedProducts={getlikedproduct} />
        </div>
    )
}