import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast,ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from "js-cookie";
import { tssurl, url1, url2, url3, url4 } from "../../../UI/port";

//create action

// toast.configure();

const csrfToken = localStorage.getItem("csrftoken");
// const [result, setResult] = useState(false);
// const ResMsg =()=>{
//   setResult(true);
//   if (result == true) {
//     let login = document.getElementById('login');
//     setTimeout(() => {
//       login.style.transition = '0.5s';
//       login.style.opacity = '0';
//     }, 1500);
//     setTimeout(() => {
//       setResult(false)
//     }, 1600);
//   }
// }

export const createUser = createAsyncThunk(
  "createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://tssapis.devcorps.in/admin/user_management/create`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // // console.log(csrfToken)
      // console.log(response);
      // console.log(formData);
      // alert("User created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(csrfToken)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTerms_cms = createAsyncThunk(
  "getTerms_cms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/pages/termsAndConditions`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // // console.log(response.data.products);
      return response.data;
    } catch (error) {
      // console.log("Not getting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getRefund_cms = createAsyncThunk(
  "getRefund_cms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/pages/refundPolicy`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // // console.log(response.data.products);
      return response.data;
    } catch (error) {
      // console.log("Not getting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPrivacy_cms = createAsyncThunk(
  "getPrivacy_cms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/pages/privacyPolicy`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // // console.log(response.data.products);
      return response.data;
    } catch (error) {
      // console.log("Not getting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const addBanner = createAsyncThunk(
  "addBanner",
  async (formData, { rejectWithValue }) => {
    
    try {
      // console.log(formData,"lllol");
      const response = await axios({
        method: "put",
        url: `${tssurl}/catalog/${formData?.data}`,
        // url: `http://localhost:5100/banner/banners`,
        data: formData.formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("User created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(csrfToken)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const addHome = createAsyncThunk(
  "addHome",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/home`,
        // url: `http://localhost:5100/home`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("User created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(csrfToken)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewDept_cms = createAsyncThunk(
  "addNewDept_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/departments/create`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // // console.log(csrfToken)
      // console.log(response);
      // console.log(formData);
      // alert("Department created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(csrfToken)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const createNewPage = createAsyncThunk(
  "createNewPage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://139.59.236.50:8000/createpage/",
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // // console.log(csrfToken)
      // console.log(response);
      // alert("Page created successfully");
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // alert("Operation failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewShowcase = createAsyncThunk(
  "addNewShowcase",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addProject_sm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const addNewShowcase_meta = createAsyncThunk(
  "addNewShowcase_meta",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url4}/api/Project_sm/`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewBlog_cms = createAsyncThunk(
  "addNewBlog_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addNewBlog_cms`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const addNewPromotion = createAsyncThunk(
  "addNewPromotion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/promotion`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // console.log(response);
      // alert("Data created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://139.59.236.50:8000/addproducts",
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addCategory_mpm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewServicePackage_hsm = createAsyncThunk(
  "addNewServicePackage_hsm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addNewServicePackage_hsm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProductCategory_hsm = createAsyncThunk(
  "addNewProductCategory_hsm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/productCategory`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
           // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewServiceCategory_hsm = createAsyncThunk(
  "addNewServiceCategory_hsm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addNewServiceCategory_hsm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);


export const CRUD_add = createAsyncThunk(
  "CRUD_add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url1}/addCategory_sm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const addNewListing = createAsyncThunk(
  "addNewListing",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://139.59.236.50:8000/addlisting/",
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // console.log(response);
      // alert("Data created successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `https://tssapis.devcorps.in/admin/user_management/list`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserLogin = createAsyncThunk(
  "getUserLogin",
  async (uid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/user_management/${uid}`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_transaction_history_wallet = createAsyncThunk(
  "get_transaction_history_wallet",
  async (mid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/transactions/${mid}`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlog_cms = createAsyncThunk(
  "getBlog_cms",
  async (blog_id, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${url1}/getBlog_cms?blog_id=${blog_id}`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductPerformance = createAsyncThunk(
  "getProductPerformance",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      // const response = await axios.get(${tssurl}/product, {
      const response = await axios.get(`${tssurl}/product/product-performance`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log("response in productPerformance",response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getallSalesProduct = createAsyncThunk(
  "SalesProduct",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      // const response = await axios.get(${tssurl}/product, {
      const response = await axios.get(`${tssurl}/oders/export-analytics-data`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log("response in salesdata",response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getallVisitors = createAsyncThunk(
  "getallVisitors",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      // const response = await axios.get(${tssurl}/product, {

      const response = await axios.get(`https://tssapis.devcorps.in/client/visitors/getvisitor`, {

        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log("response in salesdata",response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getactivitylogs = createAsyncThunk(
  "getactivitylogs",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      // const response = await axios.get(${tssurl}/product, {
      const response = await axios.get(`${tssurl}/user/login-signup-counts`, {
      // const response = await axios.get(`http://localhost:5000/admin/user/login-signup-counts`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log("response in salesdata",response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAboutUs_cms = createAsyncThunk(
  "getAboutUs_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/about`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllBlogs_cms = createAsyncThunk(
  "getAllBlogs_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${url1}/getAllBlogs_cms`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getGeneralConfig_cms = createAsyncThunk(
  "getGeneralConfig_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/general-config/`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPromoCard_cms = createAsyncThunk(
  "getPromoCard_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/promo-code/`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
      
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getHomePage_cms_meta = createAsyncThunk(
  "getHomePage_cms_meta",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/banner/`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data.banners;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getContactUs_cms_meta = createAsyncThunk(
  "getContactUs_cms_meta",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${url4}/api/ContactUS_cms`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAbout_cms_meta = createAsyncThunk(
  "getAbout_cms_meta",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/about`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_footer_data_cms = createAsyncThunk(
  "get_footer_data_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/footer`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data[0]);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_header_data_cms = createAsyncThunk(
  "get_header_data_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
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
      // // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not getting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getHomePage_cms = createAsyncThunk(
  "getHomePage_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/home`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllDepartments_cms = createAsyncThunk(
  "getAllDepartments_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/departments/list`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContactPage_cms = createAsyncThunk(
  "getContactPage_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/contact/`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCatalogue_cms = createAsyncThunk(
  "getCatalogue_cms",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/catalog/`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data.catalogItems;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getLooks_cms = createAsyncThunk(
  "getLooks_cms",
  async (catID, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/catalog/${catID}`,
        // url: `http://localhost:5100/catalog/${catID}`,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getalllook = createAsyncThunk(
  "getalllok",
  async (CatId,{ rejectWithValue }) => {
    // console.log(CatId,"catid in userslice");
    // debugger;
    // console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `${tssurl}/looks/${CatId}`,
        // url: `http://localhost:5100/looks/`,
        // url: `http://localhost:5100/looks/${CatId}`,
        headers: {
          authorization: `${localStorage.getItem("jwt")}`,
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } 
    catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",

  async ({ formData, userId }, { rejectWithValue }) => {
    // debugger;
    try {
      const response = await axios({
        method: "put",
        url: `https://tssapis.devcorps.in/admin/user_management/${userId}`,
        // url: `http://localhost:5100/user_management/${userId}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(userId);
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const Addlook = createAsyncThunk(
  "addlook",
  async ( formData, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await axios({
        method: "post",
        url: `${tssurl}/looks/`,
        // url: http://localhost:5000/looks/,
        data: formData,
        headers: {
          authorization: `${localStorage.getItem("jwt")}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Content-Type": "multipart/formdata",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(formData)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const Editlook = createAsyncThunk(
  "Editlook",
  async ( {formData,cat}, { rejectWithValue }) => {
    // console.log("cat",cat)
    // debugger
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/looks/${cat}`,
        //  url: `http://localhost:5100/looks/${cat}`,
        data: formData,
        headers: {
          authorization: `${localStorage.getItem("jwt")}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Content-Type": "multipart/formdata",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(formData)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteLook = createAsyncThunk(
  "deleteLook",
  async ( cat, { rejectWithValue }) => {
    // console.log("cathari",cat)
    // debugger
    try {
      const response = await axios({
        method: "delete",
        url: `${tssurl}/looks/${cat}`,
        // url: http://localhost:5000/looks/,
        // data: formData,
        headers: {
          authorization: `${localStorage.getItem("jwt")}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Content-Type": "multipart/formdata",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(formData)
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatehome = createAsyncThunk(
  "updatehome",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/home`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatebanners = createAsyncThunk(
  "updatebanners",
  async ({ formData, bid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${tssurl}/banner/${bid}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCatalogue = createAsyncThunk(
  "addCatalogue",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/catalog/`,
        // url: `http://localhost:5000/catalog/`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGeneralConfig = createAsyncThunk(
  "updateGeneralConfig",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/general-config/`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);


export const updatePromoCard = createAsyncThunk(
  "updatePromoCard",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/promo-code`, //Change EndPoint
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);


export const editPagesPrivacyPolicy_cms = createAsyncThunk(
  "editPagesPrivacyPolicy_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/pages/privacyPolicy`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPagesTerms_cms = createAsyncThunk(
  "editPagesTerms_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/pages/termsAndConditions`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPagesRefundPolicy_cms = createAsyncThunk(
  "editPagesTerms_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/pages/refundPolicy`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePage = createAsyncThunk(
  "updatePage",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://139.59.236.50:8000/editpage/?pagename=${title}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShowcase = createAsyncThunk(
  "updateShowcase",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editProject_sm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShowcase_seo = createAsyncThunk(
  "updateShowcase_seo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url4}/api/Project_sm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateHomeService_seo = createAsyncThunk(
  "updateHomeService_seo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url4}/api/Product_hsm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "updateProject",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://139.59.236.50:8000/editproducts?prod_name=${title}`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editCategory_mpm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateCategory_sm = createAsyncThunk(
  "updateCategory_sm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editCategory_sm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPagesAboutUs_cms = createAsyncThunk(
  "editPagesAboutUs_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/about`, // Change the End points
        // url: `http://localhost:5100/about`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
          // "mid": "as7ash7qw23dds99783",
          // "amt": "1000",
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlog_cms = createAsyncThunk(
  "updateBlog_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/updateBlog_cms`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateHome_cms_meta = createAsyncThunk(
  "updateHome_cms_meta",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/home`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,

          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateAbout_cms_meta = createAsyncThunk(
  "updateAbout_cms_meta",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url4}/api/About_cms`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,

          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContactUs_cms_meta = createAsyncThunk(
  "updateContactUs_cms_meta",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url4}/api/ContactUS_cms`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,

          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editContactPage_cms = createAsyncThunk(
  "editContactPage_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/contact/`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDept_cms = createAsyncThunk(
  "updateDept_cms",
  async ({ formData, depID }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/departments/${depID}`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_header_data_cms = createAsyncThunk(
  "pages/header",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/pages/header`, // Change the End points
        // url: `http://localhost:5100/pages/header`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserDept_cms = createAsyncThunk(
  "updateUserDept_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/updateUserDept_cms`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_footer_data_cms = createAsyncThunk(
  "update_footer_data_cms",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/footer`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",

        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateServicePackage = createAsyncThunk(
  "updateServicePackage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editServicePackage_hsm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateListing = createAsyncThunk(
  "updateListing",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editListing_mpm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

// Suspended Users
export const suspendUsers = createAsyncThunk(
  "suspendUsers",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getAllSuspendedUsers_um`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response.data.suspended_users);
      return response.data.suspended_users;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_setting = createAsyncThunk(
  "get_setting",
  async (sid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/get_settings?sid=${sid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response.data.settings);
      return response.data.settings;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editNewPromotion = createAsyncThunk(
  "editNewPromotion",
  async ({ formData, ID }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/promotion/${ID}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(...formData);
      // console.log(response);
      // alert("Data Updated successfully");
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

//CRM
export const CRM = createAsyncThunk("CRM", async (_, { rejectWithValue }) => {
  // console.log("hello");
  try {
    const response = await axios.get(`${tssurl}/user/`, {
    // const response = await axios.get(`http://localhost:5210/admin/user/`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log("Not submitting data");
    // console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// Content Management ALl Pages
export const allPages = createAsyncThunk(
  "allPages",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get("http://139.59.236.50:8000/pages/", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// PSM All projects
export const allProjects = createAsyncThunk(
  "allProjects",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url1}/getAllProjects_sm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data.projects;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// PSM Featured Product
export const featuredProjects = createAsyncThunk(
  "featuredProjects",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        "http://139.59.236.50:8000/featuredprojects/", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Product List
export const HSM_allProduct = createAsyncThunk(
  "HSM_allProduct",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/product`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateHSMProduct = createAsyncThunk(
  "updateHSMProduct",
  async ({pid,allData}) => {
    // console.log(pid);
    // debugger
    // const{pid,formdata}=formdata;
    try {
      // console.log(pid);
      const response = await axios({
        method: "put",
        url: `${tssurl}/product/${pid}`, // Change the End points
        // url: `${tssurl}/product/${pid}`, // Change the End points
        data: allData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/Json",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      // return rejectWithValue(error.response.data);
    }
  }
);

export const HSM_Product = createAsyncThunk(
  "HSM_Product",
  async (pid, { rejectWithValue }) => {
    // console.log("hello 3 motov");
    try {
      const response = await axios.get(`${url1}/getProduct_hsm?pid=${pid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // // console.log(response);
      return response.data.product;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Featured Product
export const HSM_featuredProduct = createAsyncThunk(
  "HSM_featuredProduct",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        "http://139.59.236.50:8000/featuredproducts", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Promotion
export const HSM_promotion = createAsyncThunk(
  "HSM_promotion",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${tssurl}/promotion`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProjectDetails = createAsyncThunk(
  "getProjectDetails",
  async (pid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getProject_sm?pid=${pid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.project_data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_Category = createAsyncThunk(
  "get_Category",
  async (cid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getCategory_sm?cid=${cid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.category_data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ProductCategories = createAsyncThunk(
  "ProductCategories",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${tssurl}/productCategory`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ServiceCategories = createAsyncThunk(
  "ServiceCategories",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getAllServiceCategories_hsm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ServicePackage = createAsyncThunk(
  "ServicePackage",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getAllServicePackages_hsm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const AllCategories_sm = createAsyncThunk(
  "AllCategories_sm",
  async (pid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `${url1}/getAllCategories_sm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.categories;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Transaction and Purchase
export const HSM_transaction = createAsyncThunk(
  "HSM_transaction",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/oders/`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// View Member
export const VeiwMember = createAsyncThunk(
  "VeiwMember",
  async (mid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/user/${mid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// View Order details
export const VeiwOrder = createAsyncThunk(
  "VeiwOrder",
  async (oid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/oders/${oid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const VeiwOrderHSM = createAsyncThunk(
  "VeiwOrderHSM",
  async (oid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url1}/getOrderHistory_hsm?oid=${oid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data.order_history;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//updateOrder

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async ({ formData, oid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/oders/${oid}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(oid);
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(oid);
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderHSM = createAsyncThunk(
  "updateOrderHSM",
  async ({ formData, oid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/updateOrderStatus_hsm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(oid);
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(oid);
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const Order_Table = createAsyncThunk(
  "Order_Table",
  async (mid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/oders/samp/${mid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const Reward_Table = createAsyncThunk(
  "Reward_Table",
  async (mid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/transactions/${mid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const Internal_Notes = createAsyncThunk(
  "Internal_Notes",
  async (mid, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/user/usersnot/${mid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data.messages);
      return response.data.messages;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const SendNotes = createAsyncThunk(
  "SendNotes",
  async ({ formData, mid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/user/users/${mid}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // // console.log(oid);
      // console.log(response);
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // // console.log(oid);
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const topUp = createAsyncThunk(
  "topUp",
  async ({ formData, mid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/user/topup/${mid}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(mid);
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log(mid);
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Review magement
export const HSM_review = createAsyncThunk(
  "HSM_review",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/review/reviews`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM HElp desk
export const HSM_helpdesk = createAsyncThunk(
  "HSM_helpdesk",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        `http://64.227.186.165:5002/getticketlist`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM all members
export const MPM_allmembers = createAsyncThunk(
  "MPM_allmembers",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get("http://139.59.236.50:8000/customers", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM suspended Users
export const MPM_suspended = createAsyncThunk(
  "MPM_suspended",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(
        "http://139.59.236.50:8000/suspendedcustomers", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM category
export const MPM_category = createAsyncThunk(
  "MPM_category",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url1}/getAllCategory_mpm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM Listing
export const MPM_listing = createAsyncThunk(
  "MPM_listing",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url1}/getAllListings_mpm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM All chats
export const MPM_allchats = createAsyncThunk(
  "MPM_allchats",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get("http://139.59.236.50:8000/deals", {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM review
export const MPM_review = createAsyncThunk(
  "MPM_review",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url1}/getAllReviews_mpm`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data.reviews;
    } catch (error) {
      // console.log("Not submitting data");
      // // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Permission and role management
export const RoleManagement = createAsyncThunk(
  "RoleManagement",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/roles/list`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a user
export const DeleteUser = createAsyncThunk("DeleteUser", async (uid) => {
  try {
    const response = await axios.delete(
      `https://tssapis.devcorps.in/user_management/${uid}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success("User is deleted successfully");
      return response.data;
    }
  }catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
  
});

export const deleteBlog_cms = createAsyncThunk("deleteBlog_cms", async (blog_id) => {
  try {
    const response = await axios.delete(
      `${url1}/deleteBlog_cms?blog_id=${blog_id}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success("Blog is deleted successfully");
      return response.data;
    }
  }catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }

});

export const DeleteBanner = createAsyncThunk("DeleteBanner", async (banner_id) => {
  try {
    const response = await axios.delete(
      `${tssurl}/banner/${banner_id}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success("Banner is deleted successfully");
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
});


export const DeleteDept = createAsyncThunk("DeleteDept", async (dept_id) => {
  try {
    const response = await axios.delete(
      `${tssurl}/departments/${dept_id}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Department is deleted successfully');
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
});

// Delete Suspended User
export const DeleteSuspendUser = createAsyncThunk(
  "DeleteSuspendUser",
  async (uid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteuser_um?uid=${uid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('SuspendedUser is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
    
  }
);

// Delete a Relationship (NO API)
// export const DeleteRelationship = createAsyncThunk(
//   "DeleteRelationship",
//   async (pageid) => {
//     const response = await axios.delete(
//       `http://139.59.236.50:8000/deletepage/?id=${pageid}`
//     );
//     return response.data;
//   }
// );

// Delete A page
export const DeletePage = createAsyncThunk("DeletePage", async (pageid) => {
  try {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletepage/?id=${pageid}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Page is deleted successfully');
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
  
});

// Delete a Project and featured Project
export const DeleteProject = createAsyncThunk(
  "DeleteProject",
  async (pageid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteProject_sm?pid=${pageid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Project is deleted successfully');
        return response.data;
      }
    }  catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
   
  }
);

export const DeleteProject_seo = createAsyncThunk(
  "DeleteProject_seo",
  async (pageid) => {
    try {
      const response = await axios.delete(
        `${url4}/api/Project_sm/${pageid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('project is deleted successfully');
        return response.data;
      }
      
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
    
  }
);

//HSM Delete a product
export const DeleteProduct = createAsyncThunk(
  'DeleteProduct',
  async (pageId) => {
    try {
      const response = await axios.delete(
        `${tssurl}/product/${pageId}`, {
        headers: {
          'authorization': `${localStorage.getItem('jwt')}`,
          'API-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });
      

      if (response.data) {
        // Product deleted successfully
        toast.success('Product is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

export const DeleteProducts = createAsyncThunk(
  "DeleteProducts",
  async (pageId) => {
    // debugger;
    try {
      const response = await axios.delete(
        `${tssurl}/catalog/${pageId}`,
        // `http://localhost:5100/catalog/${pageId}`,
         {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Products is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

//HSM Delete a Promotion (No API yet)
export const DeletePromotion = createAsyncThunk(
  "DeletePromotion",
  async (promo_id) => {
    try {
      const response = await axios.delete(
        `${tssurl}//promotion/${promo_id}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Promotion is deleted successfully');
        return response.data;
      }
    }  catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

//HSM Delete a Transaction (NO API yet)
export const DeleteTransaction = createAsyncThunk(
  "DeleteTransaction",
  async (pageId) => {
    try {
      const response = await axios.delete(
        `http://139.59.236.50:8000/deleteproducts?id=${pageId}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Transaction is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

// HSM Delete review
export const DeleteReview = createAsyncThunk("DeleteReview", async (prodId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${tssurl}/review/reviews/${prodId}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
      // data: formData,
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Review is deleted successfully');
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }

});

// MPM Delete a members
export const DeleteMember = createAsyncThunk("DeleteMember", async (id) => {
  try {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletecustomer?id=${id}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Member is deleted successfully');
      return response.data;
    }
    
  }catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
});

// MPM Delete a category
export const DeleteCategory = createAsyncThunk(
  "DeleteCategory",
  async (catgid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteCategory_mpm?cid=${catgid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Category is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);
// MPM Delete a prodyctcategory
export const DeleteProductCategory = createAsyncThunk(
  "DeleteProductCategory",
  async (pcid) => {
    try {
      const response = await axios.delete(
        `${tssurl}/productCategory/${pcid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('ProductCategory is deleted successfully');
        return response.data;
      }

    }catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);
// MPM Delete a category
export const DeleteServiceCategory = createAsyncThunk(
  "DeleteServiceCategory",
  async (scid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteServiceCategory_hsm?scid=${scid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('ServiceCategory is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
   
  }
);
// MPM Delete a category
export const DeleteServicePackage = createAsyncThunk(
  "DeleteServicePackage",
  async (spid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteServicePackage_hsm?spid=${spid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('ServicePackage is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
    
    
  }
);

// PSM Delete a category
export const DeleteCategoryCRUD = createAsyncThunk(
  "DeleteCategoryCRUD",
  async (cid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteCategory_sm?cid=${cid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('CategoryCRUD is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

// MPM Delete a listing
export const DeleteListing = createAsyncThunk(
  "DeleteListing",
  async (listId) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteListing_mpm?lid=${listId}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Listing is deleted successfully');
        return response.data;
      }
    } catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

// Delete Deal
export const DeleteDeal = createAsyncThunk("DeleteDeal", async (dealId) => {
  try {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletedeal?d_id=${dealId}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Deal  is deleted successfully');
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
 
  
});

// Delete a role
export const DeleteRole = createAsyncThunk("DeleteRole", async (rid) => {
  try {
    const response = await axios.delete(
      `${tssurl}/roles/${rid}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    if (response.data) {
      // Product deleted successfully
      toast.success('Role is deleted successfully');
      return response.data;
    }
  } catch (error) {
    // Handle error during the API request
    console.error('Error deleting product:', error);
    toast.error('Not a valid access');
    throw error; // Rethrow the error to ensure it is propagated
  }
});

// Delete Relationship
export const DeleteRelation = createAsyncThunk(
  "DeleteRelation",
  async (mid) => {
    try {
      const response = await axios.delete(
        `${url1}/deleteMember_crm?mid=${mid}`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      }
      );
      if (response.data) {
        // Product deleted successfully
        toast.success('Relation is deleted successfully');
        return response.data;
      }
    }catch (error) {
      // Handle error during the API request
      console.error('Error deleting product:', error);
      toast.error('Not a valid access');
      throw error; // Rethrow the error to ensure it is propagated
    }
  }
);

export const createRole = createAsyncThunk(
  "createRole",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/roles/create`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const editRole = createAsyncThunk(
  "editRole",
  async ({ formData, rid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/roles/${rid}`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const hsmCreateProduct = createAsyncThunk(
  "hsmCreateProduct",
  async (jsonData, { rejectWithValue }) => {
    // console.log(jsonData,"comming hear");
    try {
      const response = await axios({
        method: "post",
          url: `${tssurl}/product`,
        // url: `http://localhost:5100/product`,
        data: jsonData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // alert("Data created successfully");
      // console.log("response",response);
      // console.log(...jsonData);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const hsmCreateProduct_meta = createAsyncThunk(
  "hsmCreateProduct_meta",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${url4}/api/Product_hsm`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const HSM_category = createAsyncThunk(
  "HSM_category",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${tssurl}/categories`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const newsletter_controller = createAsyncThunk(
  "newsletter_controller",
  async (_, { rejectWithValue }) => {
    // console.log("hello");
    try {
      const response = await axios.get(`${url3}/newsletter_controller`, {
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      return response.data.data;
    } catch (error) {
      // console.log("Not submitting data");
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateCategoryList = createAsyncThunk(
  "updateCategoryList",
  async ({ formData, cid }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/categories/${cid}`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteCategoryList = createAsyncThunk(
  "DeleteCategoryList",
  async (catgid) => {
    const response = await axios.delete(
      `${tssurl}//categories/${catgid}`, {
      headers: {
        "authorization": `${localStorage.getItem('jwt')}`,
        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
      },
    }
    );
    return response.data;
  }
);

export const addNewCategoryList = createAsyncThunk(
  "addNewCategoryList",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/categories`,
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(...formData);
      // alert("Data created successfully");
      // console.log(response);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const serviceCategoryList = createAsyncThunk(
  "serviceCategoryList",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${url1}/editServiceCategory_hsm`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const productCategoryList = createAsyncThunk(
  "productCategoryList",
  async ({ formData, ID }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `${tssurl}/productCategory/${ID}`, // Change the End points
        data: formData,
        headers: {
          "authorization": `${localStorage.getItem('jwt')}`,
          // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          // "X-CSRFToken": csrfToken,
        },
      });
      // console.log(response);
      // alert("Data updated successfully");
    } catch (error) {
      if (error.response.status === 403) {
        // Handle 403 Forbidden error with a toast message
        toast.error("Access forbidden. You do not have permission to perform this action.");
      } else {
        // console.log("Not submitting data");
      }
      // console.log("Not submitting data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDetails = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    suspendUsers: [],
    crm: [],
    allpages: [],
    allprojects: [],
    featuredproj: [],
    hsm_allproducts: [],
    hsm_featuredproducts: [],
    getCatalogue_cms: [],
    getLooks_cms: [],
    hsm_Products: [],
    VeiwMember: [],
    VeiwOrder: [],
    getPromoCard_cms: [],
    VeiwOrderHSM: [],
    getAllDepartments_cms: [],
    getGeneralConfig_cms: [],
    getProjectDetails: [],
    get_Category: [],
    getAboutUs_cms: [],

    get_header_data_cms: [],
    get_footer_data_cms: [],
    getContactPage_cms: [],
    Order_Table: [],
    AllCategories_sm: [],
    Internal_Notes: [],
    Reward_Table: [],
    newsletter_controller: [],
    hsm_promotion: [],
    getHomePage_cms: [],
    hsm_transaction: [],
    hsm_review: [],
    hsm_helpdesk: [],
    mpm_allmembers: [],
    mpm_suspended: [],
    get_setting: [],
    getUserLogin: [],
    getHomePage_cms_meta: [],
    getAbout_cms_meta: [],
    getAllBlogs_cms: [],
    getBlog_cms: [],
    getContactUs_cms_meta: [],
    mpm_category: [],
    getPrivacy_cms: [],
    getTerms_cms: [],
    getRefund_cms: [],
    get_transaction_history_wallet: [],
    hsm_category: [],
    ProductCategories: [],
    ServiceCategories: [],
    ServicePackage: [],
    mpm_listing: [],
    mpm_allchats: [],
    mpm_review: [],
    role: [],
    loading: false,
    error: null,
    data: [],
    
    getalllook:[],
    getallSalesProduct:[],
    getProductPerformance:[],
    getactivitylogs:[],
    getallVisitors:[]
  },
  reducers: {
    dummy: (state) => state,
  },
  extraReducers: (builder) => {
    builder

      // Delete a user
      .addCase(DeleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.username !== action.payload.username
        );
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Suspended User
      .addCase(DeleteSuspendUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteSuspendUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.username !== action.payload.username
        );
      })
      .addCase(DeleteSuspendUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(getallSalesProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallSalesProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.getallSalesProduct = action.payload;
      })
      .addCase(getallSalesProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })











// visitors
      .addCase(getallVisitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.getallVisitors = action.payload;
      })
      .addCase(getallVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })




















      
// performance proudct
      .addCase(getProductPerformance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.getProductPerformance = action.payload;
      })
      .addCase(getProductPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
// get all activity logs
.addCase(getactivitylogs.pending, (state) => {
  state.loading = true;
})
.addCase(getactivitylogs.fulfilled, (state, action) => {
  state.loading = false;
  state.getactivitylogs = action.payload;
})
.addCase(getactivitylogs.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message;
})
      // Delete a page
      .addCase(DeletePage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeletePage.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageid !== action.payload.pageid
        );
      })
      .addCase(DeletePage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Project
      .addCase(DeleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageid !== action.payload.pageid
        );
      })
      .addCase(DeleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a product
      .addCase(DeleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Promotion
      .addCase(DeletePromotion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeletePromotion.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeletePromotion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      // Delete Relation
      .addCase(DeleteRelation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteRelation.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteRelation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a Member
      .addCase(DeleteMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Category
      .addCase(DeleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(DeleteBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(DeleteDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })


      .addCase(DeleteDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(getalllook.pending, (state) => {
        state.loading = true;
      })
      .addCase(getalllook.fulfilled, (state, action) => {
        state.loading = false;
        state.getalllook = action.payload;
      })
      .addCase(getalllook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Delete Listing
      .addCase(DeleteListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteListing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Deal

      .addCase(DeleteDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteDeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteDeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a Role
      .addCase(DeleteRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Get All users Data
      .addCase(getTerms_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTerms_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getTerms_cms = action.payload;
      })
      .addCase(getTerms_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getRefund_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRefund_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getRefund_cms = action.payload;
      })
      .addCase(getRefund_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getPrivacy_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrivacy_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getPrivacy_cms = action.payload;
      })
      .addCase(getPrivacy_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })


      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      //GetAboutUs CMS
      .addCase(getAboutUs_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAboutUs_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getAboutUs_cms = action.payload;
      })
      .addCase(getAboutUs_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      //Get all Blogs
      .addCase(getAllBlogs_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllBlogs_cms = action.payload;
      })
      .addCase(getAllBlogs_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      //general config
      .addCase(getGeneralConfig_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGeneralConfig_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getGeneralConfig_cms = action.payload;
      })
      .addCase(getGeneralConfig_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })


      .addCase(getPromoCard_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPromoCard_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getPromoCard_cms = action.payload;
      })
      .addCase(getPromoCard_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      //Get home page cms meta
      .addCase(getHomePage_cms_meta.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomePage_cms_meta.fulfilled, (state, action) => {
        state.loading = false;
        state.getHomePage_cms_meta = action.payload;
      })
      .addCase(getHomePage_cms_meta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Get About CMS meta
      .addCase(getAbout_cms_meta.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbout_cms_meta.fulfilled, (state, action) => {
        state.loading = false;
        state.getAbout_cms_meta = action.payload;
      })
      .addCase(getAbout_cms_meta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getContactUs_cms_meta.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactUs_cms_meta.fulfilled, (state, action) => {
        state.loading = false;
        state.getContactUs_cms_meta = action.payload;
      })
      .addCase(getContactUs_cms_meta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get header data
      .addCase(get_header_data_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_header_data_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.get_header_data_cms = action.payload;
      })
      .addCase(get_header_data_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      //Get footer data
      .addCase(get_footer_data_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_footer_data_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.get_footer_data_cms = action.payload;
      })
      .addCase(get_footer_data_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(newsletter_controller.pending, (state) => {
        state.loading = true;
      })
      .addCase(newsletter_controller.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletter_controller = action.payload;
      })
      .addCase(newsletter_controller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      //Get Contact Us CMS
      .addCase(getContactPage_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactPage_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getContactPage_cms = action.payload;
      })
      .addCase(getContactPage_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getCatalogue_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCatalogue_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getCatalogue_cms = action.payload;
      })
      .addCase(getCatalogue_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getLooks_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLooks_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getLooks_cms = action.payload;
      })
      .addCase(getLooks_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getAllDepartments_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDepartments_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllDepartments_cms = action.payload;
      })
      .addCase(getAllDepartments_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })


      // Get All Member details
      .addCase(VeiwMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(VeiwMember.fulfilled, (state, action) => {
        state.loading = false;
        state.VeiwMember = action.payload;
      })
      .addCase(VeiwMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get All Member details
      .addCase(get_Category.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_Category.fulfilled, (state, action) => {
        state.loading = false;
        state.get_Category = action.payload;
      })
      .addCase(get_Category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get PSM categories
      .addCase(AllCategories_sm.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllCategories_sm.fulfilled, (state, action) => {
        state.loading = false;
        state.AllCategories_sm = action.payload;
      })
      .addCase(AllCategories_sm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get HSM ProductCategories
      .addCase(ProductCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProductCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductCategories = action.payload;
      })
      .addCase(ProductCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get HSM serviceCategories
      .addCase(ServiceCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(ServiceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.ServiceCategories = action.payload;
      })
      .addCase(ServiceCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get HSM ServiceCategories
      .addCase(ServicePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(ServicePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.ServicePackage = action.payload;
      })
      .addCase(ServicePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get Project details
      .addCase(getProjectDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.getProjectDetails = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get Order details
      .addCase(VeiwOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(VeiwOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.VeiwOrder = action.payload;
      })
      .addCase(VeiwOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(VeiwOrderHSM.pending, (state) => {
        state.loading = true;
      })
      .addCase(VeiwOrderHSM.fulfilled, (state, action) => {
        state.loading = false;
        state.VeiwOrderHSM = action.payload;
      })
      .addCase(VeiwOrderHSM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get order history
      .addCase(Order_Table.pending, (state) => {
        state.loading = true;
      })
      .addCase(Order_Table.fulfilled, (state, action) => {
        state.loading = false;
        state.Order_Table = action.payload;
      })
      .addCase(Order_Table.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get reward history
      .addCase(Reward_Table.pending, (state) => {
        state.loading = true;
      })
      .addCase(Reward_Table.fulfilled, (state, action) => {
        state.loading = false;
        state.Reward_Table = action.payload;
      })
      .addCase(Reward_Table.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get Internal Notes
      .addCase(Internal_Notes.pending, (state) => {
        state.loading = true;
      })
      .addCase(Internal_Notes.fulfilled, (state, action) => {
        state.loading = false;
        state.Internal_Notes = action.payload;
      })
      .addCase(Internal_Notes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Suspended Users
      .addCase(suspendUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.suspendUsers = action.payload;
      })
      .addCase(suspendUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // CRM
      .addCase(CRM.pending, (state) => {
        state.loading = true;
      })
      .addCase(CRM.fulfilled, (state, action) => {
        state.loading = false;
        state.crm = action.payload;
      })
      .addCase(CRM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // All Pages
      .addCase(allPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(allPages.fulfilled, (state, action) => {
        state.loading = false;
        state.allpages = action.payload;
      })
      .addCase(allPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // PSM Project list
      .addCase(allProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allprojects = action.payload;
      })
      .addCase(allProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getHomePage_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomePage_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getHomePage_cms = action.payload;
      })
      .addCase(getHomePage_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // PSM Project list
      .addCase(get_setting.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_setting.fulfilled, (state, action) => {
        state.loading = false;
        state.get_setting = action.payload;
      })
      .addCase(get_setting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getUserLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.getUserLogin = action.payload;
      })
      .addCase(getUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })


      .addCase(get_transaction_history_wallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_transaction_history_wallet.fulfilled, (state, action) => {
        state.loading = false;
        state.get_transaction_history_wallet = action.payload;
      })
      .addCase(get_transaction_history_wallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getBlog_cms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlog_cms.fulfilled, (state, action) => {
        state.loading = false;
        state.getBlog_cms = action.payload;
      })
      .addCase(getBlog_cms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // PSM Featured Projects
      .addCase(featuredProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(featuredProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredproj = action.payload;
      })
      .addCase(featuredProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Products List
      .addCase(HSM_allProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_allProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_allproducts = action.payload;
      })
      .addCase(HSM_allProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;

      })
      // HSM Product List
      .addCase(HSM_Product.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_Product.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_Products = action.payload;
      })
      .addCase(HSM_Product.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Featured Product
      .addCase(HSM_featuredProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_featuredProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_featuredproducts = action.payload;
      })
      .addCase(HSM_featuredProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Promotion Management
      .addCase(HSM_promotion.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_promotion.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_promotion = action.payload;
      })
      .addCase(HSM_promotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Transaction and Purchase
      .addCase(HSM_transaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_transaction.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_transaction = action.payload;
      })
      .addCase(HSM_transaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Review magement
      .addCase(HSM_review.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_review.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_review = action.payload;
      })
      .addCase(HSM_review.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM HElp desk
      .addCase(HSM_helpdesk.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_helpdesk.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_helpdesk = action.payload;
      })
      .addCase(HSM_helpdesk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM all members
      .addCase(MPM_allmembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_allmembers.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_allmembers = action.payload;
      })
      .addCase(MPM_allmembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM suspended Users
      .addCase(MPM_suspended.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_suspended.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_suspended = action.payload;
      })
      .addCase(MPM_suspended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM category
      .addCase(MPM_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_category.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_category = action.payload;
      })
      .addCase(MPM_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM Listing
      .addCase(MPM_listing.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_listing.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_listing = action.payload;
      })
      .addCase(MPM_listing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM All chats
      .addCase(MPM_allchats.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_allchats.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_allchats = action.payload;
      })
      .addCase(MPM_allchats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM review
      .addCase(MPM_review.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_review.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_review = action.payload;
      })
      .addCase(MPM_review.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Permission and role management
      .addCase(RoleManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(RoleManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(RoleManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM category
      .addCase(HSM_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_category.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_category = action.payload;
      })
      .addCase(HSM_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Delete Category
      .addCase(DeleteCategoryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteCategoryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteCategoryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

  },
});

export default userDetails.reducer;
