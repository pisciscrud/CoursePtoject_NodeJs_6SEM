import React from 'react';
import styles from './HomePage.module.css'
import Header from "../../componets/Header";
import {Outlet} from "react-router-dom";


const HomePage = () => {
    return (
        <div className={styles.full}>
        <div className={styles.fullScreenContainer}>
        </div>
        </div>
    );
};

export default HomePage;