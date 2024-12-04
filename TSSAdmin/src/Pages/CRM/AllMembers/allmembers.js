import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View, Edit } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CRM, DeleteRelation, Order_Table, VeiwMember, Reward_Table, Internal_Notes } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import axios from "axios";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { tssurl, url1 } from "../../../UI/port";
// Component inside action column
const Action = ({
  username,
  purchase,
  payment,
  contact,
  points,
  email,
  mid,
  picUrl,
}) => {
  const Navigate = useNavigate();
  // const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = () => {
    dispatch(VeiwMember(mid));
    dispatch(Order_Table(mid));
    dispatch(Reward_Table(mid));
    // dispatch(Internal_Notes(mid));
    Navigate(`/home/memberDetails/${mid}`, { state: mid });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const userData = useSelector((state) => state.userManagement.users);

  const handleConfirmDelete = () => {
    dispatch(DeleteRelation(mid))
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

  const roles = userData.role;

  return (
    <div className="w-8 mr-10 h-6 flex gap-3 cursor-pointer">
      {/* <img
        src={Edit}
        onClick={handleEditClick}
        alt="Delete"
      /> */}
      <img src={View} onClick={handleClick} alt="Edit" />
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : null}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {username}?
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

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" src={picUrl} alt="photo" />
    </div>
  );
};

const Allmembers = ({ setActiveTab }) => {
  const head = "All Members";
  setActiveTab("customerRelationship");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const memberData = useSelector((state) => state.userManagement.crm);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(CRM());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Username",
      accessor: "username",
    },
    {
      header: "Rewards Points",
      accessor: "rewardpoints",
    },
    {
      header: "Payment History",
      accessor: "paymenthistory",
    },
    {
      header: "Purchase History",
      accessor: "purchasehistory",
    },
    {
      header: "Contact No.",
      accessor: "contact",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  // console.log("This is memeber Data :", memberData);
  
  const data = memberData.map((user) => ({
    photo: <ProfilePhoto picUrl={user.pic_url} />,
    username: user.name,
    rewardpoints: user.reward_points,
    paymenthistory: `$ ${user.payment_history}`,
    purchasehistory: `${user.purchased_items} items`,
    contact: `${user.mobileNo}`,
    // // console.log(user);
    action: (
      <Action
      points={user.reward_points}
      payment={user.payment_history}
      purchase={user.purchased_items}
        contact={user.phn}
        username={user.uname}
        email={user.email}
        mid={user.mid}
        picUrl={user.pic_url}
      />
    ),
  }));

  const pageSize = 10;
  const greenButtonText = "Export All";
  // const blackButtonText = "Add Members";

  // const handleButtonClick = () => {
  //   axios.get('http://139.59.236.50:8000/exportcustomers')
  //   .then((response)=>{
  //     // console.log(response)
  //   }).catch((err)=>{
  //     // console.log('Error to call API', err)
  //   })
  // }
  const navigate = useNavigate();
  // const blackClicked = () => {
  // navigate("/home/addMembers");
  // };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
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
      <div className="   ml-72 mt-28 w-[75vw] relative">
        {memberData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={
              <a href={`${tssurl}/user/exportUsers`} >
              {greenButtonText}
            </a>
            
            }
          // blackButtonText={blackButtonText}
          // blackClicked={blackClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={
                <a href={`${tssurl}/user/exportUsers`} >
                {greenButtonText}
              </a>
              
              }
            // blackButtonText={blackButtonText}
            // blackClicked={blackClicked}
            />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Allmembers;
