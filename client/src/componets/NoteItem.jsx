import React from 'react';
import styles from './main.module.css'



const NoteItem = ({note}) => {

    function  getTime(time) {
        const time1 = time.getFullYear()  +'-'+ time.getUTCMonth() + '-' + time.getUTCDate()
        return time1;
    }

    return (

        <div className={styles.noteCard}>


            <div className={styles.noteCardBody}>
                <span className={styles.noteCardNameProcedure }>{note.Procedure_table.name_procedure}</span>
                <span>Master: {note.Master.name_master}</span>
                <span> {note.Master.surname_master}</span>
                <span>Pet: {note.Pet.nickname}</span>
            </div>
            <p>
                <span>Status: </span>
                {
                    note.Status.status_name==='In progress' && <span className={styles.waiting}>{note.Status.status_name}</span>
                }
                {
                    note.Status.status_name==='Denied' && <span className={styles.denied}>{note.Status.status_name}</span>
                }
                {
                    note.Status.status_name==='Approved' && <span className={styles.approved}>{note.Status.status_name}</span>
                }


            </p>
            {
                note.Status.status_name==='Сompleted' &&
                <input type='button' value='Get review'></input>
            }

            <div className={styles.noteCardFooter}>
                <span>{getTime(new Date(note.date_))}</span>

                <span>{note.time}</span>
            </div>
        </div>
    )
};


export default NoteItem;
