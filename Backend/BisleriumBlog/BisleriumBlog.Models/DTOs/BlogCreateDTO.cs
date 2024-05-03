using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace BisleriumBlog.Models.DTOs
{
    public class BlogCreateDTO
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Body { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public string? UserId { get; set; }
        [NotMapped]
        public IFormFile? BlogImage { get; set; }
    }
}
