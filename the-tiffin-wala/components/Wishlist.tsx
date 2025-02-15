'use client';

import { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { tssurl } from "@/app/port";

interface Product {
  _id: string;
  pid: string;
  product_name: string;
  unit_price: number;
  quantity_pi: number;
  variants?: { ThumbImg: string }[];
  colors: { value: string }[];
  size: { value: string }[];
  hovered?: boolean;
}

const WishlistPage: React.FC = () => {
  const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const MID = typeof window !== "undefined" ? localStorage.getItem("MID") : null;

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!MID) return;
      try {
        const response = await axios.get(`${tssurl}/liked/liked-products/${MID}`);
        const filteredLikedProducts = response.data.likedProducts.filter((id: string | null) => id !== null);
        const productDetails = await Promise.all(
          filteredLikedProducts.map(async (productId: string) => {
            const productResponse = await axios.get(`${tssurl}/productDetails/${productId}`);
            return productResponse.data;
          })
        );

        setLikedProducts(
          productDetails.map((product: Product) => ({ ...product, hovered: false }))
        );
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const handleMouseEnter = (index: number) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, hovered: true } : product))
    );
  };

  const handleMouseLeave = (index: number) => {
    setLikedProducts((prevProducts) =>
      prevProducts.map((product, i) => (i === index ? { ...product, hovered: false } : product))
    );
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!MID) return;
    try {
      const response = await axios.delete(`${tssurl}/liked/liked-products/delete`, {
        data: { mid: MID, pid: productId },
      });

      if (response.status === 200) {
        setLikedProducts((prevProducts) => prevProducts.filter((product) => product.pid !== productId));
      } else {
        console.error("Failed to delete product");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddtoCart = async (productID: string, color: string, size: string, price: number) => {
    if (!MID) return;
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
        router.push("/cart/carts");
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
          <Button onClick={()=>{router.push('/products')}} variant="primary">
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
                    <FaHeart className="icon heart-icon" size={24} color="red" />
                    <Link href={`/productDetails/${product.pid}`}>
                      <Card.Img
                        variant="top"
                        src={product.variants?.[0]?.ThumbImg}
                        className="image"
                      />
                    </Link>
                    {product.hovered && (
                      <div
                        className="add-to-cart"
                        onClick={() =>
                          handleAddtoCart(
                            product.pid,
                            product.colors[0].value,
                            product.size[0].value,
                            product.unit_price
                          )
                        }
                      >
                        Move to Cart
                      </div>
                    )}
                  </div>
                  <Card.Body className="p-0 mt-1">
                    <Card.Title as="div">
                      <strong className="text-dark mb-0 product-title">{product.product_name}</strong>
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
