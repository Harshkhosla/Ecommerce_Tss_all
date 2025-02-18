"use client";

import { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { tssurl } from "@/app/port";

interface Address {
    _id: string;
    phone_no?: string;
    zipcode?: string;
    country?: string;
    landmark?: string;
    addressSelected?: boolean;
    defaultAddress?: boolean;
  }
  
 
  

interface AddressCardProps {
  address: Address;
  onDelete: (id: string, mID: string | null) => void;
  updateAddress: (id: string, updatedData: Partial<Address>) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onDelete, updateAddress }) => {
  const mID = typeof window !== "undefined" ? localStorage.getItem("MID") : null;
  const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Address>>({
    phone_no: address?.phone_no || "",
    zipcode: address?.zipcode || "",
    country: address?.country || "",
    landmark: address?.landmark || "",
    addressSelected: address?.addressSelected || false,
    defaultAddress: address?.defaultAddress || false,
  });

  const handleEdit = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (addressId: string) => {
    try {
      const response = await axios.put(
        `${tssurl}/auth/users/${mID}/addresses/${addressId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Address updated successfully");
        updateAddress(addressId, formData);
        setShowModal(false);
        window.location.reload();
      } else {
        console.error("Failed to update address:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
    handleCloseModal();
  };

  return (
    <>
      <Card className="add-card">
        <Card.Body className="px-3 pb-0 m-0">
          <div className="upper-section d-flex justify-content-between align-items-center">
            <Card.Title>{address.landmark}</Card.Title>
            <button className="card-button">Home</button>
          </div>

          <div className="middle-section">
            <p className="default-section card-text1 fw-bold mb-0">
              {address.defaultAddress ? "Default" : null}
            </p>
            <p className="address-section card-text">
              {address.landmark}, {address.country}, {address.zipcode}
            </p>
            <div className="phone-section d-flex">
              <p className="card-text">Phone:</p>
              <p>{address.phone_no}</p>
            </div>
          </div>

          <div className="bottom-section d-flex justify-content-between align-items-center">
            <p className="text-dark col-md-2 text-decoration-none" onClick={handleEdit}>
              Edit
            </p>
            <p className="text-dark col-md-2 text-decoration-none" onClick={() => onDelete(address._id, mID)}>
              Delete
            </p>
            <p className="custom-color col-md-8 text-decoration-none d-flex justify-content-end">
              {address.addressSelected ? "Address Selected" : null}
            </p>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLandmark">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter landmark"
                name="landmark"
                value={formData.landmark || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>County/Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formZipcode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zipcode"
                name="zipcode"
                value={formData.zipcode || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone_no"
                value={formData.phone_no || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDefault">
              <Form.Check
                type="checkbox"
                label="Default"
                name="defaultAddress"
                checked={formData.defaultAddress || false}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddressSelected">
              <Form.Check
                type="checkbox"
                label="Address Selected"
                name="addressSelected"
                checked={formData.addressSelected || false}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(address._id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressCard;
