import { useDebugValue, useEffect, useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { editNewPromotion } from "../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from "react-loader-spinner";
import { tssurl } from "../../../UI/port";

const EditPromotion = ({ setExpand, setActiveTab }) => {
  setExpand("homeService");
  setActiveTab("promotionManagement");
  const head = "Edit Promotion";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  // console.log(data);
  const [id, setId] = useState(data.promotion_code);
  const [title, setTitle] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [date, setDate] = useState(data.date);
  const [datend, setDatend] = useState(data.expiry);
  const [offerby, setOfferby] = useState(data.offer_by);
  const [offer, setOffer] = useState(data.offer_val);
  const [max, setMax] = useState(data.max);
  const [min, setMin] = useState(data.min);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const ID = data.promo_id;
    const formData = new FormData();
    formData.append("promo_id", data.promo_id);
    formData.append("promotion_type", category);
    formData.append("promotion_code", id);
    formData.append("promotion_title", title);
    formData.append("offer_type", offerby);
    formData.append("price", offer);
    formData.append("offer_valid_from", date);
    formData.append("offer_valid_upto", datend);
    formData.append("products", personName);
    formData.append("minimum_shopping", min);
    formData.append("max_discount_amount", max);
    images.forEach((image, index) => {
      formData.append(`pic`, image);
    });

    setLoading(true);
    dispatch(editNewPromotion({ formData, ID }));
    setLoading(false);
    // console.log("Back");
    navigate("/home/promotionManagement");
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [names, setNames] = useState([
    'Product - 1',
    'Product - 2',
    'Product - 3',
    'Product - 4',
    'Product - 5',
  ]);
  const url = `${tssurl}/product/`
  useEffect(() => {
    axios({
      url: url,
      method: 'get',
      headers: {
        'API-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        "authorization": `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {

        setRes(response?.data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, [])

  // console.log(res);
  var names1 = [];
  if (res?.length > 0) {
    names1 = res.map(item => ({
      pid: item.pid,
      product_name: item.product_name
    }));
  }
  // console.log(names1);


  // console.log(data.products);

  //Array 2 is data.products
  //Array 1 is names 1
  const result = [];

  data.products.forEach(pidToFind => {
    const foundItem = names1.find(item => item.pid === pidToFind);
    if (foundItem) {
      result.push(foundItem.product_name);
    }
  });
  // console.log(result);

  const [personName, setPersonName] = React.useState(() => {
    if (result.length >= 1) {
      return result;
    }

    return data.products;
  });




  const handleChange = (event) => {
    setPersonName(event.target.value);
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

      <div className=" ml-80 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label className="grid mt-5">
              Promotion Type
              <select
                id="label"
                name="label"
                className="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Type</option>
                <option value="Product">For Product</option>
                <option value="Shipping">For Shipping</option>
              </select>
            </label>

            {category == "Product" && (
              <div className="grid grid-cols-2 w-[98vh] gap-5 mt-5">
                <label className="grid mt-5">
                  Promotion code
                  <input
                    type="text"
                    placeholder="Enter Promotion code"
                    id="title"
                    className="rounded w-[50vh] outline-none"
                    style={{
                      height: "50px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "15px",
                    }}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    required
                  />
                </label>
                <label className="grid mt-5">
                  Promotion Title
                  <input
                    type="text"
                    placeholder="Enter Promotion Title"
                    id="title"
                    className="rounded w-[50vh] outline-none"
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
                <label className="grid">
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Product</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Product" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {(names1) ? names1.map((name) => (
                        <MenuItem key={name} value={name.product_name}>
                          <Checkbox checked={personName.indexOf(name.product_name) > -1} />
                          <ListItemText primary={name.product_name} />
                        </MenuItem>
                      )) : null}
                    </Select>
                  </FormControl>
                </label>
                <label className="grid">
                </label>
                <label className="grid">
                  Offer
                  <div className="flex gap-1">
                    <select
                      id="label"
                      name="label"
                      className="outline-none w-[12vh] rounded"
                      style={{
                        height: "50px",
                        // width: "590px",
                        paddingLeft: "5px",
                        backgroundColor: "#e5ecff",
                        marginTop: "5px",
                        fontSize: "14px",
                      }}
                      value={offerby}
                      onChange={(event) => setOfferby(event.target.value)}
                    >
                      {/* <option value="">Offer by</option> */}
                      <option value="Price">Price</option>
                      <option value="Percent">Percent</option>
                    </select>
                    {/* <label className="grid">
              Package */}
                    <input
                      type="text"
                      value={offer}
                      className="outline-none w-[37.5vh] rounded"
                      placeholder="000.00"
                      style={{
                        height: "50px",
                        // width: "586px",
                        paddingLeft: "10px",
                        backgroundColor: "#e5ecff",
                        marginTop: "5px",
                        fontSize: "14px",
                      }}
                      onChange={(event) => setOffer(event.target.value)}
                      required
                    />
                    {/* </label> */}
                  </div>
                </label>
                <label className="grid">
                  Offer valid from
                  <input
                    type="date"
                    value={date}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </label>
                <label className="grid">
                  Offer valid upto
                  <input
                    type="date"
                    value={datend}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setDatend(event.target.value)}
                    required
                  />
                </label>
                {/* <label className="grid">
              Photos
              <input
                className="w-[50vh]"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "0px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                 className="w-[50vh] file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer mt-3 rounded appearance-none placeholder-transparent"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
                required
              />
            </label> */}
              </div>
            )}
            {category == "Shipping" && (
              <div className="grid grid-cols-2 w-[98vh] gap-5 mt-5">
                <label className="grid mt-5">
                  Promotion Code
                  <input
                    type="text"
                    placeholder="Enter Promotion code"
                    id="title"
                    className="rounded w-[50vh] outline-none"
                    style={{
                      height: "50px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "15px",
                    }}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    required
                  />
                </label>
                <label className="grid mt-5">
                  Promotion Title
                  <input
                    type="text"
                    placeholder="Enter Promotion Title"
                    id="title"
                    className="rounded w-[50vh] outline-none"
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
                {/* <label className="grid">
              category
              <select
                id="label"
                name="label"
                className="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </label> */}
                {/* <label className="grid">
                  Package
                  <input
                    type="text"
                    value={pack}
                    className="outline-none w-[50vh] rounded"
                    placeholder="$000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setPack(event.target.value)}
                    required
                  />
                </label> */}
                <label className="grid">
                  Minimum Shopping
                  <input
                    type="text"
                    value={min}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setMin(event.target.value)}
                    required
                  />
                </label>
                <label className="grid">
                  Maximum Discount Amount
                  <input
                    type="text"
                    value={max}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setMax(event.target.value)}
                    required
                  />
                </label>
                <label className="grid">
                  Offer
                  <div className="flex gap-1">
                    <select
                      id="label"
                      name="label"
                      className="outline-none w-[12vh] rounded"
                      style={{
                        height: "50px",
                        // width: "590px",
                        paddingLeft: "5px",
                        backgroundColor: "#e5ecff",
                        marginTop: "5px",
                        fontSize: "14px",
                      }}
                      value={offerby}
                      onChange={(event) => setOfferby(event.target.value)}
                    >
                      {/* <option value="">Offer by</option> */}
                      <option value="Price">Price</option>
                      <option value="Percent">Percent</option>
                    </select>
                    {/* <label className="grid">
              Package */}
                    <input
                      type="text"
                      value={offer}
                      className="outline-none w-[37.5vh] rounded"
                      placeholder="000.00"
                      style={{
                        height: "50px",
                        // width: "586px",
                        paddingLeft: "10px",
                        backgroundColor: "#e5ecff",
                        marginTop: "5px",
                        fontSize: "14px",
                      }}
                      onChange={(event) => setOffer(event.target.value)}
                      required
                    />
                    {/* </label> */}
                  </div>
                </label>
                {/* <label className="grid">
              No Of Promotion
              <select
                id="label"
                name="label"
                className="outline-none w-[50vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={promotion}
                onChange={handlePromotionChange}
              >
                <option value="">No of Promotion</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label> */}
                {/* <label className="grid">
              Photos
              <input
                className="w-[50vh]"
                style={{
                  height: "50px",
                  // width: "590px",
                  paddingLeft: "0px",
                  border: "2px solid 	#e6f7fe",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                 className="w-[50vh] file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer mt-3 rounded appearance-none placeholder-transparent"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                placeholder=""
                required
              />
            </label> */}
                <label className="grid">
                  Offer valid from
                  <input
                    type="date"
                    value={date}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </label>
                <label className="grid">
                  Offer valid upto
                  <input
                    type="date"
                    value={datend}
                    className="outline-none w-[50vh] rounded"
                    placeholder="S$ 000.00"
                    style={{
                      height: "50px",
                      // width: "586px",
                      paddingLeft: "10px",
                      backgroundColor: "#e5ecff",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                    onChange={(event) => setDatend(event.target.value)}
                    required
                  />
                </label>
              </div>
            )}
          </div>

          {/* <div style={{ marginLeft: "385px", width: "600px", marginTop:"10px" }}>
            {images && images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)} // replace with your image source
                    alt={image.name} // replace with your image alt text
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }} // set width, height, object-fit, and margin-right styles
                  />
                ))}
              </div>
            )}
          </div> */}

          {/* <label className="grid mt-5">
            Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none w-[100vh] pt-2"
              style={{
                height: "170px",
                // width: "1210px",
                backgroundColor: "#e5ecff",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
          </label> */}
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
          >
            Publish
          </button>
          {/* <button
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            >
            Draft
          </button> */}
          <Link to="/home/promotionManagement">
            <button
              className="rounded mt-10 bg-amber-600 hover:bg-amber-700"
              style={{
                width: "170px",
                height: "55px",
                color: "white",
                marginLeft: "30px",
              }}
              type="submit"
            >
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditPromotion;
