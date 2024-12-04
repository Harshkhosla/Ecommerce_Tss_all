import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateServicePackage } from "../../User_Management/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { ServiceCategories } from "../../User_Management/features/userSlice";

const EditServicePackage = ({ setExpand, setActiveTab }) => {
    setExpand("homeService");
    setActiveTab("servicePackageManagement");
    const head = "Edit Service Package";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [Category, setCategory] = useState(data.servicePackageName);
    const [price, setprice] = useState(data.servicePackagePrice);
    const [spid, setspid] = useState(data.servicePackageId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            await dispatch(ServiceCategories());
            setLoading(false);
        };
        fetchUserData();
    }, [dispatch]);

    const ServicePackage = useSelector((state) => state.userManagement.ServiceCategories)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("spid", spid);
        formData.append("service_category_list", Category);
        formData.append("service_package_price", price);
        await dispatch(updateServicePackage(formData));
        setLoading(false)
        navigate('/home/servicePackageList')
    };

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
            <div className="flex fixed z-10">
                <TopHeader className="fixed" head={head} />
            </div>

            <div className=" ml-72 mb-10 relative" style={{ marginTop: "120px" }}>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label className="grid mt-5">Service Category List :
                        <select id=""
                            style={{
                                height: "50px",
                                backgroundColor: "#e5ecff",
                                fontSize: "15px",
                            }}
                            value={Category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="px-4 py-2 mt-3 drop-shadow-md rounded-md  ">
                            <option value="">Select Category</option>
                            {ServicePackage.map((item, index) => (
                                <option value={item.scid}>{item.category_name}</option>
                            ))}
                        </select>
                    </label>
                    <div>
                        <label className="grid mt-5" style={{ fontSize: "15px" }}>
                            Service Package Price
                            <input
                                 className="rounded w-[100vh] outline-none"
                                style={{
                                    height: "50px",
                                    paddingLeft: "10px",
                                    border: "2px solid 	#e6f7fe",
                                    marginTop: "5px",
                                    fontSize: "15px",
                                }}
                                value={price}
                                onChange={(event) => setprice(event.target.value)}
                                type="number"
                                multiple
                                placeholder="Enter Price"
                                required
                            />
                        </label>
                    </div>

                    <button
                        className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
                        style={{
                            width: "170px",
                            height: "55px",
                            color: "white",
                        }}
                        type="submit"
                        onSubmit={handleSubmit}>
                        Save
                    </button>
                    <Link to='/home/servicePackageList'>
                    <button
                        className="rounded mt-10 bg-black hover:bg-gray-800"
                        style={{
                            width: "170px",
                            height: "55px",
                            color: "white",
                            marginLeft: "30px",
                        }}
                        type="submit">
                            Cancel
                    </button>
                            </Link>
                </form>
            </div>
        </div>
    );
};

export default EditServicePackage;
