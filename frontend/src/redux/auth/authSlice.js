import { createSlice } from "@reduxjs/toolkit";
import { loginUserTokenKey, loginUserInfoKey } from "../../localStorageKeys/index";

const authSlice = createSlice({
    name: "auth slice",
    initialState: {
        user: JSON.parse(localStorage.getItem(loginUserInfoKey)) ?? {},
        token: localStorage.getItem(loginUserTokenKey) ?? null
    },
    reducers: {
        logoutUser: (state, action) => {
            localStorage.removeItem(loginUserTokenKey);
            localStorage.removeItem(loginUserInfoKey);

            state.user = {};
            state.token = null;
        },
        loginUser: (state, { payload }) => {
            state.token = payload.token;
            state.user = payload.user;
        }
    }
});

export const { logoutUser, loginUser } = authSlice.actions;
export default authSlice.reducer;