'use client';

import { useEffect, useState, useRef } from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
// import ShopTags from "@/components/common/Tags";
import AddressCard from "@/components/common/AddressCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLocationDot } from "react-icons/fa6";
import { tssurl } from "../port";
import Sidebar from "@/components/profile/Sidebar";
import Tags from "@/components/common/Tags";
import { toast } from "react-toastify";
import AddAddressModal from "@/components/common/AddressModal";

interface Address {
  _id: string;
  latitude: number;
  longitude: number;
  [key: string]: number;
}

interface User {
  name: string;
  email: string;
  birth_date: string;
  gender: string;
  mobileNo: string;
  pic_url: string;
}

const ProfilePage: React.FC = () => {
  const mID = typeof window !== "undefined" ? localStorage.getItem("MID") : null;
  const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    birth_date: "",
    gender: "",
    mobileNo: "",
    pic_url: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!mID || !authToken) return;
    fetch(`${tssurl}/auth/users/${mID}`)
      .then((res) => res.json())
      .then((data) => setFormData(data.user))
      .catch(console.error);
    fetch(`${tssurl}/auth/users/${mID}/addresses`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then(setAddresses)
      .catch(console.error);
  }, [mID, authToken]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editMode && e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewSource(URL.createObjectURL(file));
    }
  };
  const updateAddress = (addressId: string, updatedData: Partial<Address>) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address._id === addressId ? { ...address, ...updatedData } : address
      )
    );
  };
  
  const onDelete = async (addressID: string, mID: string | null) => {
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
  
      if (!response.ok) {
        throw new Error(`Failed to delete address: ${response.statusText}`);
      }
  
      console.log("Address deleted successfully");
  
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressID)
      );
  
      // Instead of full reload, consider showing a toast
      toast.success("Address deleted successfully");
  
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };
  

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mID) return;
    const formDataToUpdate = new FormData();
    formDataToUpdate.append("name", formData.name);
    formDataToUpdate.append("mobileNo", formData.mobileNo);
    formDataToUpdate.append("gender", formData.gender);
    formDataToUpdate.append("birth_date", formData.birth_date);
    if (imageFile) formDataToUpdate.append("image", imageFile);
    
    await fetch(`${tssurl}/auth/users/${mID}`, {
      method: "PUT",
      body: formDataToUpdate,
    });
    setEditMode(false);
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row><Tags/></Row>
      <Row>
        <Col md={3}><Sidebar/></Col>
        <Col md={9}>
          <p className="fw-bold mt-5 fs-4">Personal Information</p>
          <Row>
            <Col md={3} className="justify-content-center">
              <Image
                src={previewSource || formData.pic_url}
                alt="Profile"
                className="rounded-circle"
                width={125}
                height={125}
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
              )}
            </Col>
            <Col md={6}>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!editMode} />
                <input type="email" name="email" value={formData.email} disabled />
                <input type="date" name="birth_date" value={formData?.birth_date?.slice(0, 10)} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} disabled={!editMode} />
                <button type="submit" hidden={!editMode}>Update</button>
                <button type="button" onClick={() => setEditMode(!editMode)}>Edit</button>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={2}><FaLocationDot onClick={() => setShowModal(true)} /></Col>
        <Col md={8}>
          <Slider dots infinite slidesToShow={2} slidesToScroll={1}>
            {addresses.length ? addresses.map((address) => (
              <AddressCard 
              key={address._id} 
              address={address} 
              onDelete={(id, mID) => onDelete(id, mID)}
              updateAddress={(id, updatedData) => updateAddress(id, updatedData)}
            />
            )) : <p>No addresses found.</p>}
          </Slider>
        </Col>
      </Row>
      <AddAddressModal showModal={showModal} handleCloseModal={() => setShowModal(false)} handleAdd={(newAddress) => console.log(newAddress)}/>
    </Container>
  );
};

export default ProfilePage;
