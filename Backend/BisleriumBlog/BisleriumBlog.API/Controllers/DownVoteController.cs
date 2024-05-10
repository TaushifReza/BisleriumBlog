using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using BisleriumBlog.Models.DTOs.DownVote;
using BisleriumBlog.Models.DTOs.UpVote;

namespace BisleriumBlog.API.Controllers
{

    [Route("api/DownVote")]
    [ApiController]
    public class DownVoteController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<UpVoteController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;
        private readonly INotificationService _notificationService;

        public DownVoteController(IMapper mapper, ILogger<UpVoteController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
            _notificationService = notificationService;
        }

        [HttpGet("GetAllDownVoteForBlog/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllDownVoteForBlog(int id, int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == id);
                if (blog == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Blog with ID {id} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var downVote = await _unitOfWork.DownVote.GetAllAsync(u => u.BlogId == id, pageSize: pageSize,
                    pageNumber: pageNumber);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    downVote = _mapper.Map<List<DownVoteDTO>>(downVote),
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            }
            return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("DownVoteBlog")]
        public async Task<ActionResult<APIResponse>> DownVoteBlog([FromForm] DownVoteCreateDTO downVoteCreateDto)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == downVoteCreateDto.BlogId);
                if (blog == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Blog with ID {downVoteCreateDto.BlogId} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                downVoteCreateDto.UserId = userId;
                var alreadyDownVoteBlog = await _unitOfWork.DownVote.GetAsync(u => u.UserId == userId
                                                                               && u.BlogId == downVoteCreateDto.BlogId);

                // Create a DownVote and Increase DownVote count for blog
                if (alreadyDownVoteBlog == null)
                {
                    // check if UpVote the Blog
                    var hasUpVote =
                        await _unitOfWork.UpVote.GetAsync(u => u.UserId == userId && u.BlogId == blog.Id);
                    if (hasUpVote != null)
                    {
                        // Delete UpVote
                        _unitOfWork.UpVote.Remove(hasUpVote);
                        await _unitOfWork.SaveAsync();

                        // Decrease UpVote count
                        blog.UpVoteCount--;
                        await _unitOfWork.SaveAsync();
                    }

                    // create a DownVote for blog
                    var downVote = _mapper.Map<DownVote>(downVoteCreateDto);
                    await _unitOfWork.DownVote.CreateAsync(downVote);
                    await _unitOfWork.SaveAsync();

                    // increase DownVote count for blog
                    blog.DownVoteCount += 1;
                    _unitOfWork.Blog.Update(blog);
                    await _unitOfWork.SaveAsync();

                    // Send a notification to the blog owner
                    const string notificationType = "UpVote";
                    var notificationMessage = $"Your blog '{blog.Title}' has been DownVote.";
                    await _notificationService.SendNotificationAsync(blog.UserId, notificationType, notificationMessage);

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful DownVote the Blog."
                    };
                    return StatusCode(StatusCodes.Status201Created, _response);
                }
                else
                {
                    // remove a DownVote and decrees DownVote count for blog
                    _unitOfWork.DownVote.Remove(alreadyDownVoteBlog);
                    await _unitOfWork.SaveAsync();

                    blog.DownVoteCount -= 1;
                    await _unitOfWork.SaveAsync();

                    // Send a notification to the blog owner
                    const string notificationType = "Remove DownVote";
                    var notificationMessage = $"Your blog '{blog.Title}' has been Remove DownVote.";
                    await _notificationService.SendNotificationAsync(blog.UserId, notificationType, notificationMessage);

                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful Remove DownVote the Blog."
                    };
                    return StatusCode(StatusCodes.Status200OK, _response);
                }

            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            }
            return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
