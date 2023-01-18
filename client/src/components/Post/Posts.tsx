import React, { useEffect } from 'react';
import { fetchPostsAsync } from '../../features/postSlice';
import Post from './Post';
import NewPost from '../Post/NewPost';
import { useAppSelector, useAppDispatch } from "../../store";

import classes from "./Posts.module.css";

const Posts = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, [dispatch]);     // it seems this is safe

    const inCreatePage = useAppSelector(state => state.post.inCreatePage);
    const posts = useAppSelector(state => state.post.posts);
    
    return (
        <div className={classes.feed}>
            {inCreatePage && <NewPost />}
            <ul className={classes.all_posts}>
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
}

export default Posts;