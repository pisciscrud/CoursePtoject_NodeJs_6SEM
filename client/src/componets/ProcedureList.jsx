import React, { useState, useEffect } from 'react';

import ProcedureItem from './ProcedureItem';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Grid, Select} from '@material-ui/core';
import { useQuery } from 'react-query';
  import {getProceduresAll} from '../actions/procedure'
import {getSchedule} from "../actions/schedule";
import {isAdmin} from "../actions/user";
import styles from "./main.module.css";
import Pagination from '../componets/Pagination';

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
import FilterPanel from "./FilterPanel";
import {MenuItem} from "@mui/material";
import {getProceduresByType} from '../actions/procedure'

import { UpdateProcedure } from '../actions/procedure';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),
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
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage, setObjectsPerPage] = useState(4);

    const indexOfLastObject = currentPage * objectsPerPage;
    const indexOfFirstObject = indexOfLastObject - objectsPerPage;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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


   const handleUpdateProcedure = async(currentProcedure,updatedProcedure)=>
   {

    const res =  await  UpdateProcedure(currentProcedure.id,updatedProcedure);
    if (res.status === 200) {
        refetchProcedures()
            .then((data) => {
                setProcedures(data.data)})
    }
    return res;
   }




   const [procedures,setProcedures]=useState([]);
    const {refetch: refetchProcedures} = useQuery("procedures", () => getProceduresAll());
    const {refetch: refetchSchedule,data:schedule}=useQuery("schedule",()=>getSchedule())
        //const {refetch:refetchPets,data:pets}=useQuery("pets",()=>getPetsOfUser())
    const {data:isAdm} = useQuery("isAdm",()=>isAdmin())
    const {refetch:refetchPetTypes,data:petTypes}=useQuery("petTypes",()=>getPetTypes())
    const currentProcedures = procedures.slice(indexOfFirstObject, indexOfLastObject);


    const handleAddProcedure = async() =>
    {
        refetchProcedures()
            .then((data) => {
                setProcedures(data.data)})
        handleClose();
    }
    const handlePetTypeChange = async(event) => {
        const selectedPetTypeId = event.target.value;
        if (event.target.value === 0) {
            refetchProcedures()
                .then((data) => {

                    setProcedures(data.data)
                })
            setFilterType(event.target.value);
        } else {
            const res = await getProceduresByType(selectedPetTypeId);
            const procedures = res.data.map((item) => item.Procedure_table);
            setProcedures(procedures);
            setFilterType(event.target.value);

        }
    }

    useEffect(()=>
    {
        refetchProcedures()
            .then((data) => {

                setProcedures(data.data)})

    },[])



    const  [filterType, setFilterType]  = useState('')
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };
    return (
        <>
            <div className={styles.filterPanel} style={{justifyContent: 'flex-end',marginRight:60}}>
                {
                    isAdm &&
                    <div>
                        <Button onClick={handleClickOpen}>
                            <img src={process.env.PUBLIC_URL + '/Vector.svg'} className={styles.icon} width="100"
                                 height="100"/>

                        </Button>
                    </div>

                }
                <div  className={styles.searchByType}>
                    <label htmlFor="animal-filter" style={{marginRight:10}}>For what type?:</label>
                    <Select style={{backgroundColor:"white",borderRadius:5}} id='petType'
                             value={filterType}
                             onChange={handlePetTypeChange}>
                        <MenuItem key={0} value={0}>All</MenuItem>
                        {petTypes && petTypes.map(p =>

                            <MenuItem key={p.id} value={p.id}>
                                {p.pet_name}

                            </MenuItem>
                        )}
                    </Select>
                </div>
            </div>
            <div className={classes.root} >

                <Grid container>
                    {currentProcedures && currentProcedures.map((procedure) => (
                        <ProcedureItem key={procedure.id} isAdm = {isAdm} procedure={procedure} schedule={schedule} onDeleteProcedure={handleDeleteProcedure}  onUpdateProcedure={handleUpdateProcedure}/>
                    ))}
                </Grid>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                    <DialogTitle id="customized-dialog-title" >
                        Procedure
                    </DialogTitle>
                    <DialogContent >
                        <ProcedureAddForm  onAdd={handleAddProcedure} petTypes={petTypes}></ProcedureAddForm>

                    </DialogContent >
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>


                <Pagination
                    objectsPerPage={objectsPerPage}
                    totalObjects={procedures.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </>
    );
};

export default ProcedureList;