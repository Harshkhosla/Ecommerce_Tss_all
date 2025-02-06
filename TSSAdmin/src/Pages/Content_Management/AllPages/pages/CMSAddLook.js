import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Addlook, getUserLogin, uploadImages } from "../../../User_Management/features/userSlice";
import { newsletter_controller } from "../../../User_Management/features/userSlice";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";


const CMSAddLook = ({ setActiveTab, setExpand }) => {

  const location = useLocation();
  setActiveTab("catalogue");
  setExpand("contentManagement")
  const head = "Add Look";

  const catId = location.state;
  const catalog_id = catId.catalog_id

  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')));
    dispatch(newsletter_controller())
  }, [dispatch])
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("thumbnail", thumbnailImage[0])
    formData.append("slider", galleryImages[0])
    formData.append("title", banner4Title1)
    if (catId?.catalog_id) {
      formData.append("catalog_id", catId?.catalog_id)
    } else {
      formData.append("catalog_id", catId)
    }
    await dispatch(Addlook(formData))

    // const formData = new FormData();
    // formData.append("cashback_rate", cashbackRate);
    // formData.append("reward_rate", rewardPointRate);
    // formData.append("shipping_charges", shipping);
    // formData.append("other_charges", other);
    // setLoading(true);
    // await dispatch(updateGeneralConfig(formData));
    // await dispatch(getGeneralConfig_cms());
    // handleNewsLetter();
    // setLoading(false);
    // navigate("/home/generalConfig")
    // navigate("/home/addCatalogue")
    window.location.reload();

  };

  const [galleryImages, setGalleryImages] = useState([]);
  const [banner4Title1, setBanner4Title1] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState([]);

  const GalleryImages = (value) => {
    setGalleryImages(value);
  };
  const ThumbnailImage = (value) => {
    setThumbnailImage(value);
  };

    const handleGalleryImageUpload = async (event) => {
      const files = event.target.files;
      if (!files.length) return;
      setLoading(true);
      const resultAction = await dispatch(uploadImages(files));
      if (uploadImages.fulfilled.match(resultAction)) {
        GalleryImages(resultAction?.payload);
      } else {
        console.error("Upload failed:", resultAction.payload);
      }
      setLoading(false);
    };
  
  // const handleGalleryImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const selectedImages = files.map((file) => file);
  //   GalleryImages(selectedImages);
  // };


  const handleThumbnailImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      ThumbnailImage(resultAction?.payload);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };


  // const handleThumbnailImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const selectedImages = files.map((file) => file);
  //   ThumbnailImage(selectedImages);
  // };

  const handleRemoveImage = (index) => {
    const newImages = [...thumbnailImage];
    newImages.splice(index, 1);
    ThumbnailImage(newImages);

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
              <div className="bg-[#EEEEEE] p-5  grid gap-2 rounded-md drop-shadow-md border flex-grow">


                <div className='flex gap-3'>

                  <div>
                    <label className="grid mt-5" style={{ fontSize: "15px" }}>
                      Thumbnail Photo
                      <input
                        className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                        style={{ border: "2px solid lightgray" }}
                        type="file"
                        placeholder=""
                        accept="image/*"
                        onChange={handleThumbnailImageUpload}

                      />
                    </label>
                    <div style={{ width: "450px", marginTop: "10px" }}>
                      {thumbnailImage && thumbnailImage.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {thumbnailImage.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={(image)} // replace with your image source
                                alt={image.name} // replace with your image alt text
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }} // set width, height, object-fit, and margin-right styles
                              />
                              <button
                                className="absolute top-0 text-white"
                                style={{ right: 7 }}
                                onClick={() => handleRemoveImage(index)}>
                                <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="grid mt-5" style={{ fontSize: "15px" }}>
                      Slider Photos
                      <input
                        className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                        style={{ border: "2px solid lightgray" }}
                        type="file"
                        placeholder=""
                        accept="image/*"
                        onChange={handleGalleryImageUpload}
                        multiple
                      />
                    </label>
                    {/* </div> */}
                    <div style={{ width: "450px", marginTop: "10px" }}>
                      {galleryImages && galleryImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {galleryImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={(image)} // replace with your image source
                                alt={image.name} // replace with your image alt text
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }} // set width, height, object-fit, and margin-right styles
                              />

                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: "10px", marginTop: "8px" }}>
                      <ul className="list-disc ml-3 text-gray-500">
                        <li>Allowed banner image extension .jpg | .jpeg | .png</li>
                        <li>
                          Max banner image file size <a className="text-red-500">5MB</a>
                        </li>
                        <li>
                          Recommended Banner image size{" "}
                          <a className="text-red-500">1900px * 700px</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
                <label className="grid pr-6 ">
                  Look Title
                  <input
                    type="add"
                    value={banner4Title1}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={(e) => setBanner4Title1(e.target.value)}
                  />
                </label>

              </div>

            </div>



          </div>

          <div className="flex mt-10 gap-5 items-center">
            {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
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
              </button>) : null}
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

export default CMSAddLook;
