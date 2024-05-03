using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Utility;
using System.Security.Claims;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/Blog")]
    [ApiController]
    [Authorize]
    public class BlogController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<BlogController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public BlogController(IMapper mapper, ILogger<BlogController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new ();
        }

        [HttpGet("GetAllBlog")]
        public async Task<ActionResult<APIResponse>> GetAllBlog()
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync();

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = blogs;
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("CreateBlog")]
        public async Task<ActionResult<APIResponse>> CreateBlog([FromForm] BlogCreateDTO blogCreateDto)
        {
            try
            {
                // Validate the image file
                if (blogCreateDto.BlogImage != null)
                {
                    var isValidFile = Validator.ValidateImageFile(blogCreateDto.BlogImage, out var errorMessage, 3);
                    if (!isValidFile)
                    {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessage = new List<string> { errorMessage }!;
                        return BadRequest(_response);
                    }
                }

                var isCategoryExist = await _unitOfWork.Category.GetAsync(u => u.Id == blogCreateDto.CategoryId);
                if (isCategoryExist == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessage = new List<string> { "Category not Exist" };
                    return BadRequest(_response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Logic to upload image and save image url
                if (blogCreateDto.BlogImage != null)
                {
                    var uploadResult = await _photoManager.UploadImageAsync(blogCreateDto.BlogImage);
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

                    blogCreateDto.ImageUrl = uploadResult.Url.ToString();
                }

                blogCreateDto.UserId = userId;
                var blog = _mapper.Map<Blog>(blogCreateDto);

                await _unitOfWork.Blog.CreateAsync(blog);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    message = "Blog Created Successful",
                    blog = _mapper.Map<BlogDTO>(blog)
                };
                return StatusCode(StatusCodes.Status201Created, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
