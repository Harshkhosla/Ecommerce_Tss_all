// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// //create action

// export const createNewPage = createAsyncThunk("createNewPage", async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         method: "post",
//         url: "/createpage/",
//         data:  formData,
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
//       });
//       console.log(...formData)
//       console.log(response)
//       return response.data;
//     } catch (error) {
//         console.log("Not submitting data");
//       return rejectWithValue(error.response.data);
//     }
//   });


// export const getPage = createAsyncThunk("getPage", async ({ rejectWithValue }) => {
//     try {
//       const response = await axios.get("API_CALL").json();
//     //   console.log(formData)
//       return response.data;
//     } catch (error) {
//         console.log("Not submitting data");
//       return rejectWithValue(error.response.data);
//     }
//   });


// export const deletePage = createAsyncThunk("deletePage", async (value, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`API_CALL${value}`).json();
//     //   console.log(formData)
//       return response.data;
//     } catch (error) {
//         console.log("Not submitting data");
//       return rejectWithValue(error.response.data);
//     }
//   });


// export const updatePage = createAsyncThunk("updatePage", async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`API_CALL${formData.id}`, formData).json();
//     //   console.log(formData)
//       return response.data;
//     } catch (error) {
//         console.log("Not submitting data");
//       return rejectWithValue(error.response.data);
//     }
//   });


// export const pageDetails = createSlice({
//     name: "pageDetail",
//     initialState: {
//         pages: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {

//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createNewPage.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(createNewPage.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pages.push(action.payload);
//             })
//             .addCase(createNewPage.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })



//             .addCase(getPage.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(getPage.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pages = (action.payload);
//             })
//             .addCase(getPage.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })



//             .addCase(deletePage.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(deletePage.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const {value} = action.payload;

//                 // if(id){
//                 //   state.users = state.users.filter((ele)=>ele.id!==id);
//                 // }
//                 console.log("deleted", action.payload);
//             })
//             .addCase(deletePage.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })


//             .addCase(updatePage.pending, (state) => {
//               state.loading = true;
//             })
//             .addCase(updatePage.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pages = state.users.map((ele)=>
//                     ele.id===action.payload.id ? action.payload : ele
//                 )
//             })
//             .addCase(updatePage.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })
//     },
// })

// export default pageDetails.reducer;