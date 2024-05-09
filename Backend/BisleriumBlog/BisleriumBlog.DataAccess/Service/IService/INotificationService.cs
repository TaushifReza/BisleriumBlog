namespace BisleriumBlog.DataAccess.Service.IService
{
    public interface INotificationService
    {
        Task SendNotificationAsync(string blogOwnerId, string notificationType, string notificationMessage);
    }
}
