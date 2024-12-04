import { useState, useEffect, useCallback, useMemo } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { FaCircle } from 'react-icons/fa';
import Ratings from '../common/Ratings';

const Filters = ({ products, setFilteredProducts }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const priceRanges = useMemo(
    () => [
      { label: 'Under $1000', min: 0, max: 1000 },
      { label: '$1001 - $2000', min: 1001, max: 2000 },
      { label: '$2001 - $3000', min: 2001, max: 3000 },
      { label: '$3001 - $4000', min: 3001, max: 4000 },
      { label: 'Over $4000', min: 4001, max: 10000 },
    ],
    []
  );

  const ratingRanges = useMemo(
    () => [
      { label: '4.1 - 5', min: 4.1, max: 5 },
      { label: '3.1 - 4', min: 3.1, max: 4 },
      { label: '2.1 - 3', min: 2.1, max: 3 },
      { label: '1 - 2', min: 1, max: 2 },
    ],
    []
  );

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    if (subcategoryFilters.length > 0) {
      filtered = filtered.filter((product) =>
        subcategoryFilters.includes(product.sub_category)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((c) => selectedColors.includes(c.value))
      );
    }

    const selectedPriceRanges = priceRanges.filter((range) =>
      priceRange.some(
        (selectedRange) =>
          selectedRange.min <= range.max && selectedRange.max >= range.min
      )
    );

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPriceRanges.some(
          (range) =>
            product.unit_price >= range.min && product.unit_price <= range.max
        )
      );
    }

    if (ratingFilters.length > 0) {
      filtered = filtered.filter((product) =>
        ratingFilters.some(
          (filter) =>
            parseFloat(product.rating) >= filter.min &&
            parseFloat(product.rating) <= filter.max
        )
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.size.some((size) => selectedSizes.includes(size.name))
      );
    }

    setFilteredProducts(filtered);
  }, [
    products,
    subcategoryFilters,
    priceRanges,
    selectedColors,
    priceRange,
    setFilteredProducts,
    ratingFilters,
    selectedSizes,
  ]);

  const handleSubcategoryChange = (subcategory) => {
    setSubcategoryFilters((filters) =>
      filters.includes(subcategory)
        ? filters.filter((filter) => filter !== subcategory)
        : [...filters, subcategory]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((colors) =>
      colors.includes(color.value)
        ? colors.filter((c) => c !== color.value)
        : [...colors, color.value]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange((prevRanges) => {
      const isRangeSelected = prevRanges.some(
        (prevRange) =>
          prevRange.min === range.min && prevRange.max === range.max
      );

      if (isRangeSelected) {
        return prevRanges.filter(
          (prevRange) =>
            !(prevRange.min === range.min && prevRange.max === range.max)
        );
      } else {
        return [...prevRanges, range];
      }
    });
  };

  const handleRatingChange = (minInterval, maxInterval) => {
    setRatingFilters((filters) => {
      const existingFilterIndex = filters.findIndex(
        (filter) => filter.min === minInterval && filter.max === maxInterval
      );

      if (existingFilterIndex !== -1) {
        const newFilters = [...filters];
        newFilters.splice(existingFilterIndex, 1);
        return newFilters;
      } else {
        return [...filters, { min: minInterval, max: maxInterval }];
      }
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((sizes) =>
      sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size]
    );
  };

  const handleRemoveAllFilters = () => {
    setSubcategoryFilters([]);
    setSelectedColors([]);
    setPriceRange([]);
    setRatingFilters([]);
    setSelectedSizes([]);
    window.location.reload();
  };

  useEffect(() => {
    setSubcategories([
      ...new Set(products.map((product) => product.sub_category)),
    ]);
    setColors([
      ...new Set(
        products.flatMap((product) =>
          product.colors.map((color) => ({
            value: color.value,
            name: color.name,
          }))
        )
      ),
    ]);
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [
    filterProducts,
    subcategoryFilters,
    selectedColors,
    priceRange,
    ratingFilters,
    selectedSizes,
  ]);

  return (
    <ListGroup variant="flush">
      <strong>Filters:</strong>
      <ListGroup.Item as={Form}>
        <Form.Group controlId="subcategoryFilter">
          <Form.Label htmlFor="subcategoryFilter">Product Type:</Form.Label>
          {subcategories.map((subcategory) => (
            <Form.Check
              key={subcategory}
              type="checkbox"
              label={subcategory}
              id={`subcategory-${subcategory}`}
              checked={subcategoryFilters.includes(subcategory)}
              onChange={() => handleSubcategoryChange(subcategory)}
            />
          ))}
        </Form.Group>
      </ListGroup.Item>

      <ListGroup.Item as={Form}>
        <Form.Group controlId="ratingsFilter">
          <Form.Label>Ratings:</Form.Label>
          {ratingRanges.map((range) => (
            <Form.Check
              key={range.label}
              type="checkbox"
              label={
                <>
                  <div className="flex">
                    <Ratings value={range.min} />{' '}
                    <span className="ms-1">& up</span>
                  </div>
                </>
              }
              id={`ratings-${range.label.replace(/\s+/g, '-').toLowerCase()}`}
              checked={ratingFilters.some(
                (filter) => range.min >= filter.min && range.max <= filter.max
              )}
              onChange={() => handleRatingChange(range.min, range.max)}
            />
          ))}
        </Form.Group>
      </ListGroup.Item>

      <ListGroup.Item as={Form}>
        <Form.Group controlId="priceFilter">
          <Form.Label>Price:</Form.Label>
          {priceRanges.map((range) => (
            <Form.Check
              key={range.label}
              type="checkbox"
              label={range.label}
              id={`price-${range.label.replace(/\s+/g, '-').toLowerCase()}`}
              checked={priceRange.some(
                (selectedRange) =>
                  selectedRange.min === range.min &&
                  selectedRange.max === range.max
              )}
              onChange={() => handlePriceChange(range)}
            />
          ))}
        </Form.Group>
      </ListGroup.Item>

      <ListGroup.Item as={Form}>
        <Form.Group controlId="sizeFilter">
          <Form.Label>Sizes:</Form.Label>
          {['S', 'M', 'L', 'XL'].map((size) => (
            <Form.Check
              key={size}
              type="checkbox"
              label={size}
              id={`size-${size}`}
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
          ))}
        </Form.Group>
      </ListGroup.Item>

      <ListGroup.Item as={Form}>
        <Form.Group controlId="colorFilter">
          <Form.Label>Colors:</Form.Label>
          {colors.map((color) => (
            <Form.Check
              key={`${color.name}-${color.value}`}
              type="checkbox"
              label={
                <>
                  <FaCircle
                    style={{ color: color.value, marginRight: '5px' }}
                  />
                  {color.name}
                </>
              }
              id={`color-${color.name.toLowerCase()}`}
              checked={selectedColors.includes(color.value)}
              onChange={() => handleColorChange(color)}
            />
          ))}
        </Form.Group>
      </ListGroup.Item>

      <ListGroup.Item>
        <Button
          variant="light"
          className="w-100 border-dark mt-2"
          onClick={handleRemoveAllFilters}
        >
          Reset All Filters
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Filters;
