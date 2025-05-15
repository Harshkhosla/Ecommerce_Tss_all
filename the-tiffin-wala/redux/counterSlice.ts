import { tssurl } from "@/app/port";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { toast } from "react-toastify";
import { ProductType } from "@/components/types";

interface CartItem {
  mid: string;
  pid: string;
  Quantity: number;
  name: string;
  price: number;
  image?: string;
  url?: string;
  _id: string;
}

interface ProductData {
  [pid: string]: ProductType;
}

interface CartState {
  items?: CartItem[];
  productDataMap?: ProductData;
  status?: "idle" | "loading" | "failed";
  bagTotal?:number;
  total?:number;
}


const initialState: CartState = {
  items: [],
  productDataMap: {},
  bagTotal:0,
  total:0,
  status: "idle",
};

export const getProductDataByPID = createAsyncThunk(
  "cart/getProductDataByPID",
  async (pid: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${tssurl}/productDetails/${pid}`);
      return { pid, data: response.data };
    } catch (error: any) {
      console.error("Error fetching product data:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async ({ mid, data }: { mid: string; data: CartItem }, { getState, dispatch, rejectWithValue }) => {
      try {
        const state: RootState = getState() as RootState;
         // @ts-expect-error sdsfwvfe
        const existingItem = state.counter.items.find((item: CartItem) => item.pid === data.pid);
     
        const pid = existingItem?.pid
        if (existingItem) {
          const newQuantity = existingItem.Quantity + data.Quantity;
          // @ts-expect-error dschsdvb
           dispatch(addQuantity({pid,newQuantity}))
          await dispatch(updateProductQuantityAsync({ data: { ...existingItem, Quantity: newQuantity }, mid })).unwrap();
          return { ...existingItem, Quantity: newQuantity }; 
        }
  
         // @ts-expect-error sdsfwvfe
        const response = await axios.post(`${tssurl}/cart/carts`, { mid, ...data }, {
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.status !== 200) {
          toast.error(response.data.error);
          return rejectWithValue(response.data.error);
        }
  
        toast.success("Item added to cart successfully!");
         // @ts-expect-error sdsfwvfe
        return { mid, ...data }; 
      } catch (error: any) {
        toast.error("Failed to add item to cart.");
        return rejectWithValue(error.message);
      }
    }
  );
  
  

export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ data, mid }: { data: CartItem; mid: string }, { rejectWithValue }) => {
    try { // @ts-expect-error sdsfwvfe
      const requestData = { mid, ...data };
      const response = await axios.put(
        `${tssurl}/cart/carts/updateQuantity`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status !== 200) {
        toast.error(response.data.error);
        return rejectWithValue(response.data.error);
      }

      toast.success("Cart quantity updated successfully!");
      return data;
      
    } catch (error: any) {
      toast.error("Failed to update cart quantity.");
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItemsAsync = createAsyncThunk(
  "cart/getCartItems",
  async (mid: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
     // @ts-expect-error sdsfwvfe
    if (state.counter.items.length > 0) {
      return state.counter.items; 
    }
    try {
      const response = await axios.get(`${tssurl}/auth/users/${mid}`);
      return response.data.user?.cart || []; 
    }  
    catch (error: any) { 
      toast.error("Failed to fetch cart items.");
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrUpdateCartItem: (state, action: PayloadAction<CartItem>) => {
       // @ts-expect-error sdsfwvfe
      const index = state.items.findIndex((item) => item.pid === action.payload.pid);
      if (index !== -1) {
         // @ts-expect-error sdsfwvfe
        state.items[index].Quantity += action.payload.Quantity;
      } else {
         // @ts-expect-error sdsfwvfe
        state.items.push(action.payload);
      }
    },
    setCartData: (state, action: PayloadAction<CartState>) => {
      // state.cartItems = action.payload.cartItems;
      state.bagTotal = action.payload.bagTotal;
      state.total = action.payload.total;
    },

    addQuantity: (state, action: PayloadAction<{ pid: string; newQuantity: number }>) => {
      // @ts-expect-error sdsfwvfe
      const item = state?.items.find((item) => item.pid === action.payload.pid);
      if (item) {
        item.Quantity = action.payload.newQuantity;
      }
      // @ts-expect-error sdsfwvfe
      state.bagTotal = state?.items.reduce((total, item) => total + item.Quantity, 0);
      // @ts-expect-error sdsfwvfe
      state.total = state?.items.reduce((total, item) => total + item.Quantity * item.price, 0);
    },
    decreaseQuantity: (state, action: PayloadAction<{ pid: string; newQuantity: number }>) => {
      // @ts-expect-error sdsfwvfe
      const item = state?.items.find((item) => item.pid === action.payload.pid);
      if(item && item.Quantity == 1) {
        item.Quantity = 0;
         // @ts-expect-error sdsfwvfe
        state.items = state.items.filter((item) => item.Quantity > 0);
      }
      if (item) {
        item.Quantity = action.payload.newQuantity;
      }
      // @ts-expect-error sdsfwvfe
      state.bagTotal = state?.items.reduce((total, item) => total - item.Quantity, 0);
      // @ts-expect-error sdsfwvfe
      state.total = state?.items.reduce((total, item) => total - item.Quantity * item.price, 0);
    },
    clearCartData: (state) => {
      // state.cartItems = [];
      state.bagTotal = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
         // @ts-expect-error sdsfwvfe
        const index = state.items.findIndex((item) => item.pid === action.payload.pid);
        if (index !== -1) {
           // @ts-expect-error sdsfwvfe
          state.items[index].Quantity = action.payload.Quantity;
        } else {
           // @ts-expect-error sdsfwvfe
          state.items.push(action.payload);
        }
      })
      // ✅ Fetch Cart Items
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload || state.items;
      })
      // ✅ Fetch Product Data
      .addCase(getProductDataByPID.fulfilled, (state, action) => {
         // @ts-expect-error sdsfwvfe
        state.productDataMap[action.payload.pid] = action.payload.data; 
      })
      // ✅ Handle Errors
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// ✅ Export Actions & Reducer
export const { addOrUpdateCartItem ,decreaseQuantity, addQuantity ,setCartData } = cartSlice.actions;
export default cartSlice.reducer;
