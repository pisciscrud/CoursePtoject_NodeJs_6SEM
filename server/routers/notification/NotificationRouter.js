const express = require('express');
const uuid = require('uuid');
const path = require('path');

const NotificationService = require('./NotificationService');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { allSockets} = require("../../ws/websocket");
const notificationRouter = express.Router();




const notificationService =  new NotificationService();

notificationRouter.put('/accept',roleMiddleware(["user"]), async(req,res,next)=>{
    try {

        const {notificationId}=req.body
        console.log('id',req.body)
        const notifications = await notificationService.updateNotification(notificationId);
        res.json(notifications)
    }
    catch (e)
    {
        next(e);
    }
})

notificationRouter.get('/',roleMiddleware(["user"]), async(req,res,next)=>{
    try {
        const idUser = req.userId
        const notifications = await notificationService.getNotifications(idUser);
        const notification1 = await notificationService.getNotionAboutRecord(idUser);
      
        if (notification1)
        {
            const socket = allSockets.find(item => item.userId = notification1.user_id)?.socket;

            if(socket) {
                socket.emit('admin-notification', { notification: notification1 })
            }
        }

        res.json(notifications)
    }
    catch (e)
    {
        next(e);
    }
})


notificationRouter.delete('/:id',roleMiddleware(["user"]),async (req,res,next)=>
{
    try
    {
        const {id} =req.params;

        const result = await notificationService.deleteNotification(id);
        res.json(result);
    }
    catch (e)
    {
        next(e);
    }

})





module.exports = notificationRouter