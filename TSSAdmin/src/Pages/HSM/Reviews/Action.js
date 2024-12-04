import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteIcon, view, images } from "../Assets/index";
import { DeleteReview } from "../../User_Management/features/userSlice";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle, Button } from "@mui/material";
import { getUserLogin } from "../../User_Management/features/userSlice";

// For the API integration all the data could be get from the API throught props
// When a user click on the view button this popup will should with detailed reviews.
// This is work seperately for every field of the table by using Props.

const Action = ({
  reviews,
  prodId,
  prodName,
  prodPicUrl,
  prodReview,
  prodUserName,
  prodRate,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleViewClick = () => {
    setShowPopup(true);
  };
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
   
    dispatch(DeleteReview(prodId))
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
    <>
      <div className="w-6 h-6 flex gap-3 cursor-pointer">
            <img src={view} onClick={handleViewClick} alt="View" />
        {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
          <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
            ) :null}

      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-7 w-[740px] h-[676px] relative">
            <div className="mb-5">
              <h3 className="font-bold text-xl">Detailed Review</h3>
              <button
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPopup(false)}>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="x w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M14.35 5.65a.5.5 0 0 1 0 .7L10.71 10l3.64 3.65a.5.5 0 0 1-.7.7L10 10.71l-3.65 3.64a.5.5 0 0 1-.7-.7L9.29 10 5.65 6.35a.5.5 0 0 1 .7-.7L10 9.29l3.65-3.64a.5.5 0 0 1 .7 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col w-full justify-start">
              <div className="flex flex-row w-full justify-start items-center mb-5">
                <img
                  className="w-36 h-36 rounded mr-4"
                  src={prodPicUrl}
                  alt="Product"
                />
                <div>
                  <h2 className="font-medium text-xl mb-2">{prodName}</h2>
                  <p className="text-gray-700 font-semibold mb-2">{`${prodRate} Stars`}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-gray-500">Reviewed By </span>
                <p className="font-bold text-md mt-3 mb-5">{prodUserName}</p>
              </div>
              <div>
                <span className="text-gray-500">Review</span>
                <p className="mt-3">
                  {reviews}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
    </>
  );
};

export default Action;
