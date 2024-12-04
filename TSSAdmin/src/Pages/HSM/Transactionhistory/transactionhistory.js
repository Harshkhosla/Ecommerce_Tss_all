import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { HSM_transaction, VeiwOrderHSM } from "../../User_Management/features/userSlice";
import { tssurl } from "../../../UI/port";

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" src={picUrl} alt="photo" />
    </div>
  );
};

const OrderDetails = ({ oid,
  payment_status,
  delivery_status,
  tracking_id,
}) => {
  const navigate = useNavigate()
  const data = {
    payment_status: payment_status,
    oid: oid,
    delivery_status: delivery_status,
    tracking_id: tracking_id,
    tab: 'hsm',
  }
  const viewOrder = () => {
    // console.log(oid)
    // dispatch(VeiwOrder(oid))
    navigate("/home/viewOrder", { state: data });
  };
  // console.log(oid)
  return (
    <button
      className="bg-blue-500 px-2 py-2 rounded-l text-white coursor-pointer hover:bg-blue-600"
      onClick={viewOrder}>
      View Order
    </button>
  );
};


const Purchases = ({ setActiveTab, setExpand }) => {
  setExpand("transactionHistory");
  setActiveTab("transactionHistory");
  const dispatch = useDispatch();
  const head = "Transaction/Purchase History";
  const [loading, setLoading] = useState(true);

  const transactionData = useSelector(
    (state) => state.userManagement.hsm_transaction
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_transaction());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const columns_order = [

    {
      header: "Order ID",
      accessor: "order_id",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Payment Method",
      accessor: "payment_method",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  let count = 1;
  const data_order = transactionData.map((user) => ({
    serialno: count++,
    pic_url: <ProfilePhoto picUrl={user.pic_url} />,
    order_id: user._id,
    amount: `$ ${user.amount}`,
    payment_method: user.payment_mode,
    status: user.payment_status,
    date: user.date,
    action: <OrderDetails
      // mid={mid}
      oid={user._id}
      payment_status={user.payment_status}
      delivery_status={user.delivery_status}
      tracking_id={user.tracking_id}
    />,
  }));

  // Number of Pages to be display on a single page.
    const greenButtonText = "Export All";
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
        {transactionData.length > 0 ? (
          <Table columns={columns_order} data={data_order} pageSize={pageSize}   greenButtonText={
            <a href={`${tssurl}/oders/export`} >
            {greenButtonText}
          </a> } />
        ) : (
          <>
            <Table columns={columns_order} data={data_order} pageSize={pageSize} greenButtonText={
            <a href={`${tssurl}/oders/export`} >
            {greenButtonText}
          </a> } />
            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Purchases;
