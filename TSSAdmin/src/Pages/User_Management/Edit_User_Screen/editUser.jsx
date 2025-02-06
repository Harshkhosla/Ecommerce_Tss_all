import React, { useState, useEffect } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { Form, Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser, uploadImages } from "../features/userSlice";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { getUserLogin } from "../features/userSlice";

const EditUser = ({ setActiveTab, setExpand }) => {
  setExpand("userManagement");
  setActiveTab("allUsers");
  const head = "Edit User";

  const dispatch = useDispatch();
  const location = useLocation();
  const editData = location.state;
  // console.log(editData,"hatrsh");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(editData.username);
  const [email, setEmail] = useState(editData.email);
  const [phone, setPhone] = useState(editData.phone);
  const [userId, setUserId] = useState(editData.uid);
  const [photo, setPhoto] = useState();
  const [role, setRole] = useState(editData.role);
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState(editData.department);


  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    const newName = event.target.value;

    // Check for spaces in the name
    const hasSpace = /\s/.test(newName);

    // Update the error state based on whether there is a space
    setError(hasSpace ? 'Spaces are not allowed.' : '');

    // Only update the name state if it doesn't contain any spaces
    if (!hasSpace) {
      setName(newName);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleDeptChange = (event) => {
    setDept(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


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
   

  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handlePasswordBlur = () => {
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpace = /\s/.test(password);

    const isValidPassword =
      password.length >= 8 &&
      hasSpecialChars &&
      hasLowerCase &&
      hasUpperCase &&
      hasDigit &&
      !hasSpace;

    if (!isValidPassword) {
      setPasswordError('Invalid password. Password must contain UpperCase, LowerCase, Integers,Symbols');
    } else {
      setPasswordError('');
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (name) formData.append("uname", name);
    if (email) formData.append("email", email);
    if (password ) {
      formData.append("pass", password);
  }
  if (phone) formData.append("contact", phone);
  if (role) formData.append("role", role);
  if (userId)formData.append("uid", userId);
    if (photo)formData.append("pic_url", photo);
    // if (dept)  formData.append("dept_id", dept);
    if (dept)  formData.append("department", dept);
    // console.log(photo + 'okok');
    setLoading(true);
    await dispatch(updateUser({ formData, userId }));
    setLoading(false);
    navigate("/home/allUsers")
    // window.location.reload();
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
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-80 mt-20 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders w-[70vw]" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
          <label className="grid pr-6">
          User Name
          <input
            type="text"
            value={name}
            className="outline-none rounded"
            style={{
              height: "50px",
              marginTop: '5px',
              paddingLeft: "5px",
            }}
            onChange={handleNameChange}
            title="Please enter only one word"
            required
          />
          {error && <div style={{ color: 'red' , fontSize: '15px' }}>{error}</div>}
        </label>
            <label className="grid pr-6">
              Email Address
              <input
                type="email"
                value={email}
                className="outline-none rounded"
                style={{
                  height: "50px",
                  // width: "380px",
                  marginTop: '5px',
                  paddingLeft: "5px",
                }}
                onChange={handleEmailChange}
                required
              />
            </label>
            <label className="grid pr-6">
        Password
        <input
          type="password"
          value={password}
          className="outline-none rounded"
          style={{
            height: "50px",
            marginTop: '5px',
            paddingLeft: "5px",
          }}placeholder="****"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          // required
        />
        {passwordError && <p style={{ color: 'red', marginTop: '5px', fontSize: '15px' }}>{passwordError}</p>}
      </label>
            <label className="grid pr-6">
              User Role
              <select
                id="label"
                name="label"
                className="outline-none rounded"
                style={{
                  height: "50px",
                  // width: "380px",
                  marginTop: '5px',
                  paddingLeft: "5px",
                }}
                value={role}
                onChange={handleRoleChange}
              >
                {
                  editData.roles.map((item) =>{
                   return <option value={item.role}>{item.role}</option>
                  })
                }
                {/* <option value="">Select a Role</option> */}
                
             
               
              </select>
            </label>
            <label className="grid pr-6">
              User Department
              <select
                id="label"
                name="label"
                className="outline-none rounded"
                style={{
                  height: "50px",
                  // width: "380px",
                  marginTop: '5px',
                  paddingLeft: "5px",
                }}
                value={dept}
                onChange={handleDeptChange}
              >
                <option value="">Select a Dept</option>
                {editData.deptData
                  .map((item, index) => (
                    <option value={item.department_name}>{item.department_name}</option>
                  ))
                }
              </select>
            </label>
            <label className="grid pr-6">
              Contact No
              <input
                type="tel"
                value={phone}
                className="outline-none rounded"
                style={{
                  height: "50px",
                  // width: "380px",
                  marginTop: '5px',
                  paddingLeft: "5px",
                }}
                onChange={handlePhoneChange}
                required
              />
            </label>

            <label className="grid pr-6">
              Photo
              {photo ? (null) : (

                <div className="flex items-center mb-2">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={editData.photo}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
              }
              {photo ? (
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={photo}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <button
                      style={{
                        color: "red",
                        paddingLeft: "5px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        marginLeft: "20px",
                      }}
                      onClick={handlePhotoRemove}>
                      Remove
                    </button>
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
                  className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh]"
                  style={{}}
                />
              )}
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
              onSubmit={handleSubmit}>
              SAVE
            </button>
            <NavLink to="/home/allUsers">
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
  );
};

export default EditUser;
