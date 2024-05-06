using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.Comment
{
    public class CommentCreateDTO
    {
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public int BlogId { get; set; }
        public int? ParentCommentId { get; set; }
        public string? UserId { get; set; }
    }
}
