import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import tssurl from "../port";

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
