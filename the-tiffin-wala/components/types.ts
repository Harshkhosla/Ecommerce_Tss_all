export interface ProductType {
    pid: string;
    product_name: string;
    unit_price?: number | undefined;
    category: string;
    draft: string;
    sub_category: string;
    size: { name: string }[];
    discount: number;
    discount_type: "Amount" | "Percentage";
    reward_points: number;
    rating: number;
    about:string;
    product_detail:string;
    variants?: { ThumbImg?: string[]; GalleryImg?: string[] }[];
  }