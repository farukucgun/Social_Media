import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface AlertInterface {
    alerts: {
        id: string;
        msg: string;
        alertType: string;
    }[];
}    

const initialState: AlertInterface = {
    alerts: []
};

const alertSlice = createSlice({
    name: "alert",
    initialState: initialState,
    reducers: {
        setAlert: (state, action) => {
            const { msg, alertType, id } = action.payload;
            void state.alerts.push({id, msg, alertType});
        },
        removeAlert: (state, action) => {
            const { id } = action.payload;
            state.alerts = state.alerts.filter((alert) => alert.id !== id);
        }
    }    
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const setTimedAlert = (payload: {msg: string, alertType: string, timeout: number}) => (dispatch: any) => {
    const { msg, alertType, timeout } = payload;
    const id = uuidv4();
    dispatch(setAlert({msg, alertType, id}));
    setTimeout(() => dispatch(removeAlert({id})), timeout);
}

export const selectAlert = (state: any) => state.alert;
export default alertSlice.reducer;
