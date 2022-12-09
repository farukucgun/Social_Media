import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import classes from "./Navbar.module.css";
import * as MD from "react-icons/md";
import * as GR from "react-icons/gr";
import F_letter from "../../data/F_letter.jpg";
import CreatePostContext from '../../context/CreatePostContext';

const Navbar = () => {

  const CreatePostCtx = useContext(CreatePostContext);

  const createHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    CreatePostCtx.changeInCreatePage();
  }

  return (
    <nav className={classes.sidebar}>
      <NavLink to="/" className={classes.navlink}><img src={F_letter} alt="" className={classes.brand_pic}/></NavLink>
      <NavLink to="/" className={classes.navlink}>SomeName</NavLink>
      <div className={classes.item}>
        <MD.MdHome/>
        <NavLink to="/" className={classes.navlink}>Home</NavLink>
      </div>
      <div className={classes.item}>
        <MD.MdSearch/>
        <a href="/" className={classes.navlink}>Search</a>
        {/* <NavLink to="/search" className={classes.navlink}>Search</NavLink> */}
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