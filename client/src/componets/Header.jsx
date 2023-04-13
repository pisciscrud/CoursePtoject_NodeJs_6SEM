import React from 'react';


import styles from './main.module.css'
import {Link, useNavigate} from "react-router-dom";

const Header = () => {

    const { PUBLIC_URL } = process.env

    return (
        <div className={styles.header}>

            <Link className={styles.linkItem} to="procedures">
                <img src={PUBLIC_URL + '/887.png'} className={styles.icon}/>
                <div className={styles.picon}>Procedures</div>
            </Link>
            <Link className={styles.linkItem} to="masters">
                <img src={PUBLIC_URL + '/888.png'} className={styles.icon}/>
                <div className={styles.picon}>Master</div>
            </Link>
            <Link className={styles.linkItem} to="reviews">
                <img src={PUBLIC_URL + '/888.png'} className={styles.icon}/>
                <div className={styles.picon}>Reviews of clients</div>
            </Link>




        </div>
    );
};

export default Header;