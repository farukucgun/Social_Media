import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setTimedAlert } from "./alertSlice";
import setAuthToken from "../utils/setAuthToken";

interface authInterface { 
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    user: {
        name: string;
        email: string;
        avatar: string;
    }
}

const initialState: authInterface = {
    token: localStorage.getItem("token") || "",
    isAuthenticated: false, 
    loading: true,
    user: {name: "", email: "", avatar: ""}
 };

 const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loadUserInfo: (state, action) => {
            return state = {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    avatar: action.payload.avatar
                }
            }   
        },
        register: (state, action: PayloadAction<authInterface>) => {
            localStorage.setItem("token", action.payload.token);
            return state = {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        },
        login: (state, action: PayloadAction<authInterface>) => {
            localStorage.setItem("token", action.payload.token);
            return state = {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        },
        logout: (state) => {
            localStorage.removeItem("token");
            return state = {
                ...state,
                token: "",
                isAuthenticated: false,
                loading: false,
                user: {name: "", email: "", avatar: ""}
            }
        }
    }
});
           
export const { loadUserInfo, register, login, logout } = authSlice.actions;

export const loadUser = () => async (dispatch: any) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    await axios.get("http://localhost:5000/auth")
        .then((res) => {
            dispatch(loadUserInfo(res.data.data));
        })
        .catch((err: any) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error: any) => {
                    dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
                });
            }
            dispatch(logout());
        });
}

export const loginUser = (payload: {email: string, password: string}) => async (dispatch: any) => {
    const { email, password } = payload;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = {email, password};

    await axios.post("http://localhost:5000/auth", body, config)
        .then((res) => {
            dispatch(login(res.data));
            dispatch(loadUser());
        })
        .catch((err: any) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error: any) => {
                    dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
                });
            }
            dispatch(logout());
        });
}

export const registerUser = (payload: {name: string, email: string, password: string}) => async (dispatch: any) => {
    const { name, email, password } = payload;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({name, email, password});

    await axios.post("http://localhost:5000/user", body, config)
        .then((res) => {
            dispatch(register(res.data));
            dispatch(loadUser());
        })
        .catch((err: any) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error: any) => {
                    dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
                });
            }
            dispatch(logout());
        });
}

export const selectUser = (state: any) => state.auth;
export default authSlice.reducer;
