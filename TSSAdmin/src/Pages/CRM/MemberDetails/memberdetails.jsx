import React, { useEffect, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import Tabs from "./Tabs";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { VeiwMember, Order_Table, Internal_Notes, Reward_Table } from "../../User_Management/features/userSlice";
import { TextField, Button } from "@mui/material";
import { topUp } from "../../User_Management/features/userSlice";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { tssurl, url1 } from "../../../UI/port";
import axios from "axios";
import { Grid } from "react-loader-spinner";
import { url3 } from "../../../UI/port";

const MemberDetails = ({ setActiveTab, setExpand }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    boxShadow: 24,
    borderRadius: '20px',
    backgroundColor: 'white',
    padding: '15px 30px'
  };
  const styleV = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20rem',
    boxShadow: 24,
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '25px 30px'
  };
  const [open, setOpen] = React.useState(false);
  const [openV, setOpenV] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenV = () => setOpenV(true);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseV = () => setOpenV(false);
  setActiveTab("customerRelationship");
  const head = "Member Details";
  const location = useLocation();
  const { mid } = useParams();
  // console.log("iuytgu");
  // console.log(mid);
  // console.log("iuytgu");
  const handleVerify = async (status) => {
    try {
      setLoading(true);
      handleCloseV()
      const response = await axios({
        method: "post",
        url: `${url1}/processKYC`,
        data: { mid: mid, kyc_status: status },
        headers: {
          "Content-Type": "application/json",
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      await dispatch(VeiwMember(mid));
      setLoading(false);
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      setLoading(false);
    }
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(VeiwMember(mid));
    dispatch(Order_Table(mid));
    dispatch(Reward_Table(mid));
    // dispatch(Internal_Notes(mid));
  }, [dispatch])

  const LuserData = useSelector((state) => state.userManagement?.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])

  const memData = useSelector((state) => state.userManagement?.VeiwMember)
  let uid = mid
  // console.log(memData,"kkkkkk")
  //top up
  const [amount, setAmount] = useState('');
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSendClick = async (event) => {
    event.preventDefault();

    const formData = {
      "amount": amount,
    };




    await dispatch(topUp({ formData, mid }));
    dispatch(VeiwMember(uid));
    handleClose();
    setAmount('');
  };

  const handleExport = () => {
    // console.log("Clicked export");
    fetch(
      `${tssurl}/user/export/${mid}`
    )
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  // console.log(memData?.name);
  const [fname, setFname] = useState(memData?.name);
  const [lname, setLname] = useState(memData?.lname);
  const [address, setAddress] = useState(memData?.address?.landmark?.[0]?.landmark);
  const [bio, setBio] = useState(memData?.bio);
  const [email, setEmail] = useState(memData?.email);
  const [phn, setPhn] = useState(memData?.mobileNo);
  const [gender, setGender] = useState(memData?.gender);
  const [username, setusername] = useState(memData?.name);
  const [country, setCountry] = useState(memData?.address?.landmark?.[0]?.country);
  const [zip, setZip] = useState(memData?.zipcode);
  const [openE, setOpenE] = React.useState(false);
  useEffect(() => {
    setFname(memData?.name)
    setLname(memData?.lname)
    setAddress(memData?.address?.landmark?.[0]?.landmark)
    setBio(memData?.bio)
    setEmail(memData?.email)
    setPhn(memData?.mobileNo)
    setGender(memData?.gender)
    setusername(memData?.name)
    setCountry(memData?.address?.landmark?.[0]?.country)
    setZip(memData?.address?.landmark?.[0]?.zipcode)
  }, [memData])
  const handleOpenE = () => setOpenE(true);
  const handleCloseE = () => setOpenE(false);
  const styleE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    boxShadow: 24,
    borderRadius: '20px',
    padding: '15px 30px',
    maxHeight: "90vh",
    overflow: "auto",
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", username);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("mobileNo", phn);
    formData.append("gender", gender);
    formData.append("mid", mid);
    formData.append("country", country);
    formData.append("zipcode", zip);

    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/user/${mid}`,
        data: formData,
        headers: {
          //     "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          "authorization": `${localStorage.getItem('jwt')}`,
        },
      })
        .then(async (response) => {

          // console.log(response);

        })
      window.location.reload();
    }
    catch (err) {
      // console.log(err);

    };
  };

  return (
    <>
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
      <Modal
        open={openE}
        onClose={handleCloseE}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styleE} className="bg-stone-200">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }} className="text-gray-900 mb-2">Edit Member</h2>
          <div className="mb-3">
            <div className="grid grid-cols-2 gap-2 pb-3">
              <label className="grid pr-6">
                User Name
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={username} onChange={(e) => setusername(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                First Name
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={fname} onChange={(e) => setFname(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Last Name
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={lname} onChange={(e) => setLname(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Address
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={address} onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Country
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={country} onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Zip
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={zip} onChange={(e) => setZip(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Bio
                <input
                  type="text"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={bio} onChange={(e) => setBio(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Email
                <input
                  type="email"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Mobile Number
                <input
                  type="tel"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={phn} onChange={(e) => setPhn(e.target.value)}
                  required
                />
              </label>
              <label className="grid pr-6">
                Gender
                <select
                  id="label"
                  name="label"
                  className="outline-none rounded-md "
                  style={{
                    height: "50px",
                    // width: "380px",
                    marginTop: '5px',
                    paddingLeft: "15px",
                  }}
                  value={gender} onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <Button variant="contained" onClick={handleCloseE} size="large" color="error">
                  Cancel
                </Button>
              </div>
              <div>
                <Button style={{ color: "white" }} onClick={handleSubmit} variant="contained" size="large" color="themeColor">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <div style={style}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }} className="text-gray-900">Amount</h2>
          <div className="my-3">
            <TextField type="number" id="outlined-basic" label="Enter Amount" onChange={handleAmountChange} fullWidth variant="outlined" />
            <div className="text-end mt-2">
              <Button onClick={handleSendClick} style={{ color: "white" }} color="themeColor" variant="contained">
                Set TopUp
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={openV}
        onClose={handleCloseV}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <div style={styleV}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }} className="text-gray-900">Verified</h2>
          <div className="mt-5">
            <div className="text-end mt-3 gap-5 flex justify-between">
              <Button fullWidth onClick={() => handleVerify("rejected")} color="error" variant="contained">
                Reject
              </Button>
              <Button fullWidth onClick={() => handleVerify("Verified")} color="themeColor" variant="contained">
                Approve
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <div className="fixed flex" style={{ zIndex: "10" }}>
          <TopHeader className="fixed" head={head} />
        </div>

        <div
          className="ml-72 mt-20 bg-slate-100 shadow-inner rounded-2xl p-4 relative flex"
          style={{ marginTop: "80px", zIndex: "2" }}>
          <div className="pr-3">
            <div
              className="rounded"
              style={{
                width: "175px",
                height: "240px",
                border: "2px solid #EFEFEF",
                backgroundColor: "#FFFFFF",
                filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))",
              }}>
              <img
                src={memData.pic_url}
                className="p-3 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Members details data */}
          <div className="flex gap-4">
            <div>
              <div className="flex gap-3 flex-wrap" style={{ whiteSpace: "nowrap" }}>
                <div className="flex flex-col justify-start gap-4 items-start">
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Name :</label>
                    <p>{`${memData.name}`}</p>
                  </div>
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Phone No :</label>
                    <p>{memData.mobileNo}</p>
                  </div>
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Email :</label>
                    <p>{memData.email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-4 items-start">
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Purchased item :</label>
                    <p>{memData.purchased_items}</p>
                  </div>
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Payment History :</label>
                    <p>{memData.payment_history}</p>
                  </div>
                  <div className="flex flex-row gap-2 py-3 px-4 w-full shadow-md bg-white">
                    <label>Reward Points :</label>
                    <p>{memData.reward_points && memData.reward_points}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-4 items-end">
                  <div className="flex flex-row gap-2 py-3 px-4 shadow-md bg-white">
                    <label>Cashback Points :</label>
                    <p>{memData.cashback_points && memData.cashback_points.toFixed(0)}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-grow gap-2 py-3 ps-4 mt-3 shadow-md bg-white">
                <label>Address :</label>
                <p>{memData?.address?.landmark?.[0]?.landmark}</p>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-4 items-start" style={{ whiteSpace: "nowrap" }}>
              <div className="flex flex-row gap-2">
                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                  <button onClick={handleOpenE} className="px-4 py-2 rounded-md text-white  cursor-pointer bg-[#c93a0e] hover:bg-[#c91b0e]">
                    Edit
                  </button>
                ) : null}
                {/* <div className="flex flex-row gap-2"> */}
                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                  <button onClick={handleOpen} className="px-4 py-2 rounded-md text-white  cursor-pointer bg-[#c93a0e] hover:bg-[#c91b0e]">
                    Topup
                  </button>
                ) : null}
                {/* </div> */}
              </div>
              {/* <div className="flex flex-row gap-2">
                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                  <button className="px-4 py-2 rounded-md text-white  cursor-pointer bg-[#c93a0e] hover:bg-[#c91b0e]">
                    Suspend
                  </button>
                ) : null}
              </div> */}
              <div className="flex flex-row gap-2">
                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                  <>
                    {/* {memData.kyc_status == "Verified" ? (
                      
                    ) : (
                      <button onClick={handleOpenV} className="px-4 py-2 rounded-md text-white  cursor-pointer bg-[#c93a0e] hover:bg-[#c91b0e]">
                        Verified
                      </button>
                    )} */}
                    <button className="px-4 py-2 rounded-md text-white  cursor-pointer bg-[#c93a0e] hover:bg-[#c91b0e]">
                      Verified
                    </button>
                  </>
                ) : null}
              </div>
              <div className="flex flex-row gap-2">
                <p
                  onClick={handleExport}
                  href={`${tssurl}/user/export/${mid}`}
                  className="px-4 py-2  cursor-pointer text-white bg-amber-600 hover:bg-amber-700">
                  Export Members
                </p>
              </div>

            </div>
          </div>
        </div>
        <div className="ml-72" style={{ marginTop: "20px", zIndex: -1 }}>
          <Tabs mid={mid} />
        </div>
      </div>
    </>

  );
};

export default MemberDetails;
