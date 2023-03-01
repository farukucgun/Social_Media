import React from 'react';
import * as Bs from "react-icons/bs";
// import * as Fa from "react-icons/fa";   
import { useAppDispatch, useAppSelector } from '../../store';
import { deletePostAsync, upvotePostAsync, downvotePostAsync } from '../../features/postSlice';
import { getProfileAsync } from '../../features/profileSlice';
import PostContent from './PostContent';
// import Spinner from '../UI/Spinner';

import classes from "./Post.module.css";

interface postInterface {
    key: string;
    post: {
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
            upvotes: [user: string];
            downvotes: [user: string];
        };
    };
}

const Post = (props: postInterface) => {
    const dispatch = useAppDispatch();

    // const upvoted = useAppSelector(state => state.post.upvoted);
    // const downvoted = useAppSelector(state => state.post.downvoted);
    
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

    const profileHandler = async () => {
        dispatch(getProfileAsync(post.user));
    } 

    
    /**
     * TODO: display multiple videos
     * TODO: use cloudinary transformation api to display images in different sizes (don't request the whole image, efficiency) 
     * I could create an image schema and put that in the post model, and create a virtual for image thumbnail
     * TODO: make the posts fixed size and have the images scale to fit
     * TODO: make spinner for loading posts
     */

    const date = post.date.split("T")[0];
    const time = post.date.split("T")[1].split(".")[0];

    // if (useAppSelector(state => state.post.loading)) return Spinner;

    return (
        <li className={classes.post}>
            <div className={classes.post_top}> 
                <button className={classes.delete} onClick={deletePostHandler}>X</button>
                <p>{time}, {date}</p>
            </div>
            <div className={classes.main_content}>
                <div className={classes.user}>
                    <img src={post.avatar} alt="" className={classes.avatar}/>  
                    <h4 onClick={profileHandler}>{post.name}</h4>
                </div>
                <h5>{post.title}</h5>
                <PostContent images={post.images}/>
            </div>
            <div className={classes.sub_post}>
                <div className={classes.like_container}>
                    {/* {upvoted ? <Bs.BsArrowUpCircleFill onClick={upvoteHandler}/> : <Bs.BsArrowUpCircle onClick={upvoteHandler}/>}  */}
                    <Bs.BsArrowUpCircle onClick={upvoteHandler} className={classes.vote}/>
                    <p className={classes.likes}>{totalVotes}</p>
                    {/* {downvoted ? <Bs.BsArrowDownCircleFill onClick={downvoteHandler}/> : <Bs.BsArrowDownCircle onClick={downvoteHandler}/>} */}
                    <Bs.BsArrowDownCircle onClick={downvoteHandler} className={classes.vote}/>
                </div>
                <ul className={classes.comments}>
                    <li className={classes.comment} key={1}>
                        <b>Some guy:</b>
                        <p>Hey there fella!</p>
                    </li>
                    <li className={classes.comment} key={2}>
                        <b>Some other guy:</b>
                        <p>Great post!</p>
                    </li>
                </ul>
            </div>
        </li>
    );
}

export default Post;