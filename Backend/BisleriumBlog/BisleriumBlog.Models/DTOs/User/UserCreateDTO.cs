using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace BisleriumBlog.Models.DTOs.User
{
    public class UserCreateDTO
    {
        [Required]
        public string FullName { get; set; } = string.Empty;
        public string? Bio { get; set; }
        [DataType(DataType.ImageUrl)]
        public string? ProfileImageUrl { get; set; } = string.Empty;
        [Required]
        [NotMapped]
        public IFormFile? ProfileImage { get; set; }
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
