using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs
{
    public class CategoryCreateDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(500)]
        public string? Description { get; set; }
        public string? UserId { get; set; }
    }
}
