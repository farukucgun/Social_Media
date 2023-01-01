import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store';
import { setTimedAlert } from '../../features/alertSlice';
import { registerUser } from '../../features/authSlice';

import classes from "./Register.module.css";

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }

    const password2ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword2(event.target.value); }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== password2){
            dispatch(setTimedAlert({msg: "passwords don't match", alertType: "danger", timeout: 4000}));
        }

        else {
            dispatch(registerUser({name, email, password}));
            
            setName('');
            setEmail('');
            setPassword('');
            setPassword2('');
            // navigate("/");
        }
    }

    return (
        <div className={classes.register_container}>
            <h1>Sign Up</h1>
            <h3>Create Your Account</h3>
            <form action="" onSubmit={submitHandler} className={classes.register_form}>
                <div className={classes.inputs}>
                    <input
                        value={name} 
                        type="text" 
                        id="name"
                        placeholder="Name"
                        onChange={nameChangeHandler}
                    />
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
                    <input 
                        value={password2}
                        type="password" 
                        id="pass2" 
                        placeholder="Confirm Password"
                        onChange={password2ChangeHandler}
                    />
                </div>
                <button type='submit' className={classes.submit}>Register</button>
                <p>
                    Already have an account? 
                <button className={classes.signup_outer}><Link className={classes.signup_inner} to='/login'>Sign In</Link></button>
                </p>
            </form>
        </div>
    );
}

export default Register;