import React from 'react';
import Header from '../../componets/Header'
import PetsList from '../../componets/PetsList'
import MenuUser from "../../componets/MenuUser";
import styles from "../../componets/main.module.css";
import {Outlet, useNavigate} from "react-router-dom";
const ProfilePage = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            {/*<Header></Header>*/}
            <MenuUser></MenuUser>
        <Outlet/>
            {/*<PetsList></PetsList>*/}

            {/* <div className={styles.logout}><button className={styles.logoutBotton} onClick={handleLogout}>Logout</button></div> */}

        </div>
    );
};

export default ProfilePage;