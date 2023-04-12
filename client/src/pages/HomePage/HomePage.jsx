import React from 'react';
import styles from './HomePage.module.css'
import Header from "../../componets/Header";
import {Outlet} from "react-router-dom";


const HomePage = () => {
    return (
        <div className={styles.fullScreenContainer}>
            <h1>Home</h1>
        </div>
    );
};

export default HomePage;