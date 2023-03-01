import React, { useEffect } from 'react';
import { fetchPostsAsync } from '../../features/postSlice';
import Post from './Post';
import { useAppSelector, useAppDispatch } from "../../store";

import classes from "./Posts.module.css";

const Posts = () => {

    console.log("Posts.tsx rendered"); // gets rendered three times on page load

    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, [dispatch]);
    
    return (
        <div className={classes.feed}>
            <ul className={classes.all_posts}>
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
}

export default Posts;