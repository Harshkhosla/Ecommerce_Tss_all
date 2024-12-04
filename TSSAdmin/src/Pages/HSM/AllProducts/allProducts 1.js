// import React from "react";
// import Table from "../../../UI/CommonTable/Table";
// import { deleteIcon, edit, images } from "./Assets/index";
// import TopHeader from "../../../UI/TopHeader/TopHeader";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import { AllCategories_sm } from "../../User_Management/features/userSlice";
// import { useEffect, useState } from "react";
// import { Grid } from "react-loader-spinner";
// import {
//   allProjects,
//   DeleteProject,
//   getProjectDetails,
// } from "../../User_Management/features/userSlice";
// import { Alert, AlertTitle, Button } from "@mui/material";
// import cookie from "js-cookie";

// const Action = ({ projId, projName, category, rate, type, currency, thumbnail_photo,
//   slider_photos,
//   sub_slider_photos,
//   quatation_photo, productCategory }) => {
//   const Navigate = useNavigate();
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const handleClick = async () => {
//     const data = {
//       name: projName,
//       category: category,
//       rate: rate,
//       type: type,
//       thumbnail_photo: thumbnail_photo,
//       slider_photos: slider_photos,
//       sub_slider_photos: sub_slider_photos,
//       quatation_photo: quatation_photo,
//       productCategory: productCategory,
//     };
//     await dispatch(getProjectDetails(projId))
//     Navigate("/home/editShowcase");
//   };
//   const dispatch = useDispatch();
//   const handleDeleteClick = () => {
//     setShowDeleteConfirmation(true);
//   };

//   const handleConfirmDelete = async () => {
//     console.log(projId)
//     await dispatch(DeleteProject(projId))
//       .then(() => {
//         window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirmation(false);
//   };

//   const roles = localStorage.getItem("role");

//   return (
//     <div className="w-6 h-6 flex gap-3 cursor-pointer">
//       {roles === "admin" || roles === "editor" ? (
//         <>
//           <img onClick={handleClick} src={edit} alt="edit" />
//           <img src={deleteIcon} onClick={handleDeleteClick} alt="Delete" />
//           {/* <FormControlLabel control={<Switch />}  /> */}
//         </>
//       ) : (
//         "Not Accessible"
//       )}
//       {showDeleteConfirmation && (
//         <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-5 rounded shadow">
//             <Alert severity="warning">
//               <AlertTitle>Confirmation</AlertTitle>
//               <p className="pt-5">
//                 Are you sure you want to delete {projName}?
//               </p>
//               <div className="p-5">
//                 <Button onClick={handleConfirmDelete} color="error" autoFocus>
//                   Delete
//                 </Button>
//                 <Button onClick={handleCancelDelete} color="inherit">
//                   Cancel
//                 </Button>
//               </div>
//             </Alert>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Photo = ({ picUrl }) => {
//   return (
//     <div>
//       <img className="w-14 h-14 rounded" src={picUrl} alt="Photo" />
//     </div>
//   );
// };

// const AllProjects = ({ setActiveTab, setExpand }) => {
//   setExpand("showcaseManagement");
//   setActiveTab("projectList");
//   const head = "All Project";
//   const Navigate = useNavigate();
//   const greenClicked = () => {
//     Navigate("/home/addShowcase");
//   };

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const projectData = useSelector((state) => state.userManagement.allprojects);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       await dispatch(allProjects());
//       await dispatch(AllCategories_sm());
//       setLoading(false);
//     };
//     fetchUserData();
//   }, [dispatch]);
//   const pcat = useSelector((state) => state.userManagement.AllCategories_sm);
//   let productCategory = pcat.map((item) => item.ctg_name);
//   console.log(productCategory);
//   const columns = [
//     {
//       header: "Photo",
//       accessor: "photo",
//     },
//     {
//       header: "Project Name",
//       accessor: "projectname",
//     },
//     {
//       header: "Category",
//       accessor: "category",
//     },
//     {
//       header: "Currency",
//       accessor: "currency",
//     },
//     {
//       header: "Rate",
//       accessor: "rate",
//     },
//     {
//       header: "Reviews",
//       accessor: "reviews",
//     },
//     {
//       header: "Action",
//       accessor: "action",
//     },
//   ];

//   console.log("This is the project data :", projectData);

//   function formatNumber(number) {
//     if (number >= 1000) {
//       const abbreviated = (number / 1000).toFixed(2);
//       return `${abbreviated}k`;
//     }
//     return number;
//   }

//   const data = projectData.map((user) => ({
//     photo: <Photo picUrl={user.thumbnail_photo} />,
//     projectname: user.project_name,
//     category: user.category,
//     rate: `${formatNumber(user.project_rate)}`,
//     projecttype: user.project_type,
//     currency: user.rate_currency,
//     reviews: user.reviews ? `${formatNumber(user.reviews)}` : 'No reviews',
//     action: (
//       <Action
//         projId={user.pid}
//         projName={user.project_name}
//         category={user.proj_category}
//         currency={user.rate_currency}
//         rate={user.project_rate}
//         type={user.project_type}
//         thumbnail_photo={user.thumbnail_photo}
//         slider_photos={user.slider_photos}
//         sub_slider_photos={user.sub_slider_photos}
//         quatation_photo={user.quatation_photo}
//         productCategory={productCategory}
//       />
//     ),
//   }));

//   const greenButtonText = "Add New Project";
//   const blackButtonText = "Export All";

//   // Number of Pages to be display on a single page.
//   const pageSize = 4;

//   const roles = localStorage.getItem("role");

//   return (
//     <div>
//       <div className="flex fixed z-10">
//         <TopHeader className="fixed" head={head} />
//       </div>
//       {loading ? (
//         <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
//           <Grid
//             height="80"
//             width="80"
//             color="#4fa94d"
//             ariaLabel="grid-loading"
//             radius="12.5"
//             wrapperStyle={{}}
//             wrapperClass=""
  