import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../features/authSlice';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUser } from '../../features/authSlice';

import classes from "./Login.module.css";

/**
 * TODO: consider the errors and reset input fields accordingly
 * TODO: consider the loading state and show a spinner
 * TODO: consider the isAuthenticated state and redirect to home page
 */

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(loginUser({email, password}))
        .then(() => {
            setEmail('');
            setPassword('');
            // isAuthenticated ? navigate("/") : navigate("/login"); // this is not working
            // console.log(isAuthenticated); 
            navigate("/");
        })
    }

    return (
        <div className={classes.login_container}>
            <h1>Sign In</h1>
            <h3>Sign Into Your Account</h3>
            <form action="" onSubmit={submitHandler} className={classes.login_form}>
                <input
                    value={email} 
                    type="text" 
                    id="email"
                    placeholder="Email Adress"
                    onChange={emailChangeHandler}
                    className={classes.input}
                />
                <input 
                    value={password}
                    type="password" 
                    id="pass" 
                    placeholder="Password"
                    onChange={passwordChangeHandler}
                    className={classes.input}
                />  
                <button type='submit' className={classes.submit}>Login</button>
                <p>
                    Don't have an account? 
                    <button className={classes.signup_outer}><Link className={classes.signup_inner} to='/register'>Sign Up</Link></button>
                </p>
            </form>
        </div>    
    );
}

export default Login;