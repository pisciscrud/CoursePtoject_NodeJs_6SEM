import React from 'react';
import {Link} from "react-router-dom";
import styles from "./main.module.css";

const MenuAdmin = () => {
    return (
        <div className={styles.Menu}>
            <Link  className={styles.userLink} to="schedule">Schedule</Link>
            <Link  className={styles.userLink} to="confirmation">Confirmation</Link>
            <Link  className={styles.userLink} to="statistics">Statistics</Link>
        </div>
    );
};

export default MenuAdmin;