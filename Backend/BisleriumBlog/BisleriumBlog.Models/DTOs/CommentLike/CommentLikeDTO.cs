namespace BisleriumBlog.Models.DTOs.CommentLike
{
    public class CommentLikeDTO
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
