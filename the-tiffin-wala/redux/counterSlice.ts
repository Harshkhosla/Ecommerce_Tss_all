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

// ✅ Fetch Product Details
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
        const existingItem = state.counter.items.find((item: CartItem) => item.pid === data.pid);
  
        if (existingItem) {
          // If item exists, increase the quantity in the backend and update the state
          const updatedQuantity = existingItem.Quantity + data.Quantity;
          await dispatch(updateProductQuantityAsync({ data: { ...existingItem, Quantity: updatedQuantity }, mid })).unwrap();
          return { ...existingItem, Quantity: updatedQuantity }; // Return updated item
        }
  
        // If item does not exist, add to cart in backend
        const response = await axios.post(`${tssurl}/cart/carts`, { mid, ...data }, {
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.status !== 200) {
          toast.error(response.data.error);
          return rejectWithValue(response.data.error);
        }
  
        toast.success("Item added to cart successfully!");
        return { mid, ...data }; // Ensure mid is returned for state updates
      } catch (error: any) {
        toast.error("Failed to add item to cart.");
        return rejectWithValue(error.message);
      }
    }
  );
  
  

// ✅ Update Product Quantity
export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ data, mid }: { data: CartItem; mid: string }, { rejectWithValue }) => {
    try {
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

// ✅ Fetch Cart Items
export const getCartItemsAsync = createAsyncThunk(
  "cart/getCartItems",
  async (mid: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (state.counter.items.length > 0) {
      return state.counter.items; // Return cached data
    }
    try {
      const response = await axios.get(`${tssurl}/auth/users/${mid}`);
      return response.data.user?.cart || []; // Ensure default array
    } catch (error: any) {
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
      const index = state.items.findIndex((item) => item.pid === action.payload.pid);
      if (index !== -1) {
        state.items[index].Quantity += action.payload.Quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    setCartData: (state, action: PayloadAction<CartState>) => {
      // state.cartItems = action.payload.cartItems;
      state.bagTotal = action.payload.bagTotal;
      state.total = action.payload.total;
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
        const index = state.items.findIndex((item) => item.pid === action.payload.pid);
        if (index !== -1) {
          state.items[index].Quantity = action.payload.Quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      // ✅ Fetch Cart Items
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload || state.items;
      })
      // ✅ Fetch Product Data
      .addCase(getProductDataByPID.fulfilled, (state, action) => {
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
export const { addOrUpdateCartItem , setCartData } = cartSlice.actions;
export default cartSlice.reducer;
