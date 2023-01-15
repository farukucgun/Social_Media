import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setTimedAlert } from "./alertSlice";

interface postInterface { 
    inCreatePage: boolean;
    // upvoted: boolean;
    // downvoted: boolean;
    loading: boolean;
    posts: {
        _id: string;
        // id: string;
        user: string;
        name: string;
        avatar: string;
        title: string;
        image: string;
        date: string;
        votes: {               
            upvotes: [          
                user: string    
            ],
            downvotes: [
                user: string
            ]
        },
        // also has comments
    }[];
}

const initialState: postInterface = {
    inCreatePage: false,
    // upvoted: false,
    // downvoted: false,
    loading: true,
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        changeInCreatePage: (state) => {
            return state = {
                ...state,
                inCreatePage: !state.inCreatePage,
                loading: false
            } 
        },
        fetchPosts: (state, action) => {
            return state = {
                ...state,
                posts: action.payload,
                loading: false
            }
        },
        createPost: (state, action) => {
            return state = {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            } 
        },
        deletePost: (state, action) => {
            return state = {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            }
        },
        upvotePost: (state, action) => {
            return state = {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? action.payload : post),
                loading: false
            }
        },
        downvotePost: (state, action) => {
            return state = {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? action.payload : post),
                loading: false
            }
        }
    }
});    

export const { changeInCreatePage, fetchPosts, createPost, deletePost, upvotePost, downvotePost } = postSlice.actions;

export const fetchPostsAsync = () => async (dispatch: any) => {
    await axios.get("http://localhost:5000/post")
    .then(data => {
        dispatch(fetchPosts(data.data));
    })
    .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
}

export const createPostAsync = (payload: {title: string, image: string}) => async (dispatch: any) => {

    const newPost = {
        title: payload.title,
        image: payload.image
    }
    
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    await axios.post("http://localhost:5000/post", newPost, config)
    .then(data => {
        dispatch(createPost(data.data));
    })
    .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
}

export const deletePostAsync = (id: string) => async (dispatch: any) => {
    await axios.delete(`http://localhost:5000/post/${id}`)
    .then(data => {
        dispatch(deletePost(id))
        dispatch(setTimedAlert({msg: "Post deleted", alertType: "success", timeout: 4000}));
        dispatch(fetchPostsAsync());
    })
    .catch(err => {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
}

export const upvotePostAsync = (id: string) => async (dispatch: any) => {
    await axios.put(`http://localhost:5000/post/upvote/${id}`)
    .then(data => {
        dispatch(upvotePost(data.data));
        dispatch(fetchPostsAsync());
    })
    .catch(err => {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
}

export const downvotePostAsync = (id: string) => async (dispatch: any) => {
    await axios.put(`http://localhost:5000/post/downvote/${id}`)
    .then(data => {
        dispatch(downvotePost(data.data));
        dispatch(fetchPostsAsync());
    })
    .catch(err => {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
}

export const selectPost = (state: any) => state.post;
export default postSlice.reducer;