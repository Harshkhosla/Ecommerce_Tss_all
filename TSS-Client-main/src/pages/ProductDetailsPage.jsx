import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaCircle, FaPlus, FaMinus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import Ratings from "../components/common/Ratings";
import Reviews from "../components/shop/Reviews";
import axios from "axios";
import tssurl from "../port";
import ProductsSlider from "../components/shop/ProductSlider";
import ProductGallery from "../components/shop/ProductGallery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/counterSlice";
import { Helmet } from "react-helmet";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const MID = localStorage.getItem("MID");
  const { pid: productId } = useParams();
  const alltheproducts = useSelector((state) => state.Store.allproductdata)
  const particularproduct = alltheproducts?.find((item) => item.pid === productId, {});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(alltheproducts.length < 0 ? true : false);
  const [likedProducts, setLikedProducts] = useState([]);
  const mid = localStorage.getItem("MID");
  const [product, setProduct] = useState(particularproduct);
  const [products, setProducts] = useState(alltheproducts);


  const DiscountedPrice = (product.discount_type === 'Amount' ? (product.unit_price - product.discount) : (product.unit_price * product.discount) / 100)
  const { colors, size, reward_points,quantity_pi, product_detail, SEOArea  ,category} = product || {};



  const fetchLikedProducts = async () => {
    try {
      const response = await axios.get(`${tssurl}/liked/liked-products/${MID}`);
      const filteredLikedProducts = response?.data.likedProducts.filter(
        (id) => id !== null
      );
      setLikedProducts(filteredLikedProducts);
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  };

  useEffect(() => {
    if (alltheproducts.length === 0) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`${tssurl}/productDetails/${productId}`);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
        try {
          const response = await axios.get(`${tssurl}/productcat/products`);
          const filteredData = response?.data?.filter((item) => item.draft === "false");
          setProducts(filteredData);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }

    fetchLikedProducts();
  }, [productId]);

  const fitOptions = parseHtmlToList(product?.fit);
  const fabricList = parseHtmlToList(product?.fabric);
  const sizes = size?.map(({ name }) => name) || [];
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);


  if (loading) {
    return <div>Loading...</div>;
  }

  const handleQtyChange = (change) => {
    setQty((prevQty) => {
      const newQty = Math.max(1, Math.min(10, prevQty + change));
      return newQty;
    });
  };

  const variants = product?.variants?.[0];
  const thumbImg = variants?.ThumbImg || "";
  const addToCartHandler = async () => {
    if(!mid){
      toast.error("User Account has not been created. Please Login");
    }
    const data = {
      mid: mid,
      pid: productId,
      Size: selectedSize,
      Colour: selectedColor,
      Quantity: qty,
      name: product?.product_name,
      price: DiscountedPrice,
      image: thumbImg?.[0],
    };
    dispatch(addToCartAsync(data));

  };


  const toggleLike = async () => {
    try {
      if (likedProducts.includes(product.pid)) {
        setLikedProducts(likedProducts.filter((pid) => pid !== product.pid));
        await axios.delete(`${tssurl}/liked/liked-products/delete`, {
          data: { mid: mid, pid: product.pid },
        });
        toast.success("Removed from Wishlist");
      } else {
        setLikedProducts([...likedProducts, product.pid]);
        await axios.post(`${tssurl}/liked/liked-products/add`, {
          mid: MID,
          pid: product.pid,
        });
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
  <Helmet>
        <title>{SEOArea?.metaTitle || 'Default Title'}</title>
        <meta name="description" content={SEOArea?.metaDescription || 'Default Description'} />
        <meta name="keywords" content={SEOArea?.metaKeywords || 'Default Keywords'} />
        <meta property="og:image" content={SEOArea?.images1 || ''} />
      </Helmet>
      <Container>
        <p className="breadcrumb">
          <Link to="/" className="me-1">
            Home
          </Link>
          /
          <Link to="/products" className="mx-1">
            Products
          </Link>
          / <strong className="ms-1">{product?.product_name}</strong>
        </p>
        <Row className="product-details">
          <Col md={6}>
            <div>
              <ProductGallery product={product} />
            </div>
          </Col>
          <Col md={6}>
            <h3>{product?.product_name}</h3>
            <Row className="mt-2">
              <Col md={3}>
                <h5>₹{product?.unit_price - DiscountedPrice}</h5> <span className="" style={{ textDecoration: "line-through" ,color:"red" }}>₹{product?.unit_price }</span>
              </Col>
              <Col md={3}>
                <Ratings value={parseFloat(product?.rating)} />
              </Col>
            </Row>
            {/* <h6 className="mt-2">
              Color:{" "}
              <span>
                {colors?.map((color) => (
                  <OverlayTrigger
                    key={color.name}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-${color.name}`}>{color.name}</Tooltip>
                    }
                  >
                    <span>
                      <FaCircle
                        size="25px"
                        className="mx-1"
                        color={color.value}
                        style={{
                          border:
                            selectedColor === color.value
                              ? "2px orange solid"
                              : "",
                          borderRadius:
                            selectedColor === color.value ? "15px" : "",
                        }}
                        onClick={() => setSelectedColor(color.value)}
                      />
                    </span>
                  </OverlayTrigger>
                ))}
              </span>
            </h6> */}
            <Row>
              <Col md={6}>
                <h6 className="text-2xl pt-2" style={{color:"green" }}>Type of food* {category}</h6>
                <h6 className="pt-2">Rewards Points*{reward_points}</h6>
              </Col>
              <Col md={4}>
                <h6>Quantity*</h6>
                <div className="quantity-selector">
                  <Button variant="light" onClick={() => handleQtyChange(-1)}>
                    <FaMinus size={10} />
                  </Button>
                  <span className="mx-4">{qty}</span>
                  <Button variant="light" onClick={() => handleQtyChange(1)}>
                    <FaPlus size={10} />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="cart-list">
              <Col md={5}>
                <Button
                  variant="dark"
                  className="btn-block p-2 w-100"
                  type="button"
                  disabled={quantity_pi === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="light"
                  className="btn-block py-2 w-75"
                  type="button"
                >
                  {likedProducts?.includes(product?.pid) ? (
                    <FaHeart
                      className=" "
                      size="24"
                      color="red"
                      onClick={toggleLike}
                    />
                  ) : (
                    <FaRegHeart
                      className=""
                      size="24"
                      color="black"
                      onClick={toggleLike}
                    />
                  )}
                </Button>
              </Col>
            </Row>
            <Tabs
              defaultActiveKey="details"
              id="fill-tab"
              className="mt-3 mb-2 prodTabs"
              fill
            >
              <Tab
                eventKey="details"
                title="Details"
                style={{ textAlign: "justify" }}
              >
                {parseHtmlToText(product_detail)}
              </Tab>
              <Tab eventKey="fabric" title="Fabric">
                {fabricList.map((fabric, index) => (
                  <li key={index}>{fabric}</li>
                ))}
              </Tab>
              <Tab eventKey="fit" title="Fit">
                {fitOptions.map((fit, index) => (
                  <li key={index}>{fit}</li>
                ))}
              </Tab>
              <Tab
                eventKey="about"
                title="About"
                style={{ textAlign: "justify" }}
              >
                {parseHtmlToText(product?.about)}
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <h4 className="ms-2 mt-5 mb-4 fw-bold">Similar Products</h4>
          <ProductsSlider data={products} />
        </Row>
        <Reviews productID={product?.pid} />
      </Container>
    </>
  );
};

const parseHtmlToList = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const fitListItems = doc.querySelectorAll("ol li");
  return Array.from(fitListItems).map((item) => item.textContent.trim());
};

const parseHtmlToText = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

export default ProductDetailsPage;
