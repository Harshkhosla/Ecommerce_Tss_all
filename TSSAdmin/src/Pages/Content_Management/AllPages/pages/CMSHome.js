import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../Assets/index";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Button, IconButton } from "@mui/material";
import { Grid } from "react-loader-spinner";
import { updatehome, getHomePage_cms, addBanner, DeleteBanner, getHomePage_cms_meta, updateHome_cms_meta, addHome, updatebanners, uploadImages, AddeBanner } from "../../../User_Management/features/userSlice";
import { getUserLogin } from "../../../User_Management/features/userSlice";

const Action = ({ banner_id, banner_title, sub_title, button_link, banner_image_url, setLoading }) => {
  const dispatch = useDispatch();

  const handlePhotoChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setPhoto(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };
  const style = {
    display: 'grid',
    placeItems: 'center',
    zIndex: '10',
  }
  const [photo, setPhoto] = useState('')
  const [title, setTitle] = useState(banner_title)
  const [btn, setBtn] = useState(sub_title)
  const [btnlink, setBtnlink] = useState(button_link)
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  let bid = banner_id;
  const handleSubmit = async () => {
    // console.log('clicked');
    const formData = new FormData();
    if (title) formData.append("banner_title", title);
    if (btn) formData.append("sub_title", btn);
    // formData.append("Butt_title", btnlink);
    if (photo) formData.append("banner_image", photo);
    setLoading(true);
    await dispatch(updatebanners({ formData, bid }));
    setLoading(false);
    handleClose();
    window.location.reload()
  };



  return (
    <>
      <div>
        {LuserData.role == 'admin' || LuserData.role == 'editor' ? (
          <Button variant="contained" onClick={handleOpen} >
            <img src={editIcon} className="w-6 me-2 " style={{ cursor: 'pointer', filter: "brightness(6.5)" }} alt="edit" />
            Edit
          </Button>
        ) : (<div>Not Accessible</div>)}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={style}
      >
        <div className="w-[60vw]">
          <div className="bg-[#EEEEEE] relative rounded-md drop-shadow-md mb-3 items-end borders mt-5 p-5 ">
            <label className="grid ">
              {photo ? (
                <div className="grid  gap-3 mb-3">
                  <div className="w-full h-52 rounded  overflow-hidden" >
                    <img
                      src={photo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div >
                    <Button color="error" variant="contained" size="small"
                      onClick={handlePhotoRemove}
                    >
                      Replace
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-full h-52 rounded  overflow-hidden" >
                      <img
                        src={banner_image_url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    // required
                    className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh] mb-3"
                    style={{}}
                  />
                </>
              )}
            </label>
            <div className="grid gap-3 grid-cols-2">
              <label className="grid pr-6 ">
                Banner Title
                <input
                  type="add"
                  value={title}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                Sub Title
                <input
                  type="add"
                  value={btn}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBtn(e.target.value)}
                />
              </label>
            </div>
            <div className="flex mt-5 gap-5 items-center">
              <button
                className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                SAVE
              </button>
              <NavLink to="/home/pages">
                <button
                  className="rounded bg-black hover:bg-gray-800"
                  style={{
                    width: "130px",
                    height: "55px",
                    color: "white",
                  }}>
                  Back
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </Modal >
    </>
  );
};

