import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const ProductSearch = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Row className="productsearch">
      <Col md="7">
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="formSearch" className="flex">
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
