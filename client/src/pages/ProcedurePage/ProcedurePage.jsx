import React from 'react';
import Header from "../../componets/Header";
import ProcedureList from "../../componets/ProcedureList";
import styles from '../MasterPage/MasterPage.module.css'
import FilterPanel from "../../componets/FilterPanel";



const ProcedurePage = () => {
    return (
        <div className={styles.full}>
        <div className={styles.container} >

            <ProcedureList></ProcedureList>
        </div>
        </div>
    );
};

export default ProcedurePage;