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
    async updateStatusRecord()
    {
       //  console.log('frefre')
      return  await this.scheduleRepository.updateRecords();
    }




    async getCurrentDay()
    {
        try
        {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // разница в миллисекундах между UTC и локальным временем
            const today = new Date(now.getTime() - (now.getTime() + timezoneOffset) % (24 * 60 * 60 * 1000));
            const t = today.setUTCHours(0);
            console.log('today',t)
            const res = await this.scheduleRepository.getAllRecordsOfDate(today);
            return res;
        }
        catch(e)
        {

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
            return  await this.scheduleRepository.getRecords()
        }
        catch (e)
        {}

    }


    async getWaitingRecords()
    {
        try {
            return await this.scheduleRepository.getWaitingRecords();
        }
        catch (e)
        {

        }

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


    async confirmRecord(status_id,record_id)
    {
        try
        {
             const {updateRecord,createdNotification}=  await this.scheduleRepository.confirmByAdmin(status_id,record_id)
             return {updateRecord,createdNotification}
        }
        catch (e)
        {
            console.log('Error occurred while confirming record with ID:', record_id, 'Error:', error.message);
           // throw createError(500, "Database error occurred while confirming record!");
        }
        }



}

module.exports=ScheduleService;