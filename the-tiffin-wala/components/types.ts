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
  SEOArea: SEOArea
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

export interface Product {
  pid: string;
  productName: string;
  unitAmount: number;
  quantity: number;
  reward_points: number;
  url: string;
}

export interface SEOArea {
  images1: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
}

export interface Info {
  _id: string;
  address: string;
  contactNo: string;
  email: string;
  officeAddress: string;
  phoneNo: string;
  SEOArea: SEOArea;
  __v: number;
}


export interface Order {
  oid: string;
  amount: number;
  payment_mode: string;
  delivery_status: string;
  date: string;
}

export interface Address {
  addressSelected: boolean;
  country: string;
  defaultAddress: boolean;
  landmark: string;
  zipcode: string;
  _id: string;
}


export interface User {
  address: {
    landmark: string[]; 
  };
  cart: CartItem[]; 
  cashback_points: number;
  data: {
    messages: string[]; 
  };
  email: string;
  likedProducts: Product[]; 
  mid: string;
  mobileNo: string;
  name: string;
  password: string;
  payment_history: number;
  purchased_items: number;
  reward_points: number;
  verificationToken: string;
  verified: boolean;
}


export interface CartItem {
  mid: string;
  pid: string;
  Quantity: number;
  reward_points:number;
  name: string;
  price: number;
  image?: string;
  url?: string;
  _id: string;
}