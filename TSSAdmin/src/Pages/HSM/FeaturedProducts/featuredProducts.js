import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  HSM_featuredProduct,
  DeleteProduct,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";
import { getUserLogin } from "../../User_Management/features/userSlice";

const Action = ({ prodId, prodName }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClick = () => {
    Navigate("/home/editServices");
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const handleConfirmDelete = () => {
    dispatch(DeleteProduct(prodId))
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
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={edit} onClick={handleClick} alt="edit" />
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : "Not Accessible"}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {prodName}?
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

const Photo = () => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={images} alt="Photo" />
    </div>
  );
};

const AllProjects = ({ setActiveTab, setExpand }) => {
  setExpand("homeService");
  setActiveTab("featuredProduct");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/addProduct");
  };
  const head = "Featured Product and Services";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const featuredData = useSelector(
    (state) => state.userManagement.hsm_featuredproducts
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_featuredProduct());
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
      header: "Product Name",
      accessor: "productname",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Inventory",
      accessor: "inventory",
    },
    {
      header: "Package",
      accessor: "package",
    },
    {
      header: "Service Category",
      accessor: "servicecategory",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const data = featuredData.map((user) => ({
    photo: <Photo />,
    productname: user.fields.name,
    category: user.fields.category,
    inventory: `${user.fields.rate} items`,
    package: `S$ ${user.fields.inv_count}`,
    servicecategory: `${user.fields.net_purchase_item_count} items`,
    action: <Action prodId={user.pk} prodName={user.fields.name} />,
  }));

  const greenButtonText = "ADD NEW PRODUCT";

  // Number of Pages to be display on a single page.
  const pageSize = 4;

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
      <div className="  ml-72 mt-28 w-[75vw] relative">
        {featuredData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            // greenButtonText={greenButtonText}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              // greenButtonText={greenButtonText}
              greenClicked={greenClicked}
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

export default AllProjects;
