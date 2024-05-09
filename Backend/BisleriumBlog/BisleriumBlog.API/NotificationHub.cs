using Microsoft.AspNetCore.SignalR;

namespace BisleriumBlog.API
{
    public class NotificationHub : Hub
    {
        public void SendNotification(string message)
        {
            Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}
