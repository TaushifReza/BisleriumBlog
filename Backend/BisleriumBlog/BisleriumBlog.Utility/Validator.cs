using Microsoft.AspNetCore.Http;

namespace BisleriumBlog.Utility
{
    public static class Validator
    {
        public static bool ValidateImageFile(IFormFile file, out string errorMessage, double maxSizeInMegabytes = 3)
        {
            errorMessage = string.Empty;
            // Get the file extension
            string fileExtension = Path.GetExtension(file.FileName).ToLower();

            // Define the list of allowed image file extensions
            var allowedExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };

            // Check if the file extension is allowed
            if (!allowedExtensions.Contains(fileExtension))
            {
                var allowedExtensionsString = string.Join(", ", allowedExtensions);
                errorMessage = $"Only image files with extensions {allowedExtensionsString} are allowed. Please provide a valid image file.";
                return false;
            }

            // Convert file size from bytes to megabytes
            var fileSizeInMegabytes = Math.Round((double)file.Length / (1024 * 1024), 2);

            if (fileSizeInMegabytes > maxSizeInMegabytes)
            {
                // Throw error if file size is larger than the specified maximum size
                errorMessage = $"Image size cannot be larger than {maxSizeInMegabytes} MB. The provided file size is {fileSizeInMegabytes} MB.";
                return false;
            }

            return true;
        }
    }
}
