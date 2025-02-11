import { useCallback } from "react";
import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCircle, FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import tssurl from "../../port";

const Product = ({ product, isLiked, onToggleLike }) => {
  const thumbImgUrl = product.variants?.[0]?.ThumbImg?.[0];
  const colors = product.colors;
  const MID = localStorage.getItem("MID");
  const DiscountedPrice = (product.discount_type === 'Amount' ? (product.unit_price - product.discount) : (product.unit_price * product.discount) / 100)

  const toggleLike = useCallback(async () => {
    try {
      if (isLiked) {
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: MID, pid: product.pid },
        });
        toast.success("Removed from Wishlist");
      } else {
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: MID,
          pid: product.pid,
        });
        toast.success("Added to Wishlist");
      }
      onToggleLike(product.pid, !isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }, [product.pid, MID, isLiked, onToggleLike]);

  return (
    <Card className="product" >
      <div>
        {isLiked ? (
          <FaHeart
            className="heart"
            size="20px"
            onClick={toggleLike}
            style={{ color: "red" }}
          />
        ) : (
          <FaRegHeart className="heart" size="20px" onClick={toggleLike} />
        )}

        <Link to={`/productDetails/${product.pid}`}>
          <Card.Img src={thumbImgUrl} variant="top" fluid="true" />
          {product.rating > "4.5" && <Badge bg="light">TOP RATED</Badge>}
        </Link>
      </div>

      <Card.Body>
        <Link to={`/productDetails/${product.pid}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.product_name} ({product.category})</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h4" className="justify-start">
          <div>

          <span className="line-through text-gray-500" style={{ textDecoration: "line-through" }}>₹{product.unit_price}</span> <span>       </span>
          <span className="text-red-600  font-bold " style={{color:"red"}}>₹{product.unit_price - DiscountedPrice}</span>
          </div>

          <div>
            Reward Points :{product.reward_points}
          </div>
        </Card.Text>


        {/* <Card.Text as="div">
          {colors.map((color) => (
            <OverlayTrigger
              key={color.name}
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${color.name}`}>{color.name}</Tooltip>
              }
            >
              <span>
                <FaCircle size="20px" className="mx-1" color={color.value} />
              </span>
            </OverlayTrigger>
          ))}
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
