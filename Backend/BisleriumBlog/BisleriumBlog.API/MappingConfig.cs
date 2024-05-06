using AutoMapper;
using BisleriumBlog.Models.DTOs.Blog;
using BisleriumBlog.Models.DTOs.Category;
using BisleriumBlog.Models.DTOs.Comment;
using BisleriumBlog.Models.DTOs.DownVote;
using BisleriumBlog.Models.DTOs.UpVote;
using BisleriumBlog.Models.DTOs.User;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.API
{
    public class MappingConfig: Profile
    {
        public MappingConfig()
        {
            CreateMap<User, UserCreateDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Category, CategoryCreateDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Blog,  BlogCreateDTO>().ReverseMap();
            CreateMap<Blog, BlogDTO>().ReverseMap();
            CreateMap<Blog, BlogUpdateDTO>().ReverseMap();
            CreateMap<UpVote, UpVoteDTO>().ReverseMap();
            CreateMap<UpVote, UpVoteCreateDTO>().ReverseMap();
            CreateMap<DownVote, DownVoteDTO>().ReverseMap();
            CreateMap<DownVote, DownVoteCreateDTO>().ReverseMap();
            CreateMap<Comment, CommentCreateDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
        }
    }
}
