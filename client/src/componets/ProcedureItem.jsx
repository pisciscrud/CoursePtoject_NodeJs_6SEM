
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
import ProcedureUpdateForm from "./ProcedureUpdateForm";
import {getPetTypes} from "../actions/pet";




const useStyles = makeStyles({
    root: {
        width: 270,
        margin:30,
        borderRadius: 20,
        padding: 15,
        background:"white"

    },
    media: {
        height: 200,
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
const { PUBLIC_URL } = process.env
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
    const [open1,setOpen1]=React.useState(false);
   const [masters, setMasters] = useState([])
    //const [availablePetType,setAvailablePetType]=useState([])
  const [pets,setPets]=useState([])




    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    const {refetch:refetchPetTypes,data:petTypes}=useQuery("petTypes",()=>getPetTypes())

  const  handleUpdatePhoto = ()=>
    {
        handleClose1();
    }


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
        axios.get(`https://localhost:5000/api/procedures/mastersAndProcedures/${procedure.id}`)
            .then(response => {
                console.log('masters:', response.data)
                    setMasters(response.data.map(item => item.Master))

                }
            )
            .catch(error => console.log(error));


            if (!isAdm) {

                axios.get(`https://localhost:5000/api/procedures/petsOfUser/${procedure.id}`, {headers: authHeader()})
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
                        image={`https://localhost:5000/${procedure.procedure_photo}`}/>
                    <CardContent>
                        <h4>{procedure.name_procedure}</h4>
                        <h6>Price:{procedure.Price}$</h6>
                        <h6>Description:{procedure.description}</h6>
                    </CardContent>
                </CardActionArea>
                { !isAdm ?  <Button  style={{
                    backgroundColor:"#111F75",
                    margin:"0px",
                    color:"white"
                }} onClick={handleClickOpen}>
                   Get service
                </Button> :
                    <>
                    <Button  style={{
                        backgroundColor:"#111F75",
                        margin:"7px",
                        color:"white"
                    }} onClick={handleDeleteProcedure}>
                       Delete
                    </Button>
                        <Button style={{
                            backgroundColor:"#111F75",
                            margin:"7px",
                            color:"white"
                        }} onClick={handleClickOpen1} >Update</Button>
                        </>
                }
            </Card>
            <Dialog onClose={handleClose1} aria-labelledby="customized-dialog-title" open={open1} style={{backgroundColor: 'rgb(220,154,254)' }}>
                <DialogContent>
                            <ProcedureUpdateForm onUpdate={handleUpdatePhoto}    procedure={procedure} petTypes={petTypes}/>
                </DialogContent>
                <DialogActions style={{backgroundColor: 'rgb(220,154,254)' }}>
                    <Button autoFocus onClick={handleClose1} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >

                <DialogContent  style={{backgroundColor: 'rgb(220,154,254)' }}>


                    <div  className={styles.formItem} >
                     <label style={{padding : 10}} for='procedure'> Procedure: <Typography gutterBottom id='procedure'> {procedure.name_procedure} </Typography></label>
                        </div>
                    <ProcedureRegistrationForm
                        //TODO only pets that can do this procedure
                        procedure={procedure}
                        pets={pets}
                        masters={masters}
                        schedule={schedule}
                    />
                </DialogContent >
                <DialogActions style={{backgroundColor: 'rgb(220,154,254)' }}>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default ProcedureItem;