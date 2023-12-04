import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

(() => {
    let oldUser = JSON.parse(localStorage.getItem('user'));
    if (oldUser) {
        let token = jwt_decode(oldUser.token);
        let time = new Date(token.exp * 1000) < new Date();
        if (time) {
            localStorage.removeItem('user')
        }
    }
})();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    reducers: {
        login(state, action){
            state.user = action.payload;
        },
        logout(state, action){
            state.user = null;
        },
        register(state, action) {
            state.user = action.payload;
        },
        refresh(state, action) {
            state.user = action.payload;
        }
    }
})

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export {authReducer, authActions};