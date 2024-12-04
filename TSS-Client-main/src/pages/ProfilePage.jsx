import { useEffect, useState, useRef } from "react";
import ShopTags from "../components/common/Tags";
import { Row, Container, Col, Image } from "react-bootstrap";
import Sidebar from "../components/profile/Sidebar";
import AddressCard from "../components/profile/AddressCard";
import tssurl from "../port";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaLocationDot } from "react-icons/fa6";
import AddAddressModal from "../components/profile/AddressModal";

const ProfilePage = (position) => {
  const mID = localStorage.getItem("MID");
  const authToken = localStorage.getItem("authToken");
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  console.log(imageFile, "kkkkkkkkkk");
  const fileInputRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  const handleAddAddress = async (addressData) => {
    try {
      addressData.latitude = position?.position?.latitude;
      addressData.longitude = position?.position?.longitude;
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Address added successfully:", data);
        setShowModal(false);
      } else {
        const errorMessage = await response.text();
        console.error("Failed to add address:", errorMessage);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const addressesArray = Object.values(addresses);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error("Failed to fetch addresses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const onDelete = async (addressID, mID) => {
    try {
      const response = await fetch(
        `${tssurl}/auth/users/${mID}/addresses/${addressID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Address deleted successfully");

        setAddresses(addresses.filter((address) => address._id !== addressID));
        window.location.reload();
      } else {
        console.error("Failed to delete address:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleBoxClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    mobileNo: "",
    pic_url: "",
  });
  console.log("formdata", formData);

  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const userId = localStorage.getItem("MID");
  useEffect(() => {
    fetch(`${tssurl}/auth/users/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((userData) => {
        setFormData(userData?.user);
        setOriginalFormData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      if (editMode) {
        const file = e.target.files[0];
        if (file) {
          setFormData({
            ...formData,
            pic_url: file,
          });
          setImageFile(file);
          previewFile(file);
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const formDataToUpdate = {
    name: formData.name,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
    birth_date: formData.birth_date,
    image: formData.pic_url,
  };

  console.log("formData", formDataToUpdate);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (formDataToUpdate.name) formData.append("name", formDataToUpdate.name);
    if (formDataToUpdate.mobileNo) formData.append("mobileNo", formDataToUpdate.mobileNo);
    if (formDataToUpdate.gender) formData.append("gender", formDataToUpdate.gender);
    if (formDataToUpdate.birth_date) formData.append("birth_date", formDataToUpdate.birth_date);
    if (formDataToUpdate.image) formData.append("image", formDataToUpdate.image);
    try {
      const response = await fetch(`${tssurl}/auth/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Form data updated successfully");
        setEditMode(false);
        window.location.reload();
      } else {
        console.error("Failed to update form data");
      }
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setEditMode(false);
    window.location.reload();
  };

  console.log("original", originalFormData);
  const updateAddress = (addressId, updatedData) => {
    setAddresses(
      addresses.map((address) => {
        if (address._id === addressId) {
          return { ...address, ...updatedData };
        }
        return address;
      })
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <ShopTags />
        </Row>
        <Row className="flex">
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <p className="fw-bold mt-5 fs-4">Personal Information</p>
            <Row>
              <Col md={3} className="justify-content-center">
                <div className="profile-options" style={{ marginTop: "25px" }}>
                  <div className="profile-picture">
                    <Image
                      src={previewSource || formData?.pic_url}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "125px", height: "125px" }}
                    />
                  </div>
                  {editMode && ( // Render the button only if editMode is true
                    <>
                      <input
                        id="profilePictureInput"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        ref={fileInputRef}
                        onChange={handleChange}
                        style={{ display: "none" }}
                        disabled={!editMode}
                      />
                      <label
                        htmlFor="profilePictureInput"
                        className="upload-new-picture"
                        onClick={handleClick}
                      >
                        Upload Picture
                      </label>
                    </>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="profile-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData?.email}
                        required
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        value={
                          typeof formData.birth_date === "string"
                            ? formData.birth_date.slice(0, 10)
                            : formData.birth_date
                        }
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender:</label>
                      <div className="d-flex flex-row gap-2 align-items-center">
                        <div className="mr-3">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className="mr-3">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                          <label htmlFor="female">Female</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="mobileNo"
                        value={formData?.mobileNo}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </div>

                    {!editMode ? (
                      <button
                        className="card-button"
                        type="button"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </button>
                    ) : (
                      <div>
                        <button
                          className="card-button"
                          type="button"
                          style={{ marginRight: "20px" }}
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                        <button
                          className="card-button"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={2} />
          <Col md={2}>
            <div className="rectangle-box " onClick={handleBoxClick}>
              <FaLocationDot />
              <p>Add New Address</p>
            </div>
            <AddAddressModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              handleAdd={handleAddAddress}
              updateAddress={updateAddress}
            />
          </Col>

          <Col md={8} sm={12}>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={addressesArray?.length < 4 ? 2 : 3}
              slidesToScroll={1}
              arrows={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {Array.isArray(addressesArray) && addressesArray.length > 0 ? (
                addressesArray[0].map((address) => (
                  <div key={address?._id}>
                    <AddressCard
                      address={address}
                      onDelete={onDelete}
                      updateAddress={updateAddress}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <p>No addresses found.</p>
                </div>
              )}
            </Slider>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
