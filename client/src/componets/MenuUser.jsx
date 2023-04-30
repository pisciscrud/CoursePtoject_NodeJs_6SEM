import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import styles from './main.module.css'
import {fetchNotifications} from '../actions/comments'
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


    return (
        <div  className={styles.Menu}>
          <Link  className={styles.userLink} to="schedule">  My events </Link>
            <Link  className={styles.userLink}   to="pets">   My pets     </Link>
            <Link className={styles.userLink}   to="notifications"> My notifications  
                <Badge color="secondary" variant="dot" invisible={invisible}>
                  <MailIcon />
            </Badge>
            </Link>
        </div>
    );
};

export default MenuUser;