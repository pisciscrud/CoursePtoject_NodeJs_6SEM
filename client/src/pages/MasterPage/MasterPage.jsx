

import React from 'react';
import Container from 'react-bootstrap/esm/Container';




import Header from '../../componets/Header'
import styles from './MasterPage.module.css'
import MasterList from "../../componets/MasterList";

const MasterPage = () => {

    return (


<div className={styles.full}>
        <div className={styles.container}>
            <MasterList></MasterList>
        </div>
</div>

    );
};

export default MasterPage;