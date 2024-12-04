import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteServicePackage, ServicePackage } from "../../User_Management/features/userSlice";
import axios from "axios";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { url1 } from "../../../UI/port";

// { servicePackageId, servicePackageName } this is the props for action
const Action = ({ servicePackageId,
    servicePackageName,
    servicePackagePrice }) => {
    const Navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const handleClick = () => {
        // // console.log(servicePackageName);
        const data = {
            servicePackageId: servicePackageId,
            servicePackageName: servicePackageName,
            servicePackagePrice: servicePackagePrice,
        };
        Navigate("/home/editServicePackage", { state: data });
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
        dispatch(DeleteServicePackage(servicePackageId))
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                // console.log(err);
            });
        // console.log(servicePackageId);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };
    return (
        <div className=" h-6 flex gap-3 cursor-pointer">
            {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                <>
                    <img onClick={handleClick} src={edit} alt="edit" />
                    <img onClick={handleDeleteClick} src={deleteIcon} alt="Delete" />
                </>) : (<div>Not Accessible</div>)}
            {showDeleteConfirmation && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded shadow">
                        <Alert severity="warning">
                            <AlertTitle>Confirmation</AlertTitle>
                            <p className="pt-5">Are you sure you want to delete {servicePackageName}?</p>
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

const ServicePackageList = ({ setActiveTab, setExpand }) => {
    const head = "Service Package List";
    setExpand("homeService");
    setActiveTab("servicePackageList");
    const Navigate = useNavigate();
    const greenClicked = () => {
        Navigate("/home/addNewServicePackageList");
    };

    const dispatch = useDispatch();
    const LuserData = useSelector((state) => state.userManagement.getUserLogin);
    useEffect(() => {
        dispatch(getUserLogin(localStorage.getItem('uid')))
    }, [dispatch])
    const [loading, setLoading] = useState(true);

    const productData = useSelector((state) => state.userManagement.ServicePackage);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            await dispatch(ServicePackage());
            setLoading(false);
        };
        fetchUserData();
    }, [dispatch]);



    const columns = [
        {
            header: "Service Category",
            accessor: "servicePackageName",
        },
        {
            header: "Service Package Price (S$)",
            accessor: "servicePackagePrice",
        },
        {
            header: "Action",
            accessor: "action",
        },
    ];
    const [categoryData, setCategoryData] = useState([]);
    // console.log(categoryData);
    const data = productData.map((user, index) => {
        const categoryName = categoryData[index] || '';
        return ({
            servicePackageName: categoryName,
            servicePackagePrice: user.service_package_price,
            action: <Action
                servicePackageId={user.spid}
                servicePackageName={user.service_category_list}
                servicePackagePrice={user.service_package_price} />,
        })
    });

    useEffect(() => {
        const categoryPromises = productData.map(async (user) => {
            try {
                const response = await axios.get(
                    `${url1}/getServiceCategory_hsm?scid=${user.service_category_list}`,
                    {
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            "authorization": `${localStorage.getItem('jwt')}`,
                        },
                    }
                );

                setLoading(false);
                return response.data.data.category_name;
            } catch (error) {
                // console.log("Error fetching data:", error);
                return null;
            }
        });

        Promise.all(categoryPromises)
            .then((categories) => {
                setCategoryData(categories);
            })
            .catch((error) => {
                console.error("An error occurred while fetching data:", error);
            });
    }, [productData]);

    const blackButtonText = "Export All";
    const greenButtonText = "Add New";

    // Number of Pages to be display on a single page.
    const pageSize = 4;

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
            <div className="  ml-72 mt-28 w-[75vw] relative">
                {data.length > 0 ?
                    (<>
                        <Table
                            columns={columns}
                            data={data}
                            pageSize={pageSize}
                            blackButtonText={
                                <a href={`${url1}/exportAllServicePackage_cms`}>
                                    {blackButtonText}
                                </a>
                            }
                            greenButtonText={
                                LuserData.role === "admin" || LuserData.role === "editor" ? greenButtonText : ""
                            }
                            greenClicked={greenClicked}
                        />
                    </>)
                    :
                    (<>
                        <Table
                            columns={columns}
                            data={data}
                            pageSize={pageSize}
                            blackButtonText={
                                <a href={`${url1}/exportAllServicePackage_cms`}>
                                    {blackButtonText}
                                </a>
                            }
                            greenButtonText={
                                LuserData.role === "admin" || LuserData.role === "editor" ? greenButtonText : ""
                            }
                            greenClicked={greenClicked}
                        />
                        <div className="flex ml-5 justify-center w-full mt-40">
                            <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default ServicePackageList;
