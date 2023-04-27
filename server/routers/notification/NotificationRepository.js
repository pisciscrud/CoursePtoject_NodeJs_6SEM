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


}
module.exports=NotificationRepository;