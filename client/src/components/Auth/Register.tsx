import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from "./Register.module.css";

const Register = () => {

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
            console.log("passwords don't match");
        }

        else {
            const user = {
                name, 
                email,
                password
            }

            await axios.post('http://localhost:5000/user', user)
            .then((data) => {
                // ctx.onLogin(data.data.id);
                console.log("logged in")
                console.log(data.data);
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data.error)
            });
            
            setName('');
            setEmail('');
            setPassword('');
            setPassword2('');
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
                        required
                    />
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
                        minLength={6}
                        onChange={passwordChangeHandler}
                        required
                    />
                    <input 
                        value={password2}
                        type="password" 
                        id="pass2" 
                        placeholder="Confirm Password"
                        minLength={6}
                        onChange={password2ChangeHandler}
                        required
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