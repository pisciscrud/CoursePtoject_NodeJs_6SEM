import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {getNotesOfUser} from "../../actions/user";

import {Grid} from "@material-ui/core";
import NoteItem from "../../componets/NoteItem";
import axios from 'axios'
import socket from "../../socket";



const ScheduleList = () => {

    const [notes,setNotes]=useState([]);
    const {refetch:refetchNotes}=useQuery("notes",()=>getNotesOfUser())


    useEffect(()=>
    {
        axios.get('http://localhost:5000/api/schedule/update-records')
            .then(response => {

               // setNotes(response.data)

              console.log(`Updated ${response.data} records!`);
            })
            .catch(error => {
               // console.error('Failed to update records:', error);
            });
        refetchNotes()
            .then((data) => {
                console.log('refetch',data.data);
                setNotes(data.data)})

    },[notes])


    return (

        <>
            <Grid container spacing={3}>
                {notes && notes.map(note=>(
                    <NoteItem key={note.id} note={note}  />))
                }
                </Grid>

        </>
    );
};

export default ScheduleList;