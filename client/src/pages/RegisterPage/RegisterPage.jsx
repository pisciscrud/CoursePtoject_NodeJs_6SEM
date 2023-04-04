//import { useForm } from "react-hook-form";
//import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import React , {useEffect,useState} from 'react'
import {registeration} from "../../actions/user";

const Register = () => {
    const [FullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO Here you can add your login logic using the submitted username and password
    };

    return (
        <div className={styles.fullScreenContainer}>
        <form  className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder='FullName' value={FullName} onChange={(event) => setFullName(event.target.value)} />
              <input type="email" placeholder='email' value={email} onChange={(event) => setEmail(event.target.value)} />

            <input type="text" placeholder='login' value={login} onChange={(event) => setLogin(event.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)} />

            <button  className={styles.registerButton}  type="submit" onClick={()=>registeration(FullName,email,login,password)}>Register</button>
            <a href='/login'>Sign In</a>
            </div>
        </form>
        </div>
    );

}
export default Register;