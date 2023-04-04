import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import Pill from '../componets/Pill.jsx'
import styles from './main.module.css'
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };
    //const tags = ["Contacts","Master","Pets","Information];
    return (
        <div className={styles.header}>

            <div className={styles.container}>
            <a href="/procedures">
                <img src={process.env.PUBLIC_URL + '887.png'} className={styles.icon} width="100"
                                    height="100"/>
                <div className={styles.picon}>Procedures</div>
            </a>
        </div>

            <div className={styles.container}>
            <a href="/masters">
                <img src={process.env.PUBLIC_URL + '888.png'} className={styles.icon} width="100"
                                       height="100"/>
                <div className={styles.picon}>Masters</div>
            </a>
            </div>

            <div className={styles.container}>
            <a href="/profile"><img src={process.env.PUBLIC_URL + '889.png'} className={styles.icon} width="100"
                                 height="100"/>
                <div className={styles.picon}>Profile</div>
            </a>
            </div>

            <div className={styles.logout}><button className={styles.logoutBotton} onClick={handleLogout}>Logout</button></div>
        </div>
    );
};

export default Header;