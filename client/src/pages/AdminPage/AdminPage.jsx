import React from 'react';
import styles from "../MainPage/MainPage.module.css";
import Header from "../../componets/Header";
import {Link, Outlet} from "react-router-dom";

const AdminPage = () => {

    const { PUBLIC_URL } = process.env

    return (
        <div className={styles.fullScreenContainer}>
            <div className={styles.header}>
                <Header></Header>
            </div>
            <div className={styles.content}>
                <div className={styles.headerSecondary}>

                    <Link className={styles.loginLink} to="panel">
                        <img className={styles.icon} src={PUBLIC_URL + '/889.png'}/>
                        <span>Admin panel</span>
                    </Link>

                </div>
                <div className={styles.page}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );

};

export default AdminPage;