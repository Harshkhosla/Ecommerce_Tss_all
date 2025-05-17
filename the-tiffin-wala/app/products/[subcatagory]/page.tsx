"use client";

import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useParams } from "next/navigation";
import { tssurl } from "@/app/port";
import Filters from "@/components/shop/Filters";
// import ProductSearch from "@/components/shop/ProductSearch";
import Product from "@/components/shop/Product";
import ShopBanner from "@/components/shop/ShopBanner";
import { FaFilter } from "react-icons/fa"; // Importing an icon from react-icons

interface ProductType {
  pid: string;
  product_name: string;
  unit_price: number;
  draft: string;
  sub_category: string;
  category: string;
  size: { name: string }[];
  discount: number;
  discount_type: "Amount" | "Percentage";
  reward_points: number;
  rating: string;
  variants?: { ThumbImg?: string[] }[];
}

const SubCategoryPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [sortOption, setSortOption] = useState<string>("Featured");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [MID, setMID] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false); // State to manage dropdown visibility

  const { subcatagory } = useParams<{ subcatagory: string }>();
  
  useEffect(() => {
    setMID(localStorage.getItem("MID"));
  }, []);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!MID) return;
      try {
        const response = await axios.get(`${tssurl}/liked/liked-products/${MID}`);
        const filteredLikedProducts = response.data.likedProducts.filter(
          (item: string | null) => item !== null
        );
        setLikedProducts(filteredLikedProducts);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const fetchData = useCallback(async () => {
    if (!subcatagory) return;
    try {
      const response = await axios.get(`${tssurl}/productDetails/similars/${subcatagory}`);
      const filteredData = response?.data?.filter((item: ProductType) => item.draft === "false");
      setProducts(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [subcatagory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleLike = useCallback((productId: string, isLiked: boolean) => {
    setLikedProducts((prevLiked) =>
      isLiked ? [...prevLiked, productId] : prevLiked.filter((id) => id !== productId)
    );
  }, []);

  const sortFunctions: Record<string, (a: ProductType, b: ProductType) => number> = {
    "Name A to Z": (a, b) => a.product_name.localeCompare(b.product_name),
    "Name Z to A": (a, b) => b.product_name.localeCompare(a.product_name),
    "Price Low to High": (a, b) => a.unit_price - b.unit_price,
    "Price High to Low": (a, b) => b.unit_price - a.unit_price,
  };
  
  useEffect(() => {
    setFilteredProducts([...products].sort(sortFunctions[sortOption] || (() => 0)));
  }, [products ,sortOption]);
  


  // const handleSearch = (searchTerm: string) => {
  //   setFilteredProducts(
  //     searchTerm
  //       ? products.filter((product) =>
  //           product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  //         )
  //       : [...products]
  //   );
  // };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <Container fluid>
       <ShopBanner />
      <Row className="products">
        <Col md="2" className="d-none d-md-block">
          <Filters products={products} setFilteredProducts={setFilteredProducts} />
        </Col>

        <Col xs="12" className="d-md-none mb-3">
          <Dropdown show={showFilters} onToggle={toggleFilters}>
            <Dropdown.Toggle
              variant="light"
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={toggleFilters} 
            >
              <FaFilter className="me-2" />
              Filters
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 p-3">
              <Filters products={products} setFilteredProducts={setFilteredProducts} />
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Product list */}
        <Col md="10" className="p-2">
          <Row>
            <Col md={9}>
              {/* <ProductSearch products={products} onSearch={handleSearch} /> */}
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
                  isLiked={likedProducts.includes(product.pid)}
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

export default SubCategoryPage;
