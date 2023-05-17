import { createSlice } from "@reduxjs/toolkit";

//giá trị khởi tạo
const initialState = {
    auth: { isLogin: false },
    user: {
        uid: null,
        displayName: null,
        email: null,
        photoURL: null,
    },
    description: {
        des: "Make each day a little better than before",
    },
};

//tạo authSlice
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
        setDescription: (state, action) => {
            state.description = action.payload;
        },
    },
});

export const { setAuth, setUser, setDescription } = authSlice.actions;
export default authSlice.reducer;
