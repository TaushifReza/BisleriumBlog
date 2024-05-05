using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.UpVote
{
    public class UpVoteCreateDTO
    {
        [Required]
        public int BlogId { get; set; }
        public string? UserId { get; set; }
    }
}
