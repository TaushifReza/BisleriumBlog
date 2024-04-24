using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BisleriumBlog.Models.EntityModels
{
    public class User: IdentityUser
    {
        public string FullName { get; set; }

        [StringLength(160)]
        public string? Bio { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
