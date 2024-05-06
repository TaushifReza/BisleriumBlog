using System.ComponentModel.DataAnnotations;

namespace BisleriumBlog.Models.DTOs.User
{
    public class UserChangePasswordDTO
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(NewPassword))]
        public string ConfirmPassword { get; set;}

    }
}
