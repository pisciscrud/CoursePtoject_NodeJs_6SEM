import React, {useEffect, useState} from "react";


import {makeStyles, withStyles} from '@material-ui/core/styles';
import {  Grid ,Button} from '@material-ui/core';
import { useQuery } from 'react-query';
import PetItem from '../componets/PetItem'
import {getPetsOfUser} from "../actions/user"
import ProcedureItem from "./ProcedureItem";
import styles from "./main.module.css";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import ProcedureRegistrationForm from "./ProcedureRegistrationForm";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import PetAddForm from "./PetAddForm";
import {deletePet, getPetTypes} from "../actions/pet"



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
        marginLeft: 100,


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

const PetsList = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
   const [pets,setPets]=useState([]);
    const {refetch:refetchPets}=useQuery("pets",()=>getPetsOfUser())
    const {refetch:refetchPetTypes,data:petTypes}=useQuery("petTypes",()=>getPetTypes())



    useEffect(()=>
    {
        refetchPets()
            .then((data) => {
                console.log('refetch',data.data);
                setPets(data.data)})

    },[pets])
    const handleDeletePet = async (currentPet) =>
    {

        if (  window.confirm (`Are you sure that want delete ${currentPet.nickname}`))
        {
            const res =  await  deletePet(currentPet.id);
           if (res.status === 200) {
                refetchPets()
                    .then((data) => {

                        setPets(data.data)})
            }
           return res;

        }

    }

    const handleAddPet = async ()=>
    {
        handleClose();
        refetchPets()
            .then((data) => {
                console.log('refetch',data.data);
                setPets(data.data)})
    }
    return (
        <div className={classes.root} >

            <Grid container spacing={3}>
                {pets && pets.map(pet=>(
                    <PetItem key={pet.id} pet={pet} onDeletePet={handleDeletePet}/>))
                }
                <div className={styles.container}>
                   <Button onClick={handleClickOpen}>
                        <img src={process.env.PUBLIC_URL + '/Vector.svg'} className={styles.icon} width="100"
                             height="100"/>

                   </Button>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                        <DialogTitle id="customized-dialog-title" >
                            Add pet
                        </DialogTitle>
                        <DialogContent >
                        <PetAddForm petTypes={petTypes} onAdd={handleAddPet} ></PetAddForm>
                        </DialogContent >
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Grid>



        </div>
    );
};

export default PetsList;