using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.CommentLike
{
    public class CommentLikeCreateDTO
    {
        [Required]
        public int CommentId { get; set; }
        public string? UserId { get; set; }
    }
}
