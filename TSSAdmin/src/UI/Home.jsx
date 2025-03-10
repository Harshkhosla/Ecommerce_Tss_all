
import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavigationBar/SideNavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink
  
} from "react-router-dom";
import Dashboard from "../Pages/DashBoard_Screen/Dashboard";
import UserDetails from "../Pages/User_Management/All_Users/all_user";
import EditRole from "../Pages/PRM/editRole";
import Configuration from "../Pages/Configuration_Screen/Configuration";
import Prm from "../Pages/PRM/prm";
import EditUser from "../Pages/User_Management/Edit_User_Screen/editUser";
import CreateNewPage from "../Pages/Content_Management/CreateNewPage/createNewPage";
import ViewUser from "../Pages/User_Management/View_Details/viewuser";
import MemberDetails from "../Pages/CRM/MemberDetails/memberdetails";
// import AddShowcase from "../Pages/PSM/AddNewShowCase/addNewShowcase";
// import EditShowcase from "../Pages/PSM/EditShowcase/editShowcase";
import AddProduct from "../Pages/HSM/AddProduct/addProduct";
import AddPromotion from "../Pages/HSM/AddNewPromotion/addNewPromotion";
import AllPromotion from "../Pages/HSM/AllPromotionList/allPromotionList";
import EditService from "../Pages/HSM/EditService/editService";
import EditProduct from "../Pages/HSM/EditProducts/editProducts";
import Chatdetails from "../Pages/HSM/HelpDesk/chatdetails";
import HelpDesk from "../Pages/HSM/HelpDesk/helpDesk";
import AllPages from "../Pages/Content_Management/AllPages/header/CMSHeader";
// import ProjectList from "../Pages/PSM/AllProjects/allProjects";
// import FeaturedProject from "../Pages/PSM/FeaturedProject/featuredProject";
import FeaturedProducts from "../Pages/HSM/FeaturedProducts/featuredProducts";
import AllProducts from "../Pages/HSM/AllProducts/allProducts";
import TransactionHistory from "../Pages/HSM/Transactionhistory/transactionhistory";
import Reviews from "../Pages/HSM/Reviews/reviews";
import PRM from "../Pages/PRM/prm";
import SuspendedUser from "../Pages/User_Management/Suspended_User/suspendedUser";
import AllMembers from "../Pages/CRM/AllMembers/allmembers";
import AddNewRole from "../Pages/PRM/addNewRole";
import EditMember from "../Pages/MarketPlaceManagement/EditMember/editMember";
import EditCategory from "../Pages/MarketPlaceManagement/AllProducts/editCategory.jsx";
import AddNewCategory from "../Pages/MarketPlaceManagement/AllProducts/addNewcategory.jsx";
import AddListing from "../Pages/MarketPlaceManagement/ListingManagement/addListing.jsx";
import EditListing from "../Pages/MarketPlaceManagement/ListingManagement/editListing.jsx";
import AllMarketMember from "../Pages/MarketPlaceManagement/AllMembers/allMembers";
import SuspendedMarketUser from "../Pages/MarketPlaceManagement/SuspendUsers/suspendUsers";
import AllMarketProducts from "../Pages/MarketPlaceManagement/AllProducts/Allproducts";
import ListingManagement from "../Pages/MarketPlaceManagement/ListingManagement/listingManagement";
import ReviewMPM from "../Pages/MarketPlaceManagement/ReviewManagement/reviewManagement";
// import ProjectBooking from "../Pages/PSM/ProjectBookings/projectBookings";
import CreateUser from "../Pages/User_Management/Create_User/createUser";
import EditPage from "../Pages/Content_Management/EditPage/editPage";
import cookie from "js-cookie";
import EditPromotion from "../Pages/HSM/EditPromotion/editPromotion";
import AddMembers from "../Pages/CRM/AddMembers/addMembers";
import VieworderHSM from "../Pages/HSM/Transactionhistory/VeiworderHSM";
import Vieworder from "../Pages/CRM/MemberDetails/Vieworder.jsx";
import CategoryList from "../Pages/HSM/CategoryList/categorylist.jsx";
import ProductCategory from "../Pages/HSM/ProductCategory/productCategory.jsx";
import ServiceCategory from "../Pages/HSM/ServiceCategory/serviceCategory.jsx";
import ServicePackageList from "../Pages/HSM/ServicePackage/servicePackage";
import AddNewServicePackage from "../Pages/HSM/ServicePackage/addServicePackage";
import EditServicePackage from "../Pages/HSM/ServicePackage/editServicePackage";
import EditCategoryList from "../Pages/HSM/CategoryList/editCategoryList";
import AddNewCategoryList from "../Pages/HSM/CategoryList/addNewCategoryList";
import EditProductCategory from "../Pages/HSM/ProductCategory/editProductCategory";
import EditServiceCategory from "../Pages/HSM/ServiceCategory/editServiceCategory";
import AddNewProductCategory from "../Pages/HSM/ProductCategory/addNewProductCategory";
import AddNewServiceCategory from "../Pages/HSM/ServiceCategory/addNewServiceCategory";
// import Psm_Bookings from "../Pages/PSM/ProjectBookings/Bookings_psm";
// import PSM_CategoryList from "../Pages/PSM/CRUD/Category";
// import EditCategoryList_PSM from "../Pages/PSM/CRUD/editCategoryList";
// import AddNewCategoryList_PSM from "../Pages/PSM/CRUD/addNewCategoryList";
import CMSfooter from "../Pages/Content_Management/AllPages/footer/CMSfooter";
import CMSPages from "../Pages/Content_Management/AllPages/pages/CMSPages";
import CMSHome from "../Pages/Content_Management/AllPages/pages/CMSHome";
import CMSContactUs from "../Pages/Content_Management/AllPages/pages/CMSContactUs";
import CMSAbout from "../Pages/Content_Management/AllPages/pages/CMSAbout";
import CMSDepts from "../Pages/Content_Management/AllPages/Depts/CMSDepts";
import EditCMSDepts from "../Pages/Content_Management/AllPages/Depts/EditCMSDepts";
import EditDeptMember from "../Pages/Content_Management/AllPages/Depts/EditDeptMember";
import CMSAddDept from "../Pages/Content_Management/AllPages/Depts/CMSAddDept";
import CMSAddMember from "../Pages/Content_Management/AllPages/Depts/CMSAddMember";
import CMSGenralConfig from "../Pages/Content_Management/AllPages/Genral Config/CMSGenralConfig";
import CMSBlog from "../Pages/Content_Management/AllPages/pages/CMSBlog";
import CMSEditBlog from "../Pages/Content_Management/AllPages/pages/CMSEditBlog";
import AddBlog from "../Pages/Content_Management/AllPages/pages/AddBlog";
import CMSTermsandConditions from "../Pages/Content_Management/AllPages/pages/CMSTermsandConditions";
import CMSPrivacyPolicy from "../Pages/Content_Management/AllPages/pages/CMSPrivacyPolicy";
import CMSRefundPolicy from "../Pages/Content_Management/AllPages/pages/CMSRefundPolicy";
import CMSCatalogue from "../Pages/Content_Management/AllPages/pages/CMSCatalogue.js";
import CMSPromoCard from "../Pages/Content_Management/AllPages/pages/CMSPromoCard.js";
import CMSAddCatalogue from "../Pages/Content_Management/AllPages/pages/CMSAddCatalogue.js";
import CMSEditCatalogue from "../Pages/Content_Management/AllPages/pages/CMSEditCatalogue.js";
import CMSAddLook from "../Pages/Content_Management/AllPages/pages/CMSAddLook.js";
import CMSEditLook from "../Pages/Content_Management/AllPages/pages/CMSEditLook.js";
import Visitors from "../Pages/HSM/Reports/visitors.js";
import Sales from "../Pages/HSM/Reports/sales.js";
import ProductPerformance from "../Pages/HSM/Reports/productPerformance.js";
import ActivityLogs from "../Pages/HSM/Reports/activitylogs.js";
// import { useLocation } from 'react-router-dom';

