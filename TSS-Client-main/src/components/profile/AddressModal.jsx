import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddAddressModal = ({
  showModal,
  handleCloseModal,
  handleAdd,
}) => {
  const [country, setCountry] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState(false);

  console.log("hello");
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLandmark">
            <Form.Label>Address Line:</Form.Label>
            <Form.Control
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formZipcode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone No:</Form.Label>
            <Form.Control
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="radio"
              label="Address Selected"
              checked={addressSelected}
              onChange={(e) => setAddressSelected(true)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address Type:</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Default"
                name="addressType"
                value="default"
                checked={defaultAddress}
                onChange={() => setDefaultAddress(true)}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleAdd({
              country,
              landmark,
              zipcode,
              phoneNo,
              defaultAddress,
              addressSelected,
            })
          }
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
