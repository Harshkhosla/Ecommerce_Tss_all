"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ProductsSlider from "@/components/shop/ProductSlider";
import ProductGallery from "@/components/shop/ProductGallery";
import Ratings from "@/components/common/Ratings";
// import Reviews from "@/components/shop/Reviews";
import { tssurl } from "@/app/port";
import { ProductType } from "../types";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "@/redux/counterSlice";



interface ProductDetailsProps {
  products: ProductType[];
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({ products }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { pid: productId } = useParams<{ pid: string }>();
  const [product, setProduct] = useState<ProductType | null>(
    products.find((item) => item.pid === productId) || null
  );
  const [qty, setQty] = useState(1);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const mid = typeof window !== "undefined" ? localStorage.getItem("MID") : null;

  useEffect(() => {
    setProduct(products.find((item) => item.pid === productId) || null);
  }, [productId, products]);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!mid) return;
      try {
        const response = await axios.get<{ likedProducts: string[] }>(`${tssurl}/liked/liked-products/${mid}`);
        setLikedProducts(response.data.likedProducts.filter((id) => id !== null));
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, [productId, mid]);
  console.log(product, "sdjvhbvjsbvdshvhjvb");

  const discountedPrice =
    product
      ? product.discount_type === "Amount"
        ? product.unit_price - Number(product.discount)
        : product.unit_price * (1 - Number(product.discount) / 100)
      : 0;


  const handleQtyChange = (change: number) => {
    setQty((prevQty) => Math.max(1, Math.min(10, prevQty + change)));
  };

  const addToCartHandler = () => {
    if (!mid) {
      toast.error("User Account has not been created. Please Login");
      return;
    }
    const data = {
      mid: mid,
      pid: productId,
      Quantity: qty,
      name: product?.product_name,
      price: discountedPrice,
      image: product?.variants?.[0]?.GalleryImg?.[0] || "",
    };
    dispatch(addToCartAsync({ mid, data: data }));
    router.push('/cart')
  };

  const toggleLike = async () => {
    if (!mid || !product) return;

    try {
      if (likedProducts.includes(product.pid)) {
        setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
        await axios.delete(`${tssurl}/liked/liked-products/delete`, { data: { mid, pid: product.pid } });
        toast.success("Removed from Wishlist");
      } else {
        setLikedProducts([...likedProducts, product.pid]);
        await axios.post(`${tssurl}/liked/liked-products/add`, { mid, pid: product.pid });
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Container>
      <p className="breadcrumb">
        <Link href="/" className="me-1">Home</Link> /
        <Link href="/products" className="mx-1">Products</Link> /
        <strong className="ms-1">{product?.product_name}</strong>
      </p>

      <Row className="product-details">
        <Col md={6}>
          {product ? <ProductGallery product={product} /> : <p>Loading...</p>}
        </Col>
        <Col md={6}>
          <h3>{product?.product_name}</h3>
          <Row className="mt-2">
            <Col md={3}>
              <h5>₹{discountedPrice}</h5>
              <span style={{ textDecoration: "line-through", color: "red" }}>₹{product?.unit_price}</span>
            </Col>
            <Col md={3}>
              <Ratings value={Number(product?.rating) || 0} />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h6 style={{ color: "green" }}>Type of food: {product?.category}</h6>
              <h6>Rewards Points: {product?.reward_points}</h6>
            </Col>
            <Col md={4}>
              <h6>Quantity</h6>
              <div className="quantity-selector">
                <Button variant="light" onClick={() => handleQtyChange(-1)}><FaMinus size={10} /></Button>
                <span className="mx-4">{qty}</span>
                <Button variant="light" onClick={() => handleQtyChange(1)}><FaPlus size={10} /></Button>
              </div>
            </Col>
          </Row>

          <Row className="cart-list">
            <Col md={5}>
              <Button variant="dark" className="btn-block p-2 w-100" onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="light" className="btn-block py-2 w-75">
                {likedProducts.includes(product?.pid ?? "") ? (
                  <FaHeart size="24" color="red" onClick={toggleLike} />
                ) : (
                  <FaRegHeart size="24" color="black" onClick={toggleLike} />
                )}
              </Button>
            </Col>
          </Row>

          <Tabs defaultActiveKey="details" className="mt-3 mb-2">
            <Tab eventKey="details" title="Details">{product?.product_detail}</Tab>
            <Tab eventKey="about" title="About">{product?.about}</Tab>
          </Tabs>
        </Col>
      </Row>

      <Row>
        <h4 className="ms-2 mt-5 mb-4 fw-bold">Similar Products</h4>
        <ProductsSlider data={products} />
      </Row>
      {/* <Reviews productID={product?.pid} /> */}
    </Container>
  );
};

export default ProductDetailsPage;
