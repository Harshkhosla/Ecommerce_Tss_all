import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAbout_cms_meta, updateAbout_cms_meta, updateUser, uploadImages } from "../../../User_Management/features/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import { Grid } from "react-loader-spinner";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useSelector } from "react-redux";
import { getAboutUs_cms, editPagesAboutUs_cms } from "../../../User_Management/features/userSlice";

const CMSAbout = ({ setActiveTab, setExpand }) => {

  setActiveTab("pages");
  setExpand("contentManagement")
  const head = "About Us";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [loading, setLoading] = useState(false);
  //   //Contact widget
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getAbout_cms_meta());

      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const seoData = useSelector((state) => state.userManagement.getAbout_cms_meta);
  console.log(data,'savkjsdvn');


  // //Social Media
  const [title1, setTitle1] = useState(data.AboutBanner.title);
  const [description1, setDescription1] = useState(data.AboutBanner.description);
  //   //About US
  const [title2, setTitle2] = useState(data.title1.title);
  const [description2, setDescription2] = useState(data.title1.description);
  //   //Newsletter
  const [title3, setTitle3] = useState(data.title2.title);
  const [description3, setDescription3] = useState(data.title2.description);

  const [title4, setTitle4] = useState(data.MissionSection.title);
  const [description4, setDescription4] = useState(data.MissionSection.description);
  const [title5, setTitle5] = useState(data.VisionSection.title);
  const [description5, setDescription5] = useState(data.VisionSection.description);
  const [metatitle, setMetaTitle] = useState('')
  const [metadesc, setMetaDesc] = useState('')
  const [metakeywords, setMetaKeywords] = useState('')
  const [photo, setPhoto] = useState();
  const [photo3, setPhoto3] = useState();
  const [photo4, setPhoto4] = useState();
  const [metaphoto, setMetaPhoto] = useState();

  useEffect(() => {
    setMetaTitle(data?.SEOArea.MetaTitle)
    setMetaDesc(data?.SEOArea.MetaDescription)
    setMetaKeywords(data?.SEOArea.MetaKeywords)
  }, [])

  const handleTitle1Change = (event) => {
    setTitle1(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTitle2(event.target.value);
  };

  const handleTitle3Change = (event) => {
    setTitle3(event.target.value);
  };
  const handleTitle4Change = (event) => {
    setTitle4(event.target.value);
  };
  const handleTitle5Change = (event) => {
    setTitle5(event.target.value);
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




  const handleDescription1Change = (event) => {
    setDescription1(event.target.value);
  };
  const handleDescription2Change = (event) => {
    setDescription2(event.target.value);
  };
  const handleDescription3Change = (event) => {
    setDescription3(event.target.value);
  };
  const handleDescription4Change = (event) => {
    setDescription4(event.target.value);
  };
  const handleDescription5Change = (event) => {
    setDescription5(event.target.value);
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
  
    


    const handlePhoto3Change = async (event) => {
      const files = event.target.files;
      if (!files.length) return;
      setLoading(true);
      const resultAction = await dispatch(uploadImages(files));
      if (uploadImages.fulfilled.match(resultAction)) {
        setPhoto3(resultAction?.payload?.[0]);
      } else {
        console.error("Upload failed:", resultAction.payload);
      }
      setLoading(false);
    };
  


    const handlePhoto4Change = async (event) => {
      const files = event.target.files;
      if (!files.length) return;
      setLoading(true);
      const resultAction = await dispatch(uploadImages(files));
      if (uploadImages.fulfilled.match(resultAction)) {
        setPhoto4(resultAction?.payload?.[0]);
      } else {
        console.error("Upload failed:", resultAction.payload);
      }
      setLoading(false);
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

  

  const handlePhotoRemove = () => {
    setPhoto(null);
  };
  const handlePhoto3Remove = () => {
    setPhoto3(null);
  };

  
  const handlePhoto4Remove = () => {
    setPhoto4(null);
  };
  const handleMetaPhotoRemove = () => {
    setMetaPhoto(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (photo) formData.append("AboutBanner.image", photo);
    if (title1) formData.append("AboutBanner.title", title1);
    if (description1)formData.append("AboutBanner.description", description1);
    if (title2)  formData.append("title1.title", title2);
    if (description2)  formData.append("title1.description", description2);
    if (photo3) formData.append("MissionSection.image", photo3);
    if (photo4) formData.append("VisionSection.image", photo4);
    if (title3) formData.append("title2.title", title3);
    if (description3)formData.append("title2.description", description3);
    if (title4)formData.append("MissionSection.title", title4);
    if (description4)formData.append("MissionSection.description", description4);
    if (title5)formData.append("VisionSection.title", title5);
    if (description5)formData.append("VisionSection.description", description5);

    setLoading(true);
    await dispatch(editPagesAboutUs_cms(formData));
    setLoading(false);
    navigate("/home/pages")
    window.location.reload();
  };
  const handleSeoSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (metadesc) formData.append("SEOArea.MetaDescription", metadesc);
    if (metaphoto) formData.append("SEOArea.image", metaphoto);
    if (metatitle) formData.append("SEOArea.MetaTitle", metatitle);
    if (metakeywords)  formData.append("SEOArea.MetaKeywords", metakeywords);

    setLoading(true);
    await dispatch(editPagesAboutUs_cms(formData))
    setLoading(false);
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
      <div className="" style={{ background: "white" }}>
        <TopHeader className="fixed " head={head} />
      </div>
      {/* Same */}
      <div className="ml-80 mt-10 relative w-[70vw]" style={{ marginTop: "80px" }}>
        <form onSubmit={handleSubmit}  >
          <div className="grid gap-3">
            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] p-5 grid gap-2 rounded-md drop-shadow-md border flex-grow">
                <div className="text-xl font-semibold">About Banner</div>
                <label className="grid gap-2 pr-6">
                  Banner Picture
                  {photo ? (null) : (

                    <div className="flex items-center mb-2">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src={data?.AboutBanner?.image}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )
                  }
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
                <label className="grid pr-6 ">
                  Title
                  <input
                    type="text"
                    value={title1}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTitle1Change}
                  />
                </label>
                <label className="grid pr-6 ">
                  Description
                  <textarea
                    type="text"
                    value={description1}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleDescription1Change}
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] p-5  grid gap-2 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  Title
                  <input
                    type="text"
                    value={title2}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTitle2Change}
                  />
                </label>
                <label className="grid pr-6 ">
                  Description
                  <textarea
                    type="text"
                    value={description2}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    rows={5}
                    onChange={handleDescription2Change}
                  />
                </label>
              </div>
              <div className="bg-[#EEEEEE] p-5  grid gap-2 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  Title
                  <input
                    type="text"
                    value={title3}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTitle3Change}
                  />
                </label>
                <label className="grid pr-6 ">
                  Description
                  <textarea
                    type="text"
                    value={description3}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    rows={5}
                    onChange={handleDescription3Change}
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] grid gap-2 p-5 rounded-md drop-shadow-md border flex-grow">
                <div className="text-xl font-semibold">Mission Section</div>
                <label className="grid pr-6">
                  Picture 3
                  {photo3 ? (null) : (

                    <div className="flex items-center mb-2">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src={data?.MissionSection?.image}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )
                  }
                  {photo3 ? (
                    <div className="flex items-center mt-2 gap-2">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src={photo3}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Button color="error" variant="contained" size="small"
                          onClick={handlePhoto3Remove}>
                          Replace
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhoto3Change}
                      className="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent  rounded appearance-none placeholder-transparent w-[20rem]"
                      style={{ border: "2px solid #e6f7fe" }}
                    />
                  )}
                </label>
                <label className="grid pr-6 ">
                  Title 3
                  <input
                    type="text"
                    value={title4}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTitle4Change}
                  />
                </label>
                <label className="grid pr-6 ">
                  Description 3
                  <textarea
                    type="text"
                    value={description4}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleDescription4Change}
                    rows={4}
                  />
                </label>
              </div>
              <div className="bg-[#EEEEEE] grid gap-2 p-5 rounded-md drop-shadow-md border flex-grow">
                <div className="text-xl font-semibold">Vision Section</div>
                <label className="grid pr-6 ">
                  Picture 4
                  {photo4 ? (null) : (

                    <div className="flex items-center mb-2">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src={data?.VisionSection?.image}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )
                  }
                  {photo4 ? (
                    <div className="flex items-center mt-2 gap-2">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src={photo4}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Button color="error" variant="contained" size="small"
                          onClick={handlePhoto4Remove}>
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
                      onChange={handlePhoto4Change}
                      className="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[20rem]"
                      style={{ border: "2px solid #e6f7fe" }}
                    />
                  )}
                </label>
                <label className="grid pr-6 ">
                  Title 4
                  <input
                    type="text"
                    value={title5}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleTitle5Change}
                  />
                </label>
                <label className="grid pr-6 ">
                  Description 4
                  <textarea
                    type="text"
                    value={description5}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={handleDescription5Change}
                    rows={5}
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
                        src={data?.SEOArea?.images}
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

export default CMSAbout;
