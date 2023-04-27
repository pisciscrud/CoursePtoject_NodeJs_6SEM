import React,{useEffect,useState}  from 'react';
import socket from '../../socket'
import jwtDecode from 'jwt-decode';
import {fetchNotifications} from '../../actions/comments'
import NotificationItem  from "../../componets/NotificationItem";
import {Grid} from "@material-ui/core";
//const jwt = require('jsonwebtoken');
const getIdFromToken = async()=>{
    const token = localStorage.getItem('token').trim();
    const {id} = jwtDecode(token);
    return id;
}




const NotificationPage = () => {
    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{

        // async function fetchNotifications() {
        //     try {
        //         const response = await axios.get('http://localhost:5000/api/notifications');
        //         console.log(response.data)
        //         setNotifications(response.data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        fetchNotifications().then((res)=>{
            console.log(res);
            setNotifications(res)});
        socket.on('new-notification', (res) => {
           getIdFromToken().then((id) => {
               if (id===res.userId)
               {
                   setNotifications((notifications)=>[...notifications,res.notification])
               }
            });
        })


    },[])


    function handleClick(notification) {
        if (!notification.accepted) {

            const updatedNotifications = notifications.map((n) => {
                if (n.id === notification.id) {
                    return { ...n, accepted: true };
                } else {
                    return n;
                }
            });
            setNotifications(updatedNotifications);
        }
    }
    return (
        <div>

        {notifications &&  notifications.map((notification) => (
                       //console.log(notification)
                <NotificationItem key={notification.id} notification={notification}  />

        ))}

        </div>
    );
};

export default NotificationPage;