"use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Tabs,
//   Tab,
// } from "react-bootstrap";
// import { FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";
// import axios from "axios";
// import { addToCartAsync } from "@/redux/counterSlice";
// import { toast } from "react-toastify";
// // import { Helmet } from "react-helmet";
// import ProductsSlider from "@/components/shop/ProductSlider";
// import ProductGallery from "@/components/shop/ProductGallery";
// import Ratings from "@/components/common/Ratings";
// import Reviews from "@/components/shop/Reviews";
// import { tssurl } from "@/app/port";

const ProductDetailsPage = () => {
  // const { pid: productId } = useParams();
  // const router = useRouter();

  // const allProducts = useSelector((state) => state.Store.allproductdata);
  // const initialProduct = allProducts?.find((item) => item.pid === productId);
  
  // const [product, setProduct] = useState(initialProduct);
  // const [products, setProducts] = useState(allProducts);
  // const [qty, setQty] = useState(1);
  // const [loading, setLoading] = useState(!initialProduct);
  // const [likedProducts, setLikedProducts] = useState([]);
  
  // const mid = typeof window !== "undefined" ? localStorage.getItem("MID") : null;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!initialProduct) {
  //         const { data } = await axios.get(`${tssurl}/productDetails/${productId}`);
  //         setProduct(data);
  //       }
  //       const response = await axios.get(`${tssurl}/productcat/products`);
  //       const filteredData = response.data.filter((item) => item.draft === "false");
  //       setProducts(filteredData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const fetchLikedProducts = async () => {
  //     try {
  //       const response = await axios.get(`${tssurl}/liked/liked-products/${mid}`);
  //       setLikedProducts(response?.data.likedProducts.filter((id) => id !== null));
  //     } catch (error) {
  //       console.error("Error fetching liked products:", error);
  //     }
  //   };

  //   fetchData();
  //   fetchLikedProducts();
  // }, [productId, mid]);

  // const DiscountedPrice = product?.discount_type === "Amount"
  //   ? product?.unit_price - product?.discount
  //   : (product?.unit_price * product?.discount) / 100;

  // if (loading) return <div>Loading...</div>;

  // const handleQtyChange = (change) => {
  //   setQty((prevQty) => Math.max(1, Math.min(10, prevQty + change)));
  // };

  // const addToCartHandler = () => {
  //   if (!mid) {
  //     toast.error("User Account has not been created. Please Login");
  //     return;
  //   }
  //   dispatch(addToCartAsync({
  //     mid,
  //     pid: productId,
  //     Size: null,
  //     Colour: null,
  //     Quantity: qty,
  //     name: product?.product_name,
  //     price: product?.unit_price - DiscountedPrice,
  //     image: product?.variants?.[0]?.ThumbImg?.[0] || "",
  //   }));
  // };

  // const toggleLike = async () => {
  //   try {
  //     if (likedProducts.includes(product.pid)) {
  //       setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
  //       await axios.delete(`${tssurl}/liked/liked-products/delete`, {
  //         data: { mid, pid: product.pid },
  //       });
  //       toast.success("Removed from Wishlist");
  //     } else {
  //       setLikedProducts([...likedProducts, product.pid]);
  //       await axios.post(`${tssurl}/liked/liked-products/add`, { mid, pid: product.pid });
  //       toast.success("Added to Wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };

  return (
    <>
      {/* <Helmet>
        <title>{product?.SEOArea?.metaTitle || "Default Title"}</title>
        <meta name="description" content={product?.SEOArea?.metaDescription || "Default Description"} />
        <meta property="og:image" content={product?.SEOArea?.images1 || ""} />
      </Helmet>
      <Container>
        <p className="breadcrumb">
          <Link href="/" className="me-1">Home</Link> /
          <Link href="/products" className="mx-1">Products</Link> /
          <strong className="ms-1">{product?.product_name}</strong>
        </p>

        <Row className="product-details">
          <Col md={6}>
            <ProductGallery product={product} />
          </Col>
          <Col md={6}>
            <h3>{product?.product_name}</h3>
            <Row className="mt-2">
              <Col md={3}>
                <h5>₹{product?.unit_price - DiscountedPrice}</h5>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{product?.unit_price}
                </span>
              </Col>
              <Col md={3}>
                <Ratings value={parseFloat(product?.rating)} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h6 className="text-2xl pt-2" style={{ color: "green" }}>
                  Type of food* {product?.category}
                </h6>
                <h6 className="pt-2">Rewards Points* {product?.reward_points}</h6>
              </Col>
              <Col md={4}>
                <h6>Quantity*</h6>
                <div className="quantity-selector">
                  <Button variant="light" onClick={() => handleQtyChange(-1)}>
                    <FaMinus size={10} />
                  </Button>
                  <span className="mx-4">{qty}</span>
                  <Button variant="light" onClick={() => handleQtyChange(1)}>
                    <FaPlus size={10} />
                  </Button>
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
                  {likedProducts.includes(product?.pid) ? (
                    <FaHeart size="24" color="red" onClick={toggleLike} />
                  ) : (
                    <FaRegHeart size="24" color="black" onClick={toggleLike} />
                  )}
                </Button>
              </Col>
            </Row>

            <Tabs defaultActiveKey="details" id="fill-tab" className="mt-3 mb-2 prodTabs" fill>
              <Tab eventKey="details" title="Details">{product?.product_detail}</Tab>
              <Tab eventKey="about" title="About">{product?.about}</Tab>
            </Tabs>
          </Col>
        </Row>

        <Row>
          <h4 className="ms-2 mt-5 mb-4 fw-bold">Similar Products</h4>
          <ProductsSlider data={products} />
        </Row>
        <Reviews productID={product?.pid} />
      </Container> */}
      <div>sdkvjhbv</div>
    </>
  );
};

export default ProductDetailsPage;
