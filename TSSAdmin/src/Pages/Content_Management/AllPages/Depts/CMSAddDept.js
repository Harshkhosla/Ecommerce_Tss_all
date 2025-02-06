import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch } from "react-redux";
import { addNewDept_cms, updateCategory, uploadImages } from "../../../User_Management/features/userSlice";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../Assets/index";
import Table from "../../../../UI/CommonTable/Table";
import { Icon, Button } from "@mui/material";


const CMSAddDept = ({ setExpand, setActiveTab }) => {
  setExpand("userManagement");
  setActiveTab("department");
  const head = "Add Department";

  const pageSize = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState();
  const [slug, setSlug] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("department_name", title);
    formData.append("department_photo1", photo);
    setLoading(true);
    await dispatch(addNewDept_cms(formData));
    setLoading(false);
    navigate('/home/department');
    window.location.reload();
  };



  const handlePhotoChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setPhoto(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };


  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-72 mb-10 relative w-full bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit} >

          <label className="grid pr-6" style={{ marginTop: "20px" }}>
            Department Photo
            {photo ? (
              <div className="flex gap-2 items-center">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img
                    src={photo}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Button color="error" variant="contained" size="small"
                    onClick={handlePhotoRemove}>
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent  rounded appearance-none placeholder-transparent w-[20rem]"
                style={{ border: "2px solid #e6f7fe" }}
              />
            )}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid mt-5">
              Department Name
              <input
                type="text"
                placeholder="Enter Department Name"
                id="title"
                className=" outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
                style={{
                  height: "50px",



                  fontSize: "15px",
                }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>

          </div>
          <button
            className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
          <Link to='/home/department'>
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

export default CMSAddDept;
