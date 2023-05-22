import React from 'react';
import styles from './main.module.css'
const CardSchedule = ({appointment}) => {
    return (
        <>
        {appointment.status_id === 2  && (
                <div className={styles.cardSchedule}>
                    <span>Client: {appointment.User_table.full_name}</span>
                    <span>Procedure: {appointment.Procedure_table.name_procedure}</span>
                </div>
            ) }
            {appointment.status_id === 1 && <div className={styles.cardSchedule234}>
                <span>Client: {appointment.User_table.full_name} </span>
                <span>Procedure: {appointment.Procedure_table.name_procedure}</span>
        </div>}
            {
                appointment.status_id === 4 && <div className={styles.cardScheduleHistory}>
                    <span>Client: {appointment.User_table.full_name}</span>
                    <span>Procedure: {appointment.Procedure_table.name_procedure}</span>
                    </div>
            }
        </>
    );
};

export default CardSchedule;