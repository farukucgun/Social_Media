import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Posts from '../src/components/Post/Posts';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chats from './components/Chat/Chats';
import Profile from './components/Profile/Profile';
import Alert from './UI/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser, logout } from './features/authSlice';
import { useAppSelector, useAppDispatch } from './store';
import NewPost from './components/Post/NewPost';

import classes from "./App.module.css";

/**
 * categories on the right, easy access to saved posts
 * 
 * <-- Implement -->
 * TODO: add a chat feature
 * TODO: add a profile page
 * TODO: add a search feature
 * TODO: add a saved posts feature
 * 
 * <-- Issues -->
 * TODO: isAuthenticated isn't updated when navigating (Login, Register)
 * 
 * <-- Nice to have -->
 * TODO: redesign using material ui and bootstrap
 * TODO: add a loading spinner
 * TODO: display different icons when upvoted, downvoted, or neither (Post)
 * 
 * <-- Started -->
 * Todo: custom hook for http requests (there's a lot of repetition)
 * 
 */

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
    else {
      dispatch(logout());
    }
  }, [dispatch]);

  const inCreatePage = useAppSelector(state => state.post.inCreatePage);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
      <div>
        <div className={classes.nav}>
          <Navbar />
        </div>
        <main>
          <Alert />
          {inCreatePage && <NewPost />}
          <Routes>
            <Route path="/" element={isAuthenticated ? <Posts /> : <Home />}/>
            <Route path="/feed" element={<Posts />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/chats" element={<Chats />}/>
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </main>
      </div>
  );
}

export default App;
