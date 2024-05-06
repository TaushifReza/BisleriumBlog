
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.Models.DTOs.DownVote
{
    public class DownVoteDTO
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
