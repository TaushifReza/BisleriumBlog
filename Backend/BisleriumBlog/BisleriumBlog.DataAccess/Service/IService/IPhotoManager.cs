using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace BisleriumBlog.DataAccess.Service.IService
{
    public interface IPhotoManager
    {
        public Task<ImageUploadResult> UploadImageAsync(IFormFile file);
        public Task<bool> DeleteImageAsync(string imageUrl);
    }
}
