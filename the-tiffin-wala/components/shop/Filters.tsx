"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import Ratings from '../common/Ratings';


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

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface filteroageProps {
  products: ProductType[];
  setFilteredProducts: (filtered: ProductType[]) => void;
}

const Filters: React.FC<filteroageProps> = ({ products, setFilteredProducts }) => {
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange[]>([]);
  const [ratingFilters, setRatingFilters] = useState<PriceRange[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const priceRanges = useMemo(
    () => [
      { label: 'Under 100', min: 0, max: 100 },
      { label: '101 - 200', min: 101, max: 200 },
      { label: '201 - 3000', min: 201, max: 300 },
      { label: '301 - 400', min: 301, max: 400 },
      { label: 'Over 400', min: 401, max: 40000 },
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

    // if (selectedColors.length > 0) {
    //   filtered = filtered.filter((product) =>
    //     product.colors.some((c) => selectedColors.includes(c.value))
    //   );
    // }

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
    priceRange,
    setFilteredProducts,
    ratingFilters,
    selectedSizes,
  ]);

  const handleSubcategoryChange = (subcategory: string) => {
    setSubcategoryFilters((filters) =>
      filters.includes(subcategory)
        ? filters.filter((filter) => filter !== subcategory)
        : [...filters, subcategory]
    );
  };


  const handlePriceChange = (range: PriceRange) => {
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

  
  const handleRatingChange = (minInterval: number, maxInterval: number) => {
    setRatingFilters((filters: PriceRange[]) => {
      const existingFilterIndex = filters.findIndex(
        (filter) => filter.min === minInterval && filter.max === maxInterval
      );
  
      if (existingFilterIndex !== -1) {
        return filters.filter(
          (filter) => !(filter.min === minInterval && filter.max === maxInterval)
        );
      } else {
        return [
          ...filters,
          { label: `${minInterval} - ${maxInterval}`, min: minInterval, max: maxInterval }
        ];
      }
    });
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
      ...new Set(products?.map((product) => product?.sub_category)),
    ])
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
        <Form.Group >
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
        <Form.Group >
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
        <Form.Group >
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
