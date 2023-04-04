const express = require('express');

const path = require('path');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const ScheduleService = require("../schedule/ScheduleService");

const scheduleRouter = express.Router();

const scheduleService = new ScheduleService();

scheduleRouter.post('/submit',roleMiddleware(["user"]),async (req,res,next)=>
{
    try
    {
        const idUser= req.userId;
        const {pet_id,master_id,procedure_id,date_}=req.body;
        const recordForSubmit = await scheduleService.addRecordByUser(pet_id,master_id,procedure_id,idUser,date_)
        res.json(recordForSubmit);
    }
    catch(e)
    {
        next(e);

    }

})

scheduleRouter.get('/recordsOfUser', async (req,res,next)=>
{
    try
    {
        const idUser= req.userId;
        const recordsOfUser = await scheduleService.getRecordsOfUser( idUser);
        res.json(recordsOfUser);

    }
    catch (e)
    {
        next(e)
    }
})







module.exports=scheduleRouter
