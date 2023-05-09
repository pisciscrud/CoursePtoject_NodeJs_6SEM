import React from 'react';
import {handleConfirm} from "../actions/admin";
import styles from './main.module.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// const handleConfirmRecord = async(status_id,record.id)=>
// {
//
// }
const ConfirmationItem = ({record,onConfirm}) => {

    function  getTime(time) {
        const month = time.getMonth() + 1;
        const time1 = time.getFullYear()  +'-'+  month + '-' + time.getUTCDate()

        return time1;
    }

    const onApprove = async () =>
    {
        onConfirm(record.id);
     await  handleConfirm(2,record.id)
    }

    const onReject = async ()  =>
    {
        onConfirm(record.id);
        await  handleConfirm(3,record.id)
    }

    return (
        <div className={styles.confirmationItem}>
            <>
            <p>Master :{record.Master.surname_master} {record.Master.name_master}</p>
            </>
            <>
                <p>Client :{record.User_table.full_name}</p>
            </>
            <p>Pet: {record.Pet.nickname}</p>
            <p>Procedure: {record.Procedure_table.name_procedure}</p>
            <div><CalendarMonthIcon/>
             <b> { getTime(new Date(record.date_))} {record.time}</b>
            </div>

            <button onClick={onApprove}>Confirm </button>
            <button  onClick={onReject}> Reject</button>
        </div>
    );
};

export default ConfirmationItem;