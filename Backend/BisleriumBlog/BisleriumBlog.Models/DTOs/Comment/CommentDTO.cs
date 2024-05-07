using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.Comment
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int BlogId { get; set; }
        public EntityModels.Blog Blog { get; set; }
        public int? ParentCommentId { get; set; }
        public EntityModels.Comment? ParentComment { get; set; }
        public string UserId { get; set; }
        public EntityModels.User? User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int LikeCount { get; set; } = 0;
        public int DisLikeCount { get; set; } = 0;
    }
}
