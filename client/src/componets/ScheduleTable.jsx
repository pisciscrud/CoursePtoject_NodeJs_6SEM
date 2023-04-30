import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {useQuery} from "react-query";
import {getSchedule} from "../actions/schedule";
import {fetchMasters} from "../actions/master";
import {getScheduleOfDay} from '../actions/admin'
import CardSchedule from './CardSchedule'

import styles from './main.module.css'

const ScheduleTable = () => {
    const {refetch: refetchMasters,data:masters}=useQuery("masters",()=>fetchMasters())
    const {refetch:refetchSchedule,data:schedule}=useQuery("schedule",()=>getScheduleOfDay())

    const times = [
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
        { start: '12:00', end: '13:00' },
        { start: '13:00', end: '14:00' },
        { start: '14:00', end: '15:00' },
        { start: '15:00', end: '16:00' },
        { start: '16:00', end: '17:00' },
    ];
    return (
        <>

        <Table>

            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    {masters && masters.map((master) => (
                        <TableCell  className={styles.MasterName} key={master.id}>{master.name_master} {master.surname_master}</TableCell>

                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {times &&  times.map((time, rowIndex) => (
                    <TableRow key={time.start}>
                        <TableCell component="th" scope="row">{`${time.start} - ${time.end}`}</TableCell>
                        {schedule && masters && masters.map((master) => {
                            const appointment = schedule.find((item) => item.time === time.start && item.master_id === master.id);
                            return (
                                <TableCell key={`${master.id}_${rowIndex}`}>
                                    {appointment ? <CardSchedule appointment={appointment}/> : <div className={styles.cardScheduleFree} >Free</div>}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );
};



export default ScheduleTable;