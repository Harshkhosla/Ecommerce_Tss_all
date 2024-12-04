import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getGeneralConfig_cms, getPromoCard_cms, updateGeneralConfig, updatePromoCard, updateUser } from "../../../User_Management/features/userSlice";
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

const CMSPromoCard = ({ setActiveTab, setExpand }) => {

  setActiveTab("promocard");
  setExpand("contentManagement")
  const head = "Promo Card";

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
    "Terms and Condition",
    "Privacy Policy",
    "Refund Policy",
  ]
  //   //Contact widget
  useEffect(() => {
    const fetchHeaderData = async () => {
      setLoading(true);
      await dispatch(getPromoCard_cms());
      setLoading(false);
    };
    fetchHeaderData();
  }, [dispatch]);
  const preData = useSelector((state) => state.userManagement.getPromoCard_cms)
  // console.log(preData);

  useEffect(() => {
    setTitle1(preData?.Title1);
    setTitle2(preData?.Title2);
    setTitle3(preData?.Title3);
    setLink1(preData?.page1);
    setLink2(preData?.page2);
    setLink3(preData?.page3);
  }, [preData])
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

  const [title1, setTitle1] = useState('');
  const [link1, setLink1] = useState('');
  //   //About US
  const [title2, setTitle2] = useState('');
  const [link2, setLink2] = useState('');
  const [title3, setTitle3] = useState('');
  const [link3, setLink3] = useState('');

  const handleTitle1Change = (event) => {
    setTitle1(event.target.value);
  };

  const handleLink1Change = (event) => {
    setLink1(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTitle2(event.target.value);
  };

  const handleLink2Change = (event) => {
    setLink2(event.target.value);
  };

  const handleTitle3Change = (event) => {
    setTitle3(event.target.value);
  };

  const handleLink3Change = (event) => {
    setLink3(event.target.value);
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
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          "authorization": `${localStorage.getItem('jwt')}`,
        },
      });



    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("title1",title1)

    // // console.log(URL.createObjectURL(photo4));
    // // console.log(URL.createObjectURL(photo3));
    // // console.log(URL.createObjectURL(photo));

    const formData = new FormData();

    formData.append("Title1", title1);
    formData.append("page1", link1);
    formData.append("Title2", title2);
    formData.append("page2", link2);
    formData.append("Title3", title3);
    formData.append("page3", link3);
    // formData.append("description3", description4);

    // formData.append("title4", title5);
    // formData.append("description4", description5);


    setLoading(true);
    await dispatch(updatePromoCard(formData));


    setLoading(false);
    // navigate("/home/promocard")
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

          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5">
            <div className="flex items-center gap-3 ms-6 mb-3">
              <label className="grid mt-3">
                Title 1
                <input
                  type="text"
                  value={title1}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={(e) => handleTitle1Change(e)}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid mt-3" style={{ flexGrow: '1' }}>
                {true && ('Page')}
                <div className="flex items-center pr-2 mt-1 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    http://TSS.com
                  </div>
                  <input
                    id="label"
                    name="label"
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    value={link1}
                    onChange={(e) => handleLink1Change(e)}
                    required
                  // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                  />

                </div>
              </label>
              {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                <div className={`${true && ('self-end mb-1')}`}>
                  <Button color="error" variant="contained" size="small"
                    onClick={() => setLink1('')}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3 ms-6 mb-3">
              <label className="grid mt-3">
                Title 2
                <input
                  type="text"
                  value={title2}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={(e) => handleTitle2Change(e)}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid mt-3" style={{ flexGrow: '1' }}>
                {true && ('Page')}
                <div className="flex items-center pr-2 mt-1 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    http://TSS.com
                  </div>
                  <input
                    id="label"
                    name="label"
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    value={link2}
                    onChange={(e) => handleLink2Change(e)}
                    required
                  // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                  />

                </div>
              </label>
              {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                <div className={`${true && ('self-end mb-1')}`}>
                  <Button color="error" variant="contained" size="small"
                    onClick={() => setLink2('')}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3 ms-6 mb-3">
              <label className="grid mt-3">
                Title 3
                <input
                  type="text"
                  value={title3}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={(e) => handleTitle3Change(e)}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid mt-3" style={{ flexGrow: '1' }}>
                {true && ('Page')}
                <div className="flex items-center pr-2 mt-1 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    http://TSS.com
                  </div>
                  <input
                    id="label"
                    name="label"
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    value={link3}
                    onChange={(e) => handleLink3Change(e)}
                    required
                  // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                  />

                </div>
              </label>
              {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                <div className={`${true && ('self-end mb-1')}`}>
                  <Button color="error" variant="contained" size="small"
                    onClick={() => setLink3('')}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>


          <div className="flex mt-10 gap-5 items-center">
            {LuserData.role == 'admin' || LuserData.role == 'editor' || 1 == 1 ? (
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

export default CMSPromoCard;
