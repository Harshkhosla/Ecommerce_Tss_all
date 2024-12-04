// store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './counterSlice';

export default configureStore({
  reducer: {
    Store: appReducer,
  },
});
