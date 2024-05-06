using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.DownVote
{
    public class DownVoteCreateDTO
    {
        [Required]
        public int BlogId { get; set; }
        public string? UserId { get; set; }
    }
}
