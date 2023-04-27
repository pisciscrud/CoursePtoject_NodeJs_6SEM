import React, {useEffect,useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import MenuUser from "../../componets/MenuUser";
import styles from "../../componets/main.module.css";
import MenuAdmin from "../../componets/MenuAdmin"
import {Grid} from "@material-ui/core";
import ProcedureItem from "../../componets/ProcedureItem";
import {useQuery} from "react-query";
import {getSchedule} from "../../actions/schedule";
import {GetWaitingRecords} from "../../actions/admin";
import ConfirmationItem from "../../componets/ConfirmationItem";
import socket from '../../socket'
const ConfirmationPage = () => {




    const navigate = useNavigate();
  const [records,setRecords]=useState([])
    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    };

    const {refetch: refetchRecords}=useQuery("records",()=>GetWaitingRecords())

    useEffect(()=>
    {
        refetchRecords()
            .then((data) => {
                console.log('refetch',data.data);
                setRecords(data.data)})

    },[records])

    const onConfirm = async (record_id)=>
    {
        setRecords(records.filter(r => r.id !== record_id))
    }

    return (
        <div>
            {/*<Header></Header>*/}
            {/*<MenuAdmin></MenuAdmin>*/}
            {/*<Outlet/>*/}

            {/*<PetsList></PetsList>*/}
            <Grid container>
                {records && records.map((record) => (
                   // console.log(record)
                    <ConfirmationItem key={record.id} record={record}  onConfirm={onConfirm} /*pets={pets}*/ />
                ))}
            </Grid>

            <div className={styles.logout}><button className={styles.logoutBotton} onClick={handleLogout}>Logout</button></div>

        </div>

    );
};

export default ConfirmationPage;