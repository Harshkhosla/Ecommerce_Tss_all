import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, electrical } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import {
  DeleteListing,
  MPM_listing,
  MPM_category,
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";
import { getUserLogin } from "../../User_Management/features/userSlice";

const Action = ({ listId, listName, desc, price, service_area, stock, slider_photos, category, service_name, pic_url, productCategory, seller_id }) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleEditClick = () => {
    const data = {
      listId: listId,
      name: listName,
      desc: desc,
      price: price,
      service_area: service_area,
      service_name: service_name,
      category: category,
      stock: stock,
      pic_url: pic_url,
      slider_photos: slider_photos,
      productCategory: productCategory,
      seller_id: seller_id,
    };
    Navigate("/home/editListing", { state: data });
  };
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(DeleteListing(listId))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const roles = userData.role;
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "cr" ? (
        <>
          <img onClick={handleEditClick} src={edit} alt="edit" />
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
        </>
      ) : (
        "Not Accessible"
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {listName}?
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

const Photo = ({ pic_url }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={pic_url} alt="Photo" />
    </div>
  );
};

const ListingData = ({ setActiveTab, setExpand }) => {
  const head = "Listing Management";
  setExpand("marketPlace");
  setActiveTab("listingManagement");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listingData = useSelector((state) => state.userManagement.mpm_listing);
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(MPM_listing());
      await dispatch(MPM_category());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);
  const lcat = useSelector((state) => state.userManagement.mpm_category);
  let productCategory = lcat.map((item) => item.category_name);

  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Listing name",
      accessor: "service",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Seller",
      accessor: "seller",
    },
    {
      header: "Price",
      accessor: "price",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];
  const data = listingData.map((user) => ({
    photo: <Photo pic_url={user.thumbnail_photo} />,
    service: user.service_name,
    category: user.category,
    seller: user.seller_name,
    price: `S$ ${user.price}`,
    action: (
      <Action
        listId={user.lid}
        listName={user.service_name}
        desc={user.description}
        price={user.price}
        service_area={user.service_area}
        stock={user.stock}
        category={user.category}
        service_name={user.seller_name}
        pic_url={user.thumbnail_photo}
        slider_photos={user.slider_photos}
        productCategory={lcat}
        seller_id={user.seller_id}
      />
    ),
  }));
  // console.log(listingData);
  // Number of Pages to be display on a single page.
  const roles = userData.role;
  // let [data, setData] = useState(dataOg);
  const pageSize = 4;

  // const parentFunction = async (el) => {
  // setData(el)
  // setLoading(true);
  // await dispatch(MPM_listing());
  // await dispatch(MPM_category());
  // setLoading(false);
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
      <div className="  ml-72 mt-28 w-[75vw] relative">
        {listingData.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            // dataOg={dataOg}
            pageSize={pageSize}
            catgoryFilter={productCategory}
          // onClick={parentFunction}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              catgoryFilter={productCategory}
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

export default ListingData;
