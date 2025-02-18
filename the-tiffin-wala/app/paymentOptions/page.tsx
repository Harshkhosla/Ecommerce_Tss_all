"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Container, Card } from "react-bootstrap";
import Sidebar from "@/components/profile/Sidebar";
import ShopTags from "@/components/common/Tags";
import { MdAddCard } from "react-icons/md";
import axios from "axios";
import { tssurl } from "../port";

interface CardData {
  _id: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  title: string;
  default: boolean;
}

const MainComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [savedData, setSavedData] = useState<CardData[]>([]);
  const MID = typeof window !== "undefined" ? localStorage.getItem("MID") : "";

  // const [formState, setFormState] = useState({
  //   cardType: "Credit Card",
  //   mid: MID,
  //   number: "",
  //   name: "",
  //   expiry: "",
  //   cvc: "",
  //   focus: "",
  //   cardTitle: "",
  //   isDefault: false,
  // });

  // const [editMode, setEditMode] = useState(false);
  // const [editedCardId, setEditedCardId] = useState<string | null>(null);
  // const [formErrors, setFormErrors] = useState({
  //   number: "",
  //   expiry: "",
  //   cvc: "",
  // });

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `${tssurl}/payments/payment/cards/${MID}`
        );
        setSavedData(response.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };
    if (MID) fetchCardDetails();
  }, [MID]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormState((prev) => ({ ...prev, [name]: value }));
  //   // setFormErrors((prev) => ({ ...prev, [name]: "" }));
  // };

  // const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  //   setFormState((prev) => ({ ...prev, focus: e.target.name }));
  // };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormState((prev) => ({ ...prev, isDefault: e.target.checked }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   let valid = true;

  //   if (formState.number.length !== 16) {
  //     // setFormErrors((prev) => ({ ...prev, number: "Card number must be 16 digits" }));
  //     valid = false;
  //   }

  //   if (!formState.expiry.match(/\d{2}\/\d{2}/)) {
  //     // setFormErrors((prev) => ({ ...prev, expiry: "Expiry date must be in MM/YY format" }));
  //     valid = false;
  //   }

  //   if (formState.cvc.length !== 3) {
  //     // setFormErrors((prev) => ({ ...prev, cvc: "CVC must be 3 digits" }));
  //     valid = false;
  //   }

  //   if (!valid) return;

  //   const data = {
  //     mid: MID,
  //     card: {
  //       number: formState.number,
  //       name: formState.name,
  //       expiry: formState.expiry,
  //       cvv: formState.cvc,
  //       holderName: formState.name,
  //       title: formState.cardType,
  //       default: formState.isDefault,
  //     },
  //   };

  //   try {
  //     if (editMode && editedCardId) {
  //       await axios.put(`${tssurl}/payments/card/${editedCardId}`, data);
  //     } else {
  //       await axios.post(`${tssurl}/payments/payment/cards`, data);
  //     }
  //     setShowModal(false);
  //     setEditMode(false);
  //     setEditedCardId(null);
  //     setFormState({
  //       cardType: "Credit Card",
  //       mid: MID,
  //       number: "",
  //       name: "",
  //       expiry: "",
  //       cvc: "",
  //       focus: "",
  //       cardTitle: "",
  //       isDefault: false,
  //     });
  //   } catch (error) {
  //     console.error("Error adding card details:", error);
  //   }
  // };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await axios.delete(`${tssurl}/payments/payment/cards/${MID}/${cardId}`);
      setSavedData(savedData.filter((card) => card._id !== cardId));
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
          <hr />
          <Button onClick={() => setShowModal(true)}>
            <MdAddCard size={30} /> Add Card
          </Button>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Payment Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Form for adding/editing cards */}
            </Modal.Body>
          </Modal>
          <h3 className="mt-4 mb-3">Saved Card Details</h3>
          <Row xs={1} sm={2} md={3}>
            {savedData.map((card) => (
              <Col md={4} sm={6} key={card._id} className="my-3">
                <Card>
                  <Row className="mx-2">
                    <Col md={6}><p>{card.name}</p></Col>
                    <Col md={6}><p>{card.title}</p></Col>
                  </Row>
                  <Row className="d-flex mt-1 justify-content-end">
                    <Col><p onClick={() => handleDeleteCard(card._id)}>DELETE</p></Col>
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
