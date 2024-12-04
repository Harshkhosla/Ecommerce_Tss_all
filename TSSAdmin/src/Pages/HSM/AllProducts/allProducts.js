import React from "react";
import Table from "../../../UI/CommonTable/Table";
import { deleteIcon, edit, images } from "../Assets/index";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HSM_allProduct } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { DeleteProduct } from "../../User_Management/features/userSlice";
import { Alert, AlertTitle, Button } from "@mui/material";
import { HSM_Product } from "../../User_Management/features/userSlice";
import { HSM_category } from "../../User_Management/features/userSlice";
import {
  ProductCategories,
  ServiceCategories,
} from "../../User_Management/features/userSlice";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { tssurl } from "../../../UI/port";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";

const Action = ({
  pid,
  product_name,
  category,
  sub_category,
  unit,
  tags,
  reward_points,
  gallery_images,
  thumbnail_image,
  desc,
  sku,
  variantEnabled,
  unit_price,
  discount_date_start,
  discount_date_end,
  discount,
  quantity_pi,
  product_desc,
  variants,
  colors,
  size,
  refund,
  fit,
  fabric,
  draft,
  about,
  product_detail,
  productCategory,
  selling_price,
  SEOArea,
  discount_type,
}) => {
  const Navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem("uid")));
  }, [dispatch]);

  const productData = useSelector((state) => state.userManagement.hsm_Products);
  // console.log(productData, "lollo");
  const handleClick = async () => {
    // setLoading(true);
    // await dispatch(HSM_Product(prodId));
    // setLoading(false);
    const data = {
      pid: pid,
      product_name: product_name,
      desc: desc,
      discount: discount,
      category: category,
      sub_category: sub_category,
      selling_price: selling_price,
      quantity_pi: quantity_pi,
      reward_points: reward_points,
      sku: sku,
      draft: draft,
      tags: tags,
      unit: unit,
      refund: refund,
      unit_price: unit_price,
      variantEnabled: variantEnabled,
      product_desc: product_desc,
      productCategory: productCategory,
      colors: colors,
      variants: [variants],
      size: size,
      fit: fit,
      fabric: fabric,
      about: about,
      product_detail: product_detail,
      discount_date_end: discount_date_end,
      discount_date_start: discount_date_start,
      thumbnail_image: thumbnail_image,
      gallery_images: gallery_images,
      SEOArea: SEOArea,
      discount_type: discount_type,
    };
    // console.log(data, "harsh");
    // debugger;
    Navigate("/home/editProduct", { state: data });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(DeleteProduct(pid))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  // console.log(draft);
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  return (
    <div className=" h-6 flex gap-3 cursor-pointer">
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
      {LuserData.role == "admin" || LuserData.role == "editor" ? (
        <>
          {draft == "true" ? (
            <CircleIcon fontSize="small" className="my-1" color="disabled" />
          ) : (
            <CircleIcon
              className="my-1"
              fontSize="small"
              color="success"
              onClick={handleClick}
              alt="edit"
            />
          )}

          <img src={edit} onClick={handleClick} alt="edit" />
          <img src={deleteIcon} onClick={handleConfirmDelete} alt="Delete" />
        </>
      ) : (
        <div>Not accessible</div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow">
            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
              <p className="pt-5">
                Are you sure you want to delete {product_name}?
              </p>
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

const Photo = ({ picUrl }) => {
  return (
    <div>
      <img className="w-14 h-14 rounded" src={picUrl} alt="Photo" />
    </div>
  );
};

const AllProduct = ({ setActiveTab, setExpand }) => {
  // const [test,setTest]=useState([]);
  // // console.log(test[0],"0");
  setExpand("homeService");
  setActiveTab("productList");

  const Navigate = useNavigate();
  const productCategory = useSelector(
    (state) => state.userManagement.ProductCategories
  );
  const productData1 = useSelector(
    (state) => state.userManagement.hsm_category
  );
  // console.log("ppppppppp", productData1);
  const greenClicked = () => {
    const data = {
      productCategory: productCategory,
      CategoryListmgm: CategoryListmgm,
      productData1: productData1,
      productColors: productColors,
    };
    // // console.log(data,"hahts");
    Navigate("/home/addProduct", { state: data });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const greyClicked = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("excelFile", file);

      await axios.post(`${tssurl}/product/importProductsExcel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("File uploaded successfully");
      setIsModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const head = "All Products";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const productData = useSelector(
    (state) => state?.userManagement?.hsm_allproducts
  );
  // console.log(productData, "ffff");
  // setDraft1(productData);
  const CategoryListmgm = useSelector(
    (state) => state?.userManagement?.ServiceCategories
  );
  const ProductCategoriees = useSelector(
    (state) => state?.userManagement?.hsm_allproducts
  );
  // setTest(ProductCategoriees);
  // console.log(ProductCategoriees[0]?.SEOArea, "herasdfuyg");
  const LuserData = useSelector((state) => state?.userManagement?.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem("uid")));
  }, [dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(HSM_allProduct());
      await dispatch(ProductCategories());
      await dispatch(ServiceCategories());
      await dispatch(HSM_category());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);

  // For now here is the dummy data
  const Info = ({ sale, base, rating }) => {
    return (
      // {productData.map((data)=>(
      <div>
        <div className="flex flex-row">
          <label className="text-[#c91b0e]">No of Sale : </label>
          <p>&nbsp; {sale ? sale : "0"} times</p>
        </div>
        <div className="flex flex-row">
          <label className="text-[#c91b0e]">Base Price : </label>
          <p>&nbsp; {base ? base : "Not Defined"}</p>
        </div>
        <div className="flex flex-row">
          <label className="text-[#c91b0e]">Rating : </label>
          <p>&nbsp; {rating ? parseFloat(rating).toFixed(2) : "N/A"} </p>
        </div>
      </div>
      // ))}
    );
  };

  const columns = [
    {
      header: "S No.",
      accessor: "serialno",
    },
    {
      header: "Photo",
      accessor: "photo",
    },
    {
      header: "Name",
      accessor: "productname",
    },

    {
      header: "Info",
      accessor: "information",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  let count = 1;
  let productCategory1 = [...new Set(productData.map((item) => item.category))];
  // console.log(productCategory1, "saplestes");
  let productCategory2 = [
    ...new Set(productData.map((item) => item.sub_category)),
  ];
  // console.log(productCategory2, "saplestes");

  let productCategory4 = ["Published", "Unpublished"];

  // productCategory2=[...productCategory2]
  let productColors = productData.map((item) => {
    return item.colors.map((color) => {
      return color.name;
    });
  });

  productColors = [...new Set(productColors.flat())];
  // console.log(productColors, "color2");
  const data = productData.map((user) => {
    let cat;
    if (user.item_category == "prodcat") {
      cat = "Product";
    }
    if (user.item_category == "servcat") {
      cat = "Service";
    }
    // console.log(user);
    return {
      serialno: count++,
      photo: <Photo picUrl={user?.variants?.[0]?.ThumbImg?.[0]} />,
      productname: user?.product_name,
      category: user?.category,
      productid: user?.pid,
      draft: user?.draft,
      sub_category: user?.sub_category,
      color: user.colors.map((e) => {
        return e.name;
      }),
      information: (
        <Info
          sale={user?.sales}
          base={user?.unit_price}
          rating={user?.rating}
        />
      ),
      action: (
        <Action
          pid={user?.pid}
          product_name={user?.product_name}
          desc={user?.desc}
          discount={user?.discount}
          discount_type={user?.discount_type}
          category={user?.category}
          sub_category={user?.sub_category}
          selling_price={user?.selling_price}
          quantity_pi={user?.quantity_pi}
          reward_points={user?.reward_points}
          sku={user?.sku}
          tags={user?.tags}
          unit={user?.unit}
          unit_price={user?.unit_price}
          variantEnabled={user?.variantEnabled}
          product_desc={user?.product_desc}
          variants={user?.variants}
          colors={user?.colors}
          size={user?.size}
          fit={user?.fit}
          fabric={user?.fabric}
          about={user?.about}
          product_detail={user?.product_detail}
          discount_date_end={user?.discount_date?.end}
          discount_date_start={user?.discount_date?.start}
          thumbnail_image={user?.thumbnail_image?.url}
          gallery_images={user?.gallery_images}
          productCategory={productCategory}
          refund={user?.refund}
          // metatitle
          draft={user?.draft}
          SEOArea={user?.SEOArea}
          // metadesc
          // metakeywords
          // metaphoto
        />
      ),
    };
  });
  const cat = productData.map((user) => ({ category: user?.item_category }));
  const blackButtonText = "Export All";
  const greenButtonText = "Add New Product";
  const greyButtonText = "Import All";

  // Number of Pages to be display on a single page.
  const pageSize = 4;

  // const categoryFilter3 = [
  //   { id: 6, name: 'Black' },
  //   { id: 7, name: 'White' },
  //   { id: 8, name: 'Gray' },
  //   { id: 9, name: 'Brown' },
  //   { id: 10, name: 'Purple' },
  // ];
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
      <div className="   ml-72 mt-28 w-[75vw] relative">
        {productData?.length > 0 ? (
          <Table
            columns={columns}
            data={data}
            pageSize={pageSize}
            blackButtonText={
              <a href={`${tssurl}/product/downloadProductsExcel`}>
                {blackButtonText}
              </a>
            }
            // greenButtonText={greenButtonText}
            greenButtonText={
              LuserData.role === "admin" || LuserData.role === "editor"
                ? greenButtonText
                : ""
            }
            greyButtonText={
              LuserData.role === "admin" || LuserData.role === "editor"
                ? greyButtonText
                : ""
            }
            greenClicked={greenClicked}
            greyClicked={greyClicked}
            catgoryFilter1={productCategory2}
            catgoryFilter2={productCategory1}
            productColors={productColors}
            catgoryFilter4={productCategory4}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              pageSize={pageSize}
              blackButtonText={
                <a href={`${tssurl}/product/downloadProductsExcel`}>
                  {blackButtonText}
                </a>
              }
              greenButtonText={
                LuserData.role === "admin" || LuserData.role === "editor"
                  ? greenButtonText
                  : ""
              }
              greyButtonText={
                LuserData.role === "admin" || LuserData.role === "editor"
                  ? greyButtonText
                  : ""
              }
              greenClicked={greenClicked}
              greyClicked={greyClicked}
            />

            <div className="flex ml-5 justify-center w-full mt-40">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>
        )}
        {isModalOpen && (
          <div
            className="modal"
            style={{
              display: isModalOpen ? "block" : "none",
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              overflow: "auto",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "#fefefe",
                margin: "auto",
                padding: "20px",
                border: "1px solid #888",
                width: "80%",
                maxWidth: "500px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="close"
                onClick={() => setIsModalOpen(false)}
                style={{
                  color: "#aaa",
                  float: "right",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                &times;
              </span>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                className="text-gray-900 mb-5"
              >
                Import Excel File
              </p>
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={handleSubmit}
                className="bg-[#c93a0e] rounded hover:bg-[#c91b0e] text-white w-auto font-bold py-3 px-6 rounded-sm"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
