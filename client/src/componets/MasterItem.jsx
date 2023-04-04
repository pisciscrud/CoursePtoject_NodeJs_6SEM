import React from 'react';
import {Row} from "react-bootstrap";

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActionArea, CardMedia,Button ,Modal} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        width: 200,
        margin:30,

    },
    media: {
        height: 140,

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





const MasterItem = ({master}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (


<div>
            <Card className={classes.root}>
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:5000/${master.photo_master}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <h2>{master.name_master}</h2>
                    <p>{master.surname_master}</p>
                </CardContent>
                    <Button  style={{
                        margin:"10px"
                    }} variant="outlined" size="small" color="primary"  onClick={handleClickOpen}>
                        Learn More
                    </Button>
                </CardActionArea>
            </Card>

    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
           Master
        </DialogTitle>
        <DialogContent dividers>
            <CardMedia  style={{width:"450px",height:"200px"}} className={classes.media}   image={`http://localhost:5000/${master.photo_master}`}></CardMedia>
            <Typography gutterBottom>
              <p>{master.name_master} {master.surname_master}</p>
            </Typography>
            <Typography gutterBottom>
                <p>Description:</p>
                <p>{master.description}</p>
            </Typography>
            <Typography gutterBottom>
                <p>Procedures:</p>
                <p>{master.Master_to_Procedure.map(info=>
                    <li key={info.Procedure_table.id}>
                    {info.Procedure_table.name_procedure}
                </li>)}</p>
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
</div>
    );
};

export default MasterItem;
