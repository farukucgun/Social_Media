import React from 'react';
import { useAppSelector } from '../../store';

import classes from "./Profile.module.css";

const Profile = () => {
    const user = useAppSelector(state=>state.auth.user);

    const chatHandler = () => {
        console.log("chat");
    }

    return (
        <div>
            <img src={user?.avatar} alt="" className={classes.avatar}/>
            <h1>{user?.name}</h1>
            <h2>{user?.email}</h2>
            <button onClick={chatHandler}>click here to chat</button>
        </div>
    );
}

export default Profile;