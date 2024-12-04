import { useEffect, useState } from "react";
import Table from "../../../UI/CommonTable/Table";
import InputField from "./InternalNote";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Order_Table, Reward_Table, VeiwOrder, get_transaction_history_wallet } from "../../User_Management/features/userSlice";

const Tabs = ({ mid }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const ProfilePhoto = ({ picUrl }) => {
    return (
      <div>
        <img className="w-12 h-12 rounded-full" src={picUrl} alt="photo" />
      </div>
    );
  };


  const columns_order = [
    // {
    //   header: "Photo",
    //   accessor: "pic_url",
    // },
    {
      header: "Order ID",
      accessor: "product_name",
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
  const pageSize = 5;
  const columns_reward = [
    {
      header: "Order ID",
      accessor: "oid",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Status",
      accessor: "statusp",
    },
    {
      header: "Date",
      accessor: "date",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(get_transaction_history_wallet(mid));

  }, [dispatch])

  const OrderDetails = ({ oid, mid,
    payment_status,
    delivery_status,
    tracking_id,
  }) => {
    const data = {
      payment_status: payment_status,
      oid: oid,
      mid: mid,
      delivery_status: delivery_status,
      tracking_id: tracking_id,
      tab: 'crm',
    }
    const viewOrder = () => {
      // console.log(oid)
      // dispatch(VeiwOrder(oid))
      navigate("/home/viewOrder", { state: data });
    };
    // // console.log(oid)
    return (
      <button
        className="bg-blue-500 px-2 py-2 rounded-l text-white coursor-pointer hover:bg-blue-600"
        onClick={viewOrder}>
        View Order
      </button>
    );
  };

  const order_history1 = useSelector((state) => state.userManagement.Order_Table)
  const reward_history1 = useSelector((state) => state.userManagement.get_transaction_history_wallet)
  // const order_history1 = useSelector((state) => state.userManagement.Reward_Table)

  const data_order = order_history1.map((user) => ({
    pic_url: <ProfilePhoto picUrl={user.pic_url} />,
    product_name: user.oid,
    amount: `S$ ${user.amount}`,
    payment_method: user.payment_mode,
    status: user.payment_status,
    date: user.date,
    action: <OrderDetails
      mid={mid}
      oid={user._id}
      payment_status={user.payment_status}
      delivery_status={user.delivery_status}
      tracking_id={user.tracking_id}
      products={user.products}
    />,
  }));

  const data_reward = reward_history1.map((user) => ({
    oid: user.oid,
    amount: user.amt,
    statusp: user.status,
    date: user.date
  }));

  const pageSize_order = 4;
  const pageSize_reward = 4;

  return (
    <div className="p-4">
      <div className="flex  space-x-4">
        <button
          className={`py-2 px-4 rounded ${activeTab === 1
            ? "bg-[#c93a0e] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => handleTabClick(1)}>
          Order History
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 2
            ? "bg-[#c93a0e] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => handleTabClick(2)}>
          Reward Point History
        </button>
        <button
          className={`py-2 px-4 rounded ${activeTab === 3
            ? "bg-[#c93a0e] text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => handleTabClick(3)}>
          Internal Notes
        </button>
      </div>

      {activeTab === 1 && (
        <div className="mt-4 mb-10 ">
          <div className=" w-[75vw] relative">
            <Table columns={columns_order} data={data_order} pageSize={pageSize} />
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className="mt-4 mb-10 ">
          <div className=" w-[75vw] relative">
            <Table columns={columns_reward} data={data_reward} pageSize={pageSize} />
          </div>
        </div>
      )}
      {activeTab === 3 && (
        <div className=" w-[75vw] relative mt-10 ">
          <InputField mid={mid} />
        </div>
      )}
    </div>
  );
};

export default Tabs;
