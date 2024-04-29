using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models.ServiceModel;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BisleriumBlog.DataAccess.Service
{
    public class PhotoManager : IPhotoManager
    {
        private readonly CloudinarySettings _cloudinarySettings;
        private readonly Cloudinary _cloudinary;
        public PhotoManager(IOptions<CloudinarySettings> options)
        {
            this._cloudinarySettings = options.Value;
            Account account = new Account(_cloudinarySettings.CloudName, _cloudinarySettings.ApiKey, _cloudinarySettings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            ImageUploadResult uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }
            return uploadResult;
        }

        public async Task<bool> DeleteImageAsync(string imageUrl)
        {
            // Extract the public ID from the image URL
            var publicId = ExtractPublicIdFromUrl(imageUrl);

            var deleteParams = new DelResParams() {
                ResourceType = ResourceType.Image,
                PublicIds = new List<string>() { publicId }
            };
            var result = await _cloudinary.DeleteResourcesAsync(deleteParams);

            return result.DeletedCounts.Count > 0;
        }

        private string ExtractPublicIdFromUrl(string imageUrl)
        {
            // Implement your logic to extract the public ID from the image URL
            // Example: https://res.cloudinary.com/demo/image/upload/sample.jpg
            // Public ID: sample
            // http://res.cloudinary.com/dwzhyrwcu/image/upload/v1714309172/ypiubgneciqbf1bmplnk.png

            var publicId = imageUrl.Split("/")[^1].Split(".")[0];

            return publicId;
        }
    }
}