import React,{useState} from 'react';
import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";
import styles from './main.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FormControl, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@material-ui/core/Button';
import  {onDeleteNotification} from '../actions/comments'


function formatDate(dateStr) {
    const date = parseISO(dateStr);
    console.log(date)
    return formatDistance(date, new Date(), { addSuffix: true });
}
const NotificationItem = ({notification, updateNotificationStatus,onDelete}) => {
    const [accepted, setAccepted] = useState(notification.accepted);
    const handleCheckboxChange = (event) => {
        const newStatus = event.target.checked;
        updateNotificationStatus(notification.id);
        setAccepted(newStatus);
    };

    const handleDelete = async ()=>
    {
        const res = onDelete(notification)
       // const res = await onDeleteNotification(notification.id);
        return res;

    }

    return (
    
        <>
        { !accepted  &&
            
            <div className={styles.notAcceptedNotification} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <p style={{ marginRight: 5, fontSize: '16px' }}>New! </p>
            </div>
            <div >
              <p style={{ margin: 0, fontSize: '14px' }}>{notification.content}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#9B9B9B' }}>{formatDate(notification.date_)}</p>
            </div>
            <FormControl style={{ marginLeft: 20 }}>
              <FormControlLabel control={
                <Tooltip title="Mark as read">
                  <Checkbox color="secondary"  onChange={handleCheckboxChange}/>
                </Tooltip>
              }/>
            </FormControl>
          </div>
            }
            {
                accepted  &&


            <div className={styles.acceptedNotification} >
           
                <p style={{ margin: 0, fontSize: '12px' }}>{notification.content}</p>
                <div style={{ display:'flex', flexDirection:'row', marginLeft:230}}>
                <p style={{ fontSize: '12px', color: '#9B9B9B'}}>{formatDate(notification.date_)}
                    <button onClick={handleDelete} style={{ border: 'none'}}> <ClearIcon style={{fontSize:'medium' ,color: '#9B9B9B'}}/></button>
                </p>
               </div>
            </div>

            }
        </>
    );
};

export default NotificationItem;