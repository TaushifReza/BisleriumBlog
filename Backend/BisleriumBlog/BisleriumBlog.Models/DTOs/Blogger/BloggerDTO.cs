namespace BisleriumBlog.Models.DTOs.Blogger
{
    public class BloggerDTO
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? ProfileImageUrl { get; set; }
        public int TotalUpvotes { get; set; }
        public int TotalBlogs { get; set; }
    }
}
