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
    const [FullNameError,setFullNameError]=useState(false)
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error,setError]=useState('');
   const [success,setSuccess]=useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (FullName.trim() === '' || email.trim() === '' || login.trim() === '' || password.trim() === '') {
            alert('Please fill all the fields');
            return;
        }

        if (FullName.length<5)
        {
            setFullNameError(true);
            return;
        }
        else 
        {
            setLoginError(false);
        }

        if (login.length < 5) {
            setLoginError(true);
            return;
        } else {
            setLoginError(false);
        }

        if (password.length < 5) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }
    
    const res = await  registeration(FullName,email,login,password)

    if (res &&  res.response && res.response.status === 400)
    {
        setSuccess('')
        setError(res.response.data.message)
    }
    else 
    {
        setError('')
        setSuccess(res)
    }


    };

    return (
        <div className={styles.fullScreenContainer}>
        <form  className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder='Surname Name' value={FullName} onChange={(event) => setFullName(event.target.value)} required pattern="^[A-Za-z]+\s+[A-Za-z]+$"
  title="Please enter your full name, with a space between your surname and first name. Only English letters are allowed."/>
              {FullNameError && <p style={{color:'red'}}>Fullname must have at least 5 characters</p>}
              <input type="email" placeholder='email' value={email} onChange={(event) => setEmail(event.target.value)}  required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  title="Please enter your email in correct format"/>

            <input type="text" placeholder='login' value={login} onChange={(event) => setLogin(event.target.value)}  required />
                {loginError && <p style={{color:'red'}}>Username must have at least 5 characters</p>}
            <input type="password" placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)} required />
                {passwordError && <p style={{color:'red'}}>Password must have at least 5 characters</p>}

            <button  className={styles.registerButton}  type="submit" >Register</button>
            <a href='/login'>Sign In</a>
            <div>
            {error && <p style={{color:'red'}}>{error}</p>}
            </div>
            <div>
            {success&& <p style={{color:'greenyellow'}}>{success}</p>}
            </div>
            </div>
              
        </form>
        </div>
    );

}
export default Register;