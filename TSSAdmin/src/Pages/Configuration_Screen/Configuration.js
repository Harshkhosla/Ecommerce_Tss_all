import React, { useState, useEffect } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserLogin, getUser } from "../User_Management/features/userSlice";
import { tssurl, url1 } from "../../UI/port";

const Configuration = ({ setActiveTab }) => {
  const [sitename, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState();
  const [secondaryColor, setSecondaryColor] = useState();
  const [bgColor, setBgColor] = useState();
  const [mail, setEmail] = useState("");
  const [email, setSiteEmail] = useState("");
  const [url, setUrl] = useState("");
  const [smtp_details, setDetails] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userManagement.users);
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  useEffect(() => {
    // Fetch data from the
    async function fetch() {
      setLoading(true);
      await axios
        .get(
          `${tssurl}/settings/settings`, {
          headers: {
            'API-KEY': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
            "authorization": `${localStorage.getItem('jwt')}`,
          },
        }
        )

        .then((res) => {
          setName(res.data.site_name);
          setEmail(res.data.admin_email);
          setSiteEmail(res.data.support_mail);
          setUrl(res.data.portal_url);
          setDetails(JSON.stringify(res.data.smtp_details)); //Not in api
          setPrimaryColor(res.data.primary_color)
          setSecondaryColor(res.data.secondary_color);
          setBgColor(res.data.background_color);
          // console.log(res.data);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
    fetch();
  }, []);

  setActiveTab("settings");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sid", '64d9fa1337a45e6c8148e66e');
    formData.append("site_name", sitename);
    formData.append("portal_url", url);
    formData.append("admin_email", mail);
    formData.append("support_mail", email);
    formData.append("smtp_details", smtp_details);
    formData.append("primary_color", primaryColor);
    formData.append("background_color", bgColor);
    formData.append("secondary_color", secondaryColor);

    try {
      setLoading(true);
      const response = await axios({
        method: "put",
        url: `${tssurl}/settings/settings`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
      // console.log("Not submitting data", error);
    }
    setLoading(false);
  };

  const head = "Configuration and Settings";
  const roles = LuserData.role;

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
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Settings created successfully
        </Alert>
      </Snackbar>
      <div className=" ml-72 mt-32 w-[100%] relative">
        <div className="flex flex-row w-full h-full justify-center sm:justify-start items-center m-3">
          <form
            action="submit"
            className="w-full sm:w-2/3 px-5"
            onSubmit={handleSubmit}
          >
            {/* <h2 className="font-semibold text-2xl mb-10">
              Configuration and Settings
            </h2> */}
            <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Site Name</span>
                <input
                  type="text"
                  value={sitename}
                  onChange={(event) => setName(event.target.value)}
                  required
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Portal URL</span>
                <input
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  required
                  name="portalUrl"
                  placeholder="Enter Portal URL"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mb-4 gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Admin Email</span>
                <input
                  type="email"
                  value={mail}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  name="adminEmail"
                  placeholder="Enter Admin Email"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Support Mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setSiteEmail(event.target.value)}
                  required
                  name="supportMail"
                  placeholder="Enter Support Mail"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <span>SMTP Details</span>
              <textarea
                name="smtpDetails"
                required
                value={smtp_details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Enter Details"
                className="h-32 p-3 w-full border rounded-md border-blue-100 focus:border-blue-200"
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Primary Color</span>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(event) => setPrimaryColor(event.target.value)}
                  required
                  style={{
                    width: "100px",
                    height: "35px",
                    padding: "2px",
                    borderRadius: "5px",
                    backgroundColor: "lightgrey"
                  }}
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>

            </div>
            <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Secondary Color</span>
                <input
                  type="color"
                  value={secondaryColor}
                  style={{
                    width: "100px",
                    height: "35px",
                    padding: "2px",
                    borderRadius: "5px",
                    backgroundColor: "lightgrey"
                  }}
                  onChange={(event) => setSecondaryColor(event.target.value)}
                  required
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>

            </div>
            <div className="flex flex-col sm:flex-row mb-4 w-full gap-5">
              <div className="mb-2 w-full sm:w-1/2">
                <span className="mr-2 w-32 inline-block">Background Color</span>
                <input
                  type="color"
                  value={bgColor}
                  style={{
                    width: "100px",
                    height: "35px",
                    padding: "2px",
                    borderRadius: "5px",
                    backgroundColor: "lightgrey"
                  }}
                  onChange={(event) => setBgColor(event.target.value)}
                  required
                  name="siteName"
                  placeholder="Enter Site Name"
                  className="h-18 p-3 w-full border rounded-md border-blue-200 focus:border-blue-300"
                />
              </div>

            </div>
            {/* {roles == "admin"  ? (
              <button
                // type="submit"
                onSubmit={handleSubmit}
                className="bg-[#c93a0e] hover:bg-[#c91b0e] text-white font-bold w-[20vh] h-[7vh] py-2 px-4 rounded-md"
              >
                Submit
              </button>
            ):null } */}
            <button
              // type="submit"
              onSubmit={handleSubmit}
              className="bg-[#c93a0e] hover:bg-[#c91b0e] text-white font-bold w-[20vh] h-[7vh] py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
