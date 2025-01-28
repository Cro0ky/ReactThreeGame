import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventory/slice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});
