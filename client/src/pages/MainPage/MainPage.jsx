import React from 'react';
import styles from './MainPage.module.css'
import Header from "../../componets/Header";
import {Link, Outlet} from "react-router-dom";

const MainPage = () => {
    const { PUBLIC_URL } = process.env

    return (
        <div className={styles.fullScreenContainer}>
            <div className={styles.header}>
                <Header></Header>
            </div>
            <div className={styles.content}>
                <div className={styles.headerSecondary}>

                    <Link className={styles.loginLink} to="profile">
                        <img className={styles.icon} src={PUBLIC_URL + '/889.png'}/>
                        <span>Login</span>
                    </Link>

                </div>
                <div className={styles.page}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;