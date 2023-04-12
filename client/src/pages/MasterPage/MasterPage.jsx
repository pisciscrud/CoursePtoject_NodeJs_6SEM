

import React from 'react';
import Container from 'react-bootstrap/esm/Container';




import Header from '../../componets/Header'
import styles from './MasterPage.module.css'
import MasterList from "../../componets/MasterList";

const MasterPage = () => {

    return (
        <div className={styles.container}>

            {/*<Header></Header>*/}
            <MasterList></MasterList>
        </div>
    );
};

export default MasterPage;