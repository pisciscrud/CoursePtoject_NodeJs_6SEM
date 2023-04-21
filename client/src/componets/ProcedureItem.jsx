
import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Button,
    Select,
    Modal
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {DatePicker} from "@mui/x-date-pickers";
import {MenuItem} from "@mui/material";
import ProcedureRegistrationForm from "./ProcedureRegistrationForm"
import axios from "axios";
import { useQuery } from 'react-query';
import {authHeader} from "../actions/procedure";
import {isAdmin} from "../actions/user";

const useStyles = makeStyles({
    root: {
        width: 270,
        margin:30,
        borderRadius: 20,
        padding: 15,
        background:"red"

    },
    media: {
        height: 140,
        borderRadius: 20,

    },
});
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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



const ProcedureItem = ({procedure, schedule,isAdm,onDeleteProcedure}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
   const [masters, setMasters] = useState([])
    //const [availablePetType,setAvailablePetType]=useState([])
  const [pets,setPets]=useState([])







    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

   const  handleDeleteProcedure = async () =>
   {
       const res = await onDeleteProcedure(procedure);
       return res;
   }




    useEffect(() => {
        axios.get(`http://localhost:5000/api/procedures/mastersAndProcedures/${procedure.id}`)
            .then(response => {
                console.log('masters:', response.data)
                    setMasters(response.data.map(item => item.Master))

                }
            )
            .catch(error => console.log(error));


            if (!isAdm) {

                axios.get(`http://localhost:5000/api/procedures/petsOfUser/${procedure.id}`, {headers: authHeader()})
                    .then(response => {
                        console.log('ytn', response.data)
                        setPets(response.data)

                    })
            }
            else {
                setPets([]);
            }
    }, []);

    // function filterPetsByType(pets, petType) {
    //   const available = pets.filter(p => petType.map(t => t.pet_type_id).includes(p.pet_type_id));
    //   console.log('available', available);
    //   setAvailablePets(available);
    // }

    return (
        <div >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:5000/${procedure.procedure_photo}`}/>
                    <CardContent>
                        <h2>{procedure.name_procedure}</h2>
                        <p>Price:{procedure.Price}$</p>
                        <h4>{procedure.description}</h4>
                    </CardContent>
                </CardActionArea>
                { !isAdm ?  <Button  style={{
                    backgroundColor:"#111F75",
                    margin:"10px",
                    color:"white"
                }} onClick={handleClickOpen}>
                   Get service
                </Button> :
                    <Button  style={{
                        backgroundColor:"#111F75",
                        margin:"10px",
                        color:"white"
                    }} onClick={handleDeleteProcedure}>
                       Delete
                    </Button>
                }
            </Card>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                 Procedure
                </DialogTitle>
                <DialogContent >
                 {/*<CardMedia  style={{width:"450px",height:"200px"}} className={classes.media}   image={`http://localhost:5000/${master.photo_master}`}></CardMedia>*/}
                    <Typography gutterBottom>
                  {procedure.name_procedure}
                    </Typography>
                    <ProcedureRegistrationForm
                        //TODO only pets that can do this procedure
                        procedure={procedure}
                        pets={pets}
                        masters={masters}
                        schedule={schedule}
                    />
                </DialogContent >
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default ProcedureItem;