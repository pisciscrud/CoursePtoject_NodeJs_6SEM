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

            return  await this.scheduleRepository.addRecord(pet_id, master_id, procedure_id, owner_id, date_,time)

    }
    async updateStatusRecord()
    {

      return  await this.scheduleRepository.updateRecords();
    }




    async getCurrentDay()
    {
        try
        {
            const dateOfRecords = new Date();
            dateOfRecords.setUTCHours(0,0,0,0);
           const dat = dateOfRecords.toISOString()
            console.log('TODAY',dat);
            const res = await this.scheduleRepository.getAllRecordsOfDate(dateOfRecords);
            return res;
        }
        catch(e)
        {

            console.log('Error:', e.message);
        }
    }


    async getRecordsOfDay(date)
    {
        try
        {


            const dateOfRecords = new Date(date);
            dateOfRecords.setUTCHours(0);
            dateOfRecords.setUTCMinutes(0);
            dateOfRecords.setUTCSeconds(0);
            console.log('DOR',dateOfRecords);
            const res = await this.scheduleRepository.getRecordsOfDay(dateOfRecords)
            return res;
        }
        catch(e)
        {

            console.log('Error:', e.message);
        }

    }

    async  getRecordsOfUser(idUser,id)
    {
        try
        {
            return  await this.scheduleRepository.getRecordsOfUser(idUser,id)

        }
        catch (e)
        {
            console.log('Error:', e.message);
        }

    }


    async deleteUserRecord(id)
    {
        try
        {
            return  await this.scheduleRepository.deleteRecord(id)

        }
        catch (e)
        {
            console.log('Error:', e.message);
        }

    }

    async getAllRecords()
    {
        try
        {
            return  await this.scheduleRepository.getRecords()
        }
        catch (e)
        {
            console.log('Error:', e.message);
        }

    }


    async getWaitingRecords()
    {
        try {
            return await this.scheduleRepository.getWaitingRecords();
        }
        catch (e)
        {
            console.log('Error:', e.message);
        }

    }


    async getRecordsForProcedure(id)
    {
        try
        {
            return  await this.scheduleRepository.getRecordsForProcedures(id);
        }
        catch (e)
        {
            console.log('Error:', e.message);
        }
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


    async nearestForUser(id)
    {
        try
        {
            const record =await this.scheduleRepository.findNearest(id);
            return record;
        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }
    }


    async procedureForPets(id)
    {
        try
        {

            return await this.scheduleRepository.countProceduresForUserPets(id);

        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }
    }


    async getProcedures()
    {
        try
        {
            return await this.scheduleRepository.getCountProceduresFromSchedule();
        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }


    }

    async getStatisticAboutMaster()
    {
        try
        {
            return await this.scheduleRepository.getCountProceduresByMaster();
        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }
    }


    async getStatusStatistic()
    {
        try
        {
            return await this.scheduleRepository.getByStatusAllRecords()
        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }

    }


    async getRatingStatistic()
    {
        try
        {
            return await this.scheduleRepository.ratingStatisticForAdmin()
        }
        catch (e)
        {

            console.log('Error occurred while confirming record with ID:', 'Error:', e.message);
            // throw createError(500, "Database error occurred while confirming record!");
        }



    }








}

module.exports=ScheduleService;