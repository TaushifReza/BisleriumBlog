using Microsoft.AspNetCore.SignalR;

namespace BisleriumBlog.DataAccess
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string notificationType, string notificationMessage)
        {
            await Clients.All.SendAsync("ReceiveNotification", notificationType, notificationMessage);
        }
    }
}
