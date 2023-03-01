import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { setTimedAlert } from "./alertSlice";

const initialState = {
    value: 0,
    status: 'idle',
};

const profileSLice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfile: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getProfileAsync = (name: String) => async (dispatch : any) => {
    await axios.get(`http://localhost:5000/profile/${name}`)
    .then(data => { 
        dispatch(getProfile(data.data));
    })
    .catch(err => {
        dispatch(setTimedAlert({msg: err.msg, alertType: "danger", timeout: 4000}));
    })
}

export const {getProfile} = profileSLice.actions;

export default profileSLice.reducer;