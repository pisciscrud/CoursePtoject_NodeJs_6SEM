import React from 'react';
import ScheduleList from "../ScheduleList/ScheduleList";
import styles from "../MasterPage/MasterPage.module.css";

const SchedulePage = () => {
    return (

        <div className={styles.container}>
            <ScheduleList ></ScheduleList>
        </div>

    );
};

export default SchedulePage;