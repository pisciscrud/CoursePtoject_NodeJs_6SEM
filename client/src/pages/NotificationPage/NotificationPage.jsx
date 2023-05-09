import React,{useEffect,useState}  from 'react';
import socket from '../../socket'
import jwtDecode from 'jwt-decode';
import {fetchNotifications} from '../../actions/comments'
import NotificationItem  from "../../componets/NotificationItem";
import {Grid} from "@material-ui/core";
import axios from 'axios'
import {authHeader }from '../../actions/procedure'
//const jwt = require('jsonwebtoken');
const getIdFromToken = ()=>{
    const token = localStorage.getItem('token').trim();
    const {id} = jwtDecode(token);
    return id;
}




const NotificationPage = () => {
    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{

        if(getIdFromToken()) {

            socket.emit('subscribe', { userId: getIdFromToken() })
            socket.on('admin-notification', (data) => {
                
                setNotifications((notifications)=>[...notifications,data.notification])
            })
        }
        fetchNotifications().then((res)=>{

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


    const updateNotificationStatus = async (notificationId) => {

      return await  axios.put(`/api/notifications/accept`,{notificationId},{headers: authHeader()});
      };

    return (
        <div>

        {notifications &&  notifications.map((notification) => (
        
                <NotificationItem key={notification.id}   updateNotificationStatus={updateNotificationStatus} notification={notification}  />

        ))}

        </div>
    );
};

export default NotificationPage;