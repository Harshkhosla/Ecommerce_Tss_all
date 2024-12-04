import React, { useState, useEffect } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateOrderHSM } from "../../User_Management/features/userSlice";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { VeiwOrderHSM } from "../../User_Management/features/userSlice";
import { getUserLogin } from "../../User_Management/features/userSlice";

const VieworderHSM = () => {

    const data1 = useSelector((state) => state.userManagement.VeiwOrderHSM)

    const dispatch = useDispatch();
    const location = useLocation();
    const editData = location.state;
    const Navigate = useNavigate();
    const LuserData = useSelector((state) => state.userManagement.getUserLogin);
    useEffect(() => {
        dispatch(getUserLogin(localStorage.getItem('uid')))
    }, [dispatch])
    const paymentOptions = [
        'Paid',
        'UnPaid',
        'Refunded'
    ]

    const handleOptionChange1 = (e) => {
        setpaymentStatus(e.target.value);
    };
    const [paymentStatus, setpaymentStatus] = useState();
    const [deliveryStatus, setdeliveryStatus] = useState();
    const [oid, setOid] = useState(data1.oid);
    const [tracking_id, setTracking_id] = useState(data1.tracking_code);

    useEffect(() => {
        setpaymentStatus(data1.payment_status);
        setdeliveryStatus(data1.delivery_status);
    }, [data1])


    const handleOptionChange = (e) => {
        setdeliveryStatus(e.target.value);
    };

    const head = "Order History";

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("oid", data1.oid);
        formData.append("payment_status", paymentStatus);
        formData.append("delivery_status", deliveryStatus);
        formData.append("tracking_code", tracking_id);
        // console.log(formData);
        // console.log(oid);

        setLoading(true);
        await dispatch(updateOrderHSM({ formData, oid }));
        setLoading(false);
        Navigate(`/home/transactionHistory`);
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
            <div className="w-[95vw]">
                <div className="fixed flex" style={{ zIndex: "10" }}>
                    <TopHeader className="fixed" head={head} />
                </div>
                <div className="ml-80 mt-20 relative flex flex-col">
                    {/* Top Section */}
                    <div>
                        <form action="">
                            <div className="bg-[#EEEEEE] mt-8 w-full drop-shadow-md border flex flex-row gap-28 px-3 py-4">
                                <div>
                                    <label>Payment Status</label>
                                    <div className="mt-2">
                                        <select
                                            id="select"
                                            value={paymentStatus}
                                            onChange={handleOptionChange1}
                                            className="w-full px-4 py-2 border rounded focus:outline-none "
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="unpaid">Unpaid</option>
                                            <option value="refunded">Refunded</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label>Delivery Status</label>
                                    <div className="mt-2">
                                        <select
                                            id="select"
                                            value={deliveryStatus}
                                            onChange={handleOptionChange}
                                            className="w-full px-4 py-2 border rounded focus:outline-none "
                                            disabled={deliveryStatus == "Cancle"}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Picked Up">Picked Up</option>
                                            <option value="On The Way">On The Way</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancle">Cancle</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label>Tracking Code (optional)</label>
                                    <div className="mt-2">
                                        <input
                                            className="w-full px-4 py-2 border rounded focus:outline-none"
                                            type="text"
                                            value={tracking_id}
                                            onChange={(event) => setTracking_id(event.target.value)}
                                        />
                                    </div>
                                </div>
                                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                                    <div className="flex items-center justify-center">
                                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold mt-5" style={{ height: "5vh", width: "15vh", color: "white" }}>Update</button>
                                    </div>
                                ):null}
                            </div>
                        </form>
                    </div>
                    {/* Order Summary Section */}
                    <div className="bg-[#EEEEEE] mt-8 w-full drop-shadow-md border flex flex-col gap-8 px-3 py-4">
                        <h2 className="font-bold text-lg">Order Summary</h2>
                        <div className="flex flex-row justify-between">
                            <table className="w-full mr-5 mb-20">
                                <tbody>
                                    <tr>
                                        <td className="border border-black px-6 py-4">Order Code:</td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.oid}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">Customer:</td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.customer}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">Email:</td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">
                                            Shipping address:
                                        </td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.shipping_address}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="border border-black px-6 py-4">Order date:</td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.date}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">
                                            Delivery status:
                                        </td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.delivery_status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">
                                            Payment status:
                                        </td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.payment_status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">
                                            Total order amount:
                                        </td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.total_order_amount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">Contact:</td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.contact}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-6 py-4">
                                            Payment method:
                                        </td>
                                        <td className="border border-black px-6 py-4">
                                            {data1.order_summary.payment_method}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Order Details */}
                    <div className="flex flex-row w-full gap-5">
                        <div className="bg-[#EEEEEE] mt-8 mb-10 w-[60vw] drop-shadow-md border flex flex-col gap-8 px-3 py-4">
                            <h2 className="font-bold text-lg">Order Details</h2>
                            <div className="flex flex-row justify-between">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black  p-2">#</th>
                                            <th className="border border-black p-2">Photo</th>
                                            <th className="border border-black p-2">Product</th>
                                            <th className="border border-black p-2">Variation</th>
                                            <th className="border border-black p-2">Quantity</th>
                                            <th className="border border-black p-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data1.order_details.map((item, index) => (
                                            <>
                                                <tr key={index}>
                                                    <td className="border border-black px-6 py-4">1</td>
                                                    <td className="border border-black px-6 py-4">
                                                        <img
                                                            src={item.pic_url}
                                                            alt="photo"
                                                        />
                                                    </td>
                                                    <td className="border border-black px-6 py-4">
                                                        {item.product}
                                                    </td>
                                                    <td className="border border-black px-6 py-4">{item.variation}</td>
                                                    <td className="border border-black px-6 py-4">{item.quantity}</td>
                                                    <td className="border border-black px-6 py-4">{item.price}</td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Order Amount */}
                        <div className="bg-[#EEEEEE] mt-8 mb-10 w-[40vh] drop-shadow-md border flex flex-col gap-8 px-3 py-4">
                            <h2 className="font-bold text-lg">Order Amount</h2>
                            <div className="flex flex-row justify-between">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="border border-black px-6 py-4">
                                                Subtotal :
                                            </td>
                                            <td className="border border-black px-6 py-4">{data1.order_amount.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-6 py-4">
                                                Shipping :
                                            </td>
                                            <td className="border border-black px-6 py-4">{data1.order_amount.shipping}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-6 py-4">Tax :</td>
                                            <td className="border border-black px-6 py-4">{data1.order_amount.tax}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-6 py-4">Coupon :</td>
                                            <td className="border border-black px-6 py-4">{data1.order_amount.coupon}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-6 py-4">Total :</td>
                                            <td className="border border-black text-xl text-red-800 px-6 py-4">
                                                {data1.order_amount.total}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default VieworderHSM;