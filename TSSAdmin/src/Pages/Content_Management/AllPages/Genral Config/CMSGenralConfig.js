import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getGeneralConfig_cms, updateGeneralConfig, updateUser } from "../../../User_Management/features/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { Grid } from "react-loader-spinner";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useSelector } from "react-redux";
import { getAboutUs_cms, editPagesAboutUs_cms, getUserLogin } from "../../../User_Management/features/userSlice";
import { newsletter_controller } from "../../../User_Management/features/userSlice";
import { url3 } from "../../../../UI/port";

const CMSGenralConfig = ({ setActiveTab, setExpand }) => {

  setActiveTab("generalConfig");
  setExpand("contentManagement")
  const head = "General Configuration";

  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')));
    dispatch(newsletter_controller())
  }, [dispatch])
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const location = useLocation();
  const newsletter_pages = useSelector((state) => state.userManagement.newsletter_controller)

  const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = React.useState(newsletter_pages);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPageName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const names1 = [
    "Home",
    "About Us",
    "Contact Us",
    "Terms and Conditions",
    "Privacy Policy",
    "Refund Policy",
  ]
  //   //Contact widget
  useEffect(() => {
    const fetchHeaderData = async () => {
      setLoading(true);
      await dispatch(getGeneralConfig_cms());
      setLoading(false);
    };
    fetchHeaderData();
  }, [dispatch]);
  const preData = useSelector((state) => state.userManagement.getGeneralConfig_cms)
  // //Social Media
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

  const [cashbackRate, setCashBackRate] = useState();

  //   //About US
  const [rewardPointRate, setRewardPointRate] = useState();

  //   //Newsletter
  const [shipping, setShipping] = useState();


  const [other, setOther] = useState();
  useEffect(() => {
    setCashBackRate(preData.cashbackPointRate)
    setRewardPointRate(preData.rewardPointRate)
    setShipping(preData.shippingCharges)
    setOther(preData.otherCharges)
  }, [preData])
  useEffect(() => {
    setPageName(newsletter_pages)
  }, [newsletter_pages])
  const handleCashBackChange = (event) => {
    setCashBackRate(event.target.value);
  };

  const handleRewardPointChange = (event) => {
    setRewardPointRate(event.target.value);
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };
  const handleOtherChange = (event) => {
    setOther(event.target.value);
  };


  // const bgImg = (event)=>{
  //     let img = event.target.files[0]

  //     setBgImg(img);
  // }
  const SPages = { pages: pageName }
  const handleNewsLetter = async (event) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url3}/newsletter_controller`,
        data: JSON.stringify(SPages),
        headers: {
          "Content-Type": "application/json",
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });



    } catch (error) {
      // // console.log("Not submitting data");
      // console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // // console.log(URL.createObjectURL(photo4));
    // // console.log(URL.createObjectURL(photo3));
    // // console.log(URL.createObjectURL(photo));

    const formData = new FormData();
    formData.append("cashbackPointRate", cashbackRate);
    formData.append("rewardPointRate", rewardPointRate);
    formData.append("shippingCharges", shipping);
    formData.append("otherCharges", other);
    // formData.append("description1", description2);
    // formData.append("picture3", photo3);
    // formData.append("picture4", photo4);
    // formData.append("title2", title3);
    // formData.append("description2", description3);
    // formData.append("title3", title4);
    // formData.append("description3", description4);

    // formData.append("title4", title5);
    // formData.append("description4", description5);

    setLoading(true);
    await dispatch(updateGeneralConfig(formData));
    await dispatch(getGeneralConfig_cms());
    handleNewsLetter();

    setLoading(false);
    navigate("/home/generalConfig")
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
      <div className="ml-80 mt-10 relative w-[70vw]" style={{ marginTop: "80px" }}>
        <form onSubmit={handleSubmit}  >
          <div className="grid gap-3">


            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] p-5  grid gap-2 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  <h2 className="text-lg">Cashback Point Rate ($)</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <h3 className="">Each Point =</h3>
                    <input
                    type="number"
                     name="numericInput"
                     min="0" 
                    //  step="1"
                      value={cashbackRate}
                      className="px-4 flex-grow py-2 drop-shadow-md rounded-md mt-1 ml-auto "
                      placeholder=""
                      onChange={handleCashBackChange}
                    />
                  </div>
                </label>

              </div>
              <div className="bg-[#EEEEEE] p-5  grid gap-2 rounded-md drop-shadow-md border flex-grow">
                <label className="grid pr-6 ">
                  <h2 className="text-lg">Reward Point Rate ($)</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <h3 className="">Each Point =</h3>
                    <input
                      type="number"
                      value={rewardPointRate}
                      className="px-4 flex-grow py-2 drop-shadow-md rounded-md mt-1 ml-auto "
                      placeholder=""
                      onChange={handleRewardPointChange}
                    />
                  </div>
                </label>

              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-[#EEEEEE] grid gap-2 p-5 rounded-md drop-shadow-md border flex-grow">


                <label className="grid  ">
                  <div className="flex items-center">
                    <h2 className="text-lg flex-grow">Shipping Charges ($)</h2>
                    <input
                      type="number"
                      value={shipping}
                      className="px-4 py-2 drop-shadow-md rounded-md flex-grow mt-1 ml-auto "
                      placeholder=""
                      onChange={handleShippingChange}
                    />
                  </div>
                </label>

              </div>
              <div className="bg-[#EEEEEE] grid gap-2 p-5 rounded-md drop-shadow-md border flex-grow">


                <label className="grid  ">
                  <div className="flex items-center">
                    <h2 className="text-lg flex-grow">Other Charges (%)</h2>
                    <input
                      type="number  "
                      value={other}
                      className="px-4 py-2 drop-shadow-md rounded-md flex-grow mt-1 ml-auto "
                      placeholder=""
                      onChange={handleOtherChange}
                    />
                  </div>
                </label>

              </div>

            </div>
            {/* <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
              <div className="text-xl mb-3 font-semibold">Newsletter</div>
              <div >
                <label>
                  <FormControl className="bg-white" fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Pages</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={pageName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Pages" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {(names1) ? names1.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={pageName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      )) : null}
                    </Select>
                  </FormControl>
                </label>
              </div>
            </div> */}
          </div>

          <div className="flex mt-10 gap-5 items-center">
            {/* {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
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
              </button>) : null} */}
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

export default CMSGenralConfig;
