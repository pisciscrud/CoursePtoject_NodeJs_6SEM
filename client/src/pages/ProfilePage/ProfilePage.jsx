import React,{useEffect,useState} from 'react';
import axios from 'axios'
import Header from '../../componets/Header'
import PetsList from '../../componets/PetsList'
import MenuUser from "../../componets/MenuUser";
import styles from "../../componets/main.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import EventCard from '../../componets/EventCard'
import dog from './dog.png'
import {useQuery} from "react-query";
import {getProceduresAll} from "../../actions/procedure";
import {nearestForUser} from "../../actions/schedule";
import {authHeader} from "../../actions/procedure";

import ProcedureChart from '../../componets/ProcedureChart'

const ProfilePage = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };
    const [data, setData] = useState([]);
    const {refetch: refetchEvent,data: event} = useQuery("event", () => nearestForUser());
    useEffect(() => {
        // Получение данных с сервера
        axios.get('https://localhost:5000/api/schedule/graphic',{headers:authHeader()}).then(response => {
            setData(response.data);
        });
    }, []);
    return (
        <div >
            {/*<Header></Header>*/}
            <MenuUser></MenuUser>
            {
                 ( window.location.pathname === '/app/profile')
                &&
                <div style={{display:'grid', gridTemplateAreas: "'a b' 'c d'", justifyContent:'space-around'}}>

                    <EventCard style={{gridArea: 'a', margin:5}} event={event}> </EventCard>
                    <div style={{gridArea: 'c', margin:25,width: "550px", height: "300px", backgroundColor: "#fff",borderRadius:20}}>
                        <ProcedureChart   data={data} />
                    </div>
            <img src={dog} alt="Dog" width='450px' height='400px' style= {{paddingTop:70, margin:5,gridArea: 'd'}}/>

                </div>

            }
        <Outlet/>
            {/*<PetsList></PetsList>*/}

            {/* <div className={styles.logout}><button className={styles.logoutBotton} onClick={handleLogout}>Logout</button></div> */}

        </div>
    );
};

export default ProfilePage;