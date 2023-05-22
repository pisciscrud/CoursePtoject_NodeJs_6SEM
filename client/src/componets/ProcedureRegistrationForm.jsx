import React, {useEffect, useState} from 'react';
import {Select,Input} from "@material-ui/core";
import {MenuItem} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {sendRequestOnProcedure} from '../actions/schedule'
import { addDays } from 'date-fns';
import styles from './main.module.css'
import Alert from '@material-ui/lab/Alert';






const ProcedureRegistrationForm = ({  procedure, pets,  masters, schedule ,onClose}) => {
    const [time, setTime] = useState('10:00')
    const [date, setDate] = useState(new Date())
    const [disable, setDisable] = useState(false)
    const minDate = addDays(new Date(), 1);

    const [showAlert, setShowAlert] = useState(false);



    const [availableMasters, setAvailableMasters] = useState(masters)
    const [availableMaster, setAvailableMaster] = useState(masters[0])
    const [availablePets,setAvailablePets]=useState(pets);
 
    const [error,setError] = useState(null);
    const [availablePet,setAvailablePet]=useState(pets[0])
    const handleTimeChange = (event) => {
        setTime(String(event.target.value))
        getAvailableMasters()
    }
    function getNoTimeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }



    function isEqualDates(a, b) {
        return a.getTime() === b.getTime()
    }


    useEffect(()=>
        {
            //setDate(newDate)
            getAvailableMasters()
            getAvailablePets()
           // filterPetsByType(pets,availablePetType )
        },[date,time])

    const handleDateChange = (newDate) => {
        setError('')
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

                const isEqualDate = isEqualDates(sDate, pickedDate)

                return (isEqualDate  && ( s.time === currentTime) && (s.status_id === 1 || s.status_id === 2))
            })
            return !isNotAvailable;
        })

        setDisable(() => available.length === 0)
        setAvailableMasters(available)
    }



    const getAvailablePets = () =>
    {
        const currentDate = date;
        const currentTime = time;
        const available = pets.filter(pet => 
            {
                const petSchedule = schedule.filter(s=> s.pet_id===pet.id)
                const isNotAvailable = petSchedule.some(s=>
                    {
                        const sDate = getNoTimeDate(new Date(s.date_));
                const pickedDate = getNoTimeDate(new Date(currentDate))
                const isEqualDate = isEqualDates(sDate, pickedDate)
                return (isEqualDate  && ( s.time === currentTime) && (s.status_id === 1 || s.status_id === 2))
                    })
                    return !isNotAvailable;
            })

            setDisable(() => available.length === 0)
            setAvailablePets(available);
    }
    


    const [errors, setErrors] = useState('');
    const validateForm = () => {

        const form = document.querySelector('#myForm');
        const inputs = form.querySelectorAll('Select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
            }
        });
        if (inputs.length < 3)
        {
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit =  async (event) =>
    {
        event.preventDefault();

        try {

            minDate.setUTCHours(0,0,0,0);
            date.setUTCHours(0,0,0,0);
            if ( availableMaster.id && validateForm && availablePet.id && date.getTime() >= minDate.getTime()) {
                const res = await sendRequestOnProcedure(availablePet.id, availableMaster.id, procedure.id, date, time);
                if(res && 'response' in res && res.response.status===400)
                {
                    setShowAlert(false);
                    setError(res.response.data)
                }
                else
                {
                    setShowAlert(true);
                    setError('');
                    setTimeout(() => {
                        setShowAlert(false); // скрываем alert через 3 секунды
                    }, 2000);
                }
            }
            else
            {

                alert('your form is not valid')

            }
        }
        catch (e)
        {
            console.log(e.message)
        }
    }

  const handlePetChange = (event) => {
        const petId = event.target.value;
        const pet = pets.find(p => p.id === petId)
        setAvailablePet(pet)
    }
    const { PUBLIC_URL } = process.env
    return (
        <form  id="myForm" onSubmit={handleSubmit} style={{backgroundColor: 'rgb(220,154,254)' }} >

                <img style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px'
                }} src={PUBLIC_URL + '/formProcedure.jpg'}/>

                <div  className={styles.formItem}>
                    {errors.nickname && <p style={{color:'red'}}>{errors}</p>}
                    <label style={{padding : 10}} for='pet'>Pet:</label>
                    {/* {pets && pets.length>0  ?
                    <Select  id='pet'
                        value={availablePet.id}
                        onChange={handlePetChange}>
                        {pets.map(p =>

                            <MenuItem key={p.id} value={p.id}>
                                {p.nickname}

                            </MenuItem>
                        )}
                    </Select> */}
                    {availablePets && availablePets.length>0  ?
                    <Select  id='pet'
                        value={availablePet.id}
                        onChange={handlePetChange}>
                        {availablePets.map(p =>

                            <MenuItem key={p.id} value={p.id}>
                                {p.nickname}

                            </MenuItem>
                        )}
                    </Select>
                    : <p>No pets</p>
                    }
                </div>

            <div className={styles.formItem}>
                <label style={{padding: 10}} for='time'>Time:</label>
            <Select id='time'
                value={time}
                onChange={handleTimeChange}>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="14:00">14:00</MenuItem>
                <MenuItem value="15:00">15:00</MenuItem>
                <MenuItem value="16:00">16:00</MenuItem>
            </Select>
                </div>
            <div className={styles.formItem}>
                <label style={{padding: 10}} for='date'>Date:</label>
            <DatePicker id='date'
                value={date}
                onChange={handleDateChange}
                minDate={minDate}
                label="Choose date"/>

                </div>
            <div className={styles.formItem}>
                <label style={{padding: 10}} for='Master'>Master:</label>
            {availableMasters && availableMasters.length>0
                ? <Select id='Master'
                    value={availableMaster.id}
                    onChange={handleMasterChange}>
                    {
                        availableMasters.map(m =>
                        <MenuItem key={m.id} value={m.id}>
                            {m.name_master} {m.surname_master}
                        </MenuItem>)
                    }
                </Select>
                : <p>No masters</p>
            }
                </div>
                <div className={styles.formItem}>
            <Input disabled={disable} className={styles.pill} style={{color:'white'}} type="submit" value="Send"/>
                </div>
            <>
            {error&&<b style={{color:'red'}}>{error}</b>}
            </>
            <p/>
           <div>
            {showAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)}>
                   Success!
                </Alert>)}
           </div>
        </form>
    );
};



export default ProcedureRegistrationForm;