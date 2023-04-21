const express = require('express');

const path = require('path');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const ScheduleService = require("../schedule/ScheduleService");

const scheduleRouter = express.Router();

const scheduleService = new ScheduleService();


scheduleRouter.get(
    '/recordsOfUser',
    async (req, res, next) => {
        console.log('scheduleRouter')
        next()
    },
    roleMiddleware(["user"]),
    async (req,res,next)=> {
        try
        {
            const idUser= req.userId;
            console.log(idUser);
            const recordsOfUser = await scheduleService.getRecordsOfUser(idUser);
            console.log(recordsOfUser)

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
        console.log('records', records);
        res.json(records);
    }
    catch (e)
    {}


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
        console.log(pet_id,master_id,procedure_id,date_,time)
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
    try
    {
         const {status_id,record_id} =req.body;

         const confirm = await scheduleService.confirmRecord(status_id,record_id)
         return res.json(confirm);

    }
    catch(e)
    {
        next(e);

    }

})








module.exports=scheduleRouter
