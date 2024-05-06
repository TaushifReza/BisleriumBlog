﻿using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.Models.DTOs
{
    public class BlogDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string UserId { get; set; }
        //blic User User { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ViewCount { get; set; } = 0;
        public int UpVoteCount { get; set; } = 0;
        public int DownVoteCount { get; set; } = 0;
        public int CommentCount { get; set; } = 0;
    }
}
