using Microsoft.AspNetCore.Http;

namespace BisleriumBlog.Models.DTOs
{
    public class BlogUpdateDTO
    {
        public string? Body { get; set; }
        public string? ImageUrl { get; set; }
        public IFormFile? BlogImage { get; set; }
    }
}
