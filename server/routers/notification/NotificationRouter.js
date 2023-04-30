const express = require('express');
const uuid = require('uuid');
const path = require('path');

const NotificationService = require('./NotificationService');
const roleMiddleware = require("../../middlewares/roleMiddleware");

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
        res.json(notifications)
    }
    catch (e)
    {
        next(e);
    }
})



module.exports = notificationRouter