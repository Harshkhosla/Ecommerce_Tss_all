import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../User_Management/features/userSlice";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../Assets/index";


const CMSAddMember = ({ setExpand, setActiveTab }) => {
  setExpand("contentManagement");
  setActiveTab("department");
  const head = "Add Member";
  const Navigate = useNavigate();
//   const location = useLocation();
//   const data = location.state;
  

  const [title, setTitle] = useState('');
  const [images, setImages] = useState();
  const [desc , setDesc ] = useState('');
 
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("cid", data.cid);
//     formData.append("category_name", title);
//     images.map((image, index) => {
//       formData.append("category_icon", image);
//     });

//     await dispatch(updateCategory({ formData, title }));
//     navigate('/home/categoryManagement');
//   };




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
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-72 mb-8 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border " style={{ marginTop: "120px" }}>
        <form >
         

          <label className="grid pr-6" style={{ marginTop: "20px" }}>
            Member Photo
            <div style={{ width: "600px", marginTop: "10px" }}>
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
          <label className="grid mt-5">
            Member Name
            <input
              type="text"
              placeholder="Enter Member Name"
              id="title"
              className=" w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{
                height: "50px",
                
                
              
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>
          <label className="grid mt-5">
            Member Description
            <textarea
              type="text"
              placeholder="Enter Member Description"
              id="title"
              className=" w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{
                height: "100px",
                
                
              
                fontSize: "15px",
              }}
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              required
            />
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
            >
            Save
          </button>
          <Link to='/home/addDepartment'>
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

export default CMSAddMember;
