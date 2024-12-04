import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../Assets/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteProducts } from "../../../User_Management/features/userSlice";
import { getAboutUs_cms, getUserLogin, getContactPage_cms, getHomePage_cms,getCatalogue_cms } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Icon, Button } from "@mui/material";
import Table from "../../../../UI/CommonTable/Table";
import search from "../Assets/search.png";
import CMSEditCatalogue from "./CMSEditCatalogue";

const Action = ({ url, data,catalog_id }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
 
  const handleClick = async () => {
    // setLoading(true);
    // await dispatch(HSM_Product(prodId));
    // setLoading(false);
    Navigate(`/home${url}`, { state: data });
  };
  // console.log("catalog_id jaijr;",data)
  const handleConfirmDelete = () => {
    // console.log((data?.catalog_id));
    // debugger
    dispatch(DeleteProducts(data?.catalog_id))
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      // console.log(err);
    });
  };
  return (
    <div>
      {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
        <div className="flex gap-2">
        <img src={editIcon} onClick={handleClick} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" />
        <img src={deleteIcon}  onClick={handleConfirmDelete} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="Delete" />
        </div>
      ) : (<div>Not Accessible</div>)}
    </div>
  );
};

const CMSCatalogue = ({ setActiveTab, setExpand }) => {
  setExpand("contentManagement");
  setActiveTab("catalogue");
  const head = "Catalog";
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const greenClicked = () => {
    navigate("/home/addCatalogue");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      
      await dispatch(getCatalogue_cms());
      // await dispatch(getHomePage_cms());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  const catalogueData = useSelector((state) => state.userManagement.getCatalogue_cms)
  // console.log(catalogueData);
//  const catalogueData = {
//   img1 : 'https://i.ytimg.com/vi/PCwL3-hkKrg/maxresdefault.jpg',
//   img2: 'https://2.bp.blogspot.com/-wIHMF7MxMn8/XGhXs0Q-E9I/AAAAAAAAg6A/uPmEirIcUNks-koyOe-0RgkZtq8J_O25gCLcBGAs/s1600/Canon%2BEOS%2BRP%2BFull%2BFrame%2BMirrorless%2BOfficial%2BSample%2BImage.jpg',
//   img3 :'https://i1.adis.ws/i/canon/eos-r5_ulla_lohman_sample_57a3918_23_60d08c0528c84bb5bf0246b12df027af?$media-collection-full-dt-jpg',
//   img4 : 'https://www.planetmountain.com/uploads/img/1/73139.jpg',
//   img5 : 'https://static.toiimg.com/thumb/msid-80778239,width-400,resizemode-4/80778239.jpg',

//   banner1title : 'sample title',
//   banner1Subtitle1 : 'sampl subtitle 1',
//   banner1Subtitle2 : "Sample Subtitle 2",

//   banner2text : 'sample banner 2 text ',
//   banner3text : 'sample banner3 text',
//   banner4text : "sample banner4 text",

//   banner5CenterText : "banner5CenterText",
//   banner5ButtonText : "banner5buttonText",
//  }
  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  // const data = [];
  const data = catalogueData.map((item) =>{
    return({
      page: item?.inputArea1?.title ? item?.inputArea1?.title : " " ,
      action: (<Action url='/editCatalogue' data={item} 
      catalog_id={item.catalog_id}
      />),
    }
    )
  }); 
    
  // console.log(data);
  


  const columns = [
    {
      header: "Pages",
      accessor: "page",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];


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

      <div>
        <TopHeader className="fixed" head={head} />
      </div>
      <div className=" ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
        {data.length > 0 ?
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={"Add Catalog"}
              greenClicked={greenClicked}
            />
          </>)
          :
          (<>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              greenButtonText={"Add Catalog"}
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

export default CMSCatalogue;
