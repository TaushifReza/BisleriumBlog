﻿using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs;
using BisleriumBlog.Models.DTOs.User;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models.ServiceModel;
using BisleriumBlog.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Validator = BisleriumBlog.Utility.Validator;

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
                    // Validate the image file
                    bool isValidFile = Validator.ValidateImageFile(userCreateDto.ProfileImage, out var errorMessage,3);
                    if (!isValidFile)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessage = new List<string> { errorMessage }!;
                        return BadRequest(_response);
                    }
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
                var user = _mapper.Map<User>(userCreateDto);
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

                    var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    // Encode the token
                    byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmationToken);
                    var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                    // Encode the userId
                    byte[] userIdGeneratedBytes = Encoding.UTF8.GetBytes(user.Id);
                    var userIdEncoded = WebEncoders.Base64UrlEncode(userIdGeneratedBytes);
                    string emailConfirmationLink =
                        $"http://localhost:5173/confirmEmail?id={userIdEncoded}&token={tokenEncoded}";
                    // Send Email Confirmation Link to Email
                    try
                    {
                        if (user.Email != null)
                        {
                            var mailRequest = new MailRequest
                            {
                                ToEmail = user.Email,
                                Subject = "Verify Your Email",
                                Body = $"Email Confirm Link {emailConfirmationLink}"
                            };
                            await _emailService.SendEmailAsync(mailRequest);
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
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
                // Decode the userId
                var userIdDecodedBytes = WebEncoders.Base64UrlDecode(id);
                var userIdDecoded = Encoding.UTF8.GetString(userIdDecodedBytes);
                var user = await _userManager.FindByIdAsync(userIdDecoded);
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
                if (result.Succeeded) {
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
                if (result.RequiresTwoFactor) {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = "Login Success enter code from Authenticator app.";
                    return Ok(_response);
                }
                if (result.IsLockedOut) {
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

        [HttpPost("SendOtpForForgotPassword")]
        public async Task<ActionResult<APIResponse>> SendOtpForForgotPassword( [Required] string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                    byte[] emailGeneratedBytes = Encoding.UTF8.GetBytes(email);
                    var emailEncoded = WebEncoders.Base64UrlEncode(emailGeneratedBytes);
                    byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(code);
                    var tokenEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);
                    var link = $"http://localhost:5173/resetpassword?email={emailEncoded}&token={tokenEncoded}";
                    // Send the code to email
                    var mailRequest = new MailRequest
                    {
                        ToEmail = user.Email,
                        Subject = "Two Factor Auth Code",
                        Body = $"Please use this code as OTP {link}"
                    };
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        message = "Forgot Password Link has been Send to email."
                    };
                    await _emailService.SendEmailAsync(mailRequest);
                    return Ok(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = new { error = "User not Found!!!" };
                return BadRequest(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("VerifyOtpForForgotPassword")]
        public async Task<ActionResult<APIResponse>> VerifyOtpForForgotPassword([FromForm] ResetPasswordDTO resetPasswordDto)
        {
            try
            {
                var emailDecodedBytes = WebEncoders.Base64UrlDecode(resetPasswordDto.Email);
                var emailDecoded = Encoding.UTF8.GetString(emailDecodedBytes);

                var tokenDecodedBytes = WebEncoders.Base64UrlDecode(resetPasswordDto.Token);
                var tokenDecoded = Encoding.UTF8.GetString(tokenDecodedBytes);

                var user = await _userManager.FindByEmailAsync(emailDecoded);
                if (user != null)
                {
                    var result =
                        await _userManager.ResetPasswordAsync(user, tokenDecoded, resetPasswordDto.Password);
                    if (result.Succeeded) {
                        _response.StatusCode = HttpStatusCode.OK;
                        _response.IsSuccess = true;
                        _response.Result = new { message = "Password Reset Successful" };
                        return Ok(_response);
                    }
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string>()!;
                    foreach (var error in result.Errors)
                    {
                        _response.ErrorMessage.Add(error.Description);
                    }
                    return BadRequest(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = new { error = "User not Found!!!" };
                return BadRequest(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("AuthenticateWithMFASetup")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> AuthenticateWithMFASetup()
        {
            try
            {
                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId!);

                if (user != null)
                {
                    await _userManager.ResetAuthenticatorKeyAsync(user);
                    var key = await _userManager.GetAuthenticatorKeyAsync(user);
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        key = key
                    };
                    return Ok(_response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("VerifyAuthenticateWithMFASetup")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> VerifyAuthenticateWithMFASetup(string token)
        {
            try
            {
                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId!);

                var result = await _userManager.VerifyTwoFactorTokenAsync(user,
                    _userManager.Options.Tokens.AuthenticatorTokenProvider, token);

                if (user != null && result)
                {
                    await _userManager.SetTwoFactorEnabledAsync(user, true);
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Authenticate With MFA Setup Successful"
                    };
                    return Ok(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = new
                {
                    error = "Authenticate With MFA Setup Failed. Check Your token."
                };
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("LoginWithMFACode")]
        public async Task<ActionResult<APIResponse>> LoginWithMFACode(string code)
        {
            try
            {
                var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(code, false, false);
                if (result.Succeeded) {
                    // Get the authenticated user from context
                    var user = await _userManager.GetUserAsync(HttpContext.User);
                    var getUserRole = await _userManager.GetRolesAsync(user);
                    var role = getUserRole.FirstOrDefault() ?? ""; // If no role is assigned, set an empty string
                    var jwtToken = GenerateToken(user, role);

                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Two-factor authentication successful",
                        userData = _mapper.Map<UserDTO>(user, opts => opts.AfterMap((src, dest) =>
                        {
                            dest.Role = role; // Assign the retrieved role to the UserDTO object
                        })),
                        token = jwtToken
                    };
                    return Ok(_response);
                }
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string?>() { "Invalid authentication code" }!;
                return BadRequest(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() }!;
            } return _response;
        }

        [HttpPost("UpdateUserProfile")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> UpdateUserProfile([FromForm] UserProfileUpdateDTO userProfileUpdateDto)
        {
            try
            {
                // Check if both Bio and FullName are empty or null
                if (string.IsNullOrWhiteSpace(userProfileUpdateDto.Bio) && string.IsNullOrWhiteSpace(userProfileUpdateDto.FullName)) {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "At least one field (Bio or FullName) must be provided" }!;
                    return BadRequest(_response);
                }
                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { "User not found" }!;
                    return NotFound(_response);
                }
                // Update user properties
                if (!string.IsNullOrWhiteSpace(userProfileUpdateDto.FullName)) {
                    user.FullName = userProfileUpdateDto.FullName;
                } if (!string.IsNullOrWhiteSpace(userProfileUpdateDto.Bio)) {
                    user.Bio = userProfileUpdateDto.Bio;
                }

                // Update user in the database
                var result = await _userManager.UpdateAsync(user);
                var getUserRole = await _userManager.GetRolesAsync(user);
                var role = getUserRole.FirstOrDefault() ?? ""; // If no role is assigned, set an empty string

                if (result.Succeeded)
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "User Profile Updated Successful",
                        userData = _mapper.Map<UserDTO>(user, opts => opts.AfterMap((src, dest) =>
                        {
                            dest.Role = role; // Assign the retrieved role to the UserDTO object
                        }))
                    };
                    return Ok(_response);
                }
                else
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string>(result.Errors.Select(e => e.Description))!;
                    return BadRequest(_response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("ChangeProfileImage")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> ChangeProfileImage(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    // Validate the image file
                    var isValidFile = Validator.ValidateImageFile(file, out var errorMessage, 3);
                    if (!isValidFile) {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessage = new List<string> { errorMessage }!;
                        return BadRequest(_response);
                    }
                    // Retrieve user claims from JWT token
                    var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                    var user = await _userManager.GetUserAsync(base.User);
                    var currentImgUrl = user!.ProfileImageUrl;
                    // Logic to delete previous image from Claudinary and add new image
                    // delete image
                    var hasDeleted = await _photoManager.DeleteImageAsync(currentImgUrl!);
                    if (!hasDeleted) {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.InternalServerError;
                        _response.ErrorMessage = new List<string> { "Something went wrong" };
                        return BadRequest(_response);
                    }
                    // upload new image and save image url to db
                    var uploadResult = await _photoManager.UploadImageAsync(file);
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
                    user.ProfileImageUrl = uploadResult.Url.ToString();
                    var result = await _userManager.UpdateAsync(user);
                    if (!result.Succeeded) {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.InternalServerError;
                        _response.ErrorMessage = new List<string> { "Failed to update user profile image" };
                        return BadRequest(_response);
                    }
                    _response.IsSuccess = true;
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.Result = user.ProfileImageUrl;
                    return Ok(_response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return _response;
        }

        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> ChangePassword([FromForm] UserChangePasswordDTO userChangePasswordDTO)
        {
            try 
            {
                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.GetUserAsync(base.User);

                if(user != null)
                {
                    var result = await _userManager.ChangePasswordAsync(user, userChangePasswordDTO.CurrentPassword, userChangePasswordDTO.NewPassword);

                    if (result.Succeeded)
                    {
                        _response.IsSuccess = true;
                        _response.StatusCode = HttpStatusCode.OK;
                        _response.Result = new
                        {
                            mesage = "Password change Successful"
                        };
                        return StatusCode(StatusCodes.Status200OK, _response);
                    }
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.InternalServerError;
                    _response.Result = new
                    {
                        mesage = result.Errors
                    };
                    return StatusCode(StatusCodes.Status500InternalServerError, _response);
                }
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpDelete("DeleteUser")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> DeleteUser()
        {
            try
            {
                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var user = await _userManager.FindByIdAsync(userId);

                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded) {
                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        message = "User deleted successful"
                    };
                    return StatusCode(StatusCodes.Status200OK, _response);
                }
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessage = new List<string>() { result.Errors.ToString()! };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
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
