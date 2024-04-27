using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
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
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _config;
        private readonly IPhotoManager _photoManager;
        public UserController(IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, SignInManager<User> signInManager, IConfiguration config, IPhotoManager photoManager)
            // ReSharper disable once ConvertToPrimaryConstructor
        {
            this._response = new();
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _signInManager = signInManager;
            _config = config;
            _photoManager = photoManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<APIResponse>> Register([FromForm] UserCreateDTO userCreateDto)
        {
            try
            {
                // Image Upload and get image url
                if (userCreateDto.ProfileImage!.Length > 0)
                {
                    var uploadResult = await _photoManager.UploadImageAsync(userCreateDto.ProfileImage);
                    if (uploadResult.StatusCode != HttpStatusCode.OK)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = uploadResult.StatusCode;
                        _response.ErrorMessage = new List<string?>
                        {
                            uploadResult.Error.ToString()
                        };
                        return BadRequest(_response);
                    }
                    userCreateDto.ProfileImageUrl = uploadResult.Url.ToString();
                }
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
                    // Encode the token
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
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = "User Register successfully";
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
                // Decode the token
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
        public async Task<ActionResult<APIResponse>> Login([FromForm] LoginDTO loginDto)
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
                    var getUserRole = await _userManager.GetRolesAsync(user);
                    var role = getUserRole.FirstOrDefault() ?? ""; // If no role is assigned, set an empty string
                    var jwtToken = GenerateToken(user, role);
                    
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Login Success",
                        userData = _mapper.Map<UserDTO>(user, opts => opts.AfterMap((src, dest) =>
                        {
                            dest.Role = role; // Assign the retrieved role to the UserDTO object
                        })),
                        token = jwtToken
                    };
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

        private string GenerateToken(User user, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role)
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
