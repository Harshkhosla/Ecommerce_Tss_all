import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { deleteIcon, editIcon } from "../Assets/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import Table from "../../../../UI/CommonTable/Table";
import { useSelector } from "react-redux";
import { getAllDepartments_cms, getUser, getUserLogin, DeleteDept } from "../../../User_Management/features/userSlice";
import search from "../Assets/search.png";

const Action = ({ image, dept_name, slug ,dept_id,deptData}) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = () => {

    dispatch(DeleteDept(dept_id))

      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleClick = async () => {
    // setLoading(true);
    // await dispatch(HSM_Product(prodId));
    // setLoading(false);
    const data = {
      // name: prodName,
      // category: category,
      image: image,
      dept_name: dept_name,
      slug: slug,
      deptData: deptData,
      dept_id:dept_id,
    };
    Navigate(`/home/editdepartment`, { state: data });
  };
  return (
    <div>
          {LuserData.role == 'admin' || LuserData.role == 'editor' || 1== 1 ? (
            <div className="flex gap-2">
            <img src={editIcon} onClick={handleClick} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" />
            <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete"  className="w-6 h-6 " style={{ cursor: 'pointer' }}/>
            </div>
            ):(<div>Not Accessible</div>)}
              {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {dept_name}?
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

const Photo = ({ picUrl }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={picUrl} alt="Photo" />
    </div>
  );
};

const CMSDepts = ({ setActiveTab, setExpand }) => {
  setExpand("userManagement");
  setActiveTab("department");
  const head = "Departments";
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const pageSize = 5;
  const greenButtonText = "Add New Department"
  const greenClicked = () => {
    Navigate("/home/addDepartment");
  };

  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getAllDepartments_cms());
      setLoading(false);
    }
    fetchData();
  }, [dispatch])

  const deptData = useSelector((state) => state.userManagement.getAllDepartments_cms)
  const usersData = useSelector((state) => state.userManagement.users);
  
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getUser());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const data = deptData.map((item, index) => ({
    image: <Photo picUrl={item.department_photo1}/>,
    dept_name: item.department_name,
    slug: item.department_slug,
    dept_id: item.dept_id,
    action: <Action
      image={item.department_photo1}
      dept_name={item.department_name}
      slug={item.department_slug}
      dept_id={item.dept_id}
      deptData={deptData}
    />
  }))


  const columns = [
    {
      header: "Image",
      accessor: "image",
    },
    {
      header: "Department Name",
      accessor: "dept_name",
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
              greenButtonText={
                LuserData.role === "admin" || LuserData.role === "editor" || 1 == 1 ? greenButtonText : ""
              }
              greenClicked={greenClicked}
            />
          </>)
          :
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={
                LuserData.role === "admin" || LuserData.role === "editor" || 1 == 1 ? greenButtonText : ""
              }
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

export default CMSDepts;
