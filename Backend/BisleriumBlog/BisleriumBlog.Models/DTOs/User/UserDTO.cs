﻿namespace BisleriumBlog.Models.DTOs.User
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? ProfileImageUrl { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; }
    }
}