function Home() {
  const [expand, setExpand] = useState("");
  // const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  // const token = location.state.token;

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const togleExpand = (menu) => {
    setExpand(menu);
  };

  // useEffect(() => {
  //   if (!localStorage.getItem('jwt')) {
  //     navigate('/'); // Redirect to login page
  //   }
  // }, [])
  // random testion

  return (
    <div className="flex">
      <NavLink to='/' id="fail"></NavLink>
      {/* {localStorage.getItem("jwt") && ( */}
        <>
          <SideNavBar
            expand={expand}
            setExpand={togleExpand}
            activeTab={activeTab}
            setActiveTab={handleActiveTab}
          />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route
              exact
              path="/allUsers"
              element={
                <UserDetails
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />


            <Route
              exact
              path="/categoryList"
              element={
                <CategoryList
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

            <Route
              exact
              path="/categoryList"
              element={
                <CategoryList
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/servicePackageList"
              element={
                <ServicePackageList
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/generalConfig"
              element={
                <CMSGenralConfig
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addNewServicePackageList"
              element={
                <AddNewServicePackage
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />


            <Route
              exact
              path="/addNewServiceCategory"
              element={
                <AddNewServiceCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addNewProductCategory"
              element={
                <AddNewProductCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/productCategoryList"
              element={
                <ProductCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/serviceCategoryList"
              element={
                <ServiceCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/viewOrder"
              element={
                <Vieworder
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/viewOrderHSM"
              element={
                <VieworderHSM
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addMembers"
              element={
                <AddMembers
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/helpDesk"
              element={
                <HelpDesk
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addListing"
              element={
                <AddListing
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/reviewForManagement"
              element={
                <ReviewMPM
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/categoryManagement"
              element={
                <AllMarketProducts
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editListing"
              element={
                <EditListing
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editPromotion"
              element={
                <EditPromotion
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editPage"
              element={
                <EditPage
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editMember"
              element={
                <EditMember
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/listingManagement"
              element={
                <ListingManagement
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/suspendMarketUser"
              element={
                <SuspendedMarketUser
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/header"
              element={
                <AllPages
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editDetails"
              element={
                <EditUser
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/UserDetails"
              element={
                <ViewUser
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/createUser"
              element={
                <CreateUser
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/MemberDetails/:mid"
              element={
                <MemberDetails
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/createNewPage"
              element={
                <CreateNewPage
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/home"
              element={
                <CMSHome
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <CMSContactUs
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/about"
              element={
                <CMSAbout
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/terms_and_conditions"
              element={
                <CMSTermsandConditions
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/privacy_policy"
              element={
                <CMSPrivacyPolicy
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/refund_policy"
              element={
                <CMSRefundPolicy
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/department"
              element={
                <CMSDepts
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editdepartment"
              element={
                <EditCMSDepts
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editdepartmentmember"
              element={
                <EditDeptMember
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/blogs"
              element={
                <CMSBlog
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editblog"
              element={
                <CMSEditBlog
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addblog"
              element={
                <AddBlog
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addDepartment"
              element={
                <CMSAddDept
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addMember"
              element={
                <CMSAddMember
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

            <Route
              exact
              path="/addProduct"
              element={
                <AddProduct
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addNewRole"
              element={
                <AddNewRole
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addPromotion"
              element={
                <AddPromotion
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addNewCategory"
              element={
                <AddNewCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

            <Route
              exact
              path="/editServices"
              element={
                <EditService
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editCategoryList"
              element={
                <EditCategoryList
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

<Route
              exact
              path="/addNewCategoryList"
              element={
                <AddNewCategoryList
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

            <Route
              exact
              path="/editServiceCategory"
              element={
                <EditServiceCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editProductCategory"
              element={
                <EditProductCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editProduct"
              element={
                <EditProduct
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />

            <Route
              exact
              path="/editCategory"
              element={
                <EditCategory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/editServicePackage"
              element={
                <EditServicePackage
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/chatHelp"
              element={
                <Chatdetails
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/permission"
              element={
                <Prm setExpand={togleExpand} setActiveTab={handleActiveTab} />
              }
            />
            <Route
              exact
              path="/settings"
              element={
                <Configuration
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
<Route
          exact
          path="/visitors"
          element={
            <Visitors
            setExpand={togleExpand}
            setActiveTab={handleActiveTab}
            />
          }
          />
        <Route
          exact
          path="/sales"
          element={
            <Sales
            setExpand={togleExpand}
            setActiveTab={handleActiveTab}
            />
          }
          />
          <Route
          exact
          path="/ProPerformance"
          element={
            <ProductPerformance
            setExpand={togleExpand}
            setActiveTab={handleActiveTab}
            />
          }
          />
           <Route
          exact
          path="/ActivityLogs"
          element={
            <ActivityLogs
            setExpand={togleExpand}
            setActiveTab={handleActiveTab}
            />
          }
          />

            <Route
              exact
              path="/productList"
              element={
                <AllProducts
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/featuredProduct"
              element={
                <FeaturedProducts
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/footer"
              element={
                <CMSfooter
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/addLook"
              element={
                <CMSAddLook
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/editLook"
              element={
                <CMSEditLook
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/editCatalogue"
              element={
                <CMSEditCatalogue
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/addCatalogue"
              element={
                <CMSAddCatalogue
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/promocard"
              element={
                <CMSPromoCard
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
             <Route
              exact
              path="/catalogue"
              element={
                <CMSCatalogue
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/pages"
              element={
                <CMSPages
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/promotionManagement"
              element={
                <AllPromotion
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/transactionHistory"
              element={
                <TransactionHistory
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/reviewManagement"
              element={
                <Reviews
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/permission"
              element={
                <PRM setExpand={togleExpand} setActiveTab={handleActiveTab} />
              }
            />
            <Route
              exact
              path="/editRole"
              element={
                <EditRole
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/SuspendUsers"
              element={
                <SuspendedUser
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/customerRelationship"
              element={
                <AllMembers
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/allMembers"
              element={
                <AllMarketMember
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
          </Routes>
        </>
      {/* )} */}
    </div>
  );
}

export default Home;
