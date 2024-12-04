import React, { useState, useEffect } from "react";
import Table from "../../UI/CommonTable/Table";
import { deleteIcon, edit } from "./Assets/index";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRole, getUser } from "../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { RoleManagement, getUserLogin } from "../User_Management/features/userSlice";
import { Button } from "@mui/material";
// Component inside action column
const Action = ({ permissions, role, rid, setLoading }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const handleEditClick = () => {
    const data = {
      permissions: permissions,
      role: role,
      rid: rid,
    };
    Navigate(`/home/editRole`, { state: data });
  };
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const roles = userData.role;
  const handleDelClick = async () => {
    setLoading(true);
    await dispatch(DeleteRole(rid));
    setLoading(false);
    window.location.reload()
  }
  return (
    <div className="flex gap-3 items-center pr-20">
      <div className="flex  h-5 flex gap-2 cursor-pointer">
        {roles === "admin" || roles === "cr" ? (
          <>
            <img src={edit} onClick={handleEditClick} alt="edit" />
            <img src={deleteIcon} onClick={handleDelClick} alt="delete" />
          </>
        ) : (<div>Not Accessible</div>)}
        {/* <img src={View} onClick={handleViewClick} alt="View" /> */}
      </div>
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

const PMS = ({ setActiveTab }) => {
  setActiveTab("permission");
  const Navigate = useNavigate();

  const head = "Permission and Role Management";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  const userData = useSelector((state) => state.userManagement.role);
  let uid = localStorage.getItem("uid")
  useEffect(() => {
    dispatch(RoleManagement());
  }, [dispatch])
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getUser());
      await dispatch(getUserLogin(uid));
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const columns = [
    // {
    //   header: "Photo",
    //   accessor: "photo",
    // },
    // {
    //   header: "Username",
    //   accessor: "username",
    // },
    // {
    //   header: "Email Address",
    //   accessor: "emailaddress",
    // },
    {
      header: "Role",
      accessor: "role",
    },

    {
      header: "Action",
      accessor: "action",
    },
  ];

  const pageSize = 5;
  const filteredData = userData.filter((user) => user.is_suspend === 0);

  // console.log(filteredData);
  // console.log(userData)
  const data = userData.map((user) => ({
    // photo: <ProfilePhoto picUrl={user.pic_url} />,
    // username: user.uname,
    // emailaddress: user.email,
    role: user.role,
    // userid: user.uid,
    action: (
      <Action
        permissions={user.permissions}
        // email={user.email}
        rid={user.rid}
        setLoading={setLoading}
        role={user.role}
      // status={user.status}
      // picUrl={user.pic_url}
      />
    ),
  }));

  const roles = LuserData.role;
  // console.log(roles);
  const greenButtonText = "Add Role";

  const greenClicked = () => {
    Navigate("/home/addNewRole");
  };

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
      <div className=" ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
        {userData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenClicked={greenClicked}
            greenButtonText={
              roles === "admin" || roles === "cr" ? greenButtonText : ""
            }
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenClicked={greenClicked}
              greenButtonText={
                roles === "admin" || roles === "cr" ? greenButtonText : ""
              }

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

export default PMS;
