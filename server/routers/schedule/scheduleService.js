const jwt = require('jsonwebtoken');
const createError = require("http-errors");

const ScheduleRepository = require("../schedule/ScheduleRepository");

class ScheduleService
{
    constructor() {
        this.scheduleRepository =  new ScheduleRepository();
    }


    async addRecordByUser(pet_id,master_id, procedure_id, owner_id, date_, status_id)
    {
        try {
            return this.scheduleRepository.addRecord(pet_id, master_id, procedure_id, owner_id, date_)
        }
        catch (e)
        {

        }
    }


    async  getRecordsOfUser(idUser)
    {
        try
        {
            return this.scheduleRepository.getRecordsOfUser(idUser)

        }
        catch (e)
        {}

    }



}

module.exports=ScheduleService;