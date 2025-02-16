import { useState, useEffect } from "react";
import { Form, Card, Row, Col, Image, Button } from "react-bootstrap";
import { FaRegHeart, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFromCart,
// } from "../../redux/counterSlice";
import { tssurl } from "@/app/port";
import { RootState } from "@/redux/store";
import { getProductDataByPID, updateProductQuantityAsync } from "@/redux/counterSlice";

const CartCard = ({ index, product }) => {
  const { pid, Quantity } = product;
  const mid = localStorage.getItem("MID");
  const [likedProducts, setLikedProducts] = useState([]);
  const [quantity, setQuantity] = useState(Quantity);

  const dispatch = useDispatch();
  // const productData = useSelector((state) => state.Store.productDataMap[pid]) || {};
    const cartItems = useSelector((state: RootState) => state.counter.items);
    const productData = useSelector((state: RootState) => state.counter.productDataMap);
    console.log(productData,"xkvjhsbvskjbvs");
    
  const particularcarddata = cartItems[index] || {};



  const DiscountedPrice =
    productData?.discount_type === "Amount"
      ? particularcarddata?.price - productData?.discount
      : particularcarddata?.price - ( (productData?.unit_price ) * productData?.discount )/100;


  const updateQuantity = (updatedQuantity:number) => {
    dispatch(updateProductQuantityAsync({ data: { ...data, Quantity: updatedQuantity }, mid }));
  };

  useEffect(() => {
    dispatch(getProductDataByPID(pid));
  }, [dispatch, pid]);

  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      updateQuantity(quantity + 1);
    }

    
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQuantity(quantity - 1);
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
            src={particularcarddata.url}
            alt="cart"
            fluid
            className="h-100"
          />
        </Col>
        <Col md="8" className="mx-2">
          <Row className="my-2">
            <Col>
              <h3>{particularcarddata.name}</h3>
            </Col>
          </Row>
          <Row>
            <h5>₹{DiscountedPrice.toFixed(2)}</h5>
            <span style={{ textDecoration: "line-through", color: "red" }}>
              ₹{particularcarddata.price}
            </span>
          </Row>
          <Row style={{ margin: "1rem 0" }}>
            <Col md="6" sm="6" className="p-0 d-flex">
              <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                Qty :
              </span>
              <div className="quantity-selector">
                <Button variant="light" onClick={handleDecrease}>
                  <FaMinus size={10} />
                </Button>
                <span className="mx-3">{quantity}</span>
                <Button variant="light" onClick={handleIncrease}>
                  <FaPlus size={10} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="text-end me-4">
              <FaRegHeart
                className="heart me-1"
                size="20"
                onClick={() => {
                  toggleLike();
                  handleDelete();
                }}
              />
              <span>Move to wishlist</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CartCard;
