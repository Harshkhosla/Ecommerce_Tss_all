import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch } from "react-redux";
import { updateCategoryList, uploadImages } from "../../User_Management/features/userSlice";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const EditCategoryList = ({ setExpand, setActiveTab }) => {
    setExpand("homeService");
    setActiveTab("categoryList");
    const head = "Edit Category";
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const [title, setTitle] = useState(data.catname);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    // console.log(data);

    const handleSubmit = async (event, cid) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("categoryName", title);
        images.map((image, index) => {
            formData.append("images1", image);
        });
        await dispatch(updateCategoryList({ formData, cid }));
        navigate('/home/categoryList');
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


    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div>
            <div className="flex fixed z-10">
                <TopHeader className="fixed" head={head} />
            </div>

            <div className=" ml-72 mb-10 relative" style={{ marginTop: "120px" }}>
                <form
                // onSubmit={ handleSubmit( event,data.cid)}
                >
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
                            required
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
                                                src={image}
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
                        type="submit"
                        onClick={(event) => handleSubmit(event, data.cid)}>
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
                        >
                            Cancel
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryList;
