import React from 'react';
import { NavLink } from 'react-router-dom';
import * as MD from "react-icons/md";
import * as GR from "react-icons/gr";
import F_letter from "../../data/F_letter.jpg";
import { logout } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeInCreatePage } from '../../features/postSlice';

import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const createHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(changeInCreatePage());
  }

  const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(logout());
  }

  const authanticated = useAppSelector(state=>state.auth.isAuthenticated);

  return (
    <nav className={classes.sidebar}>
      <NavLink to="/" className={classes.navlink}><img src={F_letter} alt="" className={classes.brand_pic}/></NavLink>
      <NavLink to="/" className={classes.navlink}>SomeName</NavLink>
      <div className={classes.item}>
        <MD.MdHome/>
        <NavLink to="/" className={classes.navlink}>Home</NavLink>
      </div>
      <div className={classes.item}>
        {authanticated ? <MD.MdLogout/> : <MD.MdLogin/>}
        {authanticated ? 
        <NavLink to="/" className={classes.navlink} onClick={logoutHandler}>Logout</NavLink>
        : 
        <NavLink to="/login" className={classes.navlink}>Login</NavLink>}
      </div>
      <div className={classes.item}>
        <MD.MdSearch/>
        <NavLink to="/" className={classes.navlink}>Search</NavLink>
      </div>
      <div className={classes.item}>
        <MD.MdChat/>
        <NavLink to="/chat" className={classes.navlink}>Chat</NavLink>
      </div>
      <div className={classes.item}>
        <GR.GrAddCircle />
        <a href="/" className={classes.navlink} onClick={createHandler}>Create</a>
      </div>
      <div className={classes.item}>
        <img src={F_letter} alt="" className={classes.profile_pic}/>
        <NavLink to="/profile" className={classes.navlink}>Profile</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;