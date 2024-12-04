import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, Photo, View, Unsuspend } from "./Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { DeleteSuspendUser, DeleteUser, getUser, suspendUsers } from "../features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import { getUserLogin } from "../features/userSlice";
import axios from "axios";
import cookie from "js-cookie";
import { tssurl, url1 } from "../../../UI/port";

// Component inside action column
// The details of user shall be different for every users. It will be integrated at authentication of the users.
const Action = ({ username, email, phone, uid, picUrl, role }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleClick = () => {
    const data = {
      photo: picUrl,
      username: username,
      email: email,
      phone: phone,
      role: role,
      uid: uid,
      // "about":about
    };
    Navigate(`/home/UserDetails?name=${username}`, { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
    // console.log("This is uid", uid);
  };
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const handleConfirmDelete = () => {
    dispatch(DeleteUser(uid))
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
  // console.log("This is uid", uid);
  const handleUnsuspendClick = async (event, uid) => {
    event.preventDefault();
    const formData = {
      "uid": uid,
    };


    try {
      const response = await axios
        .put(`${tssurl}/user_management/unsuspend/${uid}`, {
          headers: {
            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
            "authorization": `${localStorage.getItem('jwt')}`,
          },
        })
        .then((response) => {
          // console.log(response.data); // Handle the response data
          window.location.reload();
        });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle the error
    }
  };
  const roles = userData.role;

  const head = "Suspended Users";
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {/* <img src={View} onClick={handleClick} alt="Edit" /> */}
      {roles === "admin" || roles === "cr" ? (
        <>
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
          <img src={Unsuspend} onClick={(e) => handleUnsuspendClick(e, uid)} alt="Unsuspend" />
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

const SuspendUsers = ({ setActiveTab, setExpand }) => {
  const head = "Suspend User List";
  setExpand("userManagement");
  setActiveTab("suspendUsers");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.userManagement.users);
  const suspendedData = userData.filter(user => user.suspend_reason !== undefined && user.suspend_reason !== null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(suspendUsers());
      await dispatch(getUser());
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
      header: "Email Address",
      accessor: "emailaddress",
    },
    {
      header: "Suspended Reason",
      accessor: "suspendedreason",
    },
    {
      header: "Role",
      accessor: "userrole",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  // console.log("This is the data ", suspendedData);

  const data = suspendedData.map((user) => ({
    photo: <ProfilePhoto picUrl={user.pic_url} />,
    username: user.uname,
    emailaddress: user.email,
    userrole: user.role,
    suspendedreason: user.suspend_reason,
    action: (
      <Action
        username={user.uname}
        email={user.email}
        phone={user.contact}
        uid={user.uid}
        role={user.user_type}
        picUrl={user.pic_url}
      />
    ),
  }));

  const pageSize = 10;
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
      <div className=" ml-72 mt-18 w-[75vw] relative">
        {suspendedData.length > 0 ? (
          <Table columns={columns} data={data} pageSize={pageSize} />
        ) : (
          <>
            <Table columns={columns} data={data} pageSize={pageSize} />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuspendUsers;
