const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class ScheduleRepository
{
    constructor()
    {
        this.prismaClient=DbClient;
    }

    async addRecord(pet_id, master_id, procedure_id, owner_id, date_,time)
    {
        try
        {
           const dat = new Date(date_);
            const t = Number(time.substring(0,2));
            const time1 = new Date(null);
            time1.setUTCHours(t)


            const rec = await this.prismaClient.Schedule.findFirst({
                where: {
                    master_id:master_id,
                    procedure_id:procedure_id,
                    date_:dat,
                    time:time
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

           if (pet) {
               const connectionProcedureWithType = await this.prismaClient.Procedure_to_pet.findFirst({
                   where: {
                       pet_id: pet.pet_type_id,
                       procedure_id: procedure_id
                   }
               })

               if  (!rec && connectionBetweenMasterAndProcedure && connectionProcedureWithType)
               {
                   const record = await this.prismaClient.Schedule.create({
                       data: {
                           pet_id,
                           master_id,
                           procedure_id,
                           owner_id,
                           date_:dat,
                           status_id: 1,
                           time:time
                       }
                   })
                   return record;
               }

               else
               {
                   throw new Error("sorry in this time master is busy")
               }
           }




           // if  (!rec && connectionBetweenMasterAndProcedure && connectionProcedureWhithType)
           //  {
           //      const record = await this.prismaClient.Schedule.create({
           //          data: {
           //              pet_id,
           //              master_id,
           //              procedure_id,
           //              owner_id,
           //              date_:dat,
           //              status_id: 1,
           //              time:time
           //          }
           //      })
           //      return record;
           //  }
           //
           //  else
           //  {
           //       throw new Error("sorry in this time master is busy")
           //  }

        }
        catch(e)
        {
            throw createError(500,"Db Error"+e.message);

        }
    }

 async confirmByAdmin(status_id,record_id)
 {
     console.log('st',status_id)
     try
     {
       const updateRecord = await this.prismaClient.schedule.update({
           where:{
               id :record_id
           },
           data :{
               status_id: status_id
           }
       })
           console.log('update',updateRecord)
         return updateRecord;


     }
     catch(e)
     {

         throw createError(500,"Db Error"+e.message);
     }

 }

 async getWaitingRecords ()
 {
     try
     {
         const records = await this.prismaClient.schedule.findMany(
             {
                 where:
                     {
                         status_id: 1

                     },
                 include:
                     {
                         Procedure_table:true,
                         User_table:
                             {
                                 select :
                                     {
                                         full_name:true,
                                     }
                             },
                         Master:true,
                         Pet:true
                     }
             })
         return records;
     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);
     }
 }




 async getRecords()
 {
     try
     {
         const records = await this.prismaClient.schedule.findMany(
             {
                 where :
                     {
                         status_id:
                             {
                                 not : 3
                             }
                     },
                 include:
                    {
                        Procedure_table:true,
                        User_table:
                            {
                                select :
                                    {
                                        full_name:true,
                                    }
                            },
                        Master:true,
                        Pet:true
                    }
             }
         )
         return records;

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

 async getAllRecordsOfDate(date){
        try
        {
         const records =   await this.prismaClient.Schedule.findMany(
             {
                where:{
                    date_:date
                },
                include:
                {
                    User_table: true,
                        Procedure_table: true
                }

            }
         )
            return records;
        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);

        }
 }




 async getRecordsForProcedures(id)
 {
     try
     {
         const records= await this.prismaClient.Schedule.findMany(
             {
                 where :
                     {
                         procedure_id:id
                     }
             }
         )
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

      const records =   await this.prismaClient.Schedule.findMany({
            where: {
                owner_id: idUser
            },
          select :
              {
                  id:true,
                  date_:true,
                  time:true,
                  Procedure_table:{
                      select : {
                          id:true,
                         name_procedure: true
                      }
                  },
                  Master :
                      {
                          select :
                              {
                                  id:true,
                                  name_master:true,
                                  surname_master:true
                              }
                      },
                  Pet:
                      {
                          select :
                              {
                                  nickname:true
                              }
                      },
                  Status :
                      {
                         select :
                             {status_name:true}
                      },


              }
        })
         console.log(records)
      return records;
     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);
     }

 }


}

module.exports=ScheduleRepository;