namespace BisleriumBlog.Models.DTOs.CommentDisLike
{
    public class CommentDisLikeDTO
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
