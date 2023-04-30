import React from 'react';
import styles from './MainPage.module.css'
import Header from "../../componets/Header";
import {Link, Outlet} from "react-router-dom";
import { useNavigate} from "react-router-dom";
const MainPage = () => {
    const { PUBLIC_URL } = process.env
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={styles.fullScreenContainer}>
            <div className={styles.header}>
                <Header></Header>
            </div>
            <div className={styles.content}>
                <div className={styles.headerSecondary}>

              
                    <Link className={styles.loginLink} to="profile">
                        <img className={styles.icon} src={PUBLIC_URL + '/889.png'}/>
                        <span> Profile </span>
                    </Link>
                    <button className={styles.logoutBotton} onClick={handleLogout}>Logout</button> 
                </div>
                <div className={styles.page}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;