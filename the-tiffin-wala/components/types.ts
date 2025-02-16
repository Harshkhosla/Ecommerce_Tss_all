export interface ProductType {
  pid: string;
  product_name: string;
  unit_price: number;
  category: string;
  sub_category: string;
  draft: string;
  discount: string;
  discount_type: "Amount" | "percentage";
  reward_points: string;
  rating: string;
  about: string;
  product_detail: string;
  quantity_pi: number;
  sales: number;
  refund: string | null;
  tags: string;
  sku: string;
  unit: string;
  variantEnabled: boolean;
  gallery_images: string[];
  colors: string[];
  size: string[];
  data: {
    average_rating: number;
    total_reviews: number;
    // review: any[];
  };
  discount_date: {
    start: string;
    end: string;
  };
  SEOArea: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    images1: string;
  };
  desc: string;
  fabric: string;
  fit: string;
  variants?: {
    variantId: number;
    color: string;
    size: string;
    isEnabled: boolean;
    price: string;
    quantity: string;
    ThumbImg?: string[];
    GalleryImg?: string[];
  }[];
}
