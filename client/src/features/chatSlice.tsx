import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setTimedAlert } from "./alertSlice";

interface chatInterface {
    loading: boolean;
    chats:{
        id: string;
        user: string;
    }[];
}

const initialState: chatInterface = {
    loading: true,
    chats: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        fetchChats: (state, action) => {
            return state = {
                ...state,
                chats: action.payload,
                loading: false
            }
        },
        addChat: (state, action) => {
            return state = {
                ...state,
                chats: [...state.chats, action.payload]
            }
        },
        removeChat: (state, action) => {
            return state = {
                ...state,
                chats: state.chats.filter(chat => chat.id !== action.payload)
            }
        }
    }
});

export const { fetchChats, addChat, removeChat } = chatSlice.actions;

export const fetchChatsAsync = () => async (dispatch: any) => {
    try {
        const res = await axios.get("/api/chats");
        dispatch(fetchChats(res.data));
    } catch (err) {
        console.log(err);
    }
}