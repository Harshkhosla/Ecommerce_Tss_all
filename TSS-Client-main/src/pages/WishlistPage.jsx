import { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import tssurl from "../port";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const MID = localStorage.getItem("MID");

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/liked/liked-products/${MID}`
        );
        const filteredLikedProducts = response.data.likedProducts.filter(
          (id) => id !== null
        );
        const productDetails = await Promise.all(
          filteredLikedProducts.map(async (productId) => {
            const productResponse = await axios.get(
              `${tssurl}/productDetails/${productId}`
            );
            return productResponse.data;
          })
        );

        setLikedProducts(
          productDetails.map((product) => ({ ...product, hovered: false }))
        );
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const handleMouseEnter = (index) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, hovered: true } : product
      )
    );
  };

  const handleMouseLeave = (index) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, hovered: false } : product
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${tssurl}/liked/liked-products/delete`,
        {
          data: { mid: MID, pid: productId },
        }
      );

      if (response.status === 200) {
        setLikedProducts((prevProducts) =>
          prevProducts.filter((product) => product.pid !== productId)
        );
      } else {
        console.error("Failed to delete product");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddtoCart = async (productID, color, size, price) => {
    try {
      const response = await axios.post(`${tssurl}/cart/carts`, {
        mid: MID,
        pid: productID,
        Quantity: 1,
        Size: size,
        Colour: color,
        price: price,
      });

      if (response.status === 200) {
        toast.success("Product added to cart");
        handleDeleteProduct(productID);
        navigate("/cart/carts");
      } else {
        console.error("Failed to add product to cart");
      }

    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <Container fluid>
      <div className="text-center fw-bold fs-3 my-3">Your Wishlist</div>
      {likedProducts.length === 0 ? (
        <div className="text-center">
          <p className="fs-3">is empty.....</p>
          <Button as={Link} to="/products" variant="primary">
            Shop Now
          </Button>
        </div>
      ) : (
        <Container>
          <Row className="g-4">
            {likedProducts.map((product, index) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="my-3 wishlist-card"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="card-container">
                    <FaTrash
                      className="icon trash-icon"
                      onClick={() => handleDeleteProduct(product.pid)}
                      size={24}
                      color="D3D3D3"
                    />
                    <FaHeart
                      className="icon heart-icon"
                      size={24}
                      color="red"
                    />
                    <Link to={`/productDetails/${product.pid}`}>
                      <Card.Img
                        variant="top"
                        src={product.variants?.[0]?.ThumbImg}
                        className="image"
                        fluid
                      />
                    </Link>
                    {product.hovered && (
                      <div
                        className="add-to-cart"
                        disabled={product.quantity_pi === 0}
                        onClick={() =>
                          handleAddtoCart(
                            product.pid,
                            product.colors[0].value,
                            product.size[0].value,
                            product.unit_price,
                          )
                        }
                      >
                        Move to Cart
                      </div>
                    )}
                  </div>
                  <Card.Body className="p-0 mt-1">
                    <Card.Title as="div">
                      <strong className="text-dark mb-0 product-title">
                        {product.product_name}
                      </strong>
                    </Card.Title>
                    <Card.Text>
                      <p className="mb-0 price">${product.unit_price}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default WishlistPage;
