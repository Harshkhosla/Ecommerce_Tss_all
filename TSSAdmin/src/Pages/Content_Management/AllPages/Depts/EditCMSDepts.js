import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateDept_cms } from "../../../User_Management/features/userSlice";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../Assets/index";
import Table from "../../../../UI/CommonTable/Table";
import Modal from '@mui/material/Modal';
import { Button, IconButton } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { updateUserDept_cms } from "../../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const Action = ({ uid, uname, deptData, setLoading }) => {
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
  const [dept, setdept] = useState();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("dept_id", dept);
    setLoading(true);
    await dispatch(updateUserDept_cms(formData));
    setLoading(false);
    handleClose();
    window.location.reload()
  };
  const handledeptChange = (event) => {
    setdept(event.target.value);
  };
  return (
    <>
      <div>
        <IconButton color="themeColor">
          <SyncAltIcon onClick={handleOpen} />
        </IconButton>
        {/* <img src={editIcon} onClick={handleOpen} className="w-6 h-6 " style={{ cursor: 'pointer' }} alt="edit" /> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }} className="text-gray-900">Switch Department</h2>
          <div className="my-3 flex gap-3 items-center">
            <select
              id="label"
              name="label"
              className="outline-none rounded"
              style={{
                height: "50px",
                width: "100%",
                border: '2px solid lightgrey',
                backgroundColor: 'whitesmoke',
                //  marginTop:'5px',
                paddingLeft: "5px",
              }}
              value={dept}
              onChange={handledeptChange}
            >
              <option value=''>Select Department</option>
              {deptData.map((item, index) => (
                <option value={item.dept_id}>{item.department_name}</option>
              ))}
            </select>
            <div className="flex justify-end ">
              <div>
                <Button id="applycat" onClick={handleClick} variant="contained" size="large" color="themeColor">
                  Switch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal >
    </>
  );
};

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" style={{ objectFit: 'cover' }} src={picUrl} alt="photo" />
    </div>
  );
};

const EditCMSDepts = ({ setExpand, setActiveTab }) => {
  setExpand("userManagement");
  setActiveTab("department");
  const head = "Edit Department";
  const Navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.userManagement.users);

  const [title, setTitle] = useState(data.dept_name);
  const [images, setImages] = useState([]);
  const [slug, setSlug] = useState(data.slug);
  const dispatch = useDispatch();
  const greenButtonText = "Add New Member";
  const greenClicked = () => {
    Navigate("/home/addMember");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(getUser());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);
  const filteredData = userData.filter(item => item.dept_id === data.dept_id);
  const handleSubmit = async (event, depID) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("dept_id", data.dept_id);
    formData.append("department_name", title);

    images.map((image, index) => {
      formData.append("department_photo", image);
    });
    setLoading(true);
    await dispatch(updateDept_cms({ formData, depID }));
    setLoading(false);
    Navigate('/home/department');
  };

  const sampledata = filteredData.map((item, index) => ({
    name: item.uname,
    pic: <ProfilePhoto picUrl={item.pic_url} />,
    user_type: item.user_type,
    action: <Action uid={item.uid} uname={item.uname} deptData={data.deptData} setLoading={setLoading} />
  }))

  const columns = [
    {
      header: "Picture",
      accessor: "pic",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "User Type",
      accessor: "user_type",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center " style={{ zIndex: '9999' }}>
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

      <div className=" ml-72 mb-10 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border" style={{ marginTop: "120px" }}>
        <form >
          <label className="grid pr-6" style={{ marginTop: "20px" }}>
            Department Photo
            <div style={{ width: "600px", marginTop: "10px" }}>
              {images && images.length > 0 ? (
                null
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  <div className="relative">
                    <img
                      src={data.image} alt='img'
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                </div>
              )}
              {images && images.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        className="absolute top-0 text-white"
                        style={{ right: 46 }}
                        onClick={() => handleRemoveImage(index)}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  style={{
                    height: "48px",
                    width: "590px",
                    paddingLeft: "0px",
                    border: "2px solid 	#e6f7fe",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  placeholder=""
                />
              )}
            </div>
          </label>
          <label className="grid mt-5">
            Department Name
            <input
              type="text"
              placeholder="Enter Department Name"
              id="title"
              className=" w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{
                height: "50px",



                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          {/* <div> */}
          <button
            className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit"
            onClick={(e) => handleSubmit(e, data.dept_id)}
          >
            Save
          </button>
          <Link to='/home/department'>
            <button
              className="rounded mt-10 bg-black hover:bg-gray-800"
              style={{
                width: "170px",
                height: "55px",
                color: "white",
                marginLeft: "30px",
              }}
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>

      <div className=" ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
        {sampledata.length > 0 ?
          (<>
            <Table
              columns={columns}
              data={sampledata}
              pageSize={pageSize}
            />
          </>)
          :
          (<>
            <Table
              columns={columns}
              data={sampledata}
              pageSize={pageSize}
            />
            <div className="flex ml-5 justify-center w-full my-20">
              <h2 className="text-4xl font-bold text-gray-500">No Data!</h2>
            </div>
          </>)
        }
      </div>
    </div>
  );
};

export default EditCMSDepts;
