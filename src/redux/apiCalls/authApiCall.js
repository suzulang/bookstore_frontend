import toast from "react-hot-toast";
import axios from "../../axios";
import { authActions } from "../slices/authSlice";

// login user
export function loginUser(email, password){
    return async (dispatch) => {
        try {
            const res = await axios.post('auth/login', {
                email,
                password
            })
            toast.success('Successfully login!')
            dispatch(authActions.login(res.data.user));
            localStorage.setItem('user', JSON.stringify(res.data.user))
            return true
        } catch (err) {
            err.response.data.data ? toast.error(err.response.data.data) : toast.error(err.message)
        }
    }
}
// logout user
export function logoutUser(){
   return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem('user')
    }
}

export function registerUser(user){
    return async (dispatch) => {
        try {
            const res = await axios.post('auth/register', user)
            toast.success('Successfully register!')
            dispatch(authActions.login(res.data.user));
            localStorage.setItem('user', JSON.stringify(res.data.user))
            return true
        } catch (err) {
            err.response.data.data ? toast.error(err.response.data.data) : toast.error(err.message)
        }
    }
}

export function refreshUser(user){
    return async (dispatch) => {
        try {
            dispatch(authActions.refresh(user));
            localStorage.setItem('user', JSON.stringify(user))
            return true
        } catch (err) {
            toast.error(err.message)
        }
    }
}
