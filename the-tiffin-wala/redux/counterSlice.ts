import { tssurl } from "@/app/port";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store"; // Import RootState
import { toast } from "react-toastify";

interface CartItem {
  mid: string;
  pid: string;
  Quantity: number;
  name: string;
  price: number;
  image?: string;
}

interface ProductData {
    [pid: string]: any;
  }

interface CartState {
  items: CartItem[];
  productDataMap: ProductData;
  status: "idle" | "loading" | "failed";
}

const initialState: CartState = {
    items: [],
    productDataMap: {},
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
  async (data: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${tssurl}/cart/carts`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200) {
        toast.error(response.data.error);
        return rejectWithValue(response.data.error);
      }

      toast.success("Item added to cart successfully!");
      return data;
    } catch (error: any) {
      toast.error("Failed to add item to cart.");
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductQuantityAsync = createAsyncThunk(
    "cart/updateQuantity",
    async ({ data, mid }: { data: CartItem; mid: string }, { rejectWithValue }) => {
      try {
        const requestData = { mid, ...data };
        const response = await axios.put(
          `${tssurl}/cart/carts/updateQuantity`,
          requestData, 
          {
            headers: { "Content-Type": "application/json" },
          }
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
    if (state.counter.items.length > 0) {
      return state.counter.items; // Return cached data
    }
    try {
      const response = await axios.get(`${tssurl}/auth/users/${mid}`);
      return response.data.user?.cart; 
    } catch (error: any) {
      toast.error("Failed to fetch cart items.");
      return rejectWithValue(error.message);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.pid === action.payload.pid);
        if (index !== -1) {
          state.items[index].Quantity += action.payload.Quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload; 
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getProductDataByPID.fulfilled, (state, action) => {
        state.productDataMap = action.payload.data;
      })
  },
});

export const { addOrUpdateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
