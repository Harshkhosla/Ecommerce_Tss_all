import React, { useState } from "react";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { uploadImages } from "../../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";


const Product_img = ({ galleryImages,
  GalleryImages,
  thumbnailImage,
  ThumbnailImage,setGalleryImages , setThumbnailImage}) => {

  const dispatch = useDispatch()
  const handleGalleryImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    // setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      GalleryImages(resultAction?.payload);
      
      setGalleryImages(resultAction?.payload)
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    // setLoading(false);
  };



  const handleThumbnailImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      ThumbnailImage(resultAction?.payload?.[0]);
      setThumbnailImage(resultAction?.payload?.[0])
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
  };


  const handleRemoveImage = () => {
    ThumbnailImage(null);
  };

  const handleImageClick = () => {
    // Handle the click event if needed
  };

  return (
    <div>
      <div className="bg-[#EEEEEE] p-5 rounded-md shadow-md border">
        <p className="pb-5">Product Image</p>
        <form className=" grid grid-cols-2 gap-5 overflow-hidden" action="submit">
          <div>
            <label className="grid " style={{ fontSize: "15px" }}>
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
            <div style={{ width: "600px", marginTop: "10px" }}>
              {thumbnailImage && thumbnailImage.length > 0 && (
                <div className="grid grid-cols-6 gap-2">
                    <div  className="relative">
                      <img
                        src={(thumbnailImage)} // replace with your image source
                        alt={thumbnailImage.name} // replace with your image alt text
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }} // set width, height, object-fit, and margin-right styles
                      />
                      <button
                        className="absolute top-0 text-white"
                        style={{ right: 5 }}
                        onClick={() => handleRemoveImage()}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="grid " style={{ fontSize: "15px" }}>
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
            <div style={{ width: "600px", marginTop: "10px" }}>
              {galleryImages && galleryImages.length > 0 && (
                <div className="grid grid-cols-6 gap-2">
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
        </form>
      </div>
    </div>
  );
};

export default Product_img;
