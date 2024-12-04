import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AssessmentIcon from '@mui/icons-material/Assessment';
import axios from "axios";
import cookie from "js-cookie";
import { HelpCenterOutlined, LocalShippingOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { useEffect } from 'react';
import {tssurl} from '../port.js';
import defaultLogoSrc from '../Defaultlogo.jpg' 

function SideNavBar({ expand, setExpand, activeTab, setActiveTab }) {
  const activeMenu = true;
  const [subMenu, setSubMenu] = useState(false);
  // console.log(activeTab);
  const navigate = useNavigate();

  const handleMenu = () => {
    setSubMenu(!subMenu);
  };
  const [value, setValue] = useState(0);
    const [Hdata, setHdata] = useState([]);
    const [Idata, setIdata] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
              const response = await axios({
                method: "get",
                url: `${tssurl}/pages/header`,
                headers: {
                  "authorization": `${localStorage.getItem('jwt')}`,
                  // "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
              });
              setIdata(response?.data?.headerr?.brand_logo?.url)
              // console.log(response?.data?.headerr?.brand_logo?.url,"sa,mple");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(); // Call the renamed function
    }, [])
    
    useEffect(() => {
        // // console.log(Hdata);
    }, [Hdata])

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/");
      window.location.reload();
      // console.log("Logged Out sucessfully");
    } catch (error) {
      // console.log(error);
      // console.log("Not submitting data");
    }
  };
  

  return (
    <div
      className="w-72 h-screen fixed "
      style={{ backgroundColor: "#EEEEEE", width: "17.3rem" }}>
      <div className=" hello ml-3 h-screen overflow-auto pb-10 scrollbar-hide">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
            <Link href="/" >
            {Idata ? (
        <img src={Idata} alt="TSS"  className="max-w-[70%] h-auto max-h-[150px] mx-auto my-auto flex ml-8 mt-2" />
      ) : (
        <img src={defaultLogoSrc} alt="Default Logo"   className=" max-w-[70%] mx-auto my-auto h-auto max-h-[150px] flex ml-8 mt-2" />
      )}
                          
                            </Link>
            </div>

            <div className="mt-10 font-semibold" style={{ marginLeft: "4px" }}>
              MENU
            </div>
            {/* Dashboard */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "dashboard" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "dashboard" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("dashboard");
                  setExpand("dashboard");
                }}>
                <SpeedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Dashboard</span>
              </NavLink>
            </div>
            {/* User Management */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink to='/home/allUsers'
                style={{
                  color: expand === "userManagement" ? "#c93a0e" : "#545e6f",
                  fontWeight: expand === "userManagement" ? "bold" : "inherit",
                }}
                onClick={() => {
                  if (expand === "userManagement") {
                    setExpand(null); // close if already open
                  } else {
                    setExpand("userManagement"); // open if closed
                  }
                }}
                activeclassname="active"
                className="flex items-center">
                <PersonOutlineOutlinedIcon
                  style={{ transform: "scale(0.65)" }}
                />
                <span className="pl-1">User Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "92px",
                  }}>
                  {expand === "userManagement" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>

              {expand === "userManagement" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab === "allUsers" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "allUsers" ? "bold" : "inherit",
                      }}
                      to="/home/allUsers"
                      onClick={() => {
                        setActiveTab("allUsers");
                        setExpand("userManagement");
                      }}>
                      All Users
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "suspendUsers" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "suspendUsers" ? "bold" : "inherit",
                      }}
                      to="/home/suspendUsers"
                      onClick={() => {
                        setActiveTab("suspendUsers");
                        setExpand("userManagement");
                      }}>
                      Suspend Users
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "department" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "department" ? "bold" : "inherit",
                      }}
                      to="/home/department"
                      onClick={() => {
                        setActiveTab("department");
                        setExpand("userManagement");
                      }}>
                      Department
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab === "permission" ? "black" : "#545e6f",
                        fontWeight: activeTab === "permission" ? "bold" : "inherit",
                      }}
                      activeclassname="active"
                      to="/home/permission"
                      className="flex items-center"
                      onClick={() => {
                        setActiveTab("permission");
                        setExpand("userManagement");
                      }}>
                      {/* <TurnedInNotOutlinedIcon style={{ transform: "scale(0.65)" }} /> */}
                      Permission and Role
                    </NavLink>
                  </div>
                </>
              )}
            </div>
            {/* Customer Relationship */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color:
                    activeTab === "customerRelationship" ? "#c93a0e" : "#545e6f",
                  fontWeight:
                    activeTab === "customerRelationship" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/customerRelationship"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("customerRelationship");
                  setExpand("customerRelationship");
                }}>
                <PeopleAltOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Customer Relationship</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color:
                    activeTab === "transactionHistory" ? "#c93a0e" : "#545e6f",
                  fontWeight:
                    activeTab === "transactionHistory" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/transactionHistory"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("transactionHistory");

                }}>
                <LocalShippingOutlined style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Order Management</span>
              </NavLink>
            </div>

            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color:
                    activeTab === "helpDesk" ? "#c93a0e" : "#545e6f",
                  fontWeight:
                    activeTab === "helpDesk" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/helpDesk"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("helpDesk");

                }}>
                <SupportAgentOutlined style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Support</span>
              </NavLink>
            </div>


            {/* Content Management */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink to='/home/header'
                style={{
                  color: expand === "contentManagement" ? "#c93a0e" : "#545e6f",
                  fontWeight: expand === "contentManagement" ? "bold" : "inherit",
                }}
                onClick={() => {
                  if (expand === "contentManagement") {
                    setExpand(null); // close if already open
                  } else {
                    setExpand("contentManagement"); // open if closed
                  }
                }}
                activeclassname="active"
                className="flex items-center">
                <InsertDriveFileOutlinedIcon
                  style={{ transform: "scale(0.65)" }}
                />
                <span className="pl-1">Content Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "70px",
                  }}>
                  {expand === "contentManagement" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>

              {expand === "contentManagement" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab === "header" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "header" ? "bold" : "inherit",
                      }}
                      to="/home/header"
                      onClick={() => {
                        setActiveTab("header");
                        setExpand("contentManagement");
                      }}>
                      Header
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "footer" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "footer" ? "bold" : "inherit",
                      }}
                      to="/home/footer"
                      onClick={() => {
                        setActiveTab("footer");
                        setExpand("contentManagement");
                      }}>
                      Footer
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "catalogue" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "catalogue" ? "bold" : "inherit",
                      }}
                      to="/home/catalogue"
                      onClick={() => {
                        setActiveTab("catalogue");
                        setExpand("contentManagement");
                      }}>
                      Catalog
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "pages" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "pages" ? "bold" : "inherit",
                      }}
                      to="/home/pages"
                      onClick={() => {
                        setActiveTab("pages");
                        setExpand("contentManagement");
                      }}>
                      Pages
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "promocard" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "promocard" ? "bold" : "inherit",
                      }}
                      to="/home/promocard"
                      onClick={() => {
                        setActiveTab("promocard");
                        setExpand("contentManagement");
                      }}>
                      Promo Card
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "generalConfig" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "generalConfig" ? "bold" : "inherit",
                      }}
                      to="/home/generalConfig"
                      onClick={() => {
                        setActiveTab("generalConfig");
                        setExpand("contentManagement");
                      }}>
                      General Configurations
                    </NavLink>
                  </div>
                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "blogs" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "blogs" ? "bold" : "inherit",
                      }}
                      to="/home/blogs"
                      onClick={() => {
                        setActiveTab("blogs");
                        setExpand("contentManagement");
                      }}>
                      Blogs
                    </NavLink>
                  </div> */}
                </>
              )}
            </div>

            {/* <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color:
                    activeTab === "contentManagement" ? "#c93a0e" : "#545e6f",
                  fontWeight:
                    activeTab === "contentManagement" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/contentManagement"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("contentManagement");
                  setExpand("contentManagement");
                }}>
                <InsertDriveFileOutlinedIcon
                  style={{ transform: "scale(0.65)" }}
                />
                <span className="pl-1">Content Management</span>
              </NavLink>
            </div> */}

            {/* <div className="mt-4 text-gray-500 text-xs">
              <NavLink to="/home/projectList"
                style={{
                  color: expand === "showcaseManagement" ? "#c93a0e" : "#545e6f",
                  fontWeight:
                    expand === "showcaseManagement" ? "bold" : "inherit",
                }}
                onClick={() => {
                  // setExpand("showcaseManagement");
                  if (expand === "showcaseManagement") {
                    setExpand(null); // close if already open
                  } else {
                    setExpand("showcaseManagement"); // open if closed
                    // console.log(expand);
                    // console.log("clicked");
                  }
                }}
                activeclassname="active"
                className="flex items-center">
                <WidgetsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Showcase Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "57px",
                  }}>
                  {expand === "showcaseManagement" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>

              {expand === "showcaseManagement" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "projectList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "projectList" ? "bold" : "inherit",
                      }}
                      to="/home/projectList"
                      onClick={() => {
                        setActiveTab("projectList");
                        setExpand("showcaseManagement");
                      }}>
                      Project List
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "crud" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "crud" ? "bold" : "inherit",
                      }}
                      to="/home/crud_category"
                      onClick={() => {
                        setActiveTab("crud");
                        setExpand("showcaseManagement");
                      }}>
                      Category
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "featuredProject" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "featuredProject" ? "bold" : "inherit",
                      }}
                      to="/home/bookings_psm"
                      onClick={() => {
                        setActiveTab("featuredProject");
                        setExpand("showcaseManagement");
                      }}>
                      Bookings
                    </NavLink>
                  </div>
                </>
              )}
            </div> */}
 <div className="mt-4 text-gray-500 text-xs">
              <NavLink to="/home/visitors"
                style={{
                  color: expand === "reports" ? "#c93a0e" : "#545e6f",

                  fontWeight: expand === "reports" ? "bold" : "inherit",
                }}
                activeclassname="active"
                className="flex items-center"
                onClick={() => {
                  // setExpand("homeService");
                  if (expand === "reports") {
                    setExpand(null); // close if already open
                  } else {
                    setExpand("reports"); // open if closed
                  }
                }}>
                <AssessmentIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Reports</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "158px",
                  }}>
                  {expand == "reports" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>
              {expand == "reports" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "visitors" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "visitors" ? "bold" : "inherit",
                      }}
                      to="/home/visitors"
                      onClick={() => {
                        setActiveTab("visitors");
                        setExpand("reports");
                      }}>
                      Visitors
                    </NavLink>
                  </div>
                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "featuredProduct" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "featuredProduct" ? "bold" : "inherit",
                      }}
                      to="/home/featuredProduct"
                      onClick={() => {
                        setActiveTab("featuredProduct");
                        setExpand("homeService");
                      }}>
                      Featured Product and Services
                    </NavLink>
                  </div> */}
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "sales"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "sales"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/sales"
                      onClick={() => {
                        setActiveTab("sales");
                        setExpand("reports");
                      }}>
                        Sales
                    </NavLink>
                  </div>

                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "productPerformace" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "productPerformace" ? "bold" : "inherit",
                      }}
                      to="/home/ProPerformance"
                      onClick={() => {
                        setActiveTab("productPerformace");
                        setExpand("reports");
                      }}>
                      Products Performance
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "activitylogs"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "activitylogs"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/ActivityLogs"
                      onClick={() => {
                        setActiveTab("activitylogs");
                        setExpand("reports");
                      }}>
                      Activity logs
                    </NavLink>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink to="/home/productList"
                style={{
                  color: expand === "homeService" ? "#c93a0e" : "#545e6f",

                  fontWeight: expand === "homeService" ? "bold" : "inherit",
                }}
                activeclassname="active"
                className="flex items-center"
                onClick={() => {
                  // setExpand("homeService");
                  if (expand === "homeService") {
                    setExpand(null); // close if already open
                  } else {
                    setExpand("homeService"); // open if closed
                  }
                }}>
                <HomeOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Inventory Management</span>
                <div
                  style={{
                    transform: "scale(0.65)",
                    position: "relative",
                    left: "63px",
                  }}>
                  {expand == "homeService" ? (
                    <RemoveIcon />
                  ) : (
                    <AddOutlinedIcon />
                  )}
                </div>
              </NavLink>
              {expand == "homeService" && (
                <>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "productList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "productList" ? "bold" : "inherit",
                      }}
                      to="/home/productList"
                      onClick={() => {
                        setActiveTab("productList");
                        setExpand("homeService");
                      }}>
                      Product List
                    </NavLink>
                  </div>
                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "featuredProduct" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "featuredProduct" ? "bold" : "inherit",
                      }}
                      to="/home/featuredProduct"
                      onClick={() => {
                        setActiveTab("featuredProduct");
                        setExpand("homeService");
                      }}>
                      Featured Product and Services
                    </NavLink>
                  </div> */}
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "promotionManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "promotionManagement"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/promotionManagement"
                      onClick={() => {
                        setActiveTab("promotionManagement");
                        setExpand("homeService");
                      }}>
                      Offers and Deals
                    </NavLink>
                  </div>
                 

                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "categoryList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "categoryList" ? "bold" : "inherit",
                      }}
                      to="/home/categoryList"
                      onClick={() => {
                        setActiveTab("categoryList");
                        setExpand("homeService");
                      }}>
                      Category List
                    </NavLink>
                  </div>
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "productCategoryList"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "productCategoryList"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/productCategoryList"
                      onClick={() => {
                        setActiveTab("productCategoryList");
                        setExpand("homeService");
                      }}>
                      Product Category List
                    </NavLink>
                  </div>
                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "serviceCategoryList"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "serviceCategoryList"
                            ? "bold"
                            : "inherit",
                      }}
                      to="/home/serviceCategoryList"
                      onClick={() => {
                        setActiveTab("serviceCategoryList");
                        setExpand("homeService");
                      }}>
                      Service Category List
                    </NavLink>
                  </div> */}
                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "servicePackageList" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "servicePackageList" ? "bold" : "inherit",
                      }}
                      to="/home/servicePackageList"
                      onClick={() => {
                        setActiveTab("servicePackageList");
                        setExpand("homeService");
                      }}>
                      Service Package List
                    </NavLink>
                  </div> */}
                  <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color:
                          activeTab === "reviewManagement"
                            ? "black"
                            : "#545e6f",
                        fontWeight:
                          activeTab === "reviewManagement" ? "bold" : "inherit",
                      }}
                      to="/home/reviewManagement"
                      onClick={() => {
                        setActiveTab("reviewManagement");
                        setExpand("homeService");
                      }}>
                      Review Management
                    </NavLink>
                  </div>

                  {/* <div className="ml-7 mt-2">
                    <NavLink
                      style={{
                        color: activeTab === "bookings" ? "black" : "#545e6f",
                        fontWeight:
                          activeTab === "bookings" ? "bold" : "inherit",
                      }}
                      to="/home/bookings"
                      onClick={() => {
                        setActiveTab("bookings");
                        setExpand("homeService");
                      }}>
                      Bookings
                    </NavLink>
                  </div> */}
                </>
              )}
            </div>

            {/* Settings */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/settings"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("settings");
                  setExpand("settings");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Settings</span>
              </NavLink>
            </div>


            <div className="mt-10 flex justify-center">
              <button onClick={handleLogout}>
                <img src="/images/logout.png" alt="logout" srcSet="" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideNavBar;
