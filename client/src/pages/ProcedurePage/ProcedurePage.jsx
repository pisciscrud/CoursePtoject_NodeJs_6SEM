import React from 'react';
import Header from "../../componets/Header";
import ProcedureList from "../../componets/ProcedureList";
import styles from '../MasterPage/MasterPage.module.css'

const ProcedurePage = () => {
    return (
        <div className={styles.container} >
            {/*<Header></Header>*/}
            <ProcedureList></ProcedureList>
        </div>
    );
};

export default ProcedurePage;