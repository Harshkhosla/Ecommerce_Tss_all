import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "react-loader-spinner";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useSelector } from "react-redux";
import { Editlook, uploadImages } from "../../../User_Management/features/userSlice";

const CMSEditLook = ({ setActiveTab, setExpand }) => {

  setActiveTab("catalogue");
  setExpand("contentManagement")
  const head = "Edit Look";

  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);

  useEffect(() => {
    if (data ) {
      const imageUrl = data.thumbnail;
      setBanner4Title1(data.title)
      setGalleryImages([data?.thumbnail])
      setThumbnailImage(data?.slider)
    }
  }, [data]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    if (thumbnailImage[0]) formData.append("thumbnail", thumbnailImage[0])
    if (galleryImages[0]) formData.append("slider", galleryImages[0])
    if (banner4Title1) formData.append("title", banner4Title1)
    const cat = data?._id
    setLoading(true);
    await dispatch(Editlook({ formData, cat }));
    setLoading(false);
    // window.location.reload();


    // await dispatch(updateGeneralConfig(formData));
    // handleNewsLetter();

    // navigate("/home/generalConfig")

  };

  const [galleryImages, setGalleryImages] = useState([]);
  console.log(galleryImages);
  
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

  const handleRemoveImage = (index) => {
    const newImages = [...thumbnailImage];
    newImages.splice(index, 1);
    ThumbnailImage(newImages);

    // fileInputRef.current.value = newImages.length;
  };
  // console.log(thumbnailImage);
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
                      {thumbnailImage ? thumbnailImage.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {thumbnailImage.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={(image.url)} // replace with your image source
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
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          <div className="relative">
                            <img
                              src={data.thumbnail.url} 
                              alt="Not working"
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
                    <div style={{ width: "450px", marginTop: "10px" }}>
                      {galleryImages && galleryImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {galleryImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image.url} // replace with your image source
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
  );
};

export default CMSEditLook;
