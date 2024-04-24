using AutoMapper;
using BisleriumBlog.Models.DTOs;
using BisleriumBlog.Models.EntityModels;

namespace BisleriumBlog.API
{
    public class MappingConfig: Profile
    {
        public MappingConfig()
        {
            CreateMap<User, UserCreateDTO>().ReverseMap();
        }
    }
}
