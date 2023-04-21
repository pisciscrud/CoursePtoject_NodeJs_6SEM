import React from 'react';
import styles from './main.module.css'
const CardSchedule = ({appointment}) => {
    return (
        <>
        {appointment.status_id === 2  ? (
                <div className={styles.cardSchedule}>
                    <p>Client: {appointment.User_table.full_name}</p>
                    <p>Procedure: {appointment.Procedure_table.name_procedure}</p>
                </div>
            ) : <div className={styles.cardSchedule234}>
            <p>Client: {appointment.User_table.full_name}</p>
            <p>Procedure: {appointment.Procedure_table.name_procedure}</p>
        </div>}
        </>
    );
};

export default CardSchedule;