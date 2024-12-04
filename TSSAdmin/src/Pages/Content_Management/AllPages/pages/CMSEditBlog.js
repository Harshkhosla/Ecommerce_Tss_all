import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editContactPage_cms, getBlog_cms, updateBlog_cms, updateUser } from "../../../User_Management/features/userSlice";
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

const CMSEditBlog = ({ setActiveTab, setExpand }) => {

  setActiveTab("blogs");
  setExpand("contentManagement")
  const head = "Edit Blog";

  //   const dispatch = useDispatch();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const location = useLocation();
  const preData = location.state;
  // console.log(preData.blog_id);

  const [loading, setLoading] = useState(false);


  //   //Contact widget


  // //Social Media

  //   // console.log( preData);
  //   const [mailID, setMailID] = useState(preData.email);
  //   const [contactNo, setContactNo] = useState(preData.contact_number);
  //   //   //About US
  //   const [telNo, setTelNo] = useState(preData.tel);
  //   const [address, setAddress] = useState(preData.address);
  //   const [officeAddress, setOfficeAddress] = useState(preData.office_address);

  //   //Newsletter
  const [name, setName] = useState('')
  const [addedBy, setaddedBy] = useState('')
  const [readTime, setreadTime] = useState('')
  const [blogShort, setblogShort] = useState('')
  const [blogContent, setblogContent] = useState('')
  const [bannerContent, setbannerContent] = useState('')
  const [blogShort2, setblogShort2] = useState('')
  const [category, setcategory] = useState('')
  const [tags, settags] = useState('')
  const [status, setstatus] = useState('')
  const [metatitle, setMetaTitle] = useState('')
  const [metadesc, setMetaDesc] = useState('')
  const [metakeywords, setMetaKeywords] = useState('')
  const [metaphoto, setMetaPhoto] = useState();
  useEffect(() => {
    // console.log(blogShort);

  }, [blogShort])

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getBlog_cms(preData.blog_id));

      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);
  //   const handleEmailChange = (event) => {
  //     setMailID(event.target.value);
  //   };
  const blogData = useSelector((state) => state.userManagement.getBlog_cms);
  // console.log(blogData);


  useEffect(() => {
    setaddedBy(blogData.added_by);
    setbannerContent(blogData.banner_content)
    setblogContent(blogData.blog_content)
    setblogShort(blogData.blog_short_content1)
    setblogShort2(blogData.blog_short_content2)
    setcategory(blogData.category)
    setMetaDesc(blogData.meta_description)
    setMetaKeywords(blogData.meta_tags)
    setMetaTitle(blogData.meta_title)
    setName(blogData.name)
    setreadTime(blogData.read_time)
    setstatus(blogData.status)
    settags(blogData.tags)
  }, [blogData])
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
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlereadTime = (event) => {
    setreadTime(event.target.value);
  };
  const handleblogShort = (event) => {
    setblogShort(event);
  };
  const handleblogContent = (event) => {
    setblogContent(event);
  };
  const handlebannerContent = (event) => {
    setbannerContent(event);
  };
  const handleblogShort2 = (event) => {
    setblogShort2(event);
  };
  const handlecategory = (event) => {
    setcategory(event.target.value);
  };
  const handletags = (event) => {
    settags(event.target.value);
  };
  const handlestatus = (event) => {
    setstatus(event.target.value);
  };
  const handleaddedBy = (event) => {
    setaddedBy(event.target.value);
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

  const handleMetaPhotoChange = (event) => {
    let img = event.target.files[0]
    setMetaPhoto(img);
  };
  const handleMetaPhotoRemove = () => {
    setMetaPhoto(null);
  };

  // const bgImg = (event)=>{
  //     let img = event.target.files[0]

  //     setBgImg(img);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("meta_title", metatitle);
    formData.append("meta_tags", metakeywords);
    formData.append("meta_description", metadesc);
    formData.append("added_by", addedBy);
    formData.append("read_time", readTime);
    formData.append("blog_short_content1", blogShort);
    formData.append("blog_content", blogContent)
    formData.append("banner_content", bannerContent)
    formData.append("blog_short_content2", blogShort2)
    formData.append("category", category);
    formData.append("tags", tags)
    formData.append("status", status)
    formData.append("banner_image", metaphoto)
    formData.append("blog_id", preData.blog_id)





    setLoading(true);
    await dispatch(updateBlog_cms(formData));
    setLoading(false);
    navigate("/home/blogs")
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
      <div className="ml-80 mt-20 relative w-[65vw]" style={{ marginTop: "100px" }}>
        <form onSubmit={handleSubmit}  >


          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="grid grid-cols-2 gap-4">
              <label className="grid pr-6 mt-4">
                Name
                <input
                  type="add"
                  value={name}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handleNameChange}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>

              <label className="grid pr-6 mt-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <label className="grid pr-6 mt-4">
                Meta Tags
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
            </div>

            <label className="grid pr-6 mt-4">
              Banner Image
              {metaphoto ? (null) : (

                <div className="flex items-center mb-2">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={blogData.banner_image}
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
                      src={URL.createObjectURL(metaphoto)}
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

            <div className="grid grid-cols-2 gap-5 mt-4">
              <label className="grid pr-6 mt-4 ">
                Added by
                <input
                  type="add"
                  value={addedBy}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handleaddedBy}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>
              <label className="grid pr-6 mt-4 ">
                Read Time
                <input
                  type="add"
                  value={readTime}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handlereadTime}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>
            </div>

            <div className="mr-6 my-5">
              Blog Short Content (content upto read more)
              <div className=" bg-white mt-2">
                <ReactQuill value={blogShort} onChange={handleblogShort} theme="snow" />
              </div>
            </div>

            <div className="mr-6 my-5">
              Blog Content
              <div className=" bg-white mt-2">
                <ReactQuill value={blogContent} onChange={handleblogContent} theme="snow" />
              </div>
            </div>

            <div className="mr-6 my-5">
              Banner Content
              <div className=" bg-white mt-2">
                <ReactQuill value={bannerContent} onChange={handlebannerContent} theme="snow" />
              </div>
            </div>

            <div className="mr-6 my-5">
              Blog Short Content
              <div className=" bg-white mt-2">
                <ReactQuill value={blogShort2} onChange={handleblogShort2} theme="snow" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-4">
              <label className="grid pr-6 mt-4 ">
                Category
                <input
                  type="add"
                  value={category}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handlecategory}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>
              <label className="grid pr-6 mt-4 ">
                Tags
                <input
                  type="add"
                  value={tags}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={handletags}
                  required
                // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
                />
              </label>
            </div>
            <label className="grid pr-6 mt-4 ">
              Status
              <select
                type="add"
                value={status}
                className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                placeholder=""
                onChange={handlestatus}
                required
              // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
              >
                <option >Active</option>
                <option >Inactive</option>
              </select>
            </label>
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
            <NavLink to="/home/blogs">
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

export default CMSEditBlog;
