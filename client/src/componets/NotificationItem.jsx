import React,{useState} from 'react';
import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";
import styles from './main.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FormControl, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';


function formatDate(dateStr) {
    const date = parseISO(dateStr);
    console.log(date)
    return formatDistance(date, new Date(), { addSuffix: true });
}
const NotificationItem = ({notification, updateNotificationStatus}) => {
    const [accepted, setAccepted] = useState(notification.accepted);
    const handleCheckboxChange = (event) => {
        const newStatus = event.target.checked;
        updateNotificationStatus(notification.id);
        setAccepted(newStatus);
    };
    return (
    
        <>
        { !accepted  &&
            
            <div className={styles.notAcceptedNotification} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <p style={{ marginRight: 5, fontSize: '16px' }}>New!  </p>
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
                <div>

            <div className={styles.acceptedNotification} >
           
                <p style={{ margin: 0, fontSize: '16px' }}>Admin change status of record for  procedure</p>
                <p style={{ marginRight:15, fontSize: '12px', color: '#9B9B9B' }}>{formatDate(notification.date_)}
                <DoneAllIcon  style={{ marginLeft:300}}/>
                </p>

            </div>
        </div>
            }
        </>
    );
};

export default NotificationItem;