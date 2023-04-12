import React, { useState, useEffect } from 'react';

import ProcedureItem from './ProcedureItem';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid } from '@material-ui/core';
import { useQuery } from 'react-query';
  import {getProceduresAll} from '../actions/procedure'
import {getSchedule} from "../actions/schedule";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 600,

    },
}));

const ProcedureList = () => {
    const classes = useStyles();

    const {refetch: refetchProcedures,data:procedures} = useQuery("procedures", () => getProceduresAll());
    const {refetch: refetchSchedule,data:schedule}=useQuery("schedule",()=>getSchedule())
        //const {refetch:refetchPets,data:pets}=useQuery("pets",()=>getPetsOfUser())



    return (
        <>
            <div className={classes.root} >

                <Grid container>
                    {procedures && procedures.map((procedure) => (
                        <ProcedureItem key={procedure.id} procedure={procedure} schedule={schedule} /*pets={pets}*/ />
                    ))}
                </Grid>

            </div>
        </>
    );
};

export default ProcedureList;