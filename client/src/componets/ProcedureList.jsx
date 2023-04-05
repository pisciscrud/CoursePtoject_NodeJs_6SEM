import React, { useState, useEffect } from 'react';

import ProcedureItem from './ProcedureItem';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid } from '@material-ui/core';
import { useQuery } from 'react-query';
  import {getProceduresAll} from '../actions/procedure'
import {getSchedule} from "../actions/schedule";
import {getPetsOfUser} from "../actions/user"
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
       marginLeft: 100,


    },
}));

const ProcedureList = () => {
    const classes = useStyles();

    const {refetch: refetchProcedures,data:procedures} = useQuery("procedures", () => getProceduresAll());
    const {refetch: refetchSchedule,data:schedule}=useQuery("schedule",()=>getSchedule())
    const {refetch:refetchPets,data:pets}=useQuery("pets",()=>getPetsOfUser())

  /*  const [procedures, setProcedures] = useState([]);*/
    /*const [schedule, setSchedule] = useState([]);
     */
 /*   useEffect(() => {*/

       /* axios.get('http://localhost:5000/api/procedures')
            .then(response => {
                    setProcedures(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => console.log(error));*/
      /*  axios.get('http://localhost:5000/api/schedule')
            .then(response => {
                    setSchedule(response.data)
                    console.log('schedule', response.data)
                }
            )
            .catch(error => console.log(error));
    }, []);*/
    return (
        <div>
            <div className={classes.root} >

                <Grid container spacing={3}>
                    {procedures && procedures.map((procedure) => (
                        <ProcedureItem key={procedure.id} procedure={procedure} schedule={schedule} pets={pets} />
                    ))}
                </Grid>

        </div>
        </div>
    );
};

export default ProcedureList;