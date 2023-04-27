

/*import {Row} from "react-bootstrap";*/

import axios from 'axios';
import MasterItem from "./MasterItem";
import React, { useState, useEffect } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Card, CardContent, CardHeader, Grid} from '@material-ui/core';
import Pagination from '../componets/Pagination';
import {useQuery} from "react-query";
import {deleteProcedure, getProceduresAll} from "../actions/procedure";
import styles from "./main.module.css";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";




import DialogActions from "@material-ui/core/DialogActions";
import MasterAddForm from "./MasterAddForm";
import {isAdmin} from "../actions/user";
import {fetchMasters,deleteMaster} from "../actions/master";


  const useStyles = makeStyles((theme) => ({
      root: {
          flexGrow: 1,
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
const MasterList = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const [masters, setMasters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage, setObjectsPerPage] = useState(4);
    const classes = useStyles();
    const indexOfLastObject = currentPage * objectsPerPage;
    const indexOfFirstObject = indexOfLastObject - objectsPerPage;
    const currentMasters = masters.slice(indexOfFirstObject, indexOfLastObject);

    const {refetch: refetchProcedures,data: procedures} = useQuery("procedures", () => getProceduresAll());

    const {data:isAdm} = useQuery("isAdm",()=>isAdmin())

    const {refetch:refetchMasters}=useQuery('masters',()=>fetchMasters())



    const handleAddMaster = async() =>
    {
        refetchMasters()
            .then((data) => {
                setMasters(data.data)})
        handleClose();
    }




    useEffect(() => {


        refetchMasters()
            .then((data)=>{
                setMasters(data.data)})
    }, [masters]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const  handleDeleteMaster =async (currentMaster)=>
    {
        if (  window.confirm (`Are you sure that want delete ${currentMaster.name_master} ${currentMaster.name_master} `))
        {
            const res =  await  deleteMaster(currentMaster.id);
            if (res.status === 200) {
                refetchMasters()
                    .then((data) => {

                        setMasters(data.data)})
            }
            return res;

        }

    }
    return (
        <div className={classes.root} >

            <Grid container>
                {currentMasters.map((master) => (
                    <MasterItem procedures={procedures} key={master.id} master={master} isAdm={isAdm}/>
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
                    Add Master
                </DialogTitle>
                <DialogContent >
                    <MasterAddForm  onAdd={handleAddMaster} procedures={procedures}></MasterAddForm>

                </DialogContent >
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
//</>
        //     <Pagination
        //         objectsPerPage={objectsPerPage}
        //         totalObjects={masters.length}
        //         currentPage={currentPage}
        //         onPageChange={handlePageChange}
        //     />
        //
        // </div>
    );
};



/*const MasterList = (() => {
    const [masters, setMasters] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/masters')
            .then(response => {
                    setMasters(response.data)
                  console.log(response.data)
                }
            )
            .catch(error => console.log(error));
    }, []);
    return (
        <Row className="d-flex mt-50">
            {masters.map(master => <MasterItem key={master.id} master={master} />)}
        </Row>
    );
});*/

export default MasterList;