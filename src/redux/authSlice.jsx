import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: { isLogin: false },
    user: {
        uid: null,
        displayName: null,
        // firstName: null,
        // lastName: null,
        email: null,
        avaURL: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
