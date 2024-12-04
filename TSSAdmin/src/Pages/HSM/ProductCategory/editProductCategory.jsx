import { useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { productCategoryList } from "../../User_Management/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";

const EditProductCategory = ({ setExpand, setActiveTab }) => {
    setExpand("homeService");
    setActiveTab("productCategoryList");
    const head = "Edit Product Category";
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [loading, setLoading] = useState(false);


    const [pcid, setpcid] = useState(data.pcid);
    const [title, setTitle] = useState(data.catname);
    const [CategoryList, setCategoryList] = useState(data.CategoryList);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ID = data.pcid;

        const formData = new FormData();
        // formData.append("pcid", data._id);
        formData.append("categoryName", title);
        formData.append("category_list", CategoryList);
        images.map((image, index) => {
            formData.append("image", image);
        });

        setLoading(true);
        await dispatch(productCategoryList({ formData, ID }));
        setLoading(false);
        navigate('/home/productCategoryList');
    };

    const uploadFile = async (file) => {
        try {
          // Create a FormData object to append the file
          const formData = new FormData();
          formData.append('files', file);
      
          // Make a POST request using Axios
          const response = await axios.post('http://64.227.186.165:5002/upload', formData);
      
          // Log the response
        //   console.log(response.data);
          return response.data;
        } catch (error) {
          // Handle errors
          console.error('Error uploading file:', error);
          throw error;
        }
      };
    const handlePhotoUpload = (event) => {
        const files = event.target.files;
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setImages(uploadedImages);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        // console.log(images,"jjjj");
        setImages(newImages);

        // fileInputRef.current.value = newImages.length;
    };
    return (
        <div>
            {loading ? (
                <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
                    <Grid
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : null}
            <div className="flex fixed z-10">
                <TopHeader className="fixed" head={head} />
            </div>

            <div className=" ml-72 mb-10 relative" style={{ marginTop: "120px" }}>
                <div >
                    <label className="grid mt-5">Category List :
                        <select id=""
                            style={{
                                height: "50px",
                                backgroundColor: "#e5ecff",
                                fontSize: "15px",
                            }}
                            value={CategoryList}
                            onChange={(event) => setCategoryList(event.target.value)}
                            className="px-4 py-2 mt-3 drop-shadow-md rounded-md  ">
                            <option >Select Category</option>
                            {data.CategoryListmgm.map((item, index) => (
                                <option value={item.categoryName}>{item.categoryName}</option>
                            ))}
                        </select>
                    </label>
                    <label className="grid mt-5">
                        Category Name
                        <input
                            type="text"
                            placeholder="Enter Title"
                            id="title"
                            className="rounded w-[100vh] outline-none"
                            style={{
                                height: "50px",
                                paddingLeft: "10px",
                                backgroundColor: "#e5ecff",
                                marginTop: "5px",
                                fontSize: "15px",
                            }}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>

                    <label className="grid pr-6" style={{ marginTop: "20px" }}>
                        Photos
                        <div style={{ width: "600px", marginTop: "10px" }}>
                            {images && images.length > 0 ? (
                                null
                            ) : (
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="relative">
                                        <img
                                            src={data.photo}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                marginRight: "10px",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            {images && images.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={image.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <button
                                                className="absolute top-0 text-white"
                                                style={{ right: 46 }}
                                                onClick={() => handleRemoveImage(index)}>
                                                <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    style={{
                                        height: "48px",
                                        width: "590px",
                                        paddingLeft: "0px",
                                        border: "2px solid 	#e6f7fe",
                                        marginTop: "5px",
                                        fontSize: "14px",
                                    }}
                                    className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    placeholder=""
                                />
                            )}
                        </div>
                    </label>

                    {/* <div> */}
                    <button
                        className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
                        style={{
                            width: "170px",
                            height: "55px",
                            color: "white",
                        }}
                        onClick={(event) => handleSubmit(event)}>
                        Save
                    </button>
                    <Link to='/home/productCategoryList'>
                        <button
                            className="rounded mt-10 bg-black hover:bg-gray-800"
                            style={{
                                width: "170px",
                                height: "55px",
                                color: "white",
                                marginLeft: "30px",
                            }}
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditProductCategory;
