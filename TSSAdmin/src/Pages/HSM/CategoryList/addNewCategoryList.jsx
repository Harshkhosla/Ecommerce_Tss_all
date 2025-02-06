import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewCategoryList, uploadImages } from "../../User_Management/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const AddNewCategoryList = ({ setExpand, setActiveTab }) => {
    setExpand("homeService");
    setActiveTab("categoryList");
    const head = "Add New Category List";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("clicked")
        const formData = new FormData();
        formData.append("categoryName", title);
        images.forEach((image, index) => {
            formData.append(`images1`, image);
        });

        await dispatch(addNewCategoryList(formData));
        navigate('/home/categoryList')
    };



     const handlePhotoUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) return;
        // setLoading(true);
        const resultAction = await dispatch(uploadImages(files));
        if (uploadImages.fulfilled.match(resultAction)) {
            setImages(resultAction?.payload);
        } else {
          console.error("Upload failed:", resultAction.payload);
        }
        // setLoading(false);
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
                                        src={image} // replace with your image source
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
                    <Link to='/home/categoryList'>
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

export default AddNewCategoryList;
