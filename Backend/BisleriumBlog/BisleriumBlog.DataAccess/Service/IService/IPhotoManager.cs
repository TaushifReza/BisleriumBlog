using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;


namespace BisleriumBlog.DataAccess.Service.IService
{
    public interface IPhotoManager
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);
    }
}
