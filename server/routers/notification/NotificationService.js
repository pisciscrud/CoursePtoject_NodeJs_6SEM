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