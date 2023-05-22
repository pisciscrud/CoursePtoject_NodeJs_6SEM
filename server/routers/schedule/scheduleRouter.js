const express = require('express');

const path = require('path');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const ScheduleService = require("../schedule/ScheduleService");

const scheduleRouter = express.Router();

const scheduleService = new ScheduleService();
const {getWS,emitNotification, allSockets} = require("../../ws/websocket");

scheduleRouter.get(
    '/recordsOfUser/:id',
    // async (req, res, next) => {
    //     console.log('scheduleRouter')
    //     next()
    // },
    roleMiddleware(["user"]),
    async (req,res,next)=> {
        try
        {
            const idUser= req.userId;
            const id= req.params;

            const recordsOfUser = await scheduleService.getRecordsOfUser(idUser,id.id);


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
scheduleRouter.get('/date',roleMiddleware(["admin"]),async(req,res,next)=>
{
    try
    {
        const date = req.query.date
        const result= await scheduleService.getRecordsOfDay(date);
        res.json(result);
    }
    catch (e)
    {
        next(e)
    }
})

scheduleRouter.get('/graphic',roleMiddleware(["user"]),async (req,res,next)=> {
    try {
        const idUser = req.userId;
        console.log('aaa',req.userId)
        const result = await scheduleService.procedureForPets(idUser);
        res.json(result);
    }
    catch(e)
    {
        next(e);
    }
})

scheduleRouter.get('/graphic/circle-diagram',roleMiddleware(['admin']), async (req,res,next)=>
{
    try
    {
        const result = await scheduleService.getProcedures();
        res.json(result);


    }
    catch(e)
    {
        next(e);
    }
})
scheduleRouter.get('/graphic/masters',roleMiddleware(['admin']),async (req,res,next)=>
{
    try
    {
        const result = await scheduleService.getStatisticAboutMaster();
        res.json(result);
    }
    catch(e)
    {
        next(e);
    }
})


scheduleRouter.get('/graphic/status',roleMiddleware(['admin']),async (req,res,next)=>
{
    try
    {
        const result = await scheduleService.getStatusStatistic();
        res.json(result);
    }
    catch(e)
    {
        next(e);
    }
})


scheduleRouter.get('/graphic/rating',roleMiddleware(['admin']),async (req,res,next)=>
{
    try
    {
        const result = await scheduleService.getRatingStatistic();
        res.json(result);
    }
    catch(e)
    {
        next(e);
    }
})

scheduleRouter.get('/nearest',roleMiddleware(['user']),async (req,res,next)=>
{
    try
    {


        const idUser= req.userId;
        const record = await scheduleService.nearestForUser(idUser)
        res.json(record);
    }
    catch(e) {
        next(e)
    }
})

scheduleRouter.get('/current-day',roleMiddleware (["admin"]), async  (req,res,next)=>
{
    try {
        const records =  await scheduleService.getCurrentDay();

        res.json(records);
    }
    catch (e)
    {}


})





scheduleRouter.get('/update-records',async(req,res,next)=>
{

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

        const recordForSubmit = await scheduleService.addRecordByUser(pet_id,master_id,procedure_id,idUser,date_,time)
        res.json(recordForSubmit);
    }
    catch(e)
    {

        res.status(400).json(e.message);

    }

})


scheduleRouter.delete('/:id',roleMiddleware(["user"]),async (req,res,next)=>
{
    try
    {
        const idNote=req.params.id;
        const result = await scheduleService.deleteUserRecord(idNote);
        return res.json(result);
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
