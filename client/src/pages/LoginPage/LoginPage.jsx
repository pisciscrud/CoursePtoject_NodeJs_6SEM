//import { useForm } from "react-hook-form";
//import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import React , {useEffect,useState} from 'react'
import { loginIn, isAdmin } from "../../actions/user";
const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');



    const navigate=useNavigate();
    const handleSubmit = async (event) => {
        //event.preventDefault();
        await loginIn(login,password);
        const isAdm = await isAdmin()
        console.log(isAdm.data);
        if (isAdm.data) {
            navigate("/admin");
        }
        else {
          navigate("/home");
       }
        window.location.reload();

    }


    return (
        <div className={styles.fullScreenContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder='login' value={login}
                           onChange={(event) => setLogin(event.target.value)}/>
                    <input type="password" placeholder='password' value={password}
                           onChange={(event) => setPassword(event.target.value)}/>

                    <button className={styles.registerButton}
                            type="submit">Sign In
                    </button>
                    <a href='/'>Sign Up </a>
                </div>
            </form>
        </div>

    );
}

export default Login;