import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editContactPage_cms, getContactUs_cms_meta, updateContactUs_cms_meta, updateUser, uploadImages } from "../../../User_Management/features/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import { Grid } from "react-loader-spinner";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { getContactPage_cms } from "../../../User_Management/features/userSlice";
import { useSelector } from "react-redux";
const CMSContactUs = ({ setActiveTab, setExpand }) => {

  setActiveTab("pages");
  setExpand("contentManagement")
  const head = "Contact Us";

  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const location = useLocation();
  const preData = location.state;
// console.log(preData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getContactUs_cms_meta());

      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  //   //Contact widget
  const seoData = useSelector((state) => state.userManagement.getContactUs_cms_meta);
  // //Social Media
  // console.log(seoData);
  // console.log("Data is")



  const [mailID, setMailID] = useState(preData.email);
  const [contactNo, setContactNo] = useState(preData.contactNo);
  //   //About US
  const [telNo, setTelNo] = useState(preData.phoneNo);
  const [address, setAddress] = useState(preData.address);
  const [officeAddress, setOfficeAddress] = useState(preData.officeAddress);

  //   //Newsletter
  const [metatitle, setMetaTitle] = useState(preData.SEOArea.metaTitle)
  const [metadesc, setMetaDesc] = useState(preData.SEOArea.metaDescription)
  const [metakeywords, setMetaKeywords] = useState(preData.SEOArea.metaKeywords)
  const [metaphoto, setMetaPhoto] = useState();
 
  const handleEmailChange = (event) => {
    setMailID(event.target.value);
  };

  const handleContactNoChange = (event) => {
    setContactNo(event.target.value);
  };

  const handleTelNoChange = (event) => {
    setTelNo(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleOfficeAddressChange = (event) => {
    setOfficeAddress(event.target.value);
  };
  const handleMetaTitleChange = (event) => {
    setMetaTitle(event.target.value);
  };
  const handleMetaDescChange = (event) => {
    setMetaDesc(event.target.value);
  };
  const handleMetaKeywordChange = (event) => {
    setMetaKeywords(event.target.value);
  };

     const handleMetaPhotoChange = async (event) => {
        const files = event.target.files;
        if (!files.length) return;
        setLoading(true);
        const resultAction = await dispatch(uploadImages(files));
        if (uploadImages.fulfilled.match(resultAction)) {
          setMetaPhoto(resultAction?.payload?.[0]);
        } else {
          console.error("Upload failed:", resultAction.payload);
        }
        setLoading(false);
      };
    
  const handleMetaPhotoRemove = () => {
    setMetaPhoto(null);
  };

  // const bgImg = (event)=>{
  //     let img = event.target.files[0]

  //     setBgImg(img);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (mailID) formData.append("email", mailID);
    if (contactNo) formData.append("contactNo", contactNo);
    if (telNo) formData.append("tel", telNo);
    if (address) formData.append("address", address);
    if (officeAddress) formData.append("officeAddress", officeAddress);
    if (metadesc) formData.append("SEOArea.metaDescription", metadesc);
    if (metaphoto) formData.append("SEOArea.images", metaphoto);
    if (metatitle) formData.append("SEOArea.metaTitle", metatitle);
    if (metakeywords) formData.append("SEOArea.metaKeywords", metakeywords);
    
    setLoading(true);
    await dispatch(editContactPage_cms(formData));
    setLoading(false);
    navigate("/home/pages")
    window.location.reload();
  };
  const handleSeoSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (metadesc) formData.append("SEOArea.metaDescription", metadesc);
    if (metaphoto) formData.append("SEOArea.images1", metaphoto);
    if (metatitle) formData.append("SEOArea.metaTitle", metatitle);
    if (metakeywords) formData.append("SEOArea.metaKeywords", metakeywords);
   
    setLoading(true);
    await dispatch(editContactPage_cms(formData));
    setLoading(false);

    // window.location.reload();
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
      <div className="" style={{ background: "white" }}>
        <TopHeader className="fixed " head={head} />
      </div>
      {/* Same */}
      <div className="ml-80 mt-20 relative w-[65vw]" style={{ marginTop: "100px" }}>
        <form onSubmit={handleSubmit}  >

          <div className="">
            <div className="bg-[#EEEEEE] p-5 mt-4 rounded-md drop-shadow-md border ">
              <div className="grid grid-cols-2 gap-4">
                <label className="grid pr-6 ">
                  Email ID
                  <input
                    type="email"
                    value={mailID}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleEmailChange}
                    required
                  />
                </label>
                <label className="grid pr-6 ">
                  Contact Number
                  <input
                    type="tel"
                    value={contactNo}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleContactNoChange}
                    required
                  />
                </label>

                <label className="grid pr-6 ">
                  Tel Number
                  <input
                    type="tel"
                    value={telNo}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTelNoChange}

                  />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] p-5 mt-4 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  Address
                  <textarea
                    type="text"
                    value={address}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleAddressChange}
                    rows={4}
                    required
                  />
                </label>
              </div>
              <div className="bg-[#EEEEEE] p-5 mt-4 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  Office Address
                  <textarea
                    type="text"
                    value={officeAddress}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleOfficeAddressChange}
                    rows={4}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">SEO Area</div>
            <form onSubmit={handleSeoSubmit}>
              <label className="grid pr-6 ">
                Meta Title
                <input
                  type="add"
                  value={metatitle}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handleMetaTitleChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>
              <label className="grid pr-6 mt-4">
                Meta Description
                <textarea
                  type="add"
                  value={metadesc}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handleMetaDescChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid pr-6 mt-4">
                Meta Keywords
                <textarea
                  type="add"
                  value={metakeywords}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handleMetaKeywordChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid pr-6 mt-4">
                Meta Image
                {metaphoto ? (null) : (

                  <div className="flex items-center mb-2">
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img
                        src={preData.SEOArea.images1}
                        alt="Meta Photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )
                }
                {metaphoto ? (
                  <div className="flex gap-2 mt-2 items-center">
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img
                        src={metaphoto}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Button color="error" variant="contained" size="small"
                        onClick={handleMetaPhotoRemove}
                      >
                        Replace
                      </Button>
                    </div>
                  </div>
                ) :
                  (
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handleMetaPhotoChange}
                      class="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[20rem]"
                      style={{ border: "2px solid #e6f7fe" }}
                    />
                  )}
              </label>
              <div className="flex mt-10 gap-5 items-center">
                <button
                  className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                  style={{
                    width: "130px",
                    height: "55px",
                    color: "white",
                  }}
                  type="submit"
                  onClick={handleSeoSubmit}>
                  SET SEO DATA
                </button>
              </div>
            </form>
          </div>

          <div className="flex mt-10 gap-5 items-center">
            <button
              className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
              style={{
                width: "130px",
                height: "55px",
                color: "white",
              }}
              type="submit"
              onSubmit={handleSubmit}>
              SAVE
            </button>
            <NavLink to="/home/pages">
              <button
                className="rounded bg-black hover:bg-gray-800"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}>
                Back
              </button>
            </NavLink>
          </div>
        </form>
      </div>













    </div>










    // // {/*            
    // //             <label className="grid pr-6">
    // //               Background Image
    // //               {bgImg ? (null) : (

    // //                 <div className="flex items-center mb-2">
    // //                   <div className="w-20 h-20 rounded overflow-hidden">
    // //                     <img
    // //                       src={editData.photo}
    // //                       alt="User profile"
    // //                       className="w-full h-full object-cover"
    // //                     />
    // //                   </div>
    // //                 </div>
    // //               )
    // //               }
    // //               {photo ? (
    // //                 <div className="flex items-center">
    // //                   <div className="w-20 h-20 rounded overflow-hidden">
    // //                     <img
    // //                       src={URL.createObjectURL(photo)}
    // //                       alt="User profile"
    // //                       className="w-full h-full object-cover"
    // //                     />
    // //                   </div>
    // //                   <div>
    // //                     <button
    // //                       style={{
    // //                         color: "red",
    // //                         paddingLeft: "5px",
    // //                         cursor: "pointer",
    // //                         backgroundColor: "white",
    // //                         marginLeft: "20px",
    // //                       }}
    // //                       onClick={handlePhotoRemove}>
    // //                       Remove
    // //                     </button>
    // //                   </div>
    // //                 </div>
    // //               ) : (
    // //                 <input
    // //                   type="file"
    // //                   id="photo"
    // //                   name="photo"
    // //                   accept="image/*"
    // //                   onChange={handlePhotoChange}
    // //                   // required
    // //                   class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh]"
    // //                   style={{ border: "2px solid #e6f7fe" }}
    // //                 />
    // //               )}
    // //             </label>
    // //           </div>
    // //           <div className="flex mt-10 gap-5 items-center">
    // //             <button
    // //               className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
    // //               style={{
    // //                 width: "130px",
    // //                 height: "55px",
    // //                 color: "white",
    // //               }}
    // //               type="submit"
    // //               onSubmit={handleSubmit}>
    // //               SAVE
    // //             </button>
    // //             <NavLink to="/home/header">
    // //               <button
    // //                 className="rounded bg-black hover:bg-gray-800"
    // //                 style={{
    // //                   width: "130px",
    // //                   height: "55px",
    // //                   color: "white",
    // //                 }}>
    // //                 Back
    // //               </button>
    // //             </NavLink> */}
    // //           </div>
    // //         </form>
    // //       </div>
    // //     </div>
  );
};

export default CMSContactUs;
