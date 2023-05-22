//import { useForm } from "react-hook-form";
//import AuthenticationService from "../../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import React , {useEffect,useState} from 'react'
import { loginIn, isAdmin } from "../../actions/user";
const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');


    const navigate=useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (login.length < 5 || password.length < 5) {
            setError('Username and password must be at least 5 characters long');
            return;
          }

      const res =   await loginIn(login,password);
      if (res && res.response)
      {
          setError(res.response.data.message);
      }
        
      else
       {
        const isAdm = await isAdmin()
        if (isAdm) {
            navigate("/admin");
        }
        else {
          navigate("/app");
       }
        window.location.reload();
    }
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
                   <div className={styles.signup}> <a href='/'>Sign Up </a></div>
                </div>
                <div>
                    {error && <p style={{color:'red'}}>{error}</p>}
                </div>
            </form>
        </div>

    );
}

export default Login;