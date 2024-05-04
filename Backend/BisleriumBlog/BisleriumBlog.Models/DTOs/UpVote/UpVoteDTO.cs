using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.Models.DTOs.UpVote
{
    public class UpVoteDTO
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
