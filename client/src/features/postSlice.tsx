import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setTimedAlert } from "./alertSlice";
import setAuthToken from "../utils/setAuthToken";

interface postInterface { 
    inCreatePage: boolean;
    loading: boolean;
    posts: {
        // upvoted: boolean;
        // downvoted: boolean;
        _id: string;
        user: string;
        name: string;
        avatar: string;
        title: string;
        images: [
            {
                url: string;
                filename: string;
            }
        ];
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
        changeIsLoading: (state, action) => {
            return state = {
                ...state,
                loading: action.payload 
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
        },
        addComment: (state, action) => {
            return state = {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? action.payload : post),
                loading: false
            }
        },
        deleteComment: (state, action) => {
            return state = {
                ...state,
                posts: state.posts.map(post => post._id === action.payload.id ? action.payload : post),
                loading: false
            }
        }
    }
});    

export const { changeInCreatePage, changeIsLoading, fetchPosts, createPost, deletePost, 
    upvotePost, downvotePost, addComment, deleteComment } = postSlice.actions;

export const fetchPostsAsync = () => async (dispatch: any) => {
    changeIsLoading(true);
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
    changeIsLoading(false);
}

/**
 * Not used at the moment 
 */
export const getSinglePostAsync = (id: string) => async (dispatch: any) => {
    changeIsLoading(true);
    await axios.get(`http://localhost:5000/post/${id}`)
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
    changeIsLoading(false);
}

export const createPostAsync = (payload: {title: string, image: any, imageLink: string}) => async (dispatch: any) => {
    changeIsLoading(true);
    const newPost = new FormData();
    for (let i = 0; i < payload.image.length; i++) {
        newPost.append("image", payload.image[i]);
    }
    newPost.append("title", payload.title);
    newPost.append("imageLink", payload.imageLink);

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    await axios.post("http://localhost:5000/post", newPost, config)
    .then(data => {
        dispatch(createPost(data.data));
        dispatch(setTimedAlert({msg: "Post created", alertType: "success", timeout: 4000}));
    })
    .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
    changeIsLoading(false);
}

export const deletePostAsync = (id: string) => async (dispatch: any) => {
    changeIsLoading(true);
    await axios.delete(`http://localhost:5000/post/${id}`)
    .then(data => {
        dispatch(deletePost(id))
        dispatch(setTimedAlert({msg: "Post deleted", alertType: "success", timeout: 4000}));
    })
    .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => {
                dispatch(setTimedAlert({msg: error.msg, alertType: "danger", timeout: 4000}));
            });
        }
    })
    changeIsLoading(false);
}

export const upvotePostAsync = (id: string) => async (dispatch: any) => {
    changeIsLoading(true);
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
    changeIsLoading(false);
}

export const downvotePostAsync = (id: string) => async (dispatch: any) => {
    changeIsLoading(true);
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
    changeIsLoading(false);
}

export const addCommentAsync = (id: string, text: string) => async (dispatch: any) => {
    changeIsLoading(true);
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    const body  = {
        text: text
    }

    await axios.post(`http://localhost:5000/post/comment/${id}`, body, config)
    .then(data => {
        dispatch(addComment(data.data));
        // dispatch(fetchPostsAsync());
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
    changeIsLoading(false);
}

export const deleteCommentAsync = (id: string, commentId: string) => async (dispatch: any) => {
    changeIsLoading(true);
    await axios.delete(`http://localhost:5000/post/comment/${id}/${commentId}`)
    .then(data => {
        dispatch(deleteComment(data.data));
        // dispatch(fetchPostsAsync());
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
    changeIsLoading(false);
}

export const selectPost = (state: any) => state.post;
export default postSlice.reducer;