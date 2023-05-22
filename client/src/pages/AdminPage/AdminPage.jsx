import React,{useEffect} from 'react';
import styles from "../MainPage/MainPage.module.css";
import Header from "../../componets/Header";
import {Link, Outlet, useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { loginIn, isAdmin } from "../../actions/user";
const AdminPage = () => {

    const { PUBLIC_URL } = process.env
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect( ()=>{
        const asyncFn = async () => {
            const isAdm =  await isAdmin();
            if (!isAdm) {

                navigate("/app");
            }
        };
        asyncFn();



    },[])

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
                    <button className={styles.logoutBotton} onClick={handleLogout}>Logout</button>

                </div>
                <div className={styles.page}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );

};

export default AdminPage;