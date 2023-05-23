import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice,
        loadingSlice: loadingSlice,
    },
});
