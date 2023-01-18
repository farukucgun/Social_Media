import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../features/authSlice';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store';

import classes from "./Login.module.css";

/**
 * TODO: consider the errors and reset input fields accordingly
 * TODO: navigate to home or login depending on success
 */

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await dispatch(loginUser({email, password}));
        setEmail('');
        setPassword('');
        navigate("/");
    }

    return (
        <div className={classes.login_container}>
            <h1>Sign In</h1>
            <h3>Sign Into Your Account</h3>
            <form action="" onSubmit={submitHandler}>
                <div className={classes.inputs}>
                    <input
                        value={email} 
                        type="text" 
                        id="email"
                        placeholder="Email Adress"
                        onChange={emailChangeHandler}
                    />
                    <input 
                        value={password}
                        type="password" 
                        id="pass" 
                        placeholder="Password"
                        onChange={passwordChangeHandler}
                    />
                </div>    
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