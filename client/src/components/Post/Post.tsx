import React from 'react';
import classes from "./Post.module.css";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";   

interface PostInterface {
    user: string;
    image: string;
    vote: number;
    id: string;
    title: string;
}

const Post = (props: PostInterface) => {
    return (
        <li className={classes.post}>
            <h4>{props.user}</h4>
            <h5>{props.title}</h5>
            <img src={props.image} alt="" className={classes.post_content}/>
            <div className={classes.like_container}>
                <Bs.BsArrowUpCircle />
                {/* <Bs.BsArrowUpCircleFill /> */}
                <p className={classes.likes}>{props.vote}</p>
                <Bs.BsArrowDownCircle />
                {/* <Bs.BsArrowDownCircleFill /> */}
                <Fa.FaRegComment />
            </div>
        </li>
    );
}

export default Post;