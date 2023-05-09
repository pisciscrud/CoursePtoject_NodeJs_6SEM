const NotificationRepository = require("./NotificationRepository");




class NotificationService
{
    constructor() {
        this.notificationRepository =  new NotificationRepository();
    }

    async getNotifications(id)
    {
        try
        {
            return this.notificationRepository.GetNotificationOfUser(id)

        }
        catch (e)
        {

        }

    }


    async deleteNotification (id)
    {
        try
        {
            return this.notificationRepository.deleteNotification(id)
        }
        catch (e)
        {

        }
    }

    async getNotionAboutRecord(idUser)
    {
        try
        {

            const notification = await this.notificationRepository.sendNotificationAboutRecord(idUser);
            return notification;

        }
        catch (e)
        {
           console.log('Error:', e.message);
            //throw createError(500, "Database error occurred while confirming record!");
        }
    }

    async updateNotification(id)
    {
        try 
        {
            return this.notificationRepository.updateStatus(id)
        }
        catch (e)
        {

        }
    }
}

module.exports=NotificationService;