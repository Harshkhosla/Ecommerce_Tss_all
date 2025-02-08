import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import tssurl from "../port";

export const fetchFooterData = createAsyncThunk("app/fetchFooter", async () => {
  const response = await axios.get(`${tssurl}/footer`);
  return response.data;
});


export const fetchHomeData = createAsyncThunk("app/fetchHome", async () => {
  const response = await axios.get(`${tssurl}/home`);
  return response.data;
});

export const fetchProductData = createAsyncThunk("app/fetchProducts", async () => {
  const response = await axios.get(`${tssurl}/top3products`);
  return response.data;
});

export const fetchBannersData = createAsyncThunk("app/fetchBanners", async () => {
  const response = await axios.get(`${tssurl}/banners`);
  return response.data.banners;
});

export const fetchallproductData = createAsyncThunk("app/fetchallproductData", async () => {
  const response = await axios.get(`${tssurl}/productcat/products`);
  const filteredData = response?.data?.filter(item => item.draft === "false");
  return filteredData;
});


const appSlice = createSlice({
  name: "app",
  initialState: {
    user: [],
    status: "idle",
    error: null,
    unit_price: 0,
    bag_discount: 0,
    cartItems: [],
    quantity: 0,
    productDataMap: {},
    footer:{},
    homeData: {},
    productData: {},
    banners:[],
    allproductdata:[],
    statusproducts: {
      footer: "idle",
      home: "idle",
      product: "idle",
      cart: "idle",
    },
  },
  reducers: {
    updateQuantityInCart: (state, action) => {
      const { index, quantity } = action.payload;
      state.cartItems[0][index].Quantity = quantity;
    },
    increaseQuantity: (state) => {
      state.quantity = Math.min(10, state.quantity + 1); 
    },
    decreaseQuantity: (state) => {
      state.quantity = Math.max(1, state.quantity - 1); 
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeCartItem: (state, action) => {
      const { pid } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.pid !== pid);
    },
    setProductData: (state, action) => {
      const { pid, data } = action.payload;
      const limitedData = {
        colors: data.colors,
        discount: data.discount,
        discount_date: data.discount_date,
        discount_type: data.discount_type,
        pid,
        product_name: data.product_name,
        quantity_pi: data.quantity_pi,
        size: data.size,
        unit_price: data.unit_price,
        variantEnabled: data.variantEnabled,
        variants: data.variants,
      };
      state.productDataMap[pid] = limitedData;
    },
    updateProductQuantity(state, action) {
      const { pid, Quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.pid === pid ? { ...item, Quantity } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFooterData.pending, (state) => { state.statusproducts.footer = "loading"; })
    .addCase(fetchFooterData.fulfilled, (state, action) => {
      state.statusproducts.footer = "succeeded";
      state.footerData = action.payload;
    })
    .addCase(fetchFooterData.rejected, (state) => { state.statusproducts.footer = "failed"; })

    .addCase(fetchHomeData.pending, (state) => { state.statusproducts.home = "loading"; })
    .addCase(fetchHomeData.fulfilled, (state, action) => {
      state.statusproducts.home = "succeeded";
      state.homeData = action.payload;
    })
    .addCase(fetchHomeData.rejected, (state) => { state.statusproducts.home = "failed"; })

    .addCase(fetchProductData.pending, (state) => { state.statusproducts.product = "loading"; })
    .addCase(fetchProductData.fulfilled, (state, action) => {
      state.statusproducts.product = "succeeded";
      state.productData = action.payload;
    })
    .addCase(fetchProductData.rejected, (state) => { state.statusproducts.product = "failed"; })

    .addCase(fetchBannersData.pending, (state) => { state.status = "loading"; })
    .addCase(fetchBannersData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.banners = action.payload;
    })
    .addCase(fetchBannersData.rejected, (state) => { state.status = "failed"; })

    .addCase(fetchallproductData.pending, (state) => { state.status = "loading"; })
    .addCase(fetchallproductData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.allproductdata = action.payload;
    })
    .addCase(fetchallproductData.rejected, (state) => { state.status = "failed"; })

  }
});

export const addToCartAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${tssurl}/cart/carts`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      const errorMessage = response.data
        ? response.data.error
        : "Unknown error";
      throw new Error(
        `Failed to add item to cart. Server response: ${errorMessage}`
      );
    }
    toast.success("Item added to cart successfully!");
    dispatch(addToCart(data));
    dispatch(updateProductQuantity(data));
  } catch (error) {
    console.error("Error adding to cart:", error.message);
  }
};

export const updateProductQuantityAsync =
  ({ data, mid }) =>
  async (dispatch) => {
    try {
      const requestData = { mid, ...data };

      const response = await axios.put(
        `${tssurl}/cart/carts/updateQuantity`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateProductQuantity(data)); 
      } else {
        const errorMessage = response.data
          ? response.data.error
          : "Unknown error";
        throw new Error(
          `Failed to update quantity. Server response: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

export const getCartItems = (mid) => async (dispatch) => {
  try {
    const res = await axios.get(`${tssurl}/auth/users/${mid}`);
    const cartItems = res.data?.user?.cart;
    dispatch(addToCart(cartItems)); 
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};
export const getProductDataByPID = (pid) => async (dispatch) => {
  try {
    const res = await axios.get(`${tssurl}/productDetails/${pid}`);
    const productData = res.data;
    dispatch(setProductData({ pid, data: productData })); 
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};
export const deleteFromCart = (mid, pid) => async (dispatch) => {
  dispatch(removeCartItem({ pid }));
  try {
    await axios.delete(`${tssurl}/cart/carts/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { mid, pid },
    });
    await dispatch(getCartItems(mid));
    toast.success("Item removed from cart");
    await window.location.reload();
  } catch (error) {
    dispatch(getCartItems(mid));
    console.error("Error deleting cart item:", error);
  }
};

export const selectBagTotal = createSelector(
  [(state) => state.Store.cartItems, (state) => state.Store.productDataMap],
  (cartItems, productDataMap) => {
    let bagTotal = 0;
    cartItems.forEach((item) => {
      const productData = productDataMap[item.pid];
      if (productData) {
        bagTotal += productData.unit_price * item.Quantity;
      }
    });
    return bagTotal;
  }
);

export const {
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  setProductData,
  removeCartItem,
  updateProductQuantity,
  updateQuantityInCart,
} = appSlice.actions;

export default appSlice.reducer;
