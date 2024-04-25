using BisleriumBlog.Models.ServiceModel;

namespace BisleriumBlog.DataAccess.Service.IService
{
    public interface IEmailService
    {
        public Task SendEmailAsync(MailRequest mailRequest);
    }
}
