import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeletePromotion,
  HSM_promotion,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";
import { getUserLogin } from "../../User_Management/features/userSlice";


const Action = ({ promo_id,
  name,
  category,
  expiry,
  offer_by,
  offer_val,
  promotion_code,
  date,
  min,
  max,
  products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const LuserData = useSelector((state) => state.userManagement.getUserLogin);

  const handleEditClick = () => {
    const data = {
      promo_id: promo_id,
      name: name,
      category: category,
      expiry: expiry,
      offer_by: offer_by,
      offer_val: offer_val,
      promotion_code: promotion_code,
      date: date,
      min: min,
      max: max,
      products: products,

    };
    navigate("/home/editPromotion", { state: data });
  };
  // console.log("This is the name", name);
  const handleConfirmDelete = () => {
    dispatch(DeletePromotion(promo_id))
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
  const roles = LuserData.role;
  return (
    <div className=" h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "editor" ? (
        <>
          <img src={edit} onClick={handleEditClick} alt="edit" />
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : "Not Accessible"}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">{`Are you sure you want to delete ${name}?`}</p>
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

const AllProjects = ({ setActiveTab, setExpand }) => {
  const navigate = useNavigate();
  setExpand("homeService");
  setActiveTab("promotionManagement");
  const greenClicked = () => {
    navigate("/home/addPromotion");
  };
  const head = "All Promotion List";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const promotionData = useSelector(
    (state) => state.userManagement.hsm_promotion
  );
  // console.log(promotionData);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  // // console.log(LuserData);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_promotion());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const columns = [
    {
      header: "Promotion code",
      accessor: "productid",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Start Date",
      accessor: "uptodate",
    },
    {
      header: "End Date",
      accessor: "expirydate",
    },
    // {
    //   header: "Expiry Date",
    //   accessor: "expirydate",
    // },
    // {
    //   header: "Offer By",
    //   accessor: "offerby",
    // },
    // {
    //   header: "Offer Value",
    //   accessor: "offervalue",
    // },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // console.log("This is the promotion data :", promotionData);
  const data = promotionData.map((user) => ({
    productid: user.promotion_code,
    name: user.promotion_title,
    category: user.promotion_type,
    expirydate: user.offer_valid_upto, //Add expiry date when get from backend API
    uptodate: user.offer_valid_from, //Add expiry date when get from backend API
    offerby: user.offer_type,
    offervalue: user.offer,
    action: (
      <Action
        promo_id={user.promo_id}
        name={user.promotion_title}
        category={user.promotion_type}
        expiry={user.offer_valid_upto}
        date={user.offer_valid_from}
        offer_by={user.offer_type}
        offer_val={user.price}
        promotion_code={user.promotion_code}
        min={user.minimum_shopping}
        max={user.max_discount_amount}
        products={user.products}
      />
    ),
  }));

  const greenButtonText = "ADD NEW PROMOTIONS";

  // Number of Pages to be display on a single page.
  const pageSize = 4;

  const roles = LuserData.role;
// console.log(roles);
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
        {promotionData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
            greenClicked={greenClicked}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={roles === "admin" || roles === "editor" ? greenButtonText : ""}
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
