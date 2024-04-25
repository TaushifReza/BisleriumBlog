using System.Net;
using AutoMapper;
using BisleriumBlog.DataAccess.Service;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserController(IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._response = new();
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<APIResponse>> Register(UserCreateDTO userCreateDto)
        {
            try
            {
                User user = _mapper.Map<User>(userCreateDto);
                user.UserName = user.Email;
                var createUser = await _userManager.CreateAsync(user);
                if (createUser.Succeeded)
                {
                    // Create Role if Role don't exist in db
                    var checkAdmin = await _roleManager.FindByNameAsync(SD.RoleAdmin);
                    if (checkAdmin is null)
                    {
                        await _roleManager.CreateAsync(new IdentityRole() { Name = SD.RoleAdmin });
                        await _roleManager.CreateAsync(new IdentityRole() { Name = SD.RoleBlogger });
                    }
                    // Assign role user
                    await _userManager.AddToRoleAsync(user, SD.RoleBlogger);

                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = "User Register Successfully";
                    return Ok(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = createUser.Errors;
                return BadRequest(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }
    }
}
