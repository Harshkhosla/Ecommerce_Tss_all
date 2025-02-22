import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { tssurl } from "@/app/port";
import { RootState } from "@/redux/store";
import { addQuantity, decreaseQuantity, getProductDataByPID, updateProductQuantityAsync } from "@/redux/counterSlice";

interface Product {
  Quantity: number;
  pid: string;
  name: string;
  url?: string;
  price: number;
}

interface CartProps {
  index: number;
  product: Product;
}

const CartCard: React.FC<CartProps> = ({ index, product }) => {
  const { pid, Quantity } = product;
  const mid = localStorage.getItem("MID") ?? ""; 
  const [likedProducts, setLikedProducts] = useState<string[]>([]); 
  const [quantity, setQuantity] = useState<number>(Quantity);

  const dispatch = useDispatch();
  // useEffect(()=>{
  //   setQuantity((prevQuantity) => prevQuantity + Quantity)
  // },[])

  const cartItems = useSelector((state: RootState) => state.counter.items) || []; 
  const productData = useSelector((state: RootState) => state.counter.productDataMap?.[pid]);

  const particularCardData: Product | undefined = cartItems[index]; 


  const updateQuantity = (updatedQuantity: number) => {
    if (particularCardData) {
       // @ts-expect-error sdsfwvfe
      dispatch(updateProductQuantityAsync({ data: { ...particularCardData, Quantity: updatedQuantity }, mid }));
    }
  };

  useEffect(() => {
    if (pid) {
       // @ts-expect-error sdsfwvfe
      dispatch(getProductDataByPID(pid));
    }
  }, [dispatch, pid]);

  const handleIncrease = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
      dispatch(addQuantity({pid,newQuantity}))
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
      dispatch(decreaseQuantity({pid,newQuantity}))
    }
  };
  const handleDelete = () => {
    // dispatch(deleteFromCart({ mid, pid }));
  };
  const toggleLike = async () => {
    try {
      if (likedProducts.includes(pid)) {
        setLikedProducts(likedProducts.filter((p) => p !== pid));
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid, pid },
        });
        toast.success("Removed from Wishlist");
        handleDelete();
      } else {
        setLikedProducts([...likedProducts, pid]);
        await axios.post(`${tssurl}/liked/liked-products/add`, { mid, pid });
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Card className="bg-light my-3">
      <Row>
        <Col md="3">
          <Image
            src={particularCardData?.url || "/placeholder.jpg"} // Fallback for undefined `url`
            alt="cart"
            fluid
            className="h-100"
          />
        </Col>
        <Col md="8" className="mx-2">
          <Row className="my-2">
            <Col>
              <h3>{particularCardData?.name || "Unknown Product"}</h3>
            </Col>
          </Row>
          <Row>
            <h5>₹{particularCardData?.price?.toFixed(2) || "0.00"}</h5>
            {productData?.unit_price && (
              <span style={{ textDecoration: "line-through", color: "red" }}>
                ₹{productData.unit_price}
              </span>
            )}
          </Row>
          <Row style={{ margin: "1rem 0" }}>
            <Col md="6" sm="6" className="p-0 d-flex">
              <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                Qty:
              </span>
              <div className="quantity-selector">
                <Button variant="light" onClick={handleDecrease} disabled={Quantity <= 1}>
                  <FaMinus size={10} />
                </Button>
                <span className="mx-3">{Quantity}</span>
                <Button variant="light" onClick={handleIncrease} disabled={Quantity >= 10}>
                  <FaPlus size={10} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="text-end me-4">
              <FaRegHeart
                className="heart me-1"
                size={20}
                onClick={toggleLike}
                style={{ cursor: "pointer", color: likedProducts.includes(pid) ? "red" : "black" }}
              />
              <span>Move to Wishlist</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CartCard;
