import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    inCreatePage: false
}

const createPostSlice = createSlice({
    name: "createPost",
    initialState: initialState,
    reducers: {
        changeInCreatePage: (state) => {
            state.inCreatePage = !state.inCreatePage;
        }
    }
});

export const { changeInCreatePage } = createPostSlice.actions;
export default createPostSlice.reducer;