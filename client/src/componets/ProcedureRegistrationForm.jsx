import React, {useEffect, useState} from 'react';
import {Select,Input} from "@material-ui/core";
import {MenuItem} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {sendRequestOnProcedure} from '../actions/schedule'
import { addDays } from 'date-fns';
const ProcedureRegistrationForm = ({  procedure, pets,  masters, schedule }) => {
    const [time, setTime] = useState('10:00')
    const [date, setDate] = useState(new Date())
    const minDate = addDays(new Date(), 1);


    const [availableMasters, setAvailableMasters] = useState(masters)
    const [availableMaster, setAvailableMaster] = useState(masters[0])

    const [availablePet,setAvailablePet]=useState([])
    const handleTimeChange = (event) => {
        setTime(String(event.target.value))
        getAvailableMasters()
    }
    function getNoTimeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

   /* function  getTime(time)
    {
        const time1 = time.getUTCMinutes() < 10 ? time.getUTCHours() +':0' + time.getUTCMinutes() :time.getUTCHours() + ':' + time.getUTCMinutes();
        return time1;
    }*/

    function isEqualDates(a, b) {
        return a.getTime() === b.getTime()
    }


    useEffect(()=>
        {
            //setDate(newDate)
            getAvailableMasters()

           // filterPetsByType(pets,availablePetType )
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
// TODO ВРЕМЯ ПРОВЕРИТЬ
    const getAvailableMasters = () => {
        console.log(time);
        const currentDate = date;
        const currentTime = time;
        const available = masters.filter(master => {
            const masterSchedule = schedule.filter(s => s.master_id === master.id)
            const isNotAvailable = masterSchedule.some(s => {
                const sDate = getNoTimeDate(new Date(s.date_));
                const pickedDate = getNoTimeDate(new Date(currentDate))
              //  const sTime = new Date(s.time)
                const isEqualDate = isEqualDates(sDate, pickedDate)
                return (isEqualDate  && ( s.time === currentTime))
            })
            return !isNotAvailable;
        })
        setAvailableMasters(available)
    }

    const handleSubmit =  async () =>
    {
        try {
            console.log(availablePet.id, availableMaster.id)
         const res = sendRequestOnProcedure(availablePet.id, availableMaster.id,procedure.id,date,time)
            console.log(res)

        }
        catch (e)
        {
            console.log('DDDDDDD')
        }
    }

  const handlePetChange = (event) => {
        const petId = event.target.value;
        const pet = pets.find(p => p.id === petId)
        setAvailablePet(pet)
    }

    return (
        <form onSubmit={handleSubmit} >
            {pets && pets.length>0  ?
            <Select
                value={availablePet.id}
                onChange={handlePetChange}>

                    {pets.map(p =>

                    <MenuItem key={p.id} value={p.id}>
                        {p.nickname}

                    </MenuItem>
                )}
            </Select>
                : <p>No pets</p>
            }
            <Select
                value={time}
                onChange={handleTimeChange}>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="13:00">14:00</MenuItem>
                <MenuItem value="13:00">1:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>

            </Select>
            <DatePicker
                value={date}
                onChange={handleDateChange}
                minDate={minDate}
                label="Выберите дату"/>


            {availableMasters && availableMasters.length>0
                ? <Select
                    value={availableMaster.id}
                    onChange={handleMasterChange}>
                    {
                        availableMasters.map(m =>
                        <MenuItem key={m.id} value={m.id}>
                            {m.name_master}
                        </MenuItem>)
                    }
                </Select>
                : <p>No masters</p>
            }
            <Input type="submit" value="Send"/>
        </form>
    );
};



export default ProcedureRegistrationForm;