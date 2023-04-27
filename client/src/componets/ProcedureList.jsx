import React, { useState, useEffect } from 'react';

import ProcedureItem from './ProcedureItem';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import { useQuery } from 'react-query';
  import {getProceduresAll} from '../actions/procedure'
import {getSchedule} from "../actions/schedule";
import {isAdmin} from "../actions/user";
import styles from "./main.module.css";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ProcedureAddForm from "./ProcedureAddForm";
import DialogActions from "@material-ui/core/DialogActions";
import {deletePet, getPetTypes} from "../actions/pet";

import {deleteProcedure} from "../actions/procedure";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 600,

    },
}));
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: 500,
    },
}))(MuiDialogContent);


const ProcedureList = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

   const  handleDeleteProcedure =async (currentProcedure)=>
   {
       if (  window.confirm (`Are you sure that want delete ${currentProcedure.name_procedure}`))
       {
           const res =  await  deleteProcedure(currentProcedure.id);
           if (res.status === 200) {
               refetchProcedures()
                   .then((data) => {

                       setProcedures(data.data)})
           }
           return res;

       }

   }




   const [procedures,setProcedures]=useState([]);
    const {refetch: refetchProcedures} = useQuery("procedures", () => getProceduresAll());
    const {refetch: refetchSchedule,data:schedule}=useQuery("schedule",()=>getSchedule())
        //const {refetch:refetchPets,data:pets}=useQuery("pets",()=>getPetsOfUser())
    const {data:isAdm} = useQuery("isAdm",()=>isAdmin())
    const {refetch:refetchPetTypes,data:petTypes}=useQuery("petTypes",()=>getPetTypes())


    const handleAddProcedure = async() =>
    {
        refetchProcedures()
            .then((data) => {
                setProcedures(data.data)})
        handleClose();
    }


    useEffect(()=>
    {
        refetchProcedures()
            .then((data) => {
                console.log('refetch',data.data);
                setProcedures(data.data)})

    },[procedures])

    return (
        <>
            <div className={classes.root} >

                <Grid container>
                    {procedures && procedures.map((procedure) => (
                        <ProcedureItem key={procedure.id} isAdm = {isAdm} procedure={procedure} schedule={schedule} onDeleteProcedure={handleDeleteProcedure} />
                    ))}
                </Grid>
                {
                    isAdm &&  <Button onClick={handleClickOpen}>
                        <img src={process.env.PUBLIC_URL + '/Vector.svg'} className={styles.icon} width="100"
                             height="100"/>

                    </Button>


                }
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Add pet
                    </DialogTitle>
                    <DialogContent >
                        <ProcedureAddForm  onAdd={handleAddProcedure} petTypes={petTypes}></ProcedureAddForm>

                    </DialogContent >

                </Dialog>

            </div>
        </>
    );
};

export default ProcedureList;