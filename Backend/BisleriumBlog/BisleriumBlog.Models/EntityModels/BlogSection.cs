using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BisleriumBlog.Models.EntityModels
{
    public class BlogSection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int Order { get; set; }
        [Required]
        public ContentSectionType Type { get; set; }
        [Required]
        public string Content { get; set; } = string.Empty; // Text content or image URL/path
        [Required]
        [ForeignKey(nameof(Blog))]
        public int BlogId { get; set; }
        public Blog Blog { get; set; }
    }
}
