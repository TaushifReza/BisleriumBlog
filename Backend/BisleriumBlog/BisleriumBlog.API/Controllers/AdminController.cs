using System.Globalization;
using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using BisleriumBlog.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BisleriumBlog.Models.DTOs.User;
using BisleriumBlog.Models.ServiceModel;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using System.Text;
using BisleriumBlog.Models.DTOs.Blog;
using BisleriumBlog.Models.DTOs.Blogger;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IPhotoManager _photoManager;
        private readonly ILogger<AdminController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        public AdminController(IMapper mapper, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailService emailService, SignInManager<User> signInManager, IConfiguration config, IPhotoManager photoManager, ILogger<AdminController> logger, IUnitOfWork unitOfWork)
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
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("RegisterAdmin")]
        //[AllowAnonymous]
        public async Task<ActionResult<APIResponse>> RegRegisterAdminister([FromForm] UserCreateDTO userCreateDto)
        {
            try
            {
                // Image Upload and get image url
                if (userCreateDto.ProfileImage!.Length > 0)
                {
                    // Validate the image file
                    bool isValidFile = Validator.ValidateImageFile(userCreateDto.ProfileImage, out var errorMessage, 3);
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
                    await _userManager.AddToRoleAsync(user, SD.RoleAdmin);

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
                    // email = taushif1teza@gmail.com
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

        [HttpGet("PopularBlog")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> PopularBlog(int pageSize = 10, int pageNumber = 1)
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync(pageSize: pageSize, pageNumber: pageNumber, includeProperties: "Category,User");

                var top10Blog = CalculateBlogPopularity(_mapper.Map<IEnumerable<BlogDTO>>(blogs));

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    Top10Blog = top10Blog,
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpGet("GetUniqueMonthsFromBlogCreation")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> GetUniqueMonthsFromBlogCreation()
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync();
                var uniqueMonths = blogs
                    .Select(u => new { Year = u.CreatedAt.Year, MonthName = u.CreatedAt.ToString("MMMM") })
                    .Distinct()
                    .OrderBy(ym => ym.Year)
                    .ThenBy(ym => ym.MonthName)
                    .ToList();

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = uniqueMonths;

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("PopularMonthBlog")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> PopularMonthBlog(int year, int month)
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync(pageSize: int.MaxValue, includeProperties: "Category,User");
                var filteredBlogs = blogs.Where(b => b.CreatedAt.Year == year && b.CreatedAt.Month == month);

                var top10Blog = CalculateBlogPopularity(_mapper.Map<IEnumerable<BlogDTO>>(filteredBlogs));

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    Top10Blog = top10Blog,
                };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("AdminDashboardData")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> GetAdminDashboardData(int? year, int? month)
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync(pageSize: int.MaxValue);
                var categories = await _unitOfWork.Category.GetAllAsync(pageSize: int.MaxValue);

                var allTimeData = new
                {
                    BlogCount = blogs.Count(),
                    UpvotesCount = blogs.Sum(b => b.UpVoteCount),
                    DownvotesCount = blogs.Sum(b => b.DownVoteCount),
                    CommentsCount = blogs.Sum(b => b.CommentCount)
                };

                IEnumerable<BlogDTO> filteredBlogs = _mapper.Map<IEnumerable<BlogDTO>>(blogs);

                if (year.HasValue && month.HasValue)
                {
                    filteredBlogs = filteredBlogs.Where(b => b.CreatedAt.Year == year.Value && b.CreatedAt.Month == month.Value);
                }

                var monthSpecificData = new
                {
                    BlogCount = filteredBlogs.Count(),
                    UpvotesCount = filteredBlogs.Sum(b => b.UpVoteCount),
                    DownvotesCount = filteredBlogs.Sum(b => b.DownVoteCount),
                    CommentsCount = filteredBlogs.Sum(b => b.CommentCount)
                };

                var categoriesWithBlogCount = categories.Select(c => new
                {
                    CategoryId = c.Id,
                    CategoryName = c.Name,
                    BlogCount = filteredBlogs.Count(b => b.CategoryId == c.Id)
                });

                var blogsPerMonth = blogs.GroupBy(b => b.CreatedAt.Month)
                    .Select(g => new
                    {
                        MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                        BlogCount = g.Count()
                    })
                    .OrderBy(m => m.MonthName);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    AllTimeData = allTimeData,
                    MonthSpecificData = monthSpecificData,
                    CategoriesWithBlogCount = categoriesWithBlogCount,
                    BlogsPerMonth = blogsPerMonth
                };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("TopBloggers")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> GetTopBloggers(int count = 10)
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync(includeProperties: "User");
                var topBloggers = blogs.GroupBy(b => new { b.UserId, b.User.UserName, b.User.FullName, b.User.Email, b.User.ProfileImageUrl })
                    .Select(g => new BloggerDTO
                    {
                        UserId = g.Key.UserId,
                        FullName = g.Key.FullName,
                        Email = g.Key.Email,
                        ProfileImageUrl = g.Key.ProfileImageUrl,
                        TotalUpvotes = g.Sum(b => b.UpVoteCount),
                        TotalBlogs = g.Count()
                    })
                    .OrderByDescending(b => b.TotalUpvotes)
                    .ThenByDescending(b => b.TotalBlogs)
                    .Take(count)
                    .ToList();

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = topBloggers;

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("TopBloggersOfMonth")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> GetTopBloggersOfMonth(int? month = null, int? year = null, int count = 10)
        {
            try
            {
                // If month and year are not provided, use the current month and year
                month ??= DateTime.Now.Month;
                year ??= DateTime.Now.Year;

                var blogs = await _unitOfWork.Blog.GetAllAsync(includeProperties: "User");

                blogs = blogs.Where(b => b.CreatedAt.Month == month.Value && b.CreatedAt.Year == year.Value);

                var topBloggers = blogs.GroupBy(b => new { b.UserId, b.User.UserName, b.User.FullName, b.User.Email, b.User.ProfileImageUrl })
                    .Select(g => new BloggerDTO
                    {
                        UserId = g.Key.UserId,
                        FullName = g.Key.FullName,
                        Email = g.Key.Email,
                        ProfileImageUrl = g.Key.ProfileImageUrl,
                        TotalUpvotes = g.Sum(b => b.UpVoteCount),
                        TotalBlogs = g.Count()
                    })
                    .OrderByDescending(b => b.TotalUpvotes)
                    .ThenByDescending(b => b.TotalBlogs)
                    .Take(count)
                    .ToList();

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = topBloggers;

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private IEnumerable<BlogDTO> CalculateBlogPopularity(IEnumerable<BlogDTO> blogDtos)
        {
            foreach (var blog in blogDtos)
            {
                blog.BlogPopularity = 2 * blog.UpVoteCount + -1 * blog.DownVoteCount + 1 * blog.CommentCount;
            }

            return blogDtos
                .OrderByDescending(b => b.BlogPopularity)
                .Take(10);
        }
    }
}
