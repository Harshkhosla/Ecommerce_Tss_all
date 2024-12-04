import { useState, useEffect } from "react";
import { Form, Card, Row, Col, Image, Button } from "react-bootstrap";
import { FaRegHeart, FaHeart, FaCircle, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import tssurl from "../../port";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDataByPID,
  deleteFromCart,
  updateQuantityInCart,
  updateProductQuantityAsync,
} from "../../redux/counterSlice";

const CartCard = ({ index, product }) => {
  const { pid, Colour, Size, Quantity } = product;
  const mid = localStorage.getItem("MID");
  const [likedProducts, setLikedProducts] = useState([]);
  const [quantity, setQuantity] = useState(Quantity);

  //new
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.Store.productDataMap[pid]);
  const { product_name, unit_price, variants, size } = productData || {};

  const cartItems = useSelector((state) => state.Store.cartItems[0]);
  const data = useSelector((state) => state.Store.cartItems[0][index]);

  const updateQuantityInCart1 = (updatedQuantity) => {
    dispatch(updateQuantityInCart({ index, quantity: updatedQuantity }));
  };
  useEffect(() => {
    dispatch(updateProductQuantityAsync({ data, mid }))
  }, [updateQuantityInCart1])
  const handleIncrease = () => {
    const updatedQuantity = Math.min(10, quantity + 1);
    setQuantity(updatedQuantity)
    updateQuantityInCart1(updatedQuantity);
  };

  const handleDecrease = () => {
    const updatedQuantity = Math.max(1, quantity - 1);
    setQuantity(updatedQuantity)
    updateQuantityInCart1(updatedQuantity);
  };

  useEffect(() => {
    dispatch(getProductDataByPID(pid));
  }, [dispatch, pid]);

  const handleDelete = (mid, pid) => {
    dispatch(deleteFromCart(mid, pid));
  };

  const toggleLike = async () => {
    try {
      if (likedProducts.includes(product.pid)) {
        setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: mid, pid: product.pid },
        });
        toast.success("Removed from Wishlist");
      } else {
        setLikedProducts([...likedProducts, product.pid]);
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: mid,
          pid: product.pid,
        });
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const cartItem = cartItems.find((item) => item.pid === pid);
  const quantityInCart = cartItem ? cartItem.Quantity : 0;

  return (
    <Card className="bg-light my-3">
      <Row>
        <Col md="3">
          <Image
            src={variants?.[0]?.ThumbImg?.[0]}
            alt="cart"
            fluid
            className="h-100"
          />
        </Col>
        <Col md="8" className="mx-2">
          <Row className="my-2">
            <Col>
              <h3>{product_name}</h3>
            </Col>
          </Row>
          <Row>
            <h5>$ {unit_price}</h5>
          </Row>
          <Row>
            <h6 className="mt-2">
              Color:{" "}
              <span>
                <FaCircle size="25px" className="mx-1" color={Colour} />
              </span>
            </h6>
          </Row>
          <Row style={{ margin: "1rem 0" }}>
            <Col md="4" sm='6' className="p-0 d-flex">
              <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                Size :
              </span>
              <Form.Select
                style={{
                  width: "3.5rem",
                  padding: "0",
                  paddingLeft: "0.2rem",
                  boxShadow: "none",
                  border: "none",
                }}
              >
                {Size ? <option>{Size}</option> : null}
                {size?.map((size) => (
                  <option key={size.id}>{size.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md="6" sm='6' className="p-0 d-flex">
              <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                Qty :
              </span>
              <div className="quantity-selector">
                <Button variant="light" onClick={handleDecrease}>
                  <FaMinus size={10} />
                </Button>
                <span className="mx-3">{quantityInCart}</span>
                <Button variant="light" onClick={handleIncrease}>
                  <FaPlus size={10} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mb-2 ">
            <Col className="text-end me-4">
              {/* {likedProducts.includes(product.pid) ? (
                <FaHeart
                  className="heart me-1"
                  size="20"
                  onClick={toggleLike}
                  style={{ color: "red" }}
                />
              ) : ( */}
              <FaRegHeart
                className="heart me-1"
                size="20"
                onClick={() => {
                  toggleLike();
                  handleDelete(mid, pid);
                }}
              />
              {/* )} */}
              <span>Move to wishlist</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CartCard;
