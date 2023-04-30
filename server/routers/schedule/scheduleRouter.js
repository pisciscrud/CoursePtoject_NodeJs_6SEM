const express = require('express');

const path = require('path');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const ScheduleService = require("../schedule/ScheduleService");

const scheduleRouter = express.Router();

const scheduleService = new ScheduleService();
const {getWS,emitNotification, allSockets} = require("../../ws/websocket");

scheduleRouter.get(
    '/recordsOfUser',
    // async (req, res, next) => {
    //     console.log('scheduleRouter')
    //     next()
    // },
    roleMiddleware(["user"]),
    async (req,res,next)=> {
        try
        {
            const idUser= req.userId;
           // console.log(idUser);
            const recordsOfUser = await scheduleService.getRecordsOfUser(idUser);
          //  console.log(recordsOfUser)

            res.json(recordsOfUser);
        }
        catch (e)
        {
            console.log('Error scheduleRouter')
            next(e)
        }
    }
)

scheduleRouter.get('/all',async (req,res,next)=>
{
    try {
        const records =  await scheduleService.getAllRecords()
        res.json(records);
    }
    catch (e)
        {}


})

scheduleRouter.get('/current-day',roleMiddleware (["admin"]), async  (req,res,next)=>
{
    try {
        const records =  await scheduleService.getCurrentDay();
       // console.log('records', records);
        res.json(records);
    }
    catch (e)
    {}


})


scheduleRouter.get('/update-records',async(req,res,next)=>
{


  //  console.log('dfds')
    return await scheduleService.updateStatusRecord();

})


scheduleRouter.get('/waiting',roleMiddleware(["admin"]),async (req,res,next)=>
{
    try
    {
        const records = await scheduleService.getWaitingRecords();
        res.json(records);
    }
    catch(e)
    { next(e);}

})

scheduleRouter.get('/:id',async (req,res,next)=>
{
    try
    {
        const {id}=req.params;
        const records =  await scheduleService.getRecordsForProcedure(id)
        res.json(records);

    }
    catch (e)
    {}
})
scheduleRouter.post('/submit',roleMiddleware(["user"]),async (req,res,next)=>
{
    try
    {
        const idUser= req.userId;
        const {pet_id,master_id,procedure_id,date_,time}=req.body;
        //console.log(pet_id,master_id,procedure_id,date_,time)
        const recordForSubmit = await scheduleService.addRecordByUser(pet_id,master_id,procedure_id,idUser,date_,time)
        res.json(recordForSubmit);
    }
    catch(e)
    {
        next(e);

    }

})

scheduleRouter.post('/confirm',roleMiddleware(["admin"]),async (req,res,next)=>
{
    const ws = getWS()
    try
    {
         const {status_id,record_id} =req.body;

     const {updateRecord,createdNotification} = await scheduleService.confirmRecord(status_id,record_id)
   console.log(createdNotification);
        if (createdNotification) {
           // await emitNotification(ws, createdNotification.user_id, createdNotification)
          //  ws.emit('new-notification',{userId: createdNotification.user_id, notification: createdNotification})
        const socket = allSockets.find(item => item.userId = createdNotification.user_id).socket;

        if(socket) {
            socket.emit('admin-notification', { notification: createdNotification })
        }
        }
         return res.json(updateRecord);

    }
    catch(e)
    {
        next(e);

    }

})








module.exports=scheduleRouter
