import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../Assets/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAboutUs_cms, getUserLogin, getContactPage_cms, getHomePage_cms, getAllBlogs_cms, deleteBlog_cms } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button, Alert, AlertTitle } from "@mui/material";
import Table from "../../../../UI/CommonTable/Table";
import search from "../Assets/search.png";

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-md" style={{ objectFit: 'cover' }} src={picUrl} alt="photo" />
    </div>
  );
};

const Action = ({ blog_id }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = async () => {

    const data = {
      blog_id: blog_id
    }
    // setLoading(true);
    // await dispatch(HSM_Product(prodId));
    // setLoading(false);
    // Navigate(`/home${url}`, { state: data });
    Navigate('/home/editblog', { state: data })
  };
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    // console.log(blog_id)
    await dispatch(deleteBlog_cms(blog_id))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });



  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  return (
    <div className="flex gap-3">
      {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
        <>
          <img src={editIcon} onClick={handleClick} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" />
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" className="w-6 h-6 " style={{ cursor: 'pointer' }} />
        </>
      ) : (<div>Not Accessible</div>)}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete ?
              </p>
              <div className="p-5">
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                  Delete
                </Button>
                <Button onClick={handleCancelDelete} color="inherit">
                  Cancel
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

const CMSBlog = ({ setActiveTab, setExpand }) => {
  setExpand("contentManagement");
  setActiveTab("blogs");
  const head = "Blogs";
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogData = useSelector((state) => state.userManagement.getAllBlogs_cms)

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      await dispatch(getAllBlogs_cms());
      setLoading(false);
    };
    fetchBlogData();
  }, [dispatch]);

  // console.log(blogData);

  const passedData = blogData.map((blog) => ({

  }));

  const handleClick = (data) => {
    navigate('/home/editblog', { state: data })
  };
  const greenClicked = () => {
    navigate("/home/addblog");
  };




  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  //   const data = [
  //     {
  //       page: 'Home',
  //       action: <Action url='/home' data={homeData} />
  //     },
  //     {
  //       page: 'About Us',
  //       action: <Action url='/about' data={aboutusData} />
  //     },
  //     {
  //       page: 'Contact Us',
  //       action: <Action url='/contact'data = {contactData} />
  //     },
  //   ];
  // const data = [
  //   {
  //     blog: 'Sample Blog',

  //   }
  // ];

  const data = blogData.map((blog) => ({
    banner_image: <ProfilePhoto picUrl={blog.banner_image} />,
    blog: blog.name,
    action: <Action blog_id={blog.blog_id} />

  }));
  const greenButtonText = "Add New Blog"


  const columns = [
    {
      header: "Photo",
      accessor: "banner_image",
    },
    {
      header: "Blogs",
      accessor: "blog",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];


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

      <div>
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
        {data.length > 0 ?
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
              greenClicked={greenClicked}
            />
          </>)
          :
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={greenButtonText}
              greenClicked={greenClicked}
            />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>)
        }
      </div>
    </div>
  );
};

export default CMSBlog;
