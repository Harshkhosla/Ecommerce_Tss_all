"use client";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ProductType } from "@/components/types"; // Ensure correct import path

interface ProductSearchProps {
  products: ProductType[];
  onSearch: (searchTerm: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Row className="productsearch">
      <Col md="7">
        <Form onSubmit={handleSearch}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md="5">
        <ul>
          {products.map((product) => (
            <li key={product.pid}>{product.product_name}</li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default ProductSearch;
