using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs
{
    public class UserCreateDTO
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        public string? Bio { get; set; }

        [DataType(DataType.ImageUrl)]
        public string? ProfileImageUrl { get; set; } = string.Empty;

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
