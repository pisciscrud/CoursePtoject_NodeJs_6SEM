import React, {useEffect,useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import MenuUser from "../../componets/MenuUser";
import styles from "../../componets/main.module.css";
import MenuAdmin from "../../componets/MenuAdmin"
import {Grid} from "@material-ui/core";
import ProcedureItem from "../../componets/ProcedureItem";
import {useQuery} from "react-query";
import {getSchedule} from "../../actions/schedule";
import {GetWaitingRecords, handleConfirm} from "../../actions/admin";
import ConfirmationItem from "../../componets/ConfirmationItem";
import socket from '../../socket'
const ConfirmationPage = () => {

    const navigate = useNavigate();
  const [records,setRecords]=useState([])


    const {refetch: refetchRecords}=useQuery("records",()=>GetWaitingRecords())

    useEffect(()=>
    {
        refetchRecords()
            .then((data) => {
                setRecords(data.data)})

    },[records])

    const onConfirm = async (record)=>
    {
        await  handleConfirm(2,record.id)
        setRecords(records.filter(r => r.id !== record.id))
    }

    const onReject = async (record) =>
    {

        await  handleConfirm(3,record.id)
        setRecords(records.filter(r => r.id !== record.id))
    }

    return (
        <div>
            <Grid container>
                {records && records.map((record) => (
                    <ConfirmationItem key={record.id} record={record}  onConfirm={onConfirm} onReject={onReject}/>
                ))}
            </Grid>

        </div>
    );
};

export default ConfirmationPage;