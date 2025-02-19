"use client";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

interface ProductSearchProps {
  onSearch: (searchTerm: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
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
    </Row>
  );
};

export default ProductSearch;
