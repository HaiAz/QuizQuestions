import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: 0,
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setPageLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setPageLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
