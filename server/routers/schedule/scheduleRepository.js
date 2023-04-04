const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class ScheduleRepository
{
    constructor()
    {
        this.prismaClient=DbClient;
    }

    async addRecord(pet_id,master_id, procedure_id, owner_id, date_)
    {
        try
        {


           const dat = new Date(date_);
            const rec = await this.prismaClient.Schedule.findFirst({
                where: {
                    master_id:master_id,
                    procedure_id:procedure_id,
                    date_:dat,
                }
            })

            const  connectionBetweenMasterAndProcedure = await this.prismaClient.Master_to_Procedure.findFirst(
                {
                    where :{
                        master_id:master_id,
                        procedure_id:procedure_id,
                    }
                }
            )

            const pet = await this.prismaClient.Pet.findUnique(
                {
                    where : {
                        id : pet_id
                    }
                }
            )


            const connectionProcedureWhithType = await this.prismaClient.Procedure_to_pet.findFirst({
                where:{
                    pet_id : pet.pet_type_id,
                    procedure_id:procedure_id
                }
            })



            console.log(rec,connectionBetweenMasterAndProcedure,connectionProcedureWhithType);
           if  (!rec && connectionBetweenMasterAndProcedure && connectionProcedureWhithType)
            {
                const record = await this.prismaClient.Schedule.create({
                    data: {
                        pet_id,
                        master_id,
                        procedure_id,
                        owner_id,
                        date_:dat,
                        status_id: 1
                    }
                })
            }
            else
            {
                 throw new Error("sorry in this time master is busy")
            }

        }
        catch(e)
        {
            throw createError(500,"Db Error"+e.message);

        }
    }

 async confirmByAdmin(idRecord,idStatus)
 {

     try
     {
       const updateRecord = await this.prismaClient.schedule.update({
           where:{
               id :idRecord
           },
           data :{
               status_id:idStatus
           }
       })

         return updateRecord;


     }
     catch(e)
     {

         throw createError(500,"Db Error"+e.message);
     }

 }

 async deleteRecord(idRecord)
 {
     try
     {
         await this.prismaClient.Schedule.delete({
             where:{
                 id:idRecord
             }
         })
         return true;
     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);

     }

 }



 async getRecordsOfUser(idUser)
 {
     try
     {

        await this.prismaClient.Schedule.findMany({
            where: {
                owner_id: idUser
            }
        })

     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);
     }

 }


}

module.exports=ScheduleRepository;