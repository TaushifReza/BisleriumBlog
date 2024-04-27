using System.Net;
using System.Text;
using AutoMapper;
using BisleriumBlog.DataAccess.Service;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models.ServiceModel;
using BisleriumBlog.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

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
        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;
        public UserController(IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, SignInManager<User> signInManager)
        {
            this._response = new();
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<APIResponse>> Register(UserCreateDTO userCreateDto)
        {
            try
            {
                User user = _mapper.Map<User>(userCreateDto);
                user.UserName = user.Email;
                // Create user
                var createUser = await _userManager.CreateAsync(user, userCreateDto.Password);
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

                    var confirmationToken =  await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
                    var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                    string emailConfirmationLink =
                        $"https://localhost:7094/api/User/ConfirmEmail?id={user.Id}&token={tokenEncoded}";
                    // Send Email Confirmation Link to Email
                    // email = taushif1teza@gmail.com
                    /*try
                    {
                        if (user.Email != null)
                        {
                            var mailRequest = new MailRequest
                            {
                                ToEmail = user.Email,
                                Subject = "Verify Your Email",
                                Body = $"<a href=\"{emailConfirmationLink}\">Email Confirmation Link</a>"
                            };
                            await _emailService.SendEmailAsync(mailRequest);
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }*/
                    // return Redirect($"/ConfirmEmail/{user.Id}/{confirmationToken}");
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        id = user.Id,
                        token = tokenEncoded,
                        message = "User Register successfully"
                    };
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

        [HttpGet("ConfirmEmail/{id}/{token}")]
        public async Task<ActionResult<APIResponse>> ConfirmEmail(string id, string token)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = true;
                    _response.Result = "User Not Found";
                    return BadRequest(_response);
                }
                var tokenDecodedBytes = WebEncoders.Base64UrlDecode(token);
                var tokenDecoded = Encoding.UTF8.GetString(tokenDecodedBytes);
                var result = await _userManager.ConfirmEmailAsync(user, tokenDecoded);
                if (result.Succeeded)
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = "Email address is confirm";
                    return Ok(_response);
                }
                _response.StatusCode = HttpStatusCode.BadGateway;
                _response.IsSuccess = true;
                _response.Result = result.Errors;
                return BadRequest(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<APIResponse>> Login(LoginDTO loginDto)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(loginDto.Email);
                if (user == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.Result = "Invalid email or password.";
                    return BadRequest(_response);
                }
                var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
                if (result.Succeeded)
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = false;
                    _response.Result = "Login Success";
                    return Ok(_response);
                }
                if (result.IsLockedOut)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.Result = "You are locked Out.";
                    return BadRequest(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = "Login Failed";
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
