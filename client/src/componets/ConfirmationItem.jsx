import React from 'react';
import {handleConfirm} from "../actions/admin";



// const handleConfirmRecord = async(status_id,record.id)=>
// {
//
// }
const ConfirmationItem = ({record,onConfirm}) => {

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
        <div>
            <>
            <p>Master :{record.Master.surname_master}</p>
            <p>{record.Master.name_master}</p>
            </>
            <>
                <p>Client :{record.User_table.full_name}</p>
            </>
            <p>Pet :{record.Pet.nickname}</p>
            <p>Procedure: {record.Procedure_table.name_procedure}</p>
            <button onClick={onApprove}>Confirm </button>
            <button  onClick={onReject}> Reject</button>
        </div>
    );
};

export default ConfirmationItem;