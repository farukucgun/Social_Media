/**
 * Navbar on the left, posts in the middle, categories on the right
 * easy access to saved posts 
 * 
 * on top of posts --> create post (here or at the profile side)
 * on top of posts --> sort the posts
 * 
 * chat section, share posts, create groups
 */

import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Posts from '../src/components/Post/Posts';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import { CreatePostContextProvider } from './context/CreatePostContext';
// import Search from "./pages/Search";
// import Create from './pages/Create';

import classes from "./App.module.css";


function App() {
  return (
    <CreatePostContextProvider>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/feed" element={<Posts />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </main>
    </CreatePostContextProvider>
  );
}

export default App;
