import React from 'react';
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";   
import { useAppDispatch } from '../../store';
import { deletePostAsync, upvotePostAsync, downvotePostAsync } from '../../features/postSlice';

import classes from "./Post.module.css";

interface postInterface {
    key: string;
    post: {
        _id: string;
        user: string;
        name: string;
        avatar: string;
        title: string;
        image: string;
        date: string;
        votes: {
            upvotes: [user: string];
            downvotes: [user: string];
        };
    };
}

const Post = (props: postInterface) => {
    const dispatch = useAppDispatch();
    
    const { post } = props;
    const totalVotes = post.votes.upvotes.length - post.votes.downvotes.length;

    const deletePostHandler = async () => {
        dispatch(deletePostAsync(post._id));
    }

    const upvoteHandler = async () => {
        dispatch(upvotePostAsync(post._id));
    }

    const downvoteHandler = async () => {
        dispatch(downvotePostAsync(post._id));
    }
    
    return (
        <li className={classes.post}>
            <button className={classes.delete} onClick={deletePostHandler}>X</button>
            <h4>{post.name}</h4>
            <h5>{post.title}</h5>
            <img src={post.image} alt="" className={classes.post_content}/>
            <div className={classes.like_container}>
                <Bs.BsArrowUpCircle onClick={upvoteHandler}/> 
                {/* <Bs.BsArrowUpCircleFill /> */}
                <p className={classes.likes}>{totalVotes}</p>
                <Bs.BsArrowDownCircle onClick={downvoteHandler}/>
                {/* <Bs.BsArrowDownCircleFill /> */}
                <Fa.FaRegComment />
            </div>
        </li>
    );
}

export default Post;