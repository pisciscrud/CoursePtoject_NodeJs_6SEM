import React, {useEffect, useState} from 'react';
import {Select} from "@material-ui/core";
import {MenuItem} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

const ProcedureRegistrationForm = ({ pets, procedure, masters, schedule }) => {
    const [time, setTime] = useState('10:00')
    const [date, setDate] = useState(new Date())
    const [pet, setPet] = useState(pets[0])
    const [availableMasters, setAvailableMasters] = useState(masters)
    const [availableMaster, setAvailableMaster] = useState(masters[0])

    const handleTimeChange = (event) => {
        setTime(String(event.target.value))
        getAvailableMasters()
    }
    function getNoTimeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    function  getTime(time)
    {
        const time1 = time.getUTCMinutes() < 10 ? time.getUTCHours() +':0' + time.getUTCMinutes() :time.getUTCHours() + ':' + time.getUTCMinutes();
        return time1;
    }

    function isEqualDates(a, b) {
        return a.getTime() === b.getTime()
    }


    useEffect(()=>
        {
            //setDate(newDate)
            getAvailableMasters()
        },[date,time])

    const handleDateChange = (newDate) => {
        setDate(newDate)
       // getAvailableMasters()
    }

    const handleMasterChange = (event) => {
        const masterId = event.target.value;
        const master = availableMasters.find(m => m.id === masterId)
        setAvailableMaster(master)
    }

    const getAvailableMasters = () => {
        const currentDate = date;
        const currentTime = time;
        const available = masters.filter(master => {
            const masterSchedule = schedule.filter(s => s.master_id === master.id)
            const isNotAvailable = masterSchedule.some(s => {
                const sDate = getNoTimeDate(new Date(s.date_));
                const pickedDate = getNoTimeDate(new Date(currentDate))
                const sTime = new Date(s.time)
                const isEqualDate = isEqualDates(sDate, pickedDate)
                return (isEqualDate  && ( getTime(sTime) === currentTime))
            })
            return !isNotAvailable;
        })
        setAvailableMasters(available)
    }

    return (
        <form>
            <Select
                value={pet.id}
                onChange={(event) => setPet(pet)}>
                {pets && pets.map(pet =>
                    <MenuItem key={pet.id} value={pet.id}>
                        {pet.nickname}
                    </MenuItem>
                )}
            </Select>
            <Select
                value={time}
                onChange={handleTimeChange}>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="13:00">14:00</MenuItem>
                <MenuItem value="13:00">15:00</MenuItem>
                <MenuItem value="13:00">16:00</MenuItem>
                <MenuItem value="13:00">17:00</MenuItem>
            </Select>
            <DatePicker
                value={date}
                onChange={handleDateChange}
                label="Выберите дату"/>

            <Select
                value={availableMaster.id}
                onChange={handleMasterChange}>
                {
                    availableMasters &&
                    availableMasters.map(m =>
                    <MenuItem key={m.id} value={m.id}>
                        {m.name_master}
                    </MenuItem>)
                }
            </Select>
        </form>
    );
};



export default ProcedureRegistrationForm;