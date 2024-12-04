import { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import tssurl from "../port";
import axios from "axios";
import ProductSearch from "../components/shop/ProductSearch";
import Product from "../components/shop/Product";
import ShopBanner from "../components/shop/ShopBanner";
import Filters from "../components/shop/Filters";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Featured");

  const [likedProducts, setLikedProducts] = useState([]);
  const MID = localStorage.getItem("MID");

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/liked/liked-products/${MID}`
        );
        const filteredLikedProducts = response.data.likedProducts.filter(
          (item) => item !== null
        );
        setLikedProducts(filteredLikedProducts);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, [MID]);

  const handleToggleLike = (productId, isLiked) => {
    if (isLiked) {
      setLikedProducts([...likedProducts, productId]);
    } else {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${tssurl}/productcat/products`);
      const filteredData = response?.data?.filter(item => item.draft === "false");
      setProducts(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortFunctions = useMemo(
    () => ({
      'Name A to Z': (a, b) => a.product_name.localeCompare(b.product_name),
      'Name Z to A': (a, b) => b.product_name.localeCompare(a.product_name),
      'Price Low to High': (a, b) => a.unit_price - b.unit_price,
      'Price High to Low': (a, b) => b.unit_price - a.unit_price,
    }),
    []
  );

  const filterFunctions = useCallback(() => {
    let sorted = [...products].sort(sortFunctions[sortOption] || (() => 0));
    setFilteredProducts(sorted);
  }, [products, sortFunctions, sortOption]);

  const handleSearch = (searchTerm) => {
    const filtered =
      searchTerm === ''
        ? [...products]
        : products.filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

    setFilteredProducts(filtered);
  };

  const handleSortChange = ({ target: { value } }) => {
    setSortOption(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterFunctions();
  }, [filterFunctions]);

  return (
    <Container fluid>
      <ShopBanner />
      <Row className="products">
        <Col md="2">
          <Filters
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </Col>
        <Col md="10" className="p-2">
          <Row>
            <Col md={9}>
              <ProductSearch products={products} onSearch={handleSearch} />
            </Col>
            <Col md={3} className="proselect">
              <span> Sort: </span>
              <select value={sortOption} onChange={handleSortChange}>
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

export default ProductsPage;
