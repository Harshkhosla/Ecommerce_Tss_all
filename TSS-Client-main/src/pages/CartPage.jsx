import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import CartCard from "../components/cart/CartCard";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/counterSlice";
import { NavLink } from "react-router-dom";
import tssurl from "../port";

const CartPage = () => {
  const dispatch = useDispatch();
  const mid = localStorage.getItem("MID");
  const [bagDiscount, setBagDiscount] = useState(0);
  const [bagTotal, setBagTotal] = useState(0);
  const cartItems = useSelector((state) => state.Store.cartItems[0]);

  useEffect(() => {
    dispatch(getCartItems(mid));
  }, []);
  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartItems?.forEach((item) => {
        total += item.Quantity * item.price;
      });
      setBagTotal(total);
    };

    calculateTotal();
  }, [cartItems, bagTotal]);

  const deliveryFee = 40;
  const tax = Number((bagTotal - bagDiscount) * 10) / 100;

  const total = Number(bagTotal - bagDiscount + deliveryFee + tax).toFixed(2);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const [promotions, setPromotions] = useState([]);
  const [viewOffer, setViewOffer] = useState(false);
  const fetchOffer = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const apiUrl = `${tssurl}/promotions?date=${today}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const todayPromotions = data.filter((promo) => {
          return (
            promo.offer_valid_from <= today && promo.offer_valid_upto >= today
          );
        });
        setPromotions(todayPromotions);
      } else {
        console.error("Failed to fetch promotions data");
      }
    } catch (error) {
      console.error("Error fetching promotions data:", error);
    }
  };
  const handleOffer = () => {
    fetchOffer();
  };

  const [showTerms, setShowTerms] = useState({});
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCodeData, setPromoCodeData] = useState([]);
  const [shippingDiscount, setShippingDiscount] = useState(0)

  useEffect(() => {
    if (viewOffer) {
      fetchOffer();
    }
  }, [viewOffer]);

  const handleRadioChange = (promoCode) => {
    setSelectedPromotion(promoCode?.promotion_code);
  };

  const handleApplyPromoCode = () => {
    if (selectedPromotion) {
      const Promo = promotions.find(
        (promo) => promo.promotion_code === selectedPromotion
      );
      if (Promo) {
        if (promoApplied) {
          console.log("Removing promo code:", selectedPromotion);
          setSelectedPromotion("");
          setBagDiscount(0);
          setPromoApplied(false);
          setPromoCodeData([]);
        } else {
          console.log("Applying promo code:", selectedPromotion);
          setPromoApplied(true);

          if (Promo.offer_type === "Percent") {
            const discountAmount = (Number(Promo.price) / 100) * bagTotal;
            if (discountAmount > Promo?.max_discount_amount) {
              setBagDiscount(Promo?.max_discount_amount);
            } else {
              setBagDiscount(discountAmount);
            }
          } else {
            setBagDiscount(Promo.max_discount_amount);
          }
          handleDiscounttype(Promo);
        }
      }
    }
  };

  const handleDiscounttype = (Promo) => {
    if (Promo?.promotion_type === "Shipping") {
      console.log("Shipping");
    } else {
      console.log("Product");
    }
  };

  const handleToggleTerms = (index) => {
    setShowTerms((prevShowTerms) => ({
      ...prevShowTerms,
      [index]: !prevShowTerms[index],
    }));
  };

  return (
    <Container>
      <Row className="mt-3">
        <h5>
          <strong>
            MY BAG
            <span className="fw-normal ms-1">
              ( {cartItems?.length} items )
            </span>
          </strong>
        </h5>
        {cartItems?.length === 0 ? (
          <Col md={12} className="my-2 text-center fs-3">
            <p>Your cart is empty</p>
            <Button variant="primary" href="/">
              Shop Now
            </Button>
          </Col>
        ) : (
          <>
            <Col md={8} className="my-2">
              {cartItems?.map((product, index) => (
                <CartCard index={index} product={product} />
              ))}
            </Col>
            <Col md={4} className="mt-4">
              <Card className="bg-light pt-3">
                <strong className="ps-3" style={{ fontSize: "1.4rem" }}>
                  Order Details
                </strong>
                <Row className="ps-3 my-2">
                  <Col md="7">Bag Total</Col>
                  <Col md="5">₹ {bagTotal ? bagTotal.toFixed(2) : 0}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <Col md="7">Bag Discount</Col>
                  <Col md="5">₹ {bagDiscount ? bagDiscount : 0}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <p className="mb-0">Convenience Fee</p>

                  <Col md="2"></Col>
                  <Col md="5">Delivery Fee</Col>
                  <Col md="5">₹ {deliveryFee ? deliveryFee : 0}</Col>

                  <Col md="2"></Col>
                  <Col md="5">Tax (10%)</Col>
                  <Col md="5">₹ {tax ? tax : 0}</Col>
                </Row>
                <Row className="ps-3 mb-3">
                  <Col md="7">
                    <strong>Total</strong>
                  </Col>
                  <Col md="5">₹ {total ? total : 0}</Col>
                </Row>

                <NavLink
                  to="/checkout"
                  state={{
                    cartItems: cartItems,
                    bagTotal: bagTotal,
                    bagDiscount: bagDiscount,
                    deliveryFee: deliveryFee,
                    tax: tax,
                    total: total,
                    shippingDiscount: shippingDiscount,
                  }}
                >
                  <Button
                    fullWidth
                    onClick={handleClick}
                    variant="contained dark w-100 fw-bold py-2"
                    className="fw-bold mt-4 shadow-none rounded-0 text-white"
                    size="large"
                    style={{ backgroundColor: "#000000", color: "orange" }}
                  >
                    Checkout
                  </Button>
                </NavLink>
              </Card>

              <Card className="bg-light mt-3">
                <strong className="ps-3" style={{ fontSize: "1.4rem" }}>
                  Apply Coupons
                </strong>
                <Row className="mx-1 my-2">
                  <Col lg={8} md={7} sm={8} xs={8} className="pe-0">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="form-control h-100"
                      style={{ borderRadius: "0" }}
                      value={selectedPromotion}
                      onChange={(e) => setSelectedPromotion(e.target.value)} // Update selectedPromotion state on change
                    />
                  </Col>
                  <Col lg={4} md={5} sm={4} xs={4} className="ps-0">
                    <button
                      className="btn text-white bg-secondary h-100 w-100"
                      style={{ borderRadius: "0" }}
                      onClick={handleApplyPromoCode}
                    >
                      {promoApplied ? "Remove" : "Apply"}
                    </button>
                  </Col>
                </Row>
                {viewOffer === false ? (
                  <Button
                    fullWidth
                    onClick={() => {
                      handleOffer();
                      setViewOffer(true);
                    }}
                    variant="contained dark w-100 fw-bold py-2"
                    className="fw-bold mt-4 shadow-none rounded-0 text-white"
                    size="large"
                    style={{ backgroundColor: "#000000", color: "orange" }}
                  >
                    View Offer
                  </Button>
                ) : (
                  <>
                    <Row className="mx-3 mb-2 align-items-center">
                      <Col xs="auto" className="d-flex align-items-center">
                        <strong style={{ fontSize: "1.3rem" }}>
                          Applicable Coupons
                        </strong>
                      </Col>
                      <Col xs="auto" className="ms-auto">
                        <button
                          type="button"
                          onClick={() => setViewOffer(false)}
                          className="btn-close"
                          aria-label="Close"
                        ></button>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      {promotions?.map((promo, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex ">
                            <input
                              className="form-check-input me-2"
                              type="radio"
                              name="promocode"
                              id={`promoCode${index}`}
                              value={promo.promotion_code}
                              checked={
                                promo.promotion_code === selectedPromotion
                              }
                              onChange={() =>
                                handleRadioChange(promo)
                              }
                            />
                            <div>
                              <h4 className="fw-bold mb-1">
                                {promo.promotion_code}
                              </h4>
                              <p className="text-uppercase fw-semibold mb-1">
                                {promo.promotion_title}
                              </p>
                              <p
                                className="mb-0"
                                style={{ color: "orange", cursor: "pointer" }}
                                onClick={() => handleToggleTerms(index)}
                              >
                                View T & C
                              </p>
                              {showTerms[index] && (
                                <div className="my-1">
                                  <p className="my-0">
                                    MAX Discount: ₹{promo.max_discount_amount}
                                  </p>
                                  <p className="my-0">
                                    Minimum Order Value: ₹
                                    {promo.minimum_shopping}
                                  </p>
                                  <p className="my-0">
                                    Offer Validity: {promo.offer_valid_from} to{" "}
                                    {promo.offer_valid_upto}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
