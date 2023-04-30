const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class NotificationRepository {
    constructor() {

        this.prismaClient = DbClient;
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


}
module.exports=NotificationRepository;