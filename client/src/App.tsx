/**
 * categories on the right, easy access to saved posts 
 */

import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Posts from '../src/components/Post/Posts';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import Alert from './UI/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './features/authSlice';
import { useAppSelector, useAppDispatch } from './store';

import classes from "./App.module.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
  }, []);

  return (
      <div>
        <div className={classes.nav}>
          <Navbar />
        </div>
        <main>
          <Alert />
          <Routes>
            <Route path="/" element={useAppSelector(state=>state.auth.isAuthenticated) ? <Posts /> : <Home />}/>
            {/* <Route path="/" element={<Home />}/> */}
            <Route path="/feed" element={<Posts />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </main>
      </div>
  );
}

export default App;
