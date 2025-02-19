"use client"
import { AppDispatch, RootState } from "@/redux/store";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tssurl } from "../port";
import CartCard from "@/components/cart/CartCard";
import { getCartItemsAsync, setCartData } from "@/redux/counterSlice";
import { useRouter } from "next/navigation";
// import Link from "next/link";


// interface CartItem {
//   mid: string;
//   pid: string;
//   Quantity: number;
//   name: string;
//   price: number;
//   image?: string;
// }

interface Promotion {
  promotion_code: string;
  promotion_title: string;
  offer_valid_from: string;
  offer_valid_upto: string;
  max_discount_amount: number;
  minimum_shopping: number;
  offer_type: "Percent" | "Flat";
  price: number;
  promotion_type: "Shipping" | "Product";
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const mid = localStorage.getItem("MID") || "";

  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [viewOffer, setViewOffer] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);


  const cartItems = useSelector((state: RootState) => state.counter.items);

  
 
  useEffect(() => {
    if (mid) {
      dispatch(getCartItemsAsync(mid));
    }
  }, [dispatch, mid]);

  const bagTotal = useMemo(() => {
    return cartItems?.reduce((total, item) => total + item.Quantity * item.price, 0) || 0;
  }, [cartItems]);


  const deliveryFee = 5;
  const tax = 0;

  
  const total = useMemo(() => {
    const discount = promoApplied 
      ? promotions.find(p => p.promotion_code === selectedPromotion)?.max_discount_amount || 0
      : 0;
  
      return parseFloat((bagTotal - discount + deliveryFee + tax).toFixed(2));
  }, [bagTotal, promoApplied, selectedPromotion, promotions, deliveryFee, tax]);
  
  
  const fetchOffer = useCallback(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const apiUrl = `${tssurl}/promotions?date=${today}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data: Promotion[] = await response.json();
        setPromotions(data.filter(promo => promo.offer_valid_from <= today && promo.offer_valid_upto >= today));
      } else {
        console.error("Failed to fetch promotions data");
      }
    } catch (error) {
      console.error("Error fetching promotions data:", error);
    }
  }, []);

  useEffect(() => {
    if (viewOffer) {
      fetchOffer()
    }
  }, [viewOffer, fetchOffer]);

  const handleApplyPromoCode = () => {
    if (!selectedPromotion) return;

    const promo = promotions.find(p => p.promotion_code === selectedPromotion);
    if (!promo) return;

    if (promoApplied) {
      setSelectedPromotion(null);
      setPromoApplied(false);
    } else {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    // Store cart data in Redux
    dispatch(setCartData({
      bagTotal,
      total,
    }));
    
    router.push('/checkout');
  };

  return (
    <Container>
      <Row className="mt-3">
        <h5>
          <strong>MY BAG <span className="fw-normal ms-1">({cartItems?.length} items)</span></strong>
        </h5>

        {cartItems?.length === 0 ? (
          <Col md={12} className="my-2 text-center fs-3">
            <p>Your cart is empty</p>
            <Button variant="primary" href="/">Shop Now</Button>
          </Col>
        ) : (
          <>
            <Col md={8} className="my-2">
              {cartItems?.map((product, index) => (
                <CartCard key={product.pid} index={index} product={product} />
              ))}
            </Col>

            <Col md={4} className="mt-4">
              <Card className="bg-light pt-3">
                <strong className="ps-3" style={{ fontSize: "1.4rem" }}>Order Details</strong>
                <Row className="ps-3 my-2">
                  <Col md="7">Bag Total</Col>
                  <Col md="5">₹ {bagTotal.toFixed(2)}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <Col md="7">Bag Discount</Col>
                  <Col md="5">₹ {promoApplied ? promotions.find(p => p.promotion_code === selectedPromotion)?.max_discount_amount || 0 : 0}</Col>
                </Row>
                <Row className="ps-3 mb-2">
                  <Col md="5">Delivery Fee</Col>
                  <Col md="5">₹ {deliveryFee}</Col>
                </Row>
                <Row className="ps-3 mb-3">
                  <Col md="7"><strong>Total</strong></Col>
                  <Col md="5">₹ {total}</Col>
                </Row>

                <div  onClick={handleCheckout} >
                  <Button className="fw-bold mt-4 w-100" style={{ backgroundColor: "#000", color: "orange" }}>Checkout</Button>
                </div>
              </Card>

              {/* Coupons Section */}
              <Card className="bg-light mt-3">
                <strong className="ps-3" style={{ fontSize: "1.4rem" }}>Apply Coupons</strong>
                <Row className="mx-1 my-2">
                  <Col lg={8} md={7} sm={8} xs={8} className="pe-0">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="form-control h-100"
                      value={selectedPromotion || ""}
                      onChange={(e) => setSelectedPromotion(e.target.value)}
                    />
                  </Col>
                  <Col lg={4} md={5} sm={4} xs={4} className="ps-0">
                    <button className="btn text-white bg-secondary h-100 w-100" onClick={handleApplyPromoCode}>
                      {promoApplied ? "Remove" : "Apply"}
                    </button>
                  </Col>
                </Row>

                {!viewOffer ? (
                  <Button className="w-100 mt-4" onClick={() => setViewOffer(true)} style={{ backgroundColor: "#000", color: "orange" }}>View Offer</Button>
                ) : (
                  promotions.map((promo, index) => (
                    <div key={index} className="mb-3">
                      <input type="radio" name="promo" value={promo.promotion_code} onChange={() => setSelectedPromotion(promo.promotion_code)} />
                      <label>{promo.promotion_code} - {promo.promotion_title}</label>
                    </div>
                  ))
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
