import React from 'react';
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import image from "../../data/home_background.jpg";

const Home = () => {
    return (
        <div className={classes.home}>
            <h2 className={classes.title}>Social Media</h2>
            <img className={classes.home_image} src={image} alt="" />
            <Link className={classes.login_outer} to='/login'><button className={classes.login_inner} >Login Now</button></Link>
        </div> 
    );
}

export default Home;