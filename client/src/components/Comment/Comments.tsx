import React from "react";

import classes from "./Comments.module.css";

const Comments = () => {
    return (
        <div>
            <h1>Comments</h1>
            <ul>
                <img src="" alt="" className={classes.avatar}/>
                <h4>"username"</h4>
                <p>"comment"</p>
            </ul>
        </div>
    );
};

export default Comments;