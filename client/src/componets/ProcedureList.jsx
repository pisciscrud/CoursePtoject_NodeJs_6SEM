import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProcedureItem from './ProcedureItem';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import Pagination from '../componets/Pagination';
import MasterItem from "./MasterItem";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),

    },
}));

const ProcedureList = () => {
    const classes = useStyles();
    const [procedures, setProcedures] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/procedures')
            .then(response => {
                    setProcedures(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => console.log(error));
    }, []);
    return (
        <div>
            <div className={classes.root} >

                <Grid container spacing={3}>
                    {procedures.map((procedure) => (
                        <ProcedureItem key={procedure.id} procedure={procedure} />
                    ))}
                </Grid>

        </div>
        </div>
    );
};

export default ProcedureList;