const CMSHome = ({ setActiveTab, setExpand }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    boxShadow: 24,
    borderRadius: '20px',
    backgroundColor: 'white',
    padding: '20px 30px',
  };
  setActiveTab("pages");
  setExpand("contentManagement")
  const head = "Home";
  const [open, setOpen] = React.useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [offerImg1, setOfferImg1] = useState(null);
  const [offerImg2, setOfferImg2] = useState(null);

  const [gridImg1, setGridImg1] = useState(null);
  const [gridImg2, setGridImg2] = useState(null);
  const [gridImg3, setGridImg3] = useState(null);
  const [gridImg4, setGridImg4] = useState(null);

  const [bgImage, setBgImage] = useState(null);

  const handleOfferImageChange1 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setOfferImg1(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };


  const handleOfferImageRemove1 = () => {
    setOfferImg1(null);
  };


  const handleOfferImageChange2 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setOfferImg2(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleOfferImageRemove2 = () => {
    setOfferImg2(null);
  };



  const handleGridImageChange1 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setGridImg1(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleGridImageRemove1 = () => {
    setGridImg1(null);
  };



  const handleGridImageChange2 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setGridImg2(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };


  const handleGridImageRemove2 = () => {
    setGridImg2(null);
  };

  const handleGridImageChange3 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setGridImg3(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleGridImageRemove3 = () => {
    setGridImg3(null);
  };


  const handleGridImageChange4 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setGridImg4(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleGridImageRemove4 = () => {
    setGridImg4(null);
  };


  const handleBgImageChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setBgImage(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleBgImageRemove = () => {
    setBgImage(null);
  };



  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setImagePreview(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleImageRemove = () => {
    setImagePreview(null);
  };



  const handleImageChange1 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setImagePreview1(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleImageRemove1 = () => {
    setImagePreview1(null);
  };


  const handleImageChange2 = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setImagePreview2(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };


  const handleImageRemove2 = () => {
    setImagePreview2(null);
  };
  //   const dispatch = useDispatch();
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getHomePage_cms());
      await dispatch(getHomePage_cms_meta());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);
  const homeData = useSelector((state) => state.userManagement.getHomePage_cms)
  const bannerData = useSelector((state) => state.userManagement.getHomePage_cms_meta)
  //   const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const handlePhotoChange = (event) => {
  //   let img = event.target.files[0]
  //   setPhoto(img);
  // };


  const handlePhotoChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setPhoto(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };
  const [photo, setPhoto] = useState('')
  const [title, setTitle] = useState('')
  const [btn, setBtn] = useState('')
  const [btnlink, setBtnlink] = useState('')
  const [New, setNew] = useState(false);
  const [metatitle, setMetaTitle] = useState('')
  const [metadesc, setMetaDesc] = useState('')
  const [metakeywords, setMetaKeywords] = useState('')
  const [metaphoto, setMetaPhoto] = useState();

  const [banner1Title, setBanner1Title] = useState('');
  const [banner1Name, setBanner1Name] = useState('');
  const [banner1Offer, setBanner1Offer] = useState('');
  const [banner1SubTitle, setBanner1SubTitle] = useState('');
  const [banner1SubTitle1, setBanner1SubTitle1] = useState('');

  const [banner2Title, setBanner2Title] = useState('');

  const [banner3ButtonTitle, setBanner3ButtonTitle] = useState('');

  const [banner4Title1, setBanner4Title1] = useState('');
  const [banner4Title2, setBanner4Title2] = useState('');
  const [banner4Title3, setBanner4Title3] = useState('');
  const [banner4Title4, setBanner4Title4] = useState('');

  const [banner4Link1, setBanner4Link1] = useState('');
  const [banner4Link2, setBanner4Link2] = useState('');
  const [banner4Link3, setBanner4Link3] = useState('');
  const [banner4Link4, setBanner4Link4] = useState('');


  // console.log(homeData?.GridArea);
  useEffect(() => {
    setMetaTitle(homeData?.SEOArea?.MetaTitle)
    setMetaDesc(homeData?.SEOArea?.MetaDescription)
    setMetaKeywords(homeData?.SEOArea?.MetaKeywords)
    setBanner1Title(homeData?.OfferArea?.Title)
    setBanner1Name(homeData?.OfferArea?.Name)
    // // console.log("offer name ", homeData?.OfferArea?.Name);
    setBanner1Offer(homeData?.OfferArea?.Offer)
    setBanner1SubTitle1(homeData?.OfferArea?.Subtitle1)
    setBanner1SubTitle(homeData?.OfferArea?.Subtitle)
    setBanner2Title(homeData?.CollectionArea?.BannerTitle)
    // setBanner2Title(homeData.UploadPhoto?.BannerTitle)
    setBanner3ButtonTitle(homeData.EventArea?.imagelink)
    // setBanner3ButtonTitle(homeData?.EventArea?.imagelink)
    setBanner4Title1(homeData.GridArea?.title1)
    setBanner4Title2(homeData.GridArea?.title2)
    setBanner4Title3(homeData.GridArea?.title3)
    setBanner4Title4(homeData.GridArea?.title4)

    setBanner4Link1(homeData.GridArea?.link1)
    setBanner4Link2(homeData.GridArea?.link2)
    setBanner4Link3(homeData.GridArea?.link3)
    setBanner4Link4(homeData.GridArea?.link4)


    // const receivedImageUrl = homeData?.SEOArea?.images?.url || '';
    // setMetaPhoto(receivedImageUrl);

  }, [homeData])
  // console.log(homeData);
  const openNew = () => setNew(true);
  const closeNew = () => setNew(false);

  const handleDeleteLink = async (banner_id) => {
    setLoading(true);
    await dispatch(DeleteBanner(banner_id))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
    setLoading(false);
  }

  const handleMetaTitleChange = (event) => {
    setMetaTitle(event.target.value);
  };
  const handleMetaDescChange = (event) => {
    setMetaDesc(event.target.value);
  };
  const handleMetaKeywordChange = (event) => {
    setMetaKeywords(event.target.value);
  };

  const handleMetaPhotoChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    setLoading(true);
    const resultAction = await dispatch(uploadImages(files));
    if (uploadImages.fulfilled.match(resultAction)) {
      setMetaPhoto(resultAction?.payload?.[0]);
    } else {
      console.error("Upload failed:", resultAction.payload);
    }
    setLoading(false);
  };

  const handleMetaPhotoRemove = () => {
    setMetaPhoto(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (bgImage) formData.append("OfferArea.image.url", bgImage);
    if (offerImg1) formData.append("EventArea.image.url", offerImg1);
    if (offerImg2) formData.append("EventArea.image2.url", offerImg2);

    if (banner1Title) formData.append("OfferArea.Title", banner1Title);
    if (banner1Name) formData.append("OfferArea.Name", banner1Name);
    if (banner1Offer) formData.append("OfferArea.Offer", banner1Offer);
    if (banner1SubTitle) formData.append("OfferArea.Subtitle", banner1SubTitle);
    if (banner1SubTitle1) formData.append("OfferArea.Subtitle1", banner1SubTitle1);

    if (banner3ButtonTitle) formData.append("EventArea.imagelink", banner3ButtonTitle);
    if (banner2Title) formData.append("CollectionArea.BannerTitle", banner2Title);

    if (banner4Title1) formData.append("GridArea.title1", banner4Title1);
    if (banner4Title2) formData.append("GridArea.title2", banner4Title2);
    if (banner4Title3) formData.append("GridArea.title3", banner4Title3);
    if (banner4Title4) formData.append("GridArea.title4", banner4Title4);

    if (banner4Link1) formData.append("GridArea.link1", banner4Link1);
    if (banner4Link2) formData.append("GridArea.link2", banner4Link2);
    if (banner4Link3) formData.append("GridArea.link3", banner4Link3);
    if (banner4Link4) formData.append("GridArea.link4", banner4Link4);

    if (gridImg1) formData.append("GridArea.image1.url", gridImg1);
    if (gridImg2) formData.append("GridArea.image2.url", gridImg2);
    if (gridImg3) formData.append("GridArea.image3.url", gridImg3);
    if (gridImg4) formData.append("GridArea.image4.url", gridImg4);

    const images = [];
    if (imagePreview1) images.push({ url: imagePreview1 });
    if (imagePreview2) images.push({ url: imagePreview2 });
    if (imagePreview) images.push({ url: imagePreview });

    if (images.length > 0) {
      formData.append("CollectionArea.images", JSON.stringify(images));
    }

    setLoading(true);
    await dispatch(addHome(formData));
    setLoading(false);
    // navigate("/home/pages")
  }

  const handleSubmitBanner = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (photo) formData.append("banner_image", photo);
    if (title) formData.append("banner_title", title);
    if (btn) formData.append("sub_title", btn);
    setLoading(true);
    await dispatch(AddeBanner(formData));
    setLoading(false);
    // navigate("/home/home")
  };
  const handleSeoSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (metadesc) formData.append("SEOArea.MetaDescription", metadesc);
    if (metaphoto) formData.append("SEOArea.images.url", metaphoto);
    if (metatitle) formData.append("SEOArea.MetaTitle", metatitle);
    if (metakeywords) formData.append("SEOArea.MetaKeywords", metakeywords);
    setLoading(true);
    await dispatch(updateHome_cms_meta(formData))
    setLoading(false);
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
      <div className="" style={{ background: "white" }}>
        <TopHeader className="fixed " head={head} />
      </div>
      {/* Same */}
      <div className="ml-80 my-20 relative w-[70vw] " style={{ marginTop: "100px" }}>

        <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders my-5 ">
          <div className="text-xl mb-3 font-semibold">SEO Area</div>
          <form onSubmit={handleSeoSubmit}>
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
              {metaphoto ? (null) : (

                <div className="flex items-center mb-2">
                  {homeData?.SEOArea?.images?.url ? (
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img
                        src={homeData?.SEOArea?.images?.url}
                        alt="Meta Photo"
                        className="w-full h-full object-cover"
                      />
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
                </div>
              )
              }
              {metaphoto ? (
                <div className="flex gap-2 mt-2 items-center">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={metaphoto}
                      alt="User profile"
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
            <div className="flex mt-10 gap-5 items-center">
              <button
                className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}
                type="submit"
                onClick={handleSeoSubmit}>
                SET SEO DATA
              </button>
            </div>
          </form>
        </div>
        <form onSubmit={handleSubmit}  >

          {bannerData && bannerData?.length > 0 ? bannerData?.map((item, index) => (
            <>
              <div className="text-xl  p-2 px-4 font-bold bg-[#EEEEEE] inline-block" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>Banner {index + 1}</div>
              <div key={index} style={{ borderTopLeftRadius: 0 }} className="bg-[#EEEEEE] relative rounded-md drop-shadow-md mb-3 items-end borders  ">
                <Button style={{ position: 'absolute', top: '10px', right: '10px', }} color="error" variant="contained" size="small"
                  onClick={() => handleDeleteLink(item?.banner_id)}
                >
                  <CloseIcon />
                </Button>
                <label className="grid ">
                  {item.banner_image ? (
                    <div className="">
                      <div className="w-full h-52 ps-1 rounded overflow-hidden"
                        style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0 }}
                      >
                        <img
                          src={item?.banner_image?.url}
                          className="w-full h-full object-cover " style={{ objectPosition: 'center' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center  text-xl my-10">No image </div>
                  )}
                </label>
                <div className="grid gap-3 grid-cols-2 p-5">
                  <label className="grid pr-6 ">
                    Banner Title
                    <input
                      type="add"
                      value={item?.banner_title}
                      className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                      placeholder=""
                    // onChange={(e) => handleBannerTitleChange(index, e)}
                    />
                  </label>
                  <label className="grid pr-6 ">
                    Sub Title
                    <input
                      type="add"
                      value={item?.sub_title}
                      className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                      placeholder=""
                    // onChange={(e) => handlesub_titleChange(index, e)}
                    />
                  </label>
                  <div></div>
                  <label className="flex items-end justify-end pr-6 ">
                    <Action banner_id={item?.banner_id} setLoading={setLoading} banner_image_url={item?.banner_image.url} banner_title={item?.banner_title} sub_title={item?.Butt_title} button_link={item?.button_link} />
                  </label>
                </div>
              </div>
            </>
          )) :
            (<div style={{ fontSize: '30px', fontWeight: 'bold' }} className="text-center text-stone-500 mb-4">No Banners Added Yet</div>)
          }

          {New == false ? (
            <div className="mt-6">
              <Button variant="contained" color="themeColor" fullWidth
                onClick={openNew}
              >+ ADD MORE</Button>
            </div>
          ) : (
            <div className="bg-[#EEEEEE] relative rounded-md drop-shadow-md mb-3 items-end borders mt-5 p-5">
              <Button style={{ position: 'absolute', top: '10px', right: '10px', }} color="error" variant="contained" size="small"
                onClick={() => closeNew()}
              >
                <CloseIcon />
              </Button>
              <label className="grid ">
                {photo ? (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-20 h-20 rounded  overflow-hidden" >
                      <img
                        src={photo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div >
                      <Button color="error" variant="contained" size="small"
                        onClick={handlePhotoRemove}
                      >
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    // required
                    className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh] mb-3"
                    style={{}}
                  />
                )}
              </label>
              <div className="grid gap-3 grid-cols-2">
                <label className="grid pr-6 ">
                  Banner Title
                  <input
                    type="add"
                    value={title}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label className="grid pr-6 ">
                  Sub Title
                  <input
                    type="add"
                    value={btn}
                    className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                    placeholder=""
                    onChange={(e) => setBtn(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex mt-10 gap-5 items-center">

                <button
                  className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                  style={{
                    width: "130px",
                    height: "55px",
                    color: "white",
                  }}
                  type="submit"
                  onClick={handleSubmitBanner}>
                  SAVE
                </button>
                <NavLink to="/home/pages">
                  <button
                    className="rounded bg-black hover:bg-gray-800"
                    style={{
                      width: "130px",
                      height: "55px",
                      color: "white",
                    }}>
                    Back
                  </button>
                </NavLink>
              </div>
            </div>
          )}



          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">Offer Area</div>
            Background Image
            <div className='relative border border-gray-300 rounded-md w-full h-32 overflow-hidden'>

              <input
                type='file'
                id='imageInput0'
                className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                onChange={(e) => handleBgImageChange(e)}

              />
              {!bgImage ? (
                <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                  <img src={homeData?.OfferArea?.image?.url && homeData?.OfferArea?.image?.url} className='object-cover w-full h-full' alt='Preview 0' />
                </label>
              ) : (
                <>
                  <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                    onClick={() => handleBgImageRemove()}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                      <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <img src={bgImage} className='object-cover w-full h-full' alt='Preview 0' />
                </>
              )}

            </div>
            <div className="grid gap-3 grid-cols-2">
              <label className="grid pr-6 ">
                Title
                <input
                  type="add"
                  value={banner1Title}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner1Title(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                Name
                <input
                  type="add"
                  value={banner1Name}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner1Name(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                Offer
                <input
                  type="link"
                  value={banner1Offer}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner1Offer(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                Subtitle
                <input
                  type="link"
                  value={banner1SubTitle}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner1SubTitle(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                Link
                <input
                  type="link"
                  value={banner1SubTitle1}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner1SubTitle1(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">Collection Area</div>
            <div className='col-span-6 md:col-span-3'>
              <p className='mb-2'>Upload Photo</p>

              <label className="grid pr-6 ">
                Banner Title
                <input
                  type="add"
                  value={banner2Title}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner2Title(e.target.value)}
                />
              </label>
              <div className='flex gap-2 flex-wrap flex-nowrap mt-3'>
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>
                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleImageChange(e)}

                  />
                  {!imagePreview ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      {/* <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'> */}
                      <img src={homeData?.CollectionArea?.images?.[0]?.url} className='object-cover w-full h-full' alt='Preview 0' />
                      {/* </svg> */}
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleImageRemove()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={imagePreview} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>
                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleImageChange1(e)}
                  />
                  {!imagePreview1 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      {/* <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'> */}
                      <img src={homeData?.CollectionArea?.images?.[1]?.url} className='object-cover w-full h-full' alt='Preview 0' />
                      {/* </svg> */}
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleImageRemove1()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={imagePreview1} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>
                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleImageChange2(e)}
                  />
                  {!imagePreview2 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      {/* <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'> */}
                      <img src={homeData?.CollectionArea?.images?.[2]?.url} className='object-cover w-full h-full' alt='Preview 0' />
                      {/* </svg> */}
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleImageRemove2()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={imagePreview2} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                {/* Similar structure for imageInput1 and imageInput2 using imagePreview1 and imagePreview2 */}
              </div>
            </div>
          </div>

          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">Promotional Area</div>


            <div className="grid gap-3 grid-cols-2">
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-full h-32 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleOfferImageChange1(e)}

                  />
                  {!offerImg1 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      <img src={homeData?.EventArea?.image?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleOfferImageRemove1()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={offerImg1} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                Image Link

                <input
                  type="add"
                  value={banner3ButtonTitle}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner3ButtonTitle(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-full h-60 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleOfferImageChange2(e)}

                  />
                  {!offerImg2 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      <img src={homeData.EventArea?.image2?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleOfferImageRemove2()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={offerImg2} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
              </label>

            </div>
          </div>
          <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders mt-5 ">
            <div className="text-xl mb-3 font-semibold">Gift Area</div>


            <div className="grid gap-3 grid-cols-2">
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleGridImageChange1(e)}

                  />
                  {!gridImg1 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      {/* <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg> */}
                      <img src={homeData.GridArea?.image1?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleGridImageRemove1()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={gridImg1} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                Title1
                <input
                  type="add"
                  value={banner4Title1}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Title1(e.target.value)}
                />
                Link1
                <input
                  type="add"
                  value={banner4Link1}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Link1(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleGridImageChange2(e)}

                  />
                  {!gridImg2 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>

                      <img src={homeData.GridArea?.image2?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleGridImageRemove2()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={gridImg2} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                Title 2
                <input
                  type="add"
                  value={banner4Title2}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Title2(e.target.value)}
                />

                Link 2
                <input
                  type="add"
                  value={banner4Link2}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Link2(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleGridImageChange3(e)}

                  />
                  {!gridImg3 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      <img src={homeData.GridArea?.image3?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleGridImageRemove3()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={gridImg3} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                Title 3
                <input
                  type="link"
                  value={banner4Title3}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Title3(e.target.value)}
                />

                Link 3
                <input
                  type="link"
                  value={banner4Link3}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Link3(e.target.value)}
                />
              </label>
              <label className="grid pr-6 ">
                <div className='relative border border-gray-300 rounded-md w-32 h-32 overflow-hidden'>

                  <input
                    type='file'
                    id='imageInput0'
                    className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
                    onChange={(e) => handleGridImageChange4(e)}

                  />
                  {!gridImg4 ? (
                    <label htmlFor='imageInput0' className='w-full h-full flex items-center justify-center cursor-pointer'>
                      <img src={homeData.GridArea?.image4?.url} className='object-cover w-full h-full' alt='Preview 0' />
                    </label>
                  ) : (
                    <>
                      <div className='absolute top-0 right-0 m-1 bg-red-500 cursor-pointer'
                        onClick={() => handleGridImageRemove4()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
                          <path fillRule='evenodd' d='M10 1a1 1 0 0 1 1 1v14a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zm3 4a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5zm-6 0a1 1 0 1 1-2 0v8a1 1 0 1 1 2 0V5z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <img src={gridImg4} className='object-cover w-full h-full' alt='Preview 0' />
                    </>
                  )}

                </div>
                Title 4
                <input
                  type="link"
                  value={banner4Title4}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Title4(e.target.value)}
                />
                Link 4
                <input
                  type="link"
                  value={banner4Link4}
                  className="px-4 py-2 drop-shadow-md rounded-md mt-1 "
                  placeholder=""
                  onChange={(e) => setBanner4Link4(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="flex mt-10 gap-5 items-center">

            <button
              className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
              style={{
                width: "130px",
                height: "55px",
                color: "white",
              }}
              type="submit"
              onSubmit={handleSubmit}>
              SAVE
            </button>
            <NavLink to="/home/pages">
              <button
                className="rounded bg-black hover:bg-gray-800"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}>
                Back
              </button>
            </NavLink>
          </div>

        </form>
      </div>













    </div>










    // // {/*            
    // //             <label className="grid pr-6">
    // //               Background Image
    // //               {bgImg ? (null) : (

    // //                 <div className="flex items-center mb-2">
    // //                   <div className="w-20 h-20 rounded overflow-hidden">
    // //                     <img
    // //                       src={editData.photo}
    // //                       className="w-full h-full object-cover"
    // //                     />
    // //                   </div>
    // //                 </div>
    // //               )
    // //               }
    // //               {photo ? (
    // //                 <div className="flex items-center">
    // //                   <div className="w-20 h-20 rounded overflow-hidden">
    // //                     <img
    // //                       src={URL.createObjectURL(photo)}
    // //                       className="w-full h-full object-cover"
    // //                     />
    // //                   </div>
    // //                   <div>
    // //                     <button
    // //                       style={{
    // //                         color: "red",
    // //                         paddingLeft: "5px",
    // //                         cursor: "pointer",
    // //                         backgroundColor: "white",
    // //                         marginLeft: "20px",
    // //                       }}
    // //                       onClick={handlePhotoRemove}>
    // //                       Remove
    // //                     </button>
    // //                   </div>
    // //                 </div>
    // //               ) : (
    // //                 <input
    // //                   type="file"
    // //                   id="photo"
    // //                   name="photo"
    // //                   accept="image/*"
    // //                   onChange={handlePhotoChange}
    // //                   // required
    // //                   class="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh]"
    // //                   style={{ border: "2px solid #e6f7fe" }}
    // //                 />
    // //               )}
    // //             </label>
    // //           </div>

    // //         </form>
    // //       </div>
    // //     </div>
  );
};

export default CMSHome;
