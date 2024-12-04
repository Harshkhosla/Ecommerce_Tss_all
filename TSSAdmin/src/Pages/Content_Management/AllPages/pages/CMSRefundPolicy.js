import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editContactPage_cms, editPagesRefundPolicy_cms, getBlog_cms, getRefund_cms, updateBlog_cms, updateUser } from "../../../User_Management/features/userSlice";
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CMSRefundPolicy = ({ setActiveTab, setExpand }) => {

  setActiveTab("pages");
  setExpand("contentManagement")
  const head = "Refund Policy";

  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchUserListing = async () => {
        
        await dispatch(getRefund_cms());
       
    }
    fetchUserListing();
}, [dispatch])

  const [loading, setLoading] = useState(false);


  //   //Contact widget


  // //Social Media

  //   console.log( preData);
  //   const [mailID, setMailID] = useState(preData.email);
  //   const [contactNo, setContactNo] = useState(preData.contact_number);
  //   //   //About US
  //   const [telNo, setTelNo] = useState(preData.tel);
  //   const [address, setAddress] = useState(preData.address);
  //   const [officeAddress, setOfficeAddress] = useState(preData.office_address);

  //   //Newsletter
 
  const [terms, setTerms] = useState('')
  const termsData = useSelector((state) => state.userManagement.getRefund_cms);
  useEffect(()=>{setTerms(termsData.content)},[termsData])
  
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       await dispatch(getBlog_cms(preData.blog_id));

//       setLoading(false);
//     };
//     fetchUserData();
//   }, [dispatch]);


  //   const handleEmailChange = (event) => {
  //     setMailID(event.target.value);
  //   };



//   useEffect(() => {
//     setaddedBy(blogData.added_by);
//     setbannerContent(blogData.banner_content)
//     setblogContent(blogData.blog_content)
//     setblogShort(blogData.blog_short_content1)
//     setblogShort2(blogData.blog_short_content2)
//     setcategory(blogData.category)
//     setMetaDesc(blogData.meta_description)
//     setMetaKeywords(blogData.meta_tags)
//     setMetaTitle(blogData.meta_title)
//     setName(blogData.name)
//     setreadTime(blogData.read_time)
//     setstatus(blogData.status)
//     settags(blogData.tags)
//   }, [blogData])
  //   const handleContactNoChange = (event) => {
  //     setContactNo(event.target.value);
  //   };

  //   const handleTelNoChange = (event) => {
  //     setTelNo(event.target.value);
  //   };

  //   const handleAddressChange = (event) => {
  //     setAddress(event.target.value);
  //   };
  //   const handleOfficeAddressChange = (event) => {
  //     setOfficeAddress(event.target.value);
  //   };
 
  const handleTerms = (event) => {
    setTerms(event);
  };
 
  
  // const bgImg = (event)=>{
  //     let img = event.target.files[0]

  //     setBgImg(img);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("refund_policy", terms);
    // formData.append("meta_title", metatitle);
    // formData.append("meta_tags", metakeywords);
    // formData.append("meta_description", metadesc);
    // formData.append("added_by", addedBy);
    // formData.append("read_time", readTime);
    // formData.append("blog_short_content1", blogShort);
    // formData.append("blog_content", blogContent)
    // formData.append("banner_content", bannerContent)
    // formData.append("blog_short_content2", blogShort2)
    // formData.append("category", category);
    // formData.append("tags", tags)
    // formData.append("status", status)
    // formData.append("banner_image", metaphoto)
    // formData.append("blog_id", preData.blog_id)
  
  
  
  
  
    setLoading(true);
    await dispatch(editPagesRefundPolicy_cms(formData));
    setLoading(false);
    // navigate("/home/blogs")
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


          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
           
          

           
            

           
           

           

            <div className="mr-6 my-5">
            Refund Policy
              <div className=" bg-white mt-2">
                <ReactQuill value={terms} onChange={handleTerms} theme="snow" />
              </div>
            </div>

          
           
          </div>

          <div className="flex my-10 gap-5 items-center">
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
  );
};

export default CMSRefundPolicy;
