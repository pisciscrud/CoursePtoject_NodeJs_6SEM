const express = require('express');

const {DbClient,ScheduleScalarFieldEnum} = require("../../Db/DbClient");

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
           dat.setUTCHours(0,0,0)
            const t = Number(time.substring(0,2));
            const time1 = new Date(null);
            time1.setUTCHours(t);
            console.log(dat);

            const rec = await this.prismaClient.Schedule.findFirst({
                where: {
                    master_id:master_id,
                    procedure_id:procedure_id,
                    date_:dat,
                    time:time,
                    status_id:
                        {
                            in: [1,2]
                        }
                }
            })

            const recPet = await this.prismaClient.Schedule.findFirst(
                {
                    where :
                        {
                            pet_id: pet_id,
                            date_:dat,
                            time:time,
                            status_id:
                                {
                                    in: [1,2]
                                }

                        }
                }
            )


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

               if (recPet)
               {
                   throw new Error("sorry we already have record for this pet ")
               }


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
     //console.log('st',status_id)
     try
     {
       const updateRecord = await this.prismaClient.schedule.update({
           where:{
               id :record_id
           },
           data :{
               status_id: status_id
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






         //TODO send notifications

             const createdNotification = await this.prismaClient.Notification.create(
                 {
                     data:
                         {
                             date_  : new Date(),
                             accepted : false,
                             user_id:updateRecord.owner_id,
                             content:`Admin change status of your record on ${updateRecord.Procedure_table.name_procedure} for your pet ${updateRecord.Pet.nickname}`

                         }
                 }
             )

         //  console.log('update',updateRecord)
         return {updateRecord,createdNotification};


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




 async updateRecords()
 {
     try
     {
         const recordsToUpdate = await this.prismaClient.Schedule.findMany({
             where: { date_: { lte: new Date() } },
         });

        

         const updatedRecords = await this.prismaClient.Schedule.updateMany({
             where: { id: { in: recordsToUpdate.map(record => record.id) } },
             data: { status_id: 4 },
         });




         return updatedRecords
         
     }
     catch(e)
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

 async getRecordsOfDay(date) {
     try {
         const records = await this.prismaClient.Schedule.findMany(
             {
                 where: {
                     date_: date,
                     status_id:
                         {
                             in:[1,2,4]
                         }

                 },
                 include:
                     {
                         User_table: true,
                         Procedure_table: true
                     }

             }
         )
         return records;
     } catch (e) {

         throw createError(500, "Db Error" + e.message);

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



 async getRecordsOfUser(idUser,id)
 {
     try
     {

      const records =   await this.prismaClient.Schedule.findMany({
            where: {
                owner_id: idUser,
                status_id:Number(id)
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
        // console.log(records)
      return records;
     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);
     }

 }

 async findNearest (id)
 {
     try
     {
         const record =   await this.prismaClient.Schedule.findFirst({
             orderBy: { date_: 'asc' },
             where: {
                 owner_id: id,
                 date_: { gte: new Date() },
                 status_id:
                     {
                         in:[1,2]
                     }
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
         console.log('RECORD',record)

         return record;
     }
     catch (e)
     {
         throw createError(500,"Db Error"+e.message);
     }
 }

    async  countProceduresForUserPets(userId) {
        try {
            const pets = await this.prismaClient.Pet.findMany({
                where: { id_owner: userId },
                select: {
                    id: true,
                    nickname: true,
                    Schedule: {
                        select: {
                            id: true,
                        },
                        where: {
                            status_id: 4
                        }
                    }
                }
            });

            const result = pets.map(pet => ({
                name: pet.nickname,
                count: pet.Schedule.length
            }));


            console.log(result);
            return result

        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }

    }



    async  getCountProceduresFromSchedule() {
        try
        {
            const procedures = await this.prismaClient.Procedure_table.findMany({

                select: {
                    id: true,
                    name_procedure: true,
                    Schedule: {
                        select: {
                            id: true,
                        },
                        where: {
                            status_id: 4
                        }
                    }
                }
            });

            const result = procedures.map(procedure => ({
                name_procedure:procedure.name_procedure,
                count: procedure.Schedule.length
            }));
           // console.log(result);
            return result

        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }

    }


    async getCountProceduresByMaster()
    {
        try
        {
            const masters = await this.prismaClient.Master.findMany({

                select: {
                    id: true,
                    name_master: true,
                    surname_master:true,
                    Schedule: {
                        select: {
                            id: true,
                        },
                        where: {
                            status_id: 4
                        }
                    }
                }
            });
            const result = masters.map(m => ({
                master:`${m.name_master} ${m.surname_master}`,
                count: m.Schedule.length
            }));

            return result;


        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }

    }


    async getByStatusAllRecords()
    {
        try
        {
            const records = await this.prismaClient.Status.findMany({
                select: {
                    id: true,
                    status_name: true,
                    Schedule: {
                        select: {
                            id: true,
                        }
                    }

                }})
            const result = records.map(m => ({
                status:m.status_name,
                count: m.Schedule.length
            }));
            return result;


        }
        catch(e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }

    async ratingStatisticForAdmin()
    {

        try
        {
            const masters = await this.prismaClient.Master.findMany({
                select :
                    {
                        id:true,
                        name_master:true,
                        surname_master:true,
                    }
            });
            const comments = await this.prismaClient.Comments.groupBy({
                by: ['master_id'],
                _avg: {
                    rating: true,
                },
            });
            const mastersWithRating = masters.map((master) => {
                const masterRating = comments.find((comment) => comment.master_id === master.id);
                return {
                   master: `${master.name_master} ${master.surname_master}`,
                    rating: masterRating ? masterRating._avg.rating : 0,
                };
            });
            return mastersWithRating.sort((a, b) => a.rating - b.rating);
        }
        catch(e)
        {
            throw createError(500,"Db Error"+e.message);
        }

    }



}

module.exports=ScheduleRepository;