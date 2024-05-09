using Microsoft.AspNetCore.SignalR;

namespace BisleriumBlog.DataAccess.Service.IService
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendNotificationAsync(string blogOwnerId, string notificationType, string notificationMessage)
        {
            await _hubContext.Clients.User(blogOwnerId).SendAsync("ReceiveNotification", notificationType, notificationMessage);
        }
    }
}
