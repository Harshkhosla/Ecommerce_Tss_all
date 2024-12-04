import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Container, Card } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Sidebar from "../components/profile/Sidebar";
import ShopTags from "../components/common/Tags";
import { MdAddCard } from "react-icons/md";
import axios from "axios";
import tssurl from "../port";

const MID = localStorage.getItem("MID");
const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [formState, setFormState] = useState({
    cardType: "Credit Card",
    mid: MID,
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
    cardTitle: "",
    isDefault: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editedCardId, setEditedCardId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(
        `${tssurl}/payments/payment/cards/${localStorage.getItem("MID")}`
      );
      setSavedData(response.data);
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };
  useEffect(() => {
    fetchCardDetails();
  }, []);
  console.log(savedData, "gg");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInputFocus = (e) => {
    setFormState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (formState?.number?.length !== 16) {
      setFormErrors((prev) => ({
        ...prev,
        number: "Card number must be 16 digits",
      }));
      valid = false;
    }

    if (!formState?.expiry?.match(/^\d\d\/\d\d$/)) {
      setFormErrors((prev) => ({
        ...prev,
        expiry: "Expiry date must be in MM/YY format",
      }));
      valid = false;
    }

    if (formState?.cvc?.length !== 3) {
      setFormErrors((prev) => ({ ...prev, cvc: "CVC must be 3 digits" }));
      valid = false;
    }

    if (valid) {
      const data = {
        mid: MID,
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
        mid: MID,
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
          console.log("Card details updated successfully!");
        } else {
          const response = await axios.post(
            `${tssurl}/payments/payment/cards`,
            data
          );
          console.log("Response:", response?.data);
        }
        setShowModal(false);
        setEditMode(false);
        setEditedCardId(null);
        setFormState({
          cardType: "Credit Card",
          mid: MID,
          number: "",
          name: "",
          expiry: "",
          cvc: "",
          focus: "",
          cardTitle: "",
          isDefault: false,
        });
        fetchCardDetails();
      } catch (error) {
        console.error("Error adding card details:", error?.response?.data);
      }
    }
  };

  const handleEditCard = (cardId) => {
    const editedCard = savedData.find((card) => card._id === cardId);
    if (editedCard) {
      setFormState({
        cardType: editedCard.title,
        number: editedCard.number,
        name: editedCard.name,
        expiry: editedCard.expiry,
        cvc: editedCard.cvv,
        cardTitle: editedCard.title,
        isDefault: editedCard.default,
      });

      setEditMode(true);
      setEditedCardId(cardId);
      setShowModal(true);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(`${tssurl}/payments/payment/cards/${MID}/${cardId}`);
      console.log(`Card with ID ${cardId} deleted successfully`);
      const updatedData = savedData.filter((card) => card._id !== cardId);
      setSavedData(updatedData);
      fetchCardDetails();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <ShopTags />
      </Row>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="mt-3">
          <h1>Payment Options</h1>
          <hr></hr>
          <div className="d-flex align-items-center">
            <p className="my-2  ">Add Credit or Debit Card Details</p>
            <Button
              onClick={() => setShowModal(true)}
              className="p-0 mx-1"
              variant="light"
            >
              <MdAddCard color="#FFA46D" size={30} />
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Payment Options</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <Row>
                    <Col md={12}>
                      <Cards
                        number={formState?.number}
                        expiry={formState?.expiry}
                        cvc={formState?.cvc}
                        name={formState?.name}
                        focused={formState?.focus}
                      />
                      <div className="mt-3">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <select
                                name="cardType"
                                className="form-control"
                                value={formState?.cardType}
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
                                value={formState?.cardTitle}
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
                              value={formState?.number}
                              onChange={handleInputChange}
                              onFocus={handleInputFocus}
                              required
                            />
                            <div className="text-danger">
                              {formErrors?.number}
                            </div>
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Name"
                              onChange={handleInputChange}
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
                                value={formState?.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                              />
                              <div className="text-danger">
                                {formErrors?.expiry}
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <input
                                type="number"
                                name="cvc"
                                className="form-control"
                                placeholder="CVC"
                                value={formState?.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                              />
                              <div className="text-danger">
                                {formErrors?.cvc}
                              </div>
                            </div>
                          </div>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="isDefault"
                              checked={formState?.isDefault}
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
          </div>
          <h3 className="mt-4 mb-3">Saved Card Details</h3>
          <Row xs={1} sm={2} md={3}>
            {savedData?.map((card) => (
              <Col md={4} sm={6} key={card._id} className="my-3">
                <Card
                  style={{
                    padding: "0",
                    margin: "0",
                    border: card.card?.isDefault
                      ? "2px solid green"
                      : "1px solid #dee2e6",
                  }}
                >
                  <Row className="mx-2">
                    <Col md={6} style={{ fontWeight: "bold" }}>
                      <p style={{ fontSize: "1rem" }} className="mb-1">
                        {card?.name}
                      </p>
                    </Col>
                    <Col md={6}>
                      <Card.Text
                        style={{ fontSize: "1rem", fontWeight: "bold" }}
                      >
                        {card?.title}
                      </Card.Text>
                    </Col>
                    <hr />
                  </Row>
                  <Row className="mb-1 py-1">
                    {console.log(card)}
                    {card ? (
                      <Cards
                        number={card?.number}
                        expiry={card?.expiry}
                        cvc={card?.cvv}
                        name={card?.name}
                      />
                    ) : (
                      <div>No card information available</div>
                    )}
                  </Row>
                  <Row className="d-flex mt-1 mb-0 justify-content-end">
                    <Col md={4} xs={4}>
                      {card?.default ? (
                        <p className="text-success">Default</p>
                      ) : null}
                    </Col>
                    <Col md={4} xs={3}>
                      <p onClick={() => handleEditCard(card._id)}>EDIT</p>
                    </Col>
                    <Col md={4} xs={4}>
                      <p onClick={() => handleDeleteCard(card._id)}>DELETE</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;
