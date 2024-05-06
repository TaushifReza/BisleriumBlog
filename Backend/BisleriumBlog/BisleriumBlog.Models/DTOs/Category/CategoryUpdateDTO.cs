using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.Category
{
    public class CategoryUpdateDTO
    {
        [StringLength(100)]
        public string? Name { get; set; } = string.Empty;
        [StringLength(500)]
        public string? Description { get; set; }
    }
}
