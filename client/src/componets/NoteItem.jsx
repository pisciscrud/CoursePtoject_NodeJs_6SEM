import React from 'react';
import styles from './main.module.css'
import CommentForm from "./CommentForm";
import io from "socket.io-client";
import {Button, CardMedia} from "@material-ui/core";


import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import {withStyles} from "@material-ui/core/styles";
import ProcedureRegistrationForm from "./ProcedureRegistrationForm";
// Before the component definition:
const socket = io.connect("http://localhost:5000");
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




const NoteItem = ({note}) => {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function  getTime(time) {
        const month = time.getMonth() + 1;
        const time1 = time.getFullYear()  +'-'+  month + '-' + time.getUTCDate()
     
        return time1;
    }

    return (

        <div className={styles.noteCard}>


            <div className={styles.noteCardBody}>
                <span className={styles.noteCardNameProcedure }>{note.Procedure_table.name_procedure}</span>
                <span>Master: {note.Master.name_master}</span>
                <span> {note.Master.surname_master}</span>
                <span>Pet: {note.Pet.nickname}</span>
            </div>
            <p>
                
                {
                    note.Status.status_name==='In progress' && <span className={styles.waiting}>{note.Status.status_name}</span>
                }
                {
                    note.Status.status_name==='Denied' && <span className={styles.denied}>{note.Status.status_name}</span>
                }
                {
                    note.Status.status_name==='Approved' && <span className={styles.approved}>{note.Status.status_name}</span>
                }


            </p>
            {
                note.Status.status_name==='Сompleted' &&
              <div >
                <CommentIcon/>
                <Button  style={{
                    margin:"10px"
                }} variant="outlined" size="small" color="primary"  onClick={handleClickOpen}>
               Send comment
                </Button>
                </div>
            }

            <div className={styles.noteCardFooter}>
                <span>{getTime(new Date(note.date_))}</span>

                <span>{note.time}</span>
            </div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                <DialogTitle>
                  Send comment
                </DialogTitle>
                <DialogContent >
                    {/*<CardMedia  style={{width:"450px",height:"200px"}} className={classes.media}   image={`http://localhost:5000/${master.photo_master}`}></CardMedia>*/}
                    <Typography gutterBottom>
                        <p>
                        Procedure: {note.Procedure_table.name_procedure}
                        </p>
                        <p>
                         Master:   {note.Master.name_master}   {note.Master.surname_master}
                        </p>
                    </Typography>
                    <CommentForm
                        //TODO only pets that can do this procedure
                    note={note}
                    />
                </DialogContent >
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


export default NoteItem;
