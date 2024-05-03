﻿using AutoMapper;
using BisleriumBlog.Models.DTOs;
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
        }
    }
}
