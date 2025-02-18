"use client"
import { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ProductType } from "@/components/types";
import { tssurl } from "@/app/port";
import ShopBanner from "@/components/shop/ShopBanner";
import Filters from "@/components/shop/Filters";
import ProductSearch from "@/components/shop/ProductSearch";
import Product from "@/components/shop/Product";
import { useParams } from "next/navigation";



const SubCategoryPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [sortOption, setSortOption] = useState<string>("Featured");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [MID, setMID] = useState<string | null>(null);

  
    const  {subcatagory}  = useParams<{ subcatagory: string }>();
console.log(subcatagory,"sdvkjbvsdkbv");

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
    setFilteredProducts([...products].sort(sortFunctions[sortOption] || (() => 0)));
  }, [products, sortOption, sortFunctions]);

  const handleSearch = (searchTerm: string) => {
    setFilteredProducts(
      searchTerm
        ? products.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [...products]
    );
  };

  return (
    <Container fluid>
      {/* <ShopBanner /> */}
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
