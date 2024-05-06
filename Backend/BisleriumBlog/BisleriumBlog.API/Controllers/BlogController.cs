using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Utility;
using System.Security.Claims;
using BisleriumBlog.Models.ServiceModel;
using JsonSerializer = System.Text.Json.JsonSerializer;
using BisleriumBlog.Models.DTOs.Blog;

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
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllBlog(int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var blogs = await _unitOfWork.Blog.GetAllAsync(pageSize:pageSize, pageNumber:pageNumber);

                Pagination pagination = new() {PageNumber = pageNumber, PageSize = pageSize};

                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

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

        [HttpGet("GetBlog/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetBlog(int id)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u=>u.Id==id);
                if (blog == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        error = $"Blog with ID {id} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = blog;
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            }
            return StatusCode(StatusCodes.Status500InternalServerError, _response);
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

        [HttpPut("UpdateBlog/{id:int}")]
        public async Task<ActionResult<APIResponse>> UpdateBlog(int id, [FromForm] BlogUpdateDTO blogUpdateDTO)
        {
            try
            {

                // Check if at least one property is provided
                var isBodyProvided = !string.IsNullOrEmpty(blogUpdateDTO.Body);
                var isImageProvided = blogUpdateDTO.BlogImage != null;

                // Check if either Body or BlogImage is provided
                if (!isBodyProvided && !isImageProvided)
                {
                    _response.ErrorMessage = new List<string> { "At least one property (Body or BlogImage) must be provided" };
                    return StatusCode(StatusCodes.Status400BadRequest, _response);
                }

                // Check if the blog exists
                var blog = await _unitOfWork.Blog.GetAsync(b => b.Id == id);
                if (blog == null) {
                    _response.ErrorMessage = new List<string> { "Blog not found" };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Check if user is the owner of the blog
                if (blog.UserId != userId) {
                    _response.StatusCode = HttpStatusCode.Forbidden;
                    _response.ErrorMessage = new List<string> { "You are not authorized to update this blog" };
                    return StatusCode(StatusCodes.Status403Forbidden, _response);
                }

                // Update the blog properties
                blog.Body = (isBodyProvided ? blogUpdateDTO.Body : blog.Body)!;
                blog.UpdatedAt = DateTime.Now;

                if(blogUpdateDTO.BlogImage != null) { 
                    var currentImgUrl = blog.ImageUrl;

                    // delete image
                    var hasDeleted = await _photoManager.DeleteImageAsync(currentImgUrl!);
                    if (!hasDeleted) {
                        _response.IsSuccess = false;
                        _response.StatusCode = HttpStatusCode.InternalServerError;
                        _response.ErrorMessage = new List<string> { "Something went wrong" };
                        return BadRequest(_response);
                    }
                    // upload new image and save image url to db
                    var uploadResult = await _photoManager.UploadImageAsync(blogUpdateDTO.BlogImage!);
                    if (uploadResult.StatusCode != HttpStatusCode.OK) {
                        _response.IsSuccess = false;
                        _response.StatusCode = uploadResult.StatusCode;
                        _response.ErrorMessage = new List<string?>
                        {
                            uploadResult.Error.ToString()
                        };
                        return BadRequest(_response);
                    }
                    blog.ImageUrl = uploadResult.Url.ToString();
                    blog.UpdatedAt = DateTime.Now;
                }

                // Save the changes
                _unitOfWork.Blog.Update(blog);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.ResetContent;
                _response.IsSuccess = true;
                _response.Result = _mapper.Map<BlogDTO>(blog);

                return StatusCode(StatusCodes.Status205ResetContent, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
