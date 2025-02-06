import React, { useEffect, useState } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUser, createRole, RoleManagement, uploadImages } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import AddNewRole from "../../PRM/addNewRole";
import { Grid } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const CreateUser = ({ setActiveTab, setExpand }) => {
  setExpand("userManagement");
  setActiveTab("allUsers");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("")
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // const
  // console.log(data);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await dispatch(RoleManagement());
      setLoading(false);
    };
    fetchUserData();
  }, [dispatch]);
  let userRoleCategory = useSelector((state) => state.userManagement.role)

 
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
    setDept(event.target.value)
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    
    // const newEmail = ;
    // // Regular expression for basic email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // // Check if the newEmail matches the email format
    // const isValidEmail = emailRegex.test(newEmail);
  
    // // Only update the email state if it is a valid email format
    // if (isValidEmail) {
      
    // } else {
    //   // Example: Update UI or show error message
    //   alert('Invalid email format. Please enter a valid email address.');
    // }
  };
  
  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;
    setPhone(newPhone);
  
    // Regular expression to check if the phone number has at least 6 digits
    // const phoneRegex = /^\+?\d{6,}$/;
  
    // // Check if the newPhone matches the phone number format
    // const isValidPhone = phoneRegex.test(newPhone);
  
    // // Only update the phone state if it is a valid phone number
    // if (isValidPhone) {
    //   // Strip non-digit characters for storage/display
    //   const strippedPhone = newPhone.replace(/\D/g, '');
      
    // } else {
    //   // Example: Update UI or show error message
    //   alert('Invalid phone number. Please enter at least 6 digits.');
    // }
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
      setPasswordError('Invalid password. Password must contain UpperCase, LowerCase, Integers, Symbols');
    } else {
      setPasswordError('');
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  const head = "Create User";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    // console.log("clicked")
    // // console.log(event);

    const formData = new FormData();
    formData.append("uname", name);
    formData.append("email", email);
    formData.append("contact", phone);
    formData.append("pass", password);
    formData.append("role", role);
    formData.append("department", dept);
    // formData.append("status", 'Unassign');
    if (photo) {
      formData.append("pic_url", photo);
    }
    setLoading(true);
    await dispatch(createUser(formData));
    setLoading(false);
    // navigate("/home/allUsers");
  };
  // console.log(photo);
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

      <div className="ml-80 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders w-[70vw] " style={{ marginTop: "120px" }}>
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
                <option value="">Select a Role</option>
                {userRoleCategory && userRoleCategory.map((item) => {
                  return <option value={item.role}>{item.role}</option>
                })}
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
                {data.map((item, index) => (
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
                  marginTop: '5px',
                  paddingLeft: "5px",
                }}
                onChange={handlePhoneChange}
                minLength="6"
                maxLength="10"
                pattern="[0-9]{5}[-][0-9]{7}[-][0-9]{1}"
                title="Please enter a valid phone number"
                required
              />
            </label>
            <label className="grid pr-6">
              Photo
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
                      onClick={handlePhotoRemove}
                    >
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
                  className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent w-[50vh]"
                  style={{}}

                />
              )}
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
          }}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
        {passwordError && <p style={{ color: 'red', marginTop: '5px', fontSize: '15px' }}>{passwordError}</p>}
      </label>

          </div>
          <div className="flex mt-10 gap-10 items-center">
            <button
              className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
              style={{
                width: "130px",
                height: "55px",
                color: "white",
              }}
              type="submit"
              onSubmit={handleSubmit}
            >
              SAVE
            </button>
            <Link to="/home/allUsers">
              <button
                className="rounded bg-amber-600 hover:bg-amber-700"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
