import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../Assets/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAboutUs_cms, getUserLogin, getContactPage_cms, getHomePage_cms } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import Table from "../../../../UI/CommonTable/Table";
import search from "../Assets/search.png";

const Action = ({ url, data }) => {
  // console.log("url  ->",url);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const handleClick = async () => {
    // setLoading(true);
    // await dispatch(HSM_Product(prodId));
    // setLoading(false);
    Navigate(`/home${url}`, { state: data });
  };
  return (
    <div>
     {/* {LuserData.role == 'admin' || LuserData.role == 'e ditor' ? (
        <img src={editIcon} onClick={handleClick} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" />
      ) : (<div>Not Accessible</div>)} */}
       <img src={editIcon} onClick={handleClick} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" />
    </div>
  );
};

const CMSPages = ({ setActiveTab, setExpand }) => {
  setExpand("contentManagement");
  setActiveTab("pages");
  const head = "Pages";
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getAboutUs_cms());
      await dispatch(getContactPage_cms());
      await dispatch(getHomePage_cms());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const contactData = useSelector((state) => state.userManagement.getContactPage_cms)
  const aboutusData = useSelector((state) => state.userManagement.getAboutUs_cms)
  const homeData = useSelector((state) => state.userManagement.getHomePage_cms)

  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  const data = [
    {
      page: 'Home',
      action: <Action url='/home' data={homeData} />
    },
    {
      page: 'About Us',
      action: <Action url='/about' data={aboutusData} />
    },
    {
      page: 'Contact Us',
      action: <Action url='/contact' data={contactData} />
    },
    {
      page: 'Terms and Condition',
      action: <Action url='/terms_and_conditions' />
    },
    {
      page: 'Privacy Policy',
      action: <Action url='/privacy_policy' />
    },
    {
      page: 'Refund Policy',
      action: <Action url='/refund_policy' />
    },
  ];


  const columns = [
    {
      header: "Pages",
      accessor: "page",
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
            />
          </>)
          :
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
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

export default CMSPages;
