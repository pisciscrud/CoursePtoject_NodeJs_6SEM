const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class NotificationRepository {
    constructor() {

        this.prismaClient = DbClient;
    }


    async sendNotificationAboutRecord(idUser) {
        try {
          const now = new Date();
          const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
          const tomorrow = new Date(
            now.getTime() + (24 * 60 * 60 * 1000) - (now.getTime() + timezoneOffset) % (24 * 60 * 60 * 1000)
          );
          tomorrow.setUTCHours(0);
      
          const nearestRecord = await this.prismaClient.Schedule.findMany({
            where: {
              owner_id: idUser,
              date_: tomorrow,
              status_id: 2
            },
            include: {
              Procedure_table: true,
              User_table: {
                select: {
                  full_name: true
                }
              },
              Master: true,
              Pet: true
            }
          });
      
          console.log('nearestRecord', nearestRecord);
      
          if (nearestRecord.length > 0) {
            if (nearestRecord.length === 1) {
              const not = await this.prismaClient.Notification.findFirst({
                where: {
                  user_id: idUser,
                  content: `You have an appointment for tomorrow at ${nearestRecord[0].time} for the procedure ${nearestRecord[0].Procedure_table.name_procedure}`
                }
              });
      
              if (!not) {
                const notification = await this.prismaClient.Notification.create({
                  data: {
                    date_: new Date(),
                    accepted: false,
                    user_id: idUser,
                    content: `You have an appointment for tomorrow at ${nearestRecord[0].time} for the procedure ${nearestRecord[0].Procedure_table.name_procedure}`
                  }
                });
      
                return notification;
              }
            } else {
              const not = await this.prismaClient.Notification.findFirst({
                where: {
                  user_id: idUser,
                  content: `You have ${nearestRecord.length} records for tomorrow`
                }
              });
      
              if (!not) {
                const notification = await this.prismaClient.Notification.create({
                  data: {
                    date_: new Date(),
                    accepted: false,
                    user_id: idUser,
                    content: `You have ${nearestRecord.length} records for tomorrow`
                  }
                });
      
                return notification;
              }
            }
          }
      
          return null;
        } catch (e) {
          throw createError(500, "Db Error" + e.message);
        }
      }
      



    async GetNotificationOfUser(id)
    {
        try
        {
            const notifications = await this.prismaClient.Notification.findMany(
                {
                  where:  {
                      user_id:id
                  }
                }
            );
            return notifications
        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }

    }

    async updateStatus(id)
    {
        try 
        {

            console.log(id)
            const notifications = await this.prismaClient.Notification.update(
                {
                  where:  {
                     id
                  },
                  data :
                  {
                    accepted: true
                  }
                }
            );

        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }

    async deleteNotification(id)
    {
        try
        {

        return  await this.prismaClient.Notification.delete(
            {
                where :
                    {
                        id:id
                    }
            }
        )

        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }


}
module.exports=NotificationRepository;