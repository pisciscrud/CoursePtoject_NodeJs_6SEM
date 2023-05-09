import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {getNotesOfUser} from "../../actions/user";

import {Grid} from "@material-ui/core";
import NoteItem from "../../componets/NoteItem";
import axios from 'axios'
import socket from "../../socket";
import HistoryIcon from '@mui/icons-material/History';
import { useParams } from 'react-router-dom';
import {deletePet} from "../../actions/pet";
import {deleteRecord} from "../../actions/schedule";

const ScheduleList = () => {
    const { id } = useParams();
    const [notes,setNotes]=useState([]);
    const {refetch:refetchNotes}=useQuery("notes",()=>getNotesOfUser(id))


    useEffect(() => {
        axios
            .get("https://localhost:5000/api/schedule/update-records")
            .then((response) => {
                console.log(`Updated ${response.data} records!`);
            })
            .catch((error) => {
                console.error("Failed to update records:", error);
            });
    }, []);

    useEffect(() => {
        refetchNotes().then(({ data }) => {
            setNotes(data);
        });
    }, [id, refetchNotes]);
    const handleDeleteRecord = async (currentNote) =>
    {

        if (  window.confirm (`Are you sure that want reject your record ?`))
        {
            const res =  await deleteRecord(currentNote.id);

                refetchNotes().then(({ data }) => {
                    setNotes(data);
                });

            return res;

        }

    }
    return (

        <>


            <Grid style={{display:'flex'}} container spacing={3}>
                {notes && notes.map(note=>(
                    <NoteItem key={note.id} note={note} onDeleteNote={handleDeleteRecord}  />))
                }
                </Grid>

        </>
    );
};

export default ScheduleList;