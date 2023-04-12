import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {getNotesOfUser} from "../../actions/user";

import {Grid} from "@material-ui/core";
import NoteItem from "../../componets/NoteItem";

const ScheduleList = () => {

    const [notes,setNotes]=useState([]);
    const {refetch:refetchNotes}=useQuery("notes",()=>getNotesOfUser())
    useEffect(()=>
    {
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