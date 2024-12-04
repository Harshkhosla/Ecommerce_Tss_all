import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import Table from "../../../UI/CommonTable/Table";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import Status from "./Status";
import { useDispatch, useSelector } from "react-redux";
import { deleteIcon, images, view } from "../Assets/index";
import axios from "axios";
import {
  DeleteDeal,
  MPM_allchats,
  VeiwMember
} from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import cookie from "js-cookie";
import ChatBox from "./chatbox.js";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { url1, url3 } from "../../../UI/port.js";

const Action = ({ dealId, dealName, message, status, seller_id, umid, lid }) => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteDeal(dealId))
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const PopupComponent = ({ onClose, name, status, tid, lid, umid }) => {
    return (
      <ChatBox lid={lid} umid={umid} onClose={onClose} page='allChats' name={name} seller_id={seller_id} status={status} msg={message} />
    );
  };

  const roles = userData.role;
  return (
    <div className="w-6 h-6 flex gap-3 cursor-pointer">
      {roles === "admin" || roles === "cr" ? (
        <>
          <img onClick={handleClick} className="cursor-pointer" src={view} alt="View" />

        </>
      ) : (
        "Not Accessible"
      )}
      {isPopupVisible && (
        <PopupComponent
          lid={lid}
          umid={umid}
          onClose={handleClosePopup}
          name={dealName}
          status={status}
          tid={dealId}
        />
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {dealName}?
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

const Photo = ({ uid }) => {
  const dispatch = useDispatch();

  // Fetch member data when the component mounts
  useEffect(() => {
    dispatch(VeiwMember(uid));
  }, [dispatch, uid]);

  // Get the member data from Redux store
  const memData = useSelector((state) => state.userManagement.VeiwMember);
  const photo = memData.pic_url;

  return (
    <div>
      <img className="w-14 h-14 rounded" src={photo} alt="Photo" />
    </div>
  );
};

const AllChats = ({ lid, seller_id }) => {
  const [buyers, setBuyers] = useState([]);
  const [allbuyersData, setAllBuyersData] = useState([]);

  const chatData = async (id) => {
    try {
      const response = await axios.get(`${url3}/get_buyers_listing_profile?lid=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          "authorization": `${localStorage.getItem('jwt')}`,
        },
      });
      // console.log(response);
      setBuyers(response.data.buyers)
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
    }
  };

  const head = "All Chats and Deals";
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await chatData(lid);
      setLoading(false);
      // console.log(buyers);
    };
    fetchUserData();
  }, []);

  useEffect(() => {

    const fetchBuyerData = async () => {

      let newResponses = [];

      for (const mid of buyers) {
        try {
          const response = await axios.get(`${url1}/viewmember_crm?mid=${mid}`, {
            headers: {
              "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
              "authorization": `${localStorage.getItem('jwt')}`,
            },
          });
          // console.log(response.data.member);
          newResponses.push(response.data.member);

        } catch (error) {
          console.error(`Error fetching data for mid: ${mid}`, error);
        }
      }
      setAllBuyersData(newResponses);


    }
    fetchBuyerData();


    // console.log(allbuyersData);
  }, [buyers]);



  const columns = [
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "User",
      accessor: "requester",
    },
    {
      header: "Contact",
      accessor: "contact",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // const data = buyers
  const data = allbuyersData.map((user) => ({
    photo: <Photo uid={user.mid} />,
    requester: user.uname,
    // message: user.messages,
    // status: <Status value={user.status} />,
    contact: user.phn,
    action: <Action dealName={user.uname} lid={lid} message={user.messages} seller_id={seller_id} umid={user.mid} status={user.status} />,
  }));

  // Number of Pages to be display on a single page.
  const pageSize = 4;

  return (
    <div className="  ml-72 mt-10 w-[75vw] relative">
      {chatData.length > 0 ? (
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
  );
};

export default AllChats;
