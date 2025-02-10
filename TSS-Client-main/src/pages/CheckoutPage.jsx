import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import tssurl from '../port';
import { FaCircle } from 'react-icons/fa';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import AddAddressModal from '../components/profile/AddressModal';
import { toast } from 'react-toastify';
const CheckoutPgae = (position) => {
  const location = useLocation();
  const CheckData = location.state;
  const mid = localStorage.getItem('MID');
  console.log(CheckData, 'lopo');
  const {
    bagDiscount,
    bagTotal,
    cartItems,
    deliveryFee,
    tax,
    total,
  } = CheckData;

  const [allAddress, setAllAddress] = useState([]);
  const [allPaymentOptions, setAllPaymentOptions] = useState([]);
  const [selectedCardType, setSelectedCardType] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [memData, setMemData] = useState([]);
  console.log(memData, 'lllolo');
  const fetchUserData = async () => {
    const resp = await axios.get(`${tssurl}/auth/users/${mid}`);
    setMemData(resp?.data?.user);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    cardType: 'Credit Card',
    mid: mid,
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
    cardTitle: '',
    isDefault: false,
  });
  const [formErrors, setFormErrors] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleInputFocus = (e) => {
    setFormState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const [editMode, setEditMode] = useState(false);
  const [editedCardId, setEditedCardId] = useState(null);

  const handleEditCard = (cardId) => {
    const editedCard = allPaymentOptions.find((card) => card._id === cardId);

    if (editedCard) {
      setFormState({
        cardType: editedCard.title,
        number: editedCard.number,
        name: editedCard.name,
        expiry: editedCard.expiry,
        cvc: editedCard.cvv,
        cardTitle: editedCard.holderName,
        isDefault: editedCard.default,
      });

      setEditMode(true);
      setEditedCardId(cardId);
      setShowModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (formState?.number?.length !== 16) {
      setFormErrors((prev) => ({
        ...prev,
        number: 'Card number must be 16 digits',
      }));
      valid = false;
    }

    if (!formState?.expiry?.match(/^\d\d\/\d\d$/)) {
      setFormErrors((prev) => ({
        ...prev,
        expiry: 'Expiry date must be in MM/YY format',
      }));
      valid = false;
    }

    if (formState?.cvc?.length !== 3) {
      setFormErrors((prev) => ({ ...prev, cvc: 'CVC must be 3 digits' }));
      valid = false;
    }

    if (valid) {
      const data = {
        mid: mid,
        card: {
          number: formState.number,
          name: formState.name,
          expiry: formState.expiry,
          cvv: formState.cvc,
          holderName: formState.name,
          title: formState.cardType,
          default: formState.isDefault,
        },
      };
      const data2 = {
        mid: mid,
        updatedCard: {
          number: formState.number,
          name: formState.name,
          expiry: formState.expiry,
          cvv: formState.cvc,
          holderName: formState.name,
          title: formState.cardType,
          default: formState.isDefault,
        },
      };
      try {
        if (editMode) {
          await axios.put(
            `${tssurl}/payments/card/${editedCardId}`,
            data2
          );
        } else {
          const response = await axios.post(
            `${tssurl}/payments/payment/cards`,
            data
          );
        }
        setFormState({
          cardType: 'Credit Card',
          mid: mid,
          number: '',
          name: '',
          expiry: '',
          cvc: '',
          focus: '',
          cardTitle: '',
          isDefault: false,
        });

        setShowModal(false);
        setEditMode(false);
        setEditedCardId(null);
        fetchAllPaymentOptions();
      } catch (error) {
        console.error('Error adding card details:', error.response.data);
      }
    }
  };

  const fetchAllAddressses = async () => {
    try {
      const resp = await axios.get(`${tssurl}/auth/users/${mid}/addresses`);
      setAllAddress(resp?.data?.addresses);
    } catch (error) { }
  };
  useEffect(() => {
    fetchAllAddressses();
  }, []);

  useEffect(() => {
    const defaultAddress = allAddress.find((address) => address.defaultAddress);
    if (defaultAddress) {
      handleAddressSelectionModal(defaultAddress);
    }
  }, [allAddress]);

  const fetchAllPaymentOptions = async () => {
    try {
      const resp = await axios.get(`${tssurl}/payments/payment/cards/${mid}`);
      const filteredPaymentOptions = resp.data.filter(
        (option) => option.number
      );
      setAllPaymentOptions(filteredPaymentOptions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPaymentOptions();
  }, []);

  const filteredPaymentOptions = allPaymentOptions.filter(
    (option) => option.title === selectedCardType
  );

  const handleCardSelection = (cardNumber) => {
    if (selectedCard?.number === cardNumber) {
      setSelectedCard(null);
    } else {
      const selectedCard = allPaymentOptions.find(
        (card) => card.number === cardNumber
      );
      setSelectedCard(selectedCard);
    }
  };

  const handleChangeAddress = () => {
    setShowAddressModal(true);
  };

  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleToggleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
  };

  const handleAddressSelectionModal = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const [addNewAddressModal, setAddNewAddressModal] = useState(false);

  const handleAddNewAddress = () => {
    setAddNewAddressModal(true);
  };

  const handleCloseAddNewAddressModal = () => {
    setAddNewAddressModal(false);
  };
  const authToken = localStorage.getItem('authToken');
  const handleNewAddAddress = async (addressData) => {
    try {
      addressData.latitude = position?.position?.latitude;
      addressData.longitude = position?.position?.longitude;
      const response = await fetch(`${tssurl}/auth/users/${mid}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Address added successfully:', data);
        setAddNewAddressModal(false);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to add address:', errorMessage);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const getProductRewardpoints = async (pid) => {
    try {
      const resp = await axios.get(`${tssurl}/productDetails/${pid}`);
      return resp.data.reward_points;
    } catch (error) {
      console.error("Error fetching reward points:", error);
      return 0;
    }
  };


  const handleHitPayGateway = async () => {
    try {
      const productPromises = cartItems.map(async (item, index) => {
        const reward_points = await getProductRewardpoints(item.pid);
        return {
          productName: item.name,
          unitAmount: item.price,
          currency: 'usd',
          quantity: item.Quantity,
          url: item.url,
          pid: item.pid,
          reward_points: parseInt(reward_points),
        };
      });
      const products = await Promise.all(productPromises);
      const data = {
        products: products,
        totalPrice: total,
        customer_email: memData?.email,
        success_url: 'http://64.227.186.165:3000/Order-History',
        cancel_url: 'https://example.com/cancel',
      };
      // const response = await axios.post(
      //   `${tssurl}/create-checkout-session`,
      //   data
      // );
      await storeOrderData(products);
      // if (response.status === 200) {
      //   const { url } = response.data;
      //   window.open(url, '_blank');
      // } else {
      //   console.error('Failed to create checkout session');
      // }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const storeOrderData = async (products) => {
    try {
      const formData = new FormData();
      formData.append("mid", mid);
      formData.append("amount", total);
      formData.append("email", memData?.email);
      formData.append("shipping_addr", selectedAddress?.country);
      formData.append("contact", memData?.mobileNo);
      formData.append("uname", memData?.name);
      formData.append("subtotal", bagTotal);
      formData.append("delivery_status", "Pending");
      formData.append("payment_mode", "Card");
      formData.append("payment_status", "un-paid");
      formData.append("tax", tax);
      formData.append("shipping", deliveryFee);
      formData.append("coupon", bagDiscount);

      products.forEach((product, index) => {
        formData.append(`products[${index}][pid]`, product.pid);
        formData.append(
          `products[${index}][product_name]`,
          product.productName
        );
        formData.append(`products[${index}][price]`, product.unitAmount);
        formData.append(`products[${index}][count]`, product.quantity);
        formData.append(
          `products[${index}][reward_points]`,
          product.reward_points * product.quantity
        );
        formData.append(`products[${index}][photo]`, product.url);
      });

      const response = await axios.post(
         `${tssurl}/orders`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Order data stored successfully')
        console.log('Order successfully placed');
      } else {
        toast.error('Failed to store order data')
        console.error('Failed to Place order');
      }
    } catch (error) {
      console.error('Error storing order data:', error);
    }
  };

  return (
    <>
      <div className="account-bg p-3">
        <h1 className=" text-center" data-aos="zoom-in">
          Checkout
        </h1>
      </div>
      <section className="bg-light2">
        <div className="container ">
          <div className="row g-3">
            <div className="col-lg-8 mt-3">
              <div className="border border-bottom">
                <Row className="mx-2 pt-3 border-bottom fw-semibold">
                  <h3 className="fw-semibold">Billing Details</h3>
                </Row>
                <Row className="bg-white  mx-0 py-2 my-2 d-flex align-items-center">
                  <Row className="mx-2">
                    <h4>Selected Address</h4>
                  </Row>
                  <Col
                    md={1}
                    sm={1}
                    xs={1}
                    className="ps-5 pe-1 d-flex justify-content-end"
                  >
                    <input class="form-check-input" type="radio" checked />
                  </Col>
                  <Col md={8} sm={8} xs={8}>
                    {selectedAddress ? (
                      <>
                        <Row>
                          <h5>
                            {selectedAddress.landmark},{' '}
                            {selectedAddress.country}
                          </h5>
                        </Row>
                        <Row>
                          <span>ZipCode: {selectedAddress.zipcode}</span>
                        </Row>
                      </>
                    ) : (
                      <span>No address selected</span>
                    )}
                  </Col>
                  <Col md={3} sm={12} xs={12} className="my-2">
                    <div className="d-flex flex-xs-row-reverse">
                      <button
                        className="btn btn-secondary m-1"
                        style={{ borderRadius: '0' }}
                        onClick={handleChangeAddress}
                      >
                        Change
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* cartItems */}
              <div className="">
                {cartItems ? (
                  cartItems.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="bg-white border mb-2 fadeIn px-4 py-2"
                      >
                        <div className="row g-3">
                          <div className="col-md-3 p-0">
                            <img
                              className="img-fluid w-100 object-fit-cover"
                              style={{ maxHeight: '150px' }}
                              src={item?.url}
                              alt={index}
                            />
                          </div>
                          <div className="col-md-9">
                            <div className="d-flex ms-3 justify-content-between gap-3 align-items-center">
                              <h4>Name {item.name}</h4>
                            </div>
                            <div className="d-flex ms-3 justify-content-between align-items-center">
                              <h5>Size: {item.Size}</h5>
                            </div>
                            <div className="d-flex ms-3 ">
                              <h5 className="me-2">Color:</h5>{' '}
                              <span>
                                <FaCircle
                                  size="25px"
                                  className="mx-1"
                                  color={item.Colour}
                                />
                              </span>
                            </div>
                            <div className="d-flex ms-3 justify-content-between gap-3 align-items-center">
                              <h5>Quantity: {item.Quantity}</h5>
                            </div>
                            <div className=" ms-3 ">
                              <h3 className="mt-1">$ {item.price}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <h1 className="text-center">No Items In Cart</h1>
                )}
              </div>
            </div>

            {/* your orders */}
            <div className="col-lg-4">
              <div className="bg-white shadow" data-aos="fade-up">
                <div className="px-4 py-2 border-bottom text-center border-2">
                  <h3>Your Order Details</h3>
                </div>
                <div className="p-4 border-bottom border-2 ">
                  <div className="d-flex justify-content-between">
                    <div className="fs-5">
                      Bag Total ({cartItems.length} items)
                    </div>
                    <h5 className="fw-bold">
                      $ {bagTotal && bagTotal.toFixed(2)}
                    </h5>
                  </div>
                  <div className="d-flex mt-2 justify-content-between">
                    <div className="fs-5">Bag Discount</div>
                    <h5 className="fw-bold">
                      − $ {bagDiscount && bagDiscount.toFixed(2)}
                    </h5>
                  </div>
                  <div className="d-flex mt-2 justify-content-between">
                    <div className="fs-5">Tax (10%)</div>
                    <h5 className="fw-bold ">+ {tax}</h5>
                  </div>
                  <div className="d-flex mt-2 justify-content-between">
                    <div className="fs-5">Shipping Charges</div>
                    <h5 className="fw-bold">+ ${deliveryFee}</h5>
                  </div>
                </div>
                <div className="p-4">
                  <div className="d-flex justify-content-between">
                    <h5>Total Amount</h5>
                    <h5 className="fw-bold">$ {total}</h5>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="fw-semibold mt-3 fs-4 rounded-0" 
                      style={{
                        backgroundColor: '#000',
                        width: '100%',
                        borderColor: 'orange',
                        transition: 'background-color 0.3s ease',
                      }}
                      size="large"
                      onClick={handleHitPayGateway} 
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>

              {/* add card */}
              <div className="bg-white shadow my-2" data-aos="fade-up">
                <div className="px-4 py-2 text-center border-2">
                  <h3>Select Card</h3>
                </div>
                {allPaymentOptions.length > 0 ? (
                  <>
                    <div className="px-4 border-2 border-bottom fs-5 text-center">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="cardType"
                          id="creditCard"
                          value="Credit Card"
                          checked={selectedCardType === 'Credit Card'}
                          onChange={() => setSelectedCardType('Credit Card')}
                        />
                        <label class="form-check-label" for="creditCard">
                          Credit card
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="cardType"
                          id="debitCard"
                          value="Debit Card"
                          checked={selectedCardType === 'Debit Card'}
                          onChange={() => setSelectedCardType('Debit Card')}
                        />
                        <label class="form-check-label" for="debitCard">
                          Debit Card
                        </label>
                      </div>
                    </div>

                    <div className="px-4 border-2 ">
                      {selectedCardType && (
                        <div className="my-2 " data-aos="fade-up">
                          <div className=" border-2 ">
                            {filteredPaymentOptions.map((card, index) => (
                              <div
                                key={index}
                                className="mb-2 border-2 border-bottom"
                              >
                                <div className="d-flex my-3 align-items-center">
                                  <input
                                    type="checkbox"
                                    id={`card-${index}`}
                                    name="selectedCard"
                                    value={card.number}
                                    checked={
                                      selectedCard?.number === card.number
                                    }
                                    onChange={() =>
                                      handleCardSelection(card.number)
                                    }
                                    className="me-4"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      border: '2px solid orange',
                                    }}
                                  />
                                  <div>
                                    <h5 className="text-uppercase fw-bold mb-0">
                                      {card.holderName}
                                    </h5>
                                    <h6 className="fw-semibold mb-0">
                                      Card Number:{' '}
                                      {card.number
                                        .slice(-4)
                                        .padStart(card.number.length, '*')}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="d-flex justify-content-center">
                        <Button
                          className="fw-semibold mt-3 mx-2 fs-4  rounded-0"
                          style={{
                            backgroundColor: '#000',

                            width: '100%',
                            borderColor: 'orange',
                            transition: 'background-color 0.3s ease',
                          }}
                          size="large"
                          onClick={() => handleEditCard(selectedCard?._id)}
                        >
                          Edit Card
                        </Button>
                        <Button
                          className="fw-semibold mt-3 mx-2 fs-4 rounded-0" 
                          style={{
                            backgroundColor: '#000',
                            width: '100%',
                            borderColor: 'orange',
                            transition: 'background-color 0.3s ease',
                          }}
                          size="large"
                          onClick={() => setShowModal(true)}
                        >
                          Add Card
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4">
                      <h3 className="text-secondary text-center">
                        No Card Data
                      </h3>
                      <div className="d-flex justify-content-center">
                        <Button
                          className="fw-semibold mt-3 mx-2 fs-4  rounded-0"
                          style={{
                            backgroundColor: '#000',
                            width: '100%',
                            borderColor: 'orange',
                            transition: 'background-color 0.3s ease',
                          }}
                          onClick={() => setShowModal(true)}
                          size="large"
                        >
                          Add card
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col md={12}>
                <Cards
                  number={formState.number}
                  expiry={formState.expiry}
                  cvc={formState.cvc}
                  name={formState.name}
                  focused={formState.focus}
                />
                <div className="mt-3">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <select
                          name="cardType"
                          className="form-control"
                          value={formState.cardType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="cardTitle"
                          className="form-control"
                          placeholder="Card Title"
                          value={formState.cardTitle}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        value={formState.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                      />
                      <div className="text-danger">{formErrors.number}</div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleInputChange}
                        value={formState.name}
                        onFocus={handleInputFocus}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="expiry"
                          className="form-control"
                          placeholder="Expiry Date (MM/YY)"
                          value={formState.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                        <div className="text-danger">{formErrors.expiry}</div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="number"
                          name="cvc"
                          className="form-control"
                          placeholder="CVC"
                          value={formState.cvc}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                        <div className="text-danger">{formErrors.cvc}</div>
                      </div>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isDefault"
                        checked={formState.isDefault}
                        onChange={handleCheckboxChange}
                        id="defaultCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck"
                      >
                        Set as default
                      </label>
                    </div>

                    <div className="d-grid">
                      <button type="submit mx-3" className="btn btn-dark">
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      {/* address modal */}
      <Modal show={showAddressModal} onHide={handleToggleAddressModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display all addresses here */}
          {allAddress.map((address) => (
            <div key={address?._id} className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selectedAddress"
                  id={`address-${address?._id}`}
                  value={address?._id}
                  onChange={() => handleAddressSelectionModal(address)}
                  checked={address.defaultAddress}
                />
                <label
                  className="form-check-label"
                  htmlFor={`address-${address?._id}`}
                >
                  {address.landmark}, {address.country} - ZipCode:{' '}
                  {address.zipcode}
                </label>
              </div>
            </div>
          ))}
          <div className="">
            <button
              className="btn btn secondary"
              style={{ color: 'orange' }}
              onClick={handleAddNewAddress}
            >
              Add New Address
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <AddAddressModal
        showModal={addNewAddressModal}
        handleCloseModal={handleCloseAddNewAddressModal}
        handleAdd={handleNewAddAddress}
      />
    </>
  );
};

export default CheckoutPgae;
