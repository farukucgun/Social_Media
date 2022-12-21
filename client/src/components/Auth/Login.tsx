import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from "./Login.module.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user = {
            email,
            password
        }

        await axios.post('http://localhost:5000/auth', user)
            .then((data) => {
                // ctx.onLogin(data.data.id);
                console.log("logged in")
                console.log(data.data);
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data.error)
            });
            
            setEmail('');
            setPassword('');
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
                        required
                    />
                    <input 
                        value={password}
                        type="password" 
                        id="pass" 
                        placeholder="Password"
                        onChange={passwordChangeHandler}
                        required
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