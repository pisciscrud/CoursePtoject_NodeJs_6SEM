const jwt = require('jsonwebtoken');
const createError = require("http-errors");

const ScheduleRepository = require("../schedule/ScheduleRepository");

class ScheduleService
{
    constructor() {
        this.scheduleRepository =  new ScheduleRepository();
    }


    async addRecordByUser(pet_id,master_id, procedure_id, owner_id, date_, time)
    {
        try {
            const res = await this.scheduleRepository.addRecord(pet_id, master_id, procedure_id, owner_id, date_,time)
            return res;
        }
        catch (e)
        {
        console.log(e.message)
        }
    }


    async  getRecordsOfUser(idUser)
    {
        try
        {
            return  await this.scheduleRepository.getRecordsOfUser(idUser)

        }
        catch (e)
        {}

    }

    async getAllRecords()
    {
        try
        {
            return  await this.scheduleRepository.getAllRecordss();
        }
        catch (e)
        {}

    }

    async getRecordsForProcedure(id)
    {
        try
        {
            return  await this.scheduleRepository.getRecordsForProcedures(id);
        }
        catch (e)
        {}
    }



}

module.exports=ScheduleService;