import React, {useEffect, useState} from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {useQuery} from "react-query";
import {getSchedule} from "../actions/schedule";
import {fetchMasters} from "../actions/master";
import {getScheduleOfDay,getScheduleOfChoosenDay} from '../actions/admin'
import CardSchedule from './CardSchedule'

import styles from './main.module.css'
import {DatePicker} from "@mui/x-date-pickers";
import ColorCircle from "./ColorCircle";
import axios from "axios";




const ScheduleTable = () => {
    const [schedule,setSchedule]=useState()
    const {refetch: refetchMasters,data:masters}=useQuery("masters",()=>fetchMasters())
    const {refetch:refetchSchedule}=useQuery("schedule",()=>getScheduleOfDay(today))
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const [date1,setDate1]=useState(formattedDate)
    const [date, setDate] = useState(new Date())
    const times = [
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
        { start: '12:00', end: '13:00' },
        { start: '13:00', end: '14:00' },
        { start: '14:00', end: '15:00' },
        { start: '15:00', end: '16:00' },
        { start: '16:00', end: '17:00' },
    ];
    const handleDateChange = async (newDate) => {
        setDate(newDate)
  const records = await getScheduleOfChoosenDay(newDate);

             setSchedule(records)
             setDate1(newDate.toLocaleDateString())


    }

    useEffect(()=>
    {
        axios
            .get("https://localhost:5000/api/schedule/update-records")
            .then((response) => {
                console.log(`Updated ${response.data} records!`);
            })
            .catch((error) => {
                console.error("Failed to update records:", error);
            });
        refetchSchedule()
            .then((data) => {
                //console.log('refetch',data.data);
                setSchedule(data.data)})

    },[])
    return (
        <>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <div className={styles.formItem}>

                <DatePicker
                    style={{paddingLeft:'10px'}}
                    id='date'
                            value={date}
                            onChange={handleDateChange}
                            label="Choose date"/>

            </div>
                <div style={{display:'flex',flexDirection:'row'}}>
              <ColorCircle color="lightskyblue" description="Approved" />
               <ColorCircle color="lightpink" description="Waiting" />
              <ColorCircle color="lightgrey" description="History" />
                </div>
            </div>
        <Table>

            <TableHead>
                <TableRow>


                    <TableCell >   <b >{date1}</b></TableCell>
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