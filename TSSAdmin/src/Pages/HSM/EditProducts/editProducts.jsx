import { useEffect, useState } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import Product_info from "./Components/Product_info";
import Product_img from "./Components/Product_img";
import Product_price from "./Components/Product_price";
import Description from "./Components/Description_sec";
import Other from "./Components/Other";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateHSMProduct, hsmCreateProduct_meta, uploadImages } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';  

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ m: 1, background: "white" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const EditProduct = ({ setExpand, setActiveTab }) => {
  setExpand("homeService");
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  const LuserData1 = useSelector((state) => state.userManagement.getUserLogin);
  setActiveTab("productList");
  const head = "Edit Product";
  let [checkcat, setCheckCat] = useState('');
  const updateCheckCat = (value) => {
    setCheckCat(value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;
  // console.log(data,"data editproduct");

  const [serviceCat, setserviceCat] = useState('');
  const [lowQuantity, setlowQuantity] = useState('');
  const [discountType, setdiscountType] = useState(data?.discount_type);
  const [fstatus, setfstatus] = useState('');
  const [shippingDays, setshippingDays] = useState('');
  const [shortDesc, setshortDesc] = useState('');
  const [text1, settext1] = useState('')
  const [prodValue, setprodValue] = useState(data?.product_name);
  const [itemCat, setitemCat] = useState(data?.category);
  const [prodCat, setprodCat] = useState(data?.sub_category);
  const [unit, setunit] = useState(data?.unit);
  const [tags, settags] = useState(data?.tags);
  const [rewards, setrewards] = useState(data?.reward_points);
  const [galleryImages, setGalleryImages] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [Desc, setDesc] = useState(data?.desc);
  const [Sku2, setSku2] = useState(data?.sku)
  const [unitPrice, setunitPrice] = useState(data?.unit_price);
  const [variantEnabled, setvariantEnabled] = useState(data?.variants[0]);
  const [discountStart, setdiscountStart] = useState(data?.discount_date_start);
  const [discountEnd, setdiscountEnd] = useState(data?.discount_date_end);
  const [discount, setdiscount] = useState(data?.discount);
  const [quantity, setquantity] = useState(data?.quantity_pi);
  const [product_desc, setproduct_desc] = useState(data?.product_desc);
  const [variants, setvariants] = useState(data?.variants[0])
  const [colors, setcolors] = useState(data?.colors)
  const [size, setsize] = useState(data?.size)
  const [fit, setfit] = useState(data?.fit)
  const [fabric, setfabric] = useState(data?.fabric)
  const [about, setabout] = useState(data?.about)
  const [product_detail, setproduct_detail] = useState(data?.product_detail)
  const [productCategory, setproductCategory] = useState(data?.productCategory);
  const [metatitle, setMetaTitle] = useState(data?.SEOArea?.metaTitle)
  const [metadesc, setMetaDesc] = useState(data?.SEOArea?.metaDescription)
  const [metakeywords, setMetaKeywords] = useState(data?.SEOArea?.metaKeywords)
  const [metaphoto, setMetaPhoto] = useState();
  const [metaphoto1, setMetaPhoto1] = useState(data?.SEOArea?.images1);
  // console.log(metaphoto1);
  // const [metaphoto1, setMetaPhoto1] = useState(data?.SEOArea?.images1);
  const [sku, setsku] = useState('');
  const [draft1, setDraft1] = useState("false");
  const [CategoryListmgm, setCategoryListmgm] = useState(data?.CategoryListmgm);
  let [discountDate, setdiscountDate] = useState();
  
  const [refund, setRefund] = useState(data?.refund);
  // console.log("refund",refund)
  let [allData,setAllData]=useState({
    product_name:"",
    desc:"",
    discount:"" ,
    discount_date:{
      end:"",
      start:""
    },
    draft:"",
    discount_type:"",
    category: "",
    sub_category: "",
    selling_price: "",
    quantity_pi:0,
    reward_points: "",
    sku: "",
    tags: "",
    // thumbnail_image:  {
    //   buffer: Buffer,
    //   url: "",
    // },
    
    draft:"",
    unit: "",
    unit_price: 0,
    // variantEnabled: true, 
    product_desc: "",
    colors: [],
    variants: [],
    refund:"",
    size:[],
    shipping_returns:"",
    fabric:"",
    about:"",
    fit:"",
     product_detail:"",
    SEOArea:{
      metaTitle:"",
      metaDescription: "",
      metaKeywords: "",
      images1:""
      
    }
  })
  // // console.log("allData,78",allData)
  
  const HandleSubmitdata = async () => {
    setLoading(true);
    let pid = data.pid
    // // console.log(pid);
    // // console.log(allData);
    setDraft1("false");  
    // debugger;
    allData.draft="false"
    await dispatch(updateHSMProduct({pid,allData}));  
    setLoading(false);
    navigate("/home/productList");
  }
  useEffect(()=>{
    setDraft1("false");    
    // console.log(draft1,"hhhyh");
  },[HandleSubmitdata])

  const Handledraftdata = async () => {
    setLoading(true);
    let pid = data.pid
    // // console.log(pid);
    // // console.log(allData);
    allData.draft="true"

    await dispatch(updateHSMProduct({pid,allData}));
    setLoading(false);
    navigate("/home/productList");
  }
  useEffect(()=>{
    setDraft1("true");    
    // console.log(draft1,"hhhyh");
  },[Handledraftdata])

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      draft: draft1,
    }));
  }, [draft1]);

  useEffect(()=>{
    setAllData({product_name:prodValue,desc:Desc,discount:discount,discount_date:{start:discountStart,end:discountEnd},
      discount_type:discountType,SEOArea:{metaTitle:metatitle,metaDescription:metadesc,metaKeywords:metakeywords,images1:metaphoto1},
      unit:unit,unit_price:unitPrice,draft:draft1,sku:Sku2,about:about,fit:fit,product_detail:product_detail,refund:refund,fabric:fabric,size:size,tags:tags,
      quantity_pi:quantity,colors:colors,variants:variants,reward_points:rewards,category:itemCat,sub_category:prodCat})
  },[prodValue,Desc,discount,discountStart,discountEnd,discountType,metatitle,metadesc,metakeywords,unit,unitPrice,
    Sku2,about,product_detail,fabric,size,tags,draft1,quantity ,productCategory,CategoryListmgm,refund,colors,variants,rewards,itemCat,prodCat,fit,metaphoto1])

// console.log(variants);
  useEffect(() => {
    let dates = {
      "end": discountEnd,
      "start": discountStart
    }
    setdiscountDate(dates);
  }, [discountStart])

  const handletext1 = (event) => {
    settext1(event);
  };
  const GalleryImages = (value) => {
    setGalleryImages(value);
  };
  const ThumbnailImage = (value) => {
    setThumbnailImage(value);
  };
  const handleMetaTitleChange = (event) => {
    setMetaTitle(event.target.value);
  };
  const handleMetaDescChange = (event) => {
    setMetaDesc(event.target.value);
  };
  const handleMetaKeywordChange = (event) => {
    setMetaKeywords(event.target.value);
  };
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      const response = await axios.post('http://64.227.186.165:5002/upload', formData);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error uploading file:', error);
      throw error;
    }
  };


    const handleMetaPhotoChange = async (event) => {
      try {
        const files = event.target.files;
        setLoading(true);
        const resultAction = await dispatch(uploadImages(files));
        if (uploadImages.fulfilled.match(resultAction)) {
          setMetaPhoto(resultAction?.payload?.[0]);
          setMetaPhoto1(resultAction?.payload?.[0]);
        } else {
          console.error("Upload failed:", resultAction.payload);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error handling meta photo change:', error);
      }
    };

  const handleMetaPhotoRemove = () => {
    setMetaPhoto1(null);
  };


  // const HandleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   let pid = data.pid
  //   // console.log(pid);
  //   await dispatch(updateHSMProduct({pid,allData}));
  //   setLoading(false);
  //   // navigate("/home/productList");
  // }



  const [loading, setLoading] = useState(false);


  const [newColor, setNewColor] = useState({
    name: "",
    value: "",
  });

  const [newSize, setNewSize] = useState({
    name: "",
    value: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // console.log(variantEnabled);
  }, [variantEnabled]);

  const addVariant = () => {
    const variantId = variants?.length + 1;
    const newVariant = {
      variantId,
      color: "",
      size: "",
      ThumbImg: [],
      GalleryImg: [],
      price: 0,
      quantity: 0,
      isEnabled: true, // Initially enabled
    };

    setvariants((prevProduct) => (
      [...prevProduct, newVariant]
    ));
  };

  const toggleVariants = () => {
    setvariantEnabled(!variantEnabled);

  };

  const handleVariantChange = (index, field, value) => {
    setvariants((prevProduct) => {
      const updatedVariants = [...prevProduct];
      updatedVariants[index][field] = value;
      return updatedVariants;
    });
  };

  const handleColorDelete = (index) => {
    setcolors((prevProduct) => {
      const updatedColors = [...prevProduct];
      updatedColors.splice(index, 1);
      return updatedColors;
    });
  };

  const handleSizeDelete = (index) => {
    setsize((prevProduct) => {
      const updatedSizes = [...prevProduct];
      updatedSizes.splice(index, 1);
      return updatedSizes;
    });
  };

  const handleVariantDelete = (index) => {
    setvariants((prevProduct) => {
      const updatedVariants = [...prevProduct];
      updatedVariants.splice(index, 1);
      return updatedVariants;
    });
  };

  const handlePriceChange = (value) => {
    setunitPrice(value);
  };

  const handleQuantityChange = (value) => {
    setquantity(value);
  };

  const handleColorChange = (field, value, index) => {
    setvariants((prevProduct) => {
      const updatedColors = [...prevProduct];
      updatedColors[index][field] = value;
      return updatedColors
    });
  };

  const addColor = () => {
    if (newColor.name !== "" ||
      newColor.value !== "") {
      const isDuplicate = colors?.some(
        (existingColor) =>
          existingColor.name.toLowerCase() === newColor.name.toLowerCase() ||
          existingColor.value.toLowerCase() === newColor.value.toLowerCase()
      );

      if (isDuplicate) {
        console.error("Cannot add duplicate color.");
      } else {

        if (newColor.name && newColor.value && variantEnabled) {
          // console.log("1");
          setcolors((prevProduct) => ([...prevProduct, newColor]));
        } else {
          // console.log(`${newColor.name} ${newColor.value} ${variantEnabled}`);
          // setProduct((prevProduct) => ({
          //   ...prevProduct,
          //   colors: [newColor],
          // }));
        }
        setNewColor({
          name: "",
          value: "",
        });
      }
    }
  };


  const handleSizeChange = (field, value, index) => {
    setsize((prevProduct) => {
      const updatedSizes = [...prevProduct];
      updatedSizes[index][field] = value;
      return updatedSizes;
    });
  };

  const addSize = () => {
    if (newSize.name !== "" ||
      newSize.value !== "") {
      const isDuplicate = size?.some(
        (existingSize) =>
          existingSize.name.toLowerCase() === newSize.name.toLowerCase() ||
          existingSize.value.toLowerCase() === newSize.value.toLowerCase()
      );
      if (isDuplicate) {
        console.error("Cannot add duplicate size.");
      } else {
        if (newSize.name && newSize.value && variantEnabled) {
          setsize((prevProduct) => ([...prevProduct, newSize]));
        } else {
          // setProduct((prevProduct) => ({
          // ...prevProduct,
          // sizes: [newSize],
          // }));
        }
        setNewSize({
          name: "",
          value: "",
        });
      }
    }
  };

  const uploadGalleryImages = async (images) => {
    try {
      // Create a FormData object to append the images
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`files`, image);
      });
  
      // Make a POST request using Axios
      const response = await axios.post('http://64.227.186.165:5002/upload', formData);
  
      // Log the response
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error uploading gallery images:', error);
      throw error;
    }
  };
  


    const handleGalleryImageUpload = async (field, e, index) => {
      try {
        const files = e.target.files;
  
        setLoading(true);
        const resultAction = await dispatch(uploadImages(files));
        console.log(resultAction, "sdvjhbsvjbdsvb");
        if (uploadImages.fulfilled.match(resultAction)) {
          setvariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index][field] = resultAction?.payload;
            return updatedVariants;
          });
          console.log(variants,'sdvjhbsvjbdsvb');
          
        } else {
          console.error("Upload failed:", resultAction.payload);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error handling gallery image upload:', error);
      }
    };
  



   const handleThumbnailImageUpload = async (field, e, index) => {
     
      try {
        const files = e.target.files;
        
        setLoading(true);
        const resultAction = await dispatch(uploadImages(files));
        console.log(resultAction, "sdvjhbsvjbdsvb");
        if (uploadImages.fulfilled.match(resultAction)) {
          setvariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index][field] = resultAction?.payload;
            return updatedVariants;
          });
          console.log(variants,'sdvjhbsvjbdsvb');
          
        } else {
          console.error("Upload failed:", resultAction.payload);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error handling thumbnail image upload:', error);
      }
    };


  

  // const handleGalleryImageUpload = (field, e, index) => {
  //   const files = Array.from(e.target.files);
  //   const selectedImages = files.map((file) => file);
  //   setvariants((prevProduct) => {
  //     const updatedVariants = [...prevProduct];
  //     updatedVariants[index][field] = selectedImages;
  //     return updatedVariants;
  //   });
  // };

  // const handleThumbnailImageUpload = (field, e, index) => {
  //   const files = Array.from(e.target.files);
  //   const selectedImages = files.map((file) => file);
  //   setvariants((prevProduct) => {
  //     const updatedVariants = [...prevProduct];
  //     updatedVariants[index][field] = selectedImages;
  //     return updatedVariants;
  //   });
  // };

  const isColorFullyUtilized = (color) => {
    const colorVariants = variants?.filter((variant) => variant?.color?.trim().toLowerCase() === color?.value?.trim().toLowerCase());
    const availableSizes = size?.filter(
      (size) => !colorVariants?.some((variant) => variant?.size?.trim().toLowerCase() === size?.value?.trim().toLowerCase())
    );
    return availableSizes.length === 0;
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

      <div className=" ml-72 px-3 mb-10 relative " style={{ marginTop: "120px" }}>
        <div className="flex gap-5 flex-row">
          <div className="flex flex-col flex-shrink-0 gap-5" style={{ flexGrow: 2 }}>
            <Product_info selectedvalue={updateCheckCat}
              prodValue={prodValue}
              itemCat={itemCat}
              prodCat={prodCat}
              unit={unit}
              tags={tags}
              rewards={rewards}
              setprodValue={setprodValue}
              setitemCat={setitemCat}
              setprodCat={setprodCat}
              setserviceCat={setserviceCat}
              setunit={setunit}
              settags={settags}
              setrewards={setrewards}
              productCategory={productCategory}
              CategoryListmgm={CategoryListmgm}
            />
          </div>

          <Product_price
            lowQuantity={lowQuantity}
            setlowQuantity={setlowQuantity}
            checkedcat={checkcat}
            unitPrice={unitPrice}
            setunitPrice={setunitPrice}
            discountStart={discountStart}
            setdiscountStart={setdiscountStart}
            discountEnd={discountEnd}
            setdiscountEnd={setdiscountEnd}
            discount={discount}
            setdiscount={setdiscount}
            discountType={discountType}
            setdiscountType={setdiscountType}
            quantity={quantity}
            setquantity={setquantity}
            sku={sku}
            setsku={setsku}
            variants={variants}
            setvariants={setvariants}
            colors={colors}
            setcolors={setcolors}
            refund={refund}
            setRefund={setRefund}
            size={size}
            setsize={setsize}
            variantEnabled={variantEnabled}
            setvariantEnabled={setvariantEnabled}
            toggleVariants={toggleVariants}
            handlePriceChange={handlePriceChange}
            handleQuantityChange={handleQuantityChange}
          />
        </div>

        {variantEnabled && (
          <div className="flex gap-4">
            <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5">
              <h3 style={{ fontSize: '25px' }} >Add Colors</h3>
              {colors?.length > 0 && colors?.map((color, index) => (
                <div key={index} className="flex items-center gap-3  mb-3">
                  <label className={`grid `}>
                    {index == 0 && ('Color Name')}
                    <input
                      type="text"
                      className="px-4 py-2 drop-shadow-md w-[13.7rem] rounded-md mt-1 "
                      value={color?.name}
                      onChange={(e) => handleColorChange("name", e.target.value, index)}
                      required
                    />
                  </label>
                  <label className={`grid `} style={{ flexGrow: '1' }}>
                    {index == 0 && ('Color Value')}
                    <input
                      type="text"
                      className="px-4 py-2 drop-shadow-md w-[13.7rem] rounded-md mt-1 "
                      value={color?.value}
                      onChange={(e) => handleColorChange("value", e.target.value, index)}
                      required
                    />
                  </label>
                  {
                    LuserData?.role == 'admin' || LuserData?.role == 'editor' ? (
                      <div className={`self-end mb-1`}>
                        <Button color="error" variant="contained" size="small"
                          onClick={() => handleColorDelete(index)}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                    ) : null
                  }
                </div>
              ))}
              {LuserData?.role == 'admin' || LuserData?.role == 'editor' ? (
                <>
                  <div className="flex items-end gap-3  mb-3">
                    <label className={`grid mt-3`}>
                      Color Name
                      <input
                        type="text"
                        className="px-4 py-2 drop-shadow-md w-[16.25rem] rounded-md mt-1  "
                        value={newColor.name}
                        onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                        required
                      />
                    </label>
                    <label className={`grid mt-3`} style={{ flexGrow: '1' }}>
                      Color Value
                      <input
                        type="text"
                        className="px-4 py-2 drop-shadow-md w-[16.25rem] rounded-md mt-1 "
                        value={newColor.value}
                        onChange={(e) => setNewColor({ ...newColor, value: e.target.value })}
                        required
                      />
                    </label>
                  </div>
                  <div className="flex justify-start ">
                    <Button variant='contained' onClick={addColor} color="themeColor">
                      Add Links<AddIcon />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>

            <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5">
              <h3 style={{ fontSize: '25px' }} >Add Sizes</h3>
              {size?.length > 0 && size?.map((size, index) => (
                <div key={index} className="flex items-center gap-3  mb-3">
                  <label className={`grid `}>
                    {index == 0 && ('Size Name')}
                    <input
                      type="text"
                      className="px-4 py-2 drop-shadow-md w-[13.7rem] rounded-md mt-1 "
                      value={size?.name}
                      onChange={(e) => handleSizeChange("name", e.target.value, index)}
                      required
                    />
                  </label>
                  <label className={`grid `} style={{ flexGrow: '1' }}>
                    {index == 0 && ('Size Value')}
                    <input
                      type="text"
                      className="px-4 py-2 drop-shadow-md w-[13.7rem] rounded-md mt-1 "
                      value={size?.value}
                      onChange={(e) => handleSizeChange("value", e.target.value, index)}
                      required
                    />
                  </label>
                  {
                    LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                      <div className={`self-end mb-1`}>
                        <Button color="error" variant="contained" size="small"
                          onClick={() => handleSizeDelete(index)}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                    ) : null
                  }
                </div>
              ))}
              {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
                <>
                  <div className="flex items-end gap-3  mb-3">
                    <label className={`grid mt-3`}>
                      Size Name
                      <input
                        type="text"
                        className="px-4 py-2 drop-shadow-md w-[16.25rem] rounded-md mt-1 "
                        value={newSize?.name}
                        onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
                        required
                      />
                    </label>
                    <label className={`grid mt-3`} style={{ flexGrow: '1' }}>
                      Size Value
                      <input
                        type="text"
                        className="px-4 py-2 drop-shadow-md w-[16.25rem] rounded-md mt-1 "
                        value={newSize?.value}
                        onChange={(e) => setNewSize({ ...newSize, value: e.target.value })}
                        required
                      />
                    </label>
                  </div>
                  <div className="flex justify-start ">
                    <Button variant='contained' onClick={addSize} color="themeColor">
                      Add Links<AddIcon />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}

        {variantEnabled && (
          <>
            {variants?.length > 0 && variants?.map((variant, index) => (
              <>
                <div className="text-xl mt-4 p-2 px-4 font-bold bg-[#EEEEEE] inline-block" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>Variant {index + 1}</div>
                <div key={index} style={{ borderTopLeftRadius: 0 }} className="bg-[#EEEEEE] relative rounded-md drop-shadow-md mb-3 items-end borders  ">
                  <Button style={{ position: 'absolute', top: '10px', right: '10px', }} color="error" variant="contained" size="small"
                    onClick={() => handleVariantDelete(index)}
                  >
                    <CloseIcon />
                  </Button>
                  <div className="grid gap-3 grid-cols-2 p-5">
                    <div>
                      <label className="grid mt-5" style={{ fontSize: "15px" }}>
                        Thumbnail Photo
                        <input
                          className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                          style={{ border: "2px solid lightgray" }}
                          type="file"
                          placeholder=""
                          accept="image/*"
                          onChange={(e) => handleThumbnailImageUpload("ThumbImg", e, index)}
                        />
                      </label>
                      <div style={{ width: "600px", marginTop: "10px" }}>
                        {typeof variant.ThumbImg == 'object' && variant.ThumbImg.length > 0 ? (
                          <div className="grid grid-cols-6 gap-2">
                            {/* {variant.ThumbImg.map((image, index) => ( */}
                              <div className="relative">
                                <img
                                  src={variant?.ThumbImg?.[0]} // replace with your image source
                                  // alt={image.name} // replace with your image alt text
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                  }} // set width, height, object-fit, and margin-right styles
                                />
                              </div>
                            {/* // ))} */}
                          </div>
                        ) : (
                          <div className="grid grid-cols-6 gap-2">
                            <div className="relative">
                              <img
                                src={variant?.GalleryImg?.[0]} // replace with your image source
                                // alt={image.name} // replace with your image alt text
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }} // set width, height, object-fit, and margin-right styles
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="grid mt-5" style={{ fontSize: "15px" }}>
                        Slider Photos
                        <input
                          className=" file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                          style={{ border: "2px solid lightgray" }}
                          type="file"
                          placeholder=""
                          accept="image/*"
                          onChange={(e) => handleGalleryImageUpload("GalleryImg", e, index)}
                          multiple
                        />
                      </label>
                      {/* </div> */}
                      <div style={{ width: "530px", marginTop: "10px" }}>
                        {variant?.GalleryImg && variant?.GalleryImg.length > 0 && (
                          <div className="grid grid-cols-5 gap-2">
                            {variant?.GalleryImg?.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={(image)} 
                                  alt={image.name} 
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                  }} 
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <label className="grid pr-6 ">
                      Color
                      <select
                        className="px-3 py-2 drop-shadow-md rounded-md mt-1 "
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                      >
                        <option value="">Select Color</option>
                        {colors?.map((variant, colorIndex) => (
                          <option
                            key={colorIndex}
                            value={variant?.value}
                            disabled={isColorFullyUtilized(variant)}
                          >
                            {variant?.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid pr-6 ">
                      Size
                      <select
                        className="px-3 py-2 drop-shadow-md rounded-md mt-1 "
                        value={variant?.size}
                        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      >
                        <option value="">Select Size</option>
                        {size?.map((item, sizeIndex) => (
                          <option
                            key={sizeIndex}
                            value={item?.value}
                            disabled={variants?.some(
                              (existingVariant, existingIndex) =>
                                existingIndex !== index &&
                                existingVariant?.size?.trim().toLowerCase() === item?.value?.trim().toLowerCase() &&
                                existingVariant?.color?.trim().toLowerCase() === variant?.color?.trim().toLowerCase()
                            )}
                          >
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid pr-6 ">
                      Quantity
                      <input
                        className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                        type="number"
                        value={variant?.quantity}
                        onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
                      />
                    </label>
                    <label className="grid pr-6 ">
                      Price
                      <input
                        className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                        type="number"
                        value={variant?.price}
                        onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      />
                    </label>
                    <label className="flex items-end justify-end pr-6 ">
                      {/* <Action banner_id={item.banner_id} setLoading={setLoading} banner_image_url={item.banner_image_url} banner_title={item.banner_title} button_title={item.button_title} button_link={item.button_link} /> */}
                    </label>
                  </div>
                </div>
              </>
            ))}
            <div className="mt-6">
              <Button variant="contained" color="themeColor" fullWidth
                onClick={addVariant}
              >+ ADD Variants</Button>
            </div>
          </>)}
        <div className="mt-3">
          {!variantEnabled && (
            <Product_img galleryImages={galleryImages}
              timage={data?.gallery_images}
              gimage={data?.thumbnail_image}
              thumbnailImage={thumbnailImage}
              GalleryImages={GalleryImages}
              ThumbnailImage={ThumbnailImage} />
          )}

          <div className="my-3  gap-3">
            <div className="bg-[#EEEEEE] px-4 py-1 rounded-md drop-shadow-md border ">

              {/* 
            <Other
              fstatus={fstatus}
              setfstatus={setfstatus}
              shippingDays={shippingDays}
              setshippingDays={setshippingDays} /> */}

              <Box sx={{ width: '100%' }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ marginRight: "px", boxShadow: "0px 2px 3px 1px lightgrey", background: "white", marginTop: "10px", borderTopRightRadius: "7px" }} label="Product Detail" />
                    <Tab sx={{ marginRight: "px", boxShadow: "0px 2px 3px 1px lightgrey", background: "white", marginTop: "10px", borderTopRightRadius: "7px" }} label="Fabric" />
                    <Tab sx={{ marginRight: "px", boxShadow: "0px 2px 3px 1px lightgrey", background: "white", marginTop: "10px", borderTopRightRadius: "7px" }} label="Fit " />
                    <Tab sx={{ marginRight: "px", boxShadow: "0px 2px 3px 1px lightgrey", background: "white", marginTop: "10px", borderTopRightRadius: "7px" }} label="About" />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <ReactQuill value={product_detail} onChange={setproduct_detail} theme="snow" />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <ReactQuill value={fabric} onChange={setfabric} theme="snow" />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <ReactQuill value={fit} onChange={setfit} theme="snow" />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <ReactQuill value={about} onChange={setabout} theme="snow" />
                </CustomTabPanel>
              </Box>
            </div>
          </div>
          <Description
            Desc={Desc}
            setDesc={setDesc}
            setSku2={setSku2}
            Sku2={Sku2}
          />
        </div>

        <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
          <div className="text-xl mb-3 font-semibold">SEO Area</div>
          <label className="grid pr-6 ">
            Meta Title
            <input
              type="add"
              value={metatitle}
              className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
              placeholder=""
              onChange={handleMetaTitleChange}
              required
            // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? (false) : (true)}`}
            />
          </label>
          <label className="grid pr-6 mt-4">
            Meta Description
            <textarea
              type="add"
              value={metadesc}
              className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
              placeholder=""
              onChange={handleMetaDescChange}
              required
            // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
            />
          </label>
          <label className="grid pr-6 mt-4">
            Meta Keywords
            <textarea
              type="add"
              value={metakeywords}
              className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
              placeholder=""
              onChange={handleMetaKeywordChange}
              required
            // readOnly={`${LuserData.role == 'admin' || LuserData.role == 'editor' ? ('false') : ('true')}`}
            />
          </label>
          <label className="grid pr-6 mt-4">
            Meta Image
            {metaphoto1 ? (null) : (

              <div className="flex items-center mb-2">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img
                    src={metaphoto1}
                    // alt="Meta Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )
            }
            {metaphoto1 ? (
              <div className="flex gap-2 mt-2 items-center">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img src={metaphoto1}
                    // alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Button color="error" variant="contained" size="small"
                    onClick={handleMetaPhotoRemove}
                  >
                    Replace
                  </Button>
                </div>
              </div>
            ) :
              (
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleMetaPhotoChange}
                  class="file:bg-black file:px-6 file:py-3 bg-white file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[20rem]"
                  style={{ border: "2px solid #e6f7fe" }}
                />
              )}
          </label>
        </div>
        <div className="w-full bg-[#EEEEEE] drop-shadow-md mt-10 px-4 py-4 rounded-lg space-x-4">
        <button onClick={Handledraftdata} className="px-4 py-2 bg-[#c93a0e] hover:bg-[#c93a0e] drop-shadow-md cursor-pointer text-white rounded-md">
            Save As Draft
          </button>
          <button onClick={HandleSubmitdata} className="px-5 py-2 bg-[#c93a0e] hover:bg-[#c93a0e] drop-shadow-md cursor-pointer text-white rounded-md">
            Publish
          </button>
        </div>
      </div>
    </div >
  );
};

export default EditProduct;