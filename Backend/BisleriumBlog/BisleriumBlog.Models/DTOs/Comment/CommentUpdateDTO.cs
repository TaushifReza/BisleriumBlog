using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.Comment
{
    public class CommentUpdateDTO
    {
        [Required]
        [StringLength(500)]
        public string Content { get; set; } = string.Empty;
    }
}
