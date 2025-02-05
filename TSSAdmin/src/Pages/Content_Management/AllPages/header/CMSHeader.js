import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_header_data_cms, updateUser, update_header_data_cms, uploadImages } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import { getUserLogin } from "../../../User_Management/features/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import { ClassNames } from "@emotion/react";
import { ProductCategories } from "../../../User_Management/features/userSlice";

const CMSHeader = ({ setActiveTab, setExpand }) => {
  setExpand("contentManagement");
  setActiveTab("header");
  const head = "Header Configuration";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(ProductCategories());
    };
    fetchUserData();
  }, [dispatch]);

  const productData = useSelector(
    (state) => state.userManagement.ProductCategories
  );
  // console.log(productData, "jsjjdj");

  const [masterLinks, setMasterLinks] = useState([

  ]);
  const [loading, setLoading] = useState(false);
  const [topInput, setTopInput] = useState('default');
  useEffect(() => {
    const fetchHeaderData = async () => {
      setLoading(true);
      await dispatch(get_header_data_cms());
      setLoading(false);
    };
    fetchHeaderData();
  }, [dispatch]);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem("uid")));
  }, [dispatch]);
  const preData = useSelector(
    (state) => state.userManagement.get_header_data_cms
  );
  // console.log(preData?.headerr?.brand_logo?.url);
  useEffect(() => {
    preData.headerr && setMasterLinks(JSON.parse(preData.headerr.header));
    // console.log(preData)
  }, [preData])
  const [divCount, setDivCount] = useState(0); // State to track the number of divs rendered
  const [deletedKeys, setDeletedKeys] = useState([]);

  const handleAddMore = () => {
    setMasterLinks([...masterLinks, { Mname: "", nav_link: [] }]); // Increment the div count when "Add More" is clicked
  };

  const handleDelete = (key) => {
    const newArray = [...masterLinks];
    newArray.splice(key, 1);
    setMasterLinks(newArray);
    // console.log(newArray);
  };

  const visibleDivs = [...Array(divCount)].map((_, index) => {
    const key = `div_${index}`;
    return {
      key,
      isVisible: !deletedKeys.includes(key),
    };
  });
  useEffect(() => {
    // console.log(LuserData.role == "admin");
  }, [LuserData]);
  const [photo, setPhoto] = useState();
  const [links, setLinks] = useState([]);
  // useEffect(() => {
  //   if (preData && preData.nav_links && preData.nav_links.length > 0) {
  //     let newLinks = JSON.parse(preData.nav_links)
  //     // console.log(newLinks);
  //     setLinks(newLinks);
  //   }
  // }, [preData.nav_links])
  const handleNameChange = (index, e) => {
    const updatedLinks = [...masterLinks]; // Create a copy of the links array
    updatedLinks[index] = {
      ...updatedLinks[index], // Create a copy of the object at the specified index
      Mname: e.target.value, // Update the 'name' property
    };
    setMasterLinks(updatedLinks); // Update the state with the modified array
  };
  const handleMLinkChange = (index, e) => {
    const updatedLinks = [...masterLinks]; // Create a copy of the links array
    updatedLinks[index] = {
      ...updatedLinks[index], // Create a copy of the object at the specified index
      MLink: e.target.value, // Update the 'name' property
    };
    setMasterLinks(updatedLinks); // Update the state with the modified array
  };

  const handleAddLink = (index) => {
    const newLinkObj = { name: "", link: "" };
    setMasterLinks((prevLinks) => {
      if (index >= 0 && index < prevLinks.length) {
        const updatedLinks = prevLinks.map((linkItem, i) => {
          if (i === index) {
            return {
              ...linkItem,
              nav_link: [...linkItem.nav_link, newLinkObj],
            };
          }
          return linkItem;
        });
        return updatedLinks;
      } else {
        return prevLinks;
      }
    });
  };

  const editLinkName = (index, navLinkIndex, newName) => {
    setMasterLinks(prevLinks => {
      if (index >= 0 && index < prevLinks.length) {
        const updatedLinks = [...prevLinks];
        const navLinks = updatedLinks[index].nav_link;

        if (navLinkIndex >= 0 && navLinkIndex < navLinks.length) {
          navLinks[navLinkIndex].name = newName;
        }

        return updatedLinks;
      }
      return prevLinks;
    });
  };

  const editLabelName = (index, navLinkIndex, newName) => {
    setMasterLinks((prevLinks) => {
      if (index >= 0 && index < prevLinks.length) {
        const updatedLinks = [...prevLinks];
        const navLinks = updatedLinks[index].nav_link;

        if (navLinkIndex >= 0 && navLinkIndex < navLinks.length) {
          navLinks[navLinkIndex].link = newName;
        }

        return updatedLinks;
      }
      return prevLinks;
    });
  };

  const handleDeleteLink = (index, navLinkIndex) => {
    setMasterLinks((prevLinks) => {
      if (index >= 0 && index < prevLinks.length) {
        const updatedLinks = [...prevLinks];
        const navLinks = updatedLinks[index].nav_link;

        if (navLinkIndex >= 0 && navLinkIndex < navLinks.length) {
          navLinks.splice(navLinkIndex, 1);
        }

        return updatedLinks;
      }
      return prevLinks;
    });
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  // const handlePhotoChange = (event) => {
  //   let img = event.target.files[0];
  //   setPhoto(img);
  // };

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
  
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (masterLinks) formData.append("header", JSON.stringify(masterLinks));
    if (photo) formData.append("brand_logo", photo);
    setLoading(true);
    await dispatch(update_header_data_cms(formData));
    setLoading(false);
    navigate("/home/header");
    window.location.reload();
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
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-80 mt-20 relative w-[70vw]">
        <form onSubmit={handleSubmit}>
          <label className="flex gap-3 items-center pr-6 mt-3">
            <h3 style={{ fontSize: "25px" }}> Brand Logo :</h3>

            {photo ? null : (
              <div className="flex items-center mb-2">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img
                    src={preData?.headerr?.brand_logo?.url}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            {photo ? (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img
                    src={photo}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={handlePhotoRemove}
                  >
                    Replace
                  </Button>
                </div>
              </div>
            ) : LuserData.role == "admin" || LuserData.role == "editor" ? (
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                // required
                className="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent rounded appearance-none placeholder-transparent w-[30rem]"
                style={{ border: "2px solid #e6f7fe" }}
              />
            ) : null}
          </label>

          {masterLinks.map((item, key) => (
            <div
              key={key}
              className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border mt-3"
            >
              <Button
                style={{ position: "absolute", top: "10px", right: "10px" }}
                color="error"
                variant="contained"
                size="small"
                onClick={() => handleDelete(key)}
              >
                <CloseIcon />
              </Button>

              {/* <h3 style={{ fontSize: '25px' }} >Navigation Links</h3> */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={item.Mname}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={(e) => handleNameChange(key, e)}
                  required
                  // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
                {item.nav_link.length < 1 && (
                  <div className="flex items-center pr-2 mt-1 ">
                    <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                      http://TSS.com
                    </div>
                    <select
                      id="label"
                      name="label"
                      value={item.MLink}
                      onChange={(e) => handleMLinkChange(key, e)}
                      className="px-4 py-2 rounded-md rounded-s-none w-full"
                      required
                    >
                      <option value="">Select a page</option>
                      <option value="/home">home</option>
                      {productData.map((data, index) => (
                        <option key={index} value={data.categoryName}>
                          {data.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {item.nav_link && item.nav_link.length > 0 ? (
                item.nav_link.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 ms-6 mb-3"
                  >
                    <label className={`grid ${index == 0 && "mt-3"}`}>
                      {index == 0 && "Name"}
                      <input
                        type="text"
                        value={item.name}
                        className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                        onChange={(e) =>
                          editLinkName(key, index, e.target.value)
                        }
                        required
                        // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                      />
                    </label>
                    <label
                      className={`grid ${index == 0 && "mt-3"}`}
                      style={{ flexGrow: "1" }}
                    >
                      {index == 0 && "Page"}
                      <div className="flex items-center pr-2 mt-1 ">
                        <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                          http://TSS.com
                        </div>
                        <select
                          id="label"
                          name="label"
                          className="px-4 py-2 rounded-md rounded-s-none w-full"
                          value={item.link}
                          //  onChange={(e) => handleLabelChange(index, e)}
                          onChange={(e) =>
                            editLabelName(key, index, e.target.value)
                          }
                          // disabled={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                          required
                        >
                          <option value="">Select a page</option>
                          {productData.map((data, index) => (
                            <option key={index} value={data.categoryName}>
                              {data.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                    <div className={`${index == 0 && "self-end mb-1"}`}>
                      {LuserData.role == "admin" ||
                      LuserData.role == "editor" ? (
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          onClick={() => handleDeleteLink(key, index)}
                        >
                          <CloseIcon />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h1 className="ms-6 text-stone-500 mt-3">
                    (Click below to add Sub-Categories)
                  </h1>
                  <div
                    className="flex items-center gap-3 ms-6 mb-3"
                    style={{ visibility: "hidden", height: "0px" }}
                  >
                    <label className={`grid`}>
                      <input
                        type="text"
                        className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                      />
                    </label>
                    <label className={`grid `}>
                      <div className="flex items-center pr-6 ">
                        <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                          http://TSS.com
                        </div>
                        <select
                          id="label"
                          name="label"
                          className="px-4 py-2 rounded-md rounded-s-none w-full"
                        >
                          <option value="">Select a page</option>
                          <option value="admin">MarketPlace</option>
                          <option value="work">Showcase</option>
                          <option value="other">Home Service</option>
                        </select>
                      </div>
                    </label>
                    <div className={`self-end mb-1`}>
                      <Button color="error" variant="contained" size="small">
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {LuserData.role == "admin" || LuserData.role == "editor" ? (
                <div className="flex justify-start  ms-6">
                  <Button
                    variant="contained"
                    onClick={() => handleAddLink(key)}
                    color="themeColor"
                  >
                    Add Links
                    <AddIcon />
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
          <div className="mt-6">
            <Button
              variant="contained"
              color="themeColor"
              fullWidth
              onClick={handleAddMore}
            >
              + ADD MORE
            </Button>
          </div>
          <div className="flex my-10 gap-5 items-center">
            {LuserData.role == "admin" || LuserData.role == "editor" ? (
              <button
                className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}
                type="submit"
                onSubmit={handleSubmit}
              >
                SAVE
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CMSHeader;
