import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_footer_data_cms, getUserLogin, update_footer_data_cms } from "../../../User_Management/features/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import { Grid } from "react-loader-spinner";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { tssurl } from "../../../../UI/port";

const CMSfooter = ({ setActiveTab, setExpand }) => {

  setActiveTab("footer");
  setExpand("contentManagement")
  const head = "Footer";

  //   const dispatch = useDispatch();



  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const [pages, setPages] = useState([]);


  useEffect(() => {
    const fetchFooterData = async () => {
      setLoading(true);
      await dispatch(get_footer_data_cms());
      const response = await axios.get(`${tssurl}/page/pages`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      setPages(response.data);
      setLoading(false);
    }
    fetchFooterData();
  }, [dispatch])

  const preData = useSelector((state) => state.userManagement.get_footer_data_cms)

  // console.log(preData,"getting from api");

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (preData && preData.QuickLinks && preData.QuickLinks.length > 0) {
      // let newLinks = JSON.parse()
      // console.log(newLinks);
      setLinks(preData.QuickLinks);
    }
  }, [preData])
  const handleNameChange = (index, e) => {
    const updatedLinks = [...links]; // Shallow copy of the links array
    const updatedLink = { ...updatedLinks[index] }; // Shallow copy of the link object at the specified index
    updatedLink.Name = e.target.value; // Update the 'page' property in the copied object
    updatedLinks[index] = updatedLink; // Update the link object in the copied array
    setLinks([...updatedLinks]); // Update the state with the modified array
  };
  
  const handleLabelChange = (index, e) => {
    const updatedLinks = [...links]; // Shallow copy of the links array
    const updatedLink = { ...updatedLinks[index] }; // Shallow copy of the link object at the specified index
    updatedLink.page = e.target.value; // Update the 'page' property in the copied object
    updatedLinks[index] = updatedLink; // Update the link object in the copied array
    setLinks([...updatedLinks]); // Update the state with the modified array (shallow copy)
  };
  
  // useEffect(() => {
  //   console.log(links);
  // }, [links]);
  
  const handleAddLink = () => {
    const newArray = [...links];
    newArray.push({ Name: '', page: '' });
    setLinks(newArray);
  }
  
  const handleDeleteLink = (index) => {
    const newArray = [...links];
    newArray.splice(index, 1);
    setLinks(newArray);
    // console.log(newArray);
  };
  
  
  const [links, setLinks] = useState([]);
  // console.log(links);
  
  const [Alldata, setAlldata] = useState({
    Title:"",
    Subtitle:"",
    facebook:"",
    insta:"",
    twitter:"",
    footer:"",
    QuickLinks:[],
  });

  useEffect(() => {
    setAlldata(preData)
  }, [preData])

  const onChange = (setmodal,index) => {
    const value = setmodal.target.value;
    const name = setmodal.target.name;  
    setAlldata({ ...Alldata, [name]: value })
  
  
  
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      if (!updatedLinks[index]) {
        updatedLinks[index] = {};
      }
      updatedLinks[index][name] = value;
      return updatedLinks;
    });
  };

  useEffect(() => {
    setAlldata((prevData) => ({
      ...prevData,
      QuickLinks: links,
    }));
  }, [links]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(update_footer_data_cms(Alldata));
    setLoading(false);
    // navigate("/home/footer")
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
      <div className="ml-80 mt-20 relative w-full" style={{ marginTop: "100px" }}>
        <form onSubmit={handleSubmit}  >

          {/* newsletter */}
          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">Newsletter</div>
            <label className="grid pr-6 ">
              Title
              <input
                type="add"
                name="Title"
                value={Alldata.Title}
                onChange={onChange}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder={preData.Title}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
              />
            </label>
            <label className="grid pr-6 mt-4">
              Subtitle
              <input
                type="add"
                name="Subtitle"
                value={Alldata.Subtitle}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder={preData.Subtitle}
                onChange={onChange}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
              />
            </label>
            {/* <label className="grid pr-6 mt-4">
              Background Image
              {photo ? (null) : (

                <div className="flex items-center mb-2">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={preData.bg_img}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
              }
              {photo ? (
                <div className="flex gap-2 mt-2 items-center">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Button color="error" variant="contained" size="small"
                      onClick={handlePhotoRemove}
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              ) :
                LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    class="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[20rem]"
                    style={{ border: "2px solid #e6f7fe" }}
                  />
                ) : null}
            </label> */}
          </div>

          {/* Quick links */}
          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5">
            <h3 style={{ fontSize: '25px' }} >Quick Links</h3>
            {links.length > 0 ? links.map((item, index) => (
              <div key={index} className="flex items-center gap-3 ms-6 mb-3">
                <label className={`grid ${index == 0 && ('mt-3')}`}>
                  {index == 0 && ('Name')}
                  <input
                    type="text"
                    value={item.Name}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    onChange={(e) => handleNameChange(index, e)}
                    required
                  // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                  />
                </label>
                <label className={`grid ${index == 0 && ('mt-3')}`} style={{ flexGrow: '1' }}>
                  {index == 0 && ('Page')}
                  <div className="flex items-center pr-2 mt-1 ">
                    <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                      http://TSS.com
                    </div>
                    <select
                      id="label"
                      name="label"
                      className="px-4 py-2 rounded-md rounded-s-none w-full"
                      value={item.page}
                      onChange={(e) => handleLabelChange(index, e)}
                    // required
                    // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                    >
                      <option value="">Select a page</option>
                      {pages.length && pages.map((item, index) => (
                        <option value={item.content}>{item.content}</option>
                      ))}
                    </select>
                  </div>
                </label>
                {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                  <div className={`${index == 0 && ('self-end mb-1')}`}>
                    <Button color="error" variant="contained" size="small"
                      onClick={() => handleDeleteLink(index)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                ) : null}
              </div>
            )) : (<>
              <h1 className="ms-6 text-stone-500 my-3">(No Quick Links Added)</h1>
              <div className="flex items-center gap-3 ms-6 mb-3" style={{ visibility: 'hidden', height: '0px' }}>
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
                  <Button color="error" variant="contained" size="small"
                  >
                    <CloseIcon />
                  </Button>
                </div>
              </div>
            </>
            )}
            {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
              <div className="flex justify-start  ms-6">
                <Button variant='contained' onClick={handleAddLink} color="themeColor">
                  Add Links<AddIcon />
                </Button>
              </div>
            ) : null}
          </div>

          {/* social widget and about */}
          <div className="grid gap-3">
            {/* <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
              <div className="text-xl font-semibold">About</div>
              <label className="grid pr-6">
                Footer About Description
                <textarea
                  type="desc"
                  value={aboutDesc}
                  className="outline-none mt-2 rounded bg-white"
                  style={{
                    height: "150px",
                    paddingLeft: "10px",
                    paddingTop: '5px',
                  }}
                  placeholder=""
                  onChange={handleAboutDescChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
            </div> */}
            <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
              <div className="text-xl font-semibold">Social Media Widget</div>
              <div className="mt-3 flex gap-4" style={{ flexDirection: 'column' }}>
                <label className="flex items-center pr-6 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    <FacebookIcon />
                  </div>
                  <input
                    type="url"
                    name="facebook"
                    value={Alldata.facebook}
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    
                    placeholder={preData?.facebook ? preData?.facebook : "Enter Facebook URL"}
                    onChange={onChange}

                  />
                </label>
                <label className="flex items-center pr-6 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    <TwitterIcon />
                  </div>
                  <input
                    type="url"
                    name="twitter"
                    value={Alldata.twitter}
                    // value={Twitter}
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    placeholder={preData?.twitter ? preData.twitter :"Enter Twitter URL"}
                    onChange={onChange}

                  />
                </label>
                <label className="flex items-center pr-6 ">
                  <div className="p-2 bg-[lightgrey] rounded-md rounded-e-none">
                    <InstagramIcon />
                  </div>
                  <input
                    type="url"
                    name="insta"
                    value={Alldata.insta}
                    // value={Instagram}
                    className="px-4 py-2 rounded-md rounded-s-none w-full"
                    placeholder={preData?.insta ? preData.insta:"Enter Instagram URL"}
                    onChange={onChange}

                  />
                </label>
              </div>
            </div>
          </div>

          {/* contact widget */}
          {/* <div className="bg-[#EEEEEE] p-5 rounded-md mt-3 drop-shadow-md border">
            <div className="text-xl mb-3 font-semibold">Contact Widget</div>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid pr-6">
                Email
                <input
                  type="text"
                  value={email}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={handleEmailChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <label className="grid pr-6">
                Phone Number
                <input
                  type="phone"
                  value={phone}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={handlePhoneChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>

              <label className="grid pr-6">
                Address
                <input
                  type="add"
                  value={address}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "

                  onChange={handleAddressChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
              <br />
            </div>
          </div> */}

          <div className="bg-[#EEEEEE] p-5 rounded-md mt-4 drop-shadow-md border">
            <div className="text-xl font-semibold mb-2">CopyRight Text</div>
            <div className="grid  gap-4">
              <label className="grid pr-6">
                <input
                  type="text"
                  name="footer"
                  value={Alldata.footer}
                  placeholder={preData?.footer ? preData.footer:"CopyRight"}
                  // value={CopyRight}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  onChange={onChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
                />
              </label>
            </div>
          </div>

          <div className="flex my-10 gap-5 items-center">
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
              </button>
            ) : null} */}

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

export default CMSfooter;
