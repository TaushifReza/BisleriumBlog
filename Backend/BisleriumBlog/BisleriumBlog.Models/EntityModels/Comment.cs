using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.EntityModels
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(500)]
        public string Content { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(Blog))]
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
        [ForeignKey(nameof(ParentComment))]
        public int? ParentCommentId { get; set; }
        public Comment ParentComment { get; set; }
        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User User { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public int LikeCount { get; set; } = 0;
        public int DisLikeCount { get; set; } = 0;
    }
}
