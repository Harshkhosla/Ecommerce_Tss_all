import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddAddressModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleAdd: (address: {
    country: string;
    landmark: string;
    zipcode: string;
    phoneNo: string;
    defaultAddress: boolean;
    addressSelected: boolean;
  }) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  showModal,
  handleCloseModal,
  handleAdd,
}) => {
  const [country, setCountry] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<boolean>(false);

  const handleSubmit = () => {
    handleAdd({
      country,
      landmark,
      zipcode,
      phoneNo,
      defaultAddress,
      addressSelected,
    });

    // Reset form after adding address
    setCountry("");
    setLandmark("");
    setZipcode("");
    setPhoneNo("");
    setDefaultAddress(false);
    setAddressSelected(false);
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
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
              type="checkbox"
              label="Address Selected"
              checked={addressSelected}
              onChange={(e) => setAddressSelected(e.target.checked)}
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
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
