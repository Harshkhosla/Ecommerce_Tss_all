"use client";
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "@/components/shop/Product";
import Filters from "../shop/Filters";
import ProductSearch from "../shop/ProductSearch";

// Define Types
interface ProductType {
  pid: string;
  product_name: string;
  unit_price: number;
  draft: string;
  sub_category:string;
  category:string;
  size: { name: string }[];
  discount: number;
  discount_type: "Amount" | "Percentage";
  reward_points: number;
  rating: string;
  variants?: { ThumbImg?: string[] }[];
}

interface ProductsPageProps {
  products: ProductType[];
  likedProducts: string[];
}
const ProductsPage: React.FC<ProductsPageProps> = ({ products, likedProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [userLikedProducts, setUserLikedProducts] = useState<string[]>(likedProducts);
  const [sortOption, setSortOption] = useState<string>("Featured");

  const handleToggleLike = (productId: string, isLiked: boolean) => {
    setUserLikedProducts((prev) =>
      isLiked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const sortFunctions = useMemo(
    () => ({
      "Name A to Z": (a: ProductType, b: ProductType) => a.product_name.localeCompare(b.product_name),
      "Name Z to A": (a: ProductType, b: ProductType) => b.product_name.localeCompare(a.product_name),
      "Price Low to High": (a: ProductType, b: ProductType) => a.unit_price - b.unit_price,
      "Price High to Low": (a: ProductType, b: ProductType) => b.unit_price - a.unit_price,
    }),
    []
  );

  useEffect(() => {
    setFilteredProducts([...products].sort(sortFunctions[sortOption as keyof typeof sortFunctions] || (() => 0)));
  }, [products, sortOption, sortFunctions]);
  

  // Search Filter
  const handleSearch = (searchTerm: string) => {
    setFilteredProducts(
      searchTerm
        ? products.filter((product) => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
        : products
    );
  };

  return (
    <Container fluid>
      <Row className="products">
        <Col md="2">
          <Filters products={products} setFilteredProducts={setFilteredProducts} />
        </Col>
        <Col md="10" className="p-2">
          <Row>
            <Col md={9}>
              <ProductSearch products={products} onSearch={handleSearch} />
            </Col>
            <Col md={3} className="proselect">
              <span> Sort: </span>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                {Object.keys(sortFunctions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

            <Row>
              {filteredProducts.map((product) => (
                <Col key={product.pid} sm={6} md={4} lg={4} xl={4}>
                  <Product
                    product={product}
                    isLiked={userLikedProducts?.includes(product.pid)}
                    onToggleLike={handleToggleLike}
                  />
                </Col>
              ))}
            </Row>

        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
