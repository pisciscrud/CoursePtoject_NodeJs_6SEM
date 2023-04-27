const express = require('express');
const uuid = require('uuid');
const path = require('path');

const NotificationService = require('./NotificationService');
const roleMiddleware = require("../../middlewares/roleMiddleware");

const notificationRouter = express.Router();




const notificationService =  new NotificationService();

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