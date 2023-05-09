import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import styles from './main.module.css'
import {fetchNotifications} from '../actions/comments'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HistoryIcon from '@mui/icons-material/History';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
const MenuUser = () => {
    const [invisible, setInvisible] = React.useState(true);
    const [notifications,setNotifications]=React.useState([]);

    useEffect(() => {
        fetchNotifications().then(res => {
            console.log('res',res)
            setNotifications(res);
            filterNotifications(res);
        });
    }, [invisible]);



    const filterNotifications = (res)=>
    {
        const filteredNotifications = res.filter(notification => notification.accepted === false);
        console.log('filteredNotifications',filteredNotifications)
        if (filteredNotifications.length === 0) {
            setInvisible(true);
        } else {
            setInvisible(false);
        }
    }



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div  className={styles.Menu}

              style={{ flexDirection: 'column' }}
        >

               <Button  className={styles.userLink} aria-haspopup="true" onClick={handleClick}>
                   My events
               </Button>
               <Menu
                   id="simple-menu"
                   anchorEl={anchorEl}
                   keepMounted
                   open={Boolean(anchorEl)}
                   onClose={handleClose}
                   style={{ flexDirection: 'column' }}

               >
                   <Link className={styles.userLink}   to="schedule/1">
                       <AccessTimeIcon/>
                        Waiting</Link>
                   <Link className={styles.userLink}   to="schedule/2">
                       <SentimentSatisfiedAltIcon/>
                        In progress</Link>
                   <Link className={styles.userLink}   to="schedule/3">
                       <SentimentVeryDissatisfiedIcon/>
                       Rejected</Link>
                   <Link className={styles.userLink}   to="schedule/4">
                       <HistoryIcon/>
                       History</Link>
               </Menu>



            <Link  className={styles.userLink}   to="pets">   MY PETS    </Link>

            <Link className={styles.userLink}   to="notifications"> NOTIFICATIONS
                <Badge color="secondary" variant="dot" invisible={invisible}>
                  <MailIcon />
            </Badge>
            </Link>

        </div>
    );
};

export default MenuUser;