import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../User_Management/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const AddNewCategory = ({ setExpand, setActiveTab }) => {
  setExpand("marketPlace");
  setActiveTab("categoryManagement");
  const head = "Add New Category";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("clicked")
    const formData = new FormData();
    formData.append("category_name", title);
    images.forEach((image, index) => {
      formData.append(`category_icon`, image);
    });

    dispatch(addNewCategory(formData));
    navigate('/home/categoryManagement')
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-72 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid mt-5">
            Category Name
            <input
              type="text"
              placeholder="Enter Category Name"
              id="title"
              className="rounded w-[100vh] outline-none"
              style={{
                height: "50px",
                paddingLeft: "10px",
                border: "2px solid 	#e6f7fe",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <div>
            <label className="grid mt-5" style={{ fontSize: "15px" }}>
              Category Icon
              <input
                 className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer mt-3 rounded appearance-none placeholder-transparent"
                style={{ border: "2px solid #e6f7fe", width: "450px" }}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
              />
            </label>
          </div>
          <div style={{ width: "600px", marginTop: "10px" }}>
            {images && images.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)} // replace with your image source
                    alt={image.name} // replace with your image alt text
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
            onSubmit={handleSubmit}>
            Save
          </button>
          <Link to='/home/categoryManagement'>
          <button
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            type="submit">
              Cancel
          </button>
              </Link>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
