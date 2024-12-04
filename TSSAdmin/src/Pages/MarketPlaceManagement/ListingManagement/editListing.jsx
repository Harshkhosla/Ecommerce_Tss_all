import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateListing } from "../../User_Management/features/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AllChats from "../AllChats/allchats";
import { Grid } from "react-loader-spinner";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";


const EditListing = ({ setExpand, setActiveTab }) => {
  setExpand("marketPlace");
  setActiveTab("listingManagement");
  const head = "Edit Listing";
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const productCategory = useSelector((state) => state.userManagement.mpm_category);

  const [title, setTitle] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [area, setArea] = useState(data.service_area);
  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState(data.stock);
  const [content, setContent] = useState(data.desc);
  // const [sellerName, setsellerName] = useState(data.seller);
  const [images, setImages] = useState([]);
  const [images1, setImages1] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  const handleRemoveImage1 = (index) => {
    const newImages = [...images1];
    newImages.splice(index, 1);
    setImages1(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  const handleImageUpload1 = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages1(uploadedImages);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(category + 'cat');
    const formData = new FormData();
    formData.append("lid", data.listId);
    formData.append("service_name", title);
    formData.append("service_area", area);
    formData.append("price", price);
    formData.append("stock", quantity);
    formData.append("category", category);
    formData.append("seller_name", data.service_name);
    formData.append("description", content);
    images.map((image, index) => {
      formData.append("thumbnail_photo", image);
    });
    images1.map((image, index) => {
      formData.append("slider_photos", image);
    });
    setLoading(true);
    await dispatch(updateListing({ formData, title }));
    setLoading(false);

    navigate('/home/listingManagement')
    // window.location.reload()
  };
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);

  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
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

      <div className=" ml-80 mb-10 relative w-[60vw] overflow-hidden" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid mt-5">
            Service Name
            <input
              type="text"
              placeholder="Electician Services"
              id="title"
              className="rounded outline-none"
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
          <label className="grid mt-5">
            Service Area
            <input
              type="text"
              placeholder="Enter Service area"
              id="area"
              className="rounded outline-none"
              style={{
                height: "50px",
                paddingLeft: "10px",
                backgroundColor: "#e5ecff",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={area}
              onChange={(event) => setArea(event.target.value)}

            />
          </label>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              Price
              <input
                id="label"
                className="outline-none rounded"
                placeholder="S$ 000.00"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={price}
                onChange={handlePriceChange}

              />
            </label>
            <label className="grid">
              category
              <select
                id="label"
                name="label"
                className="outline-none  rounded mt-5"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Select category</option>
                {productCategory.map((item) => {
                  return <option value={`${item.category_name}`}>{item.category_name}</option>;
                })}
              </select>
            </label>
            <label className="grid">
              Quantity
              <input
                id="label"
                className="outline-none rounded"
                placeholder="0"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={quantity}
                onChange={handleQuantityChange}

              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              Service Photos
              <input
                style={{
                  height: "50px",
                  paddingLeft: "0px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                className="file:bg-black  file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                type="file"
                accept="image/*"
                multiple='true'
                onChange={handlePhotoUpload}
                placeholder=""

              />
            </label>

            <label className="grid mt-5" style={{ fontSize: "15px" }}>
              Slider Photos
              <input
                className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                style={{ border: "2px solid lightgray" }}
                type="file"
                placeholder=""
                accept="image/*"
                onChange={handleImageUpload1}

                multiple
              />
            </label>

            <div style={{ marginLeft: "50px", width: "600px" }}>
              {images && images.length > 0 ? (null) : (
                <div className="grid grid-cols-4 gap-3">
                  <div className="relative">
                    <img
                      src={data.pic_url} // replace with your image source
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }} // set width, height, object-fit, and margin-right styles
                    />
                  </div>
                </div>
              )}
              {images && images.length > 0 && (
                <div className="grid grid-cols-6 gap-3">
                  {images.map((image, index) => (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(image)} // replace with your image source
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }} // set width, height, object-fit, and margin-right styles
                      />
                      <button
                        className="absolute top-0 text-white"
                        style={{ right: 5 }}
                        onClick={() => handleRemoveImage(index)}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: "600px", marginTop: "10px" }}>
              <div className="grid grid-cols-6 gap-2">
                {images1.length > 0 ? (null) : data.slider_photos.map((item) => (
                  <div className="relative">
                    <img
                      src={item}
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
              {images1 && images1.length > 0 && (
                <div className="grid grid-cols-6 gap-2">
                  {images1.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)} // replace with your image source
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
                        style={{ right: 5 }}
                        onClick={() => handleRemoveImage1(index)}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="grid">
              Seller Name
              <input
                id="label"
                className="outline-none rounded"
                placeholder="Name"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={data.service_name}

              />
            </label>
          </div>

          <label className="grid mt-5">
            Description
            <textarea
              id="content"
              placeholder="Enter Description"
              className="rounded outline-none pt-2"
              style={{
                height: "170px",
                backgroundColor: "#e5ecff",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}

            />
          </label>
          {/* <div> */}
          {/* </div> */}
          <button
            className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
            onClick={handleSubmit}>
            Save
          </button>
          <Link to='/home/listingManagement'>
            <button
              className="rounded mt-10 bg-black hover:bg-gray-800"
              style={{
                width: "170px",
                height: "55px",
                color: "white",
                marginLeft: "30px",
              }}
              type="submit">
              Cancel
            </button>
          </Link>
        </form>
      </div>
      <AllChats lid={data.listId} seller_id={data.seller_id} />
    </div>
  );
};

export default EditListing;
