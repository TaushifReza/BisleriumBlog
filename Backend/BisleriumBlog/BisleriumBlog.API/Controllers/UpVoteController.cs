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
using BisleriumBlog.Models.DTOs.UpVote;
using BisleriumBlog.DataAccess.Service;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/UpVote")]
    [ApiController]
    [Authorize]
    public class UpVoteController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<UpVoteController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public UpVoteController(IMapper mapper, ILogger<UpVoteController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
        }

        [HttpGet("GetAllUpVoteForBlog/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllUpVoteForBlog(int id, int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == id);
                if (blog == null) {
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

                var upVote = await _unitOfWork.UpVote.GetAllAsync(u=>u.BlogId==id, pageSize: pageSize, 
                    pageNumber: pageNumber);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    upVote = _mapper.Map<List<UpVoteDTO>>(upVote),
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("UpVoteBlog")]
        public async Task<ActionResult<APIResponse>> UpVoteBlog([FromForm] UpVoteCreateDTO upVoteCreateDto)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == upVoteCreateDto.BlogId);
                if (blog == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Blog with ID {upVoteCreateDto.BlogId} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                upVoteCreateDto.UserId = userId;
                var alreadyUpVoteBlog = await _unitOfWork.UpVote.GetAsync(u => u.UserId == userId 
                                                                               && u.BlogId == upVoteCreateDto.BlogId);

                // Create a UpVote and Increase UpVote count for blog
                if (alreadyUpVoteBlog == null)
                {
                    // check if DownVote the Blog
                    var hasDownVote =
                        await _unitOfWork.DownVote.GetAsync(u => u.UserId == userId && u.BlogId == blog.Id);
                    if (hasDownVote != null)
                    {
                        // Delete DownVote
                        _unitOfWork.DownVote.Remove(hasDownVote);
                        await _unitOfWork.SaveAsync();

                        // Decrease DownVote count
                        blog.DownVoteCount--;
                        await _unitOfWork.SaveAsync();
                    }

                    // create a UpVote for blog
                    var upVote = _mapper.Map<UpVote>(upVoteCreateDto);
                    await _unitOfWork.UpVote.CreateAsync(upVote);
                    await _unitOfWork.SaveAsync();

                    // increase UpVote count for blog
                    blog.UpVoteCount += 1; 
                    _unitOfWork.Blog.Update(blog);
                    await _unitOfWork.SaveAsync();

                    // Send a notification to the blog owner
                    /*const string notificationType = "UpVote";
                    var notificationMessage = $"Your blog '{blog.Title}' has been Upoted.";
                    await _notificationService.SendNotificationAsync(blog.UserId, notificationType, notificationMessage);*/

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful UpVote the Blog."
                    };
                    return StatusCode(StatusCodes.Status201Created, _response);
                }
                else
                {
                    // remove a UpVote and decrees UpVote count for blog
                    _unitOfWork.UpVote.Remove(alreadyUpVoteBlog);
                    await _unitOfWork.SaveAsync();

                    blog.UpVoteCount -= 1;
                    await _unitOfWork.SaveAsync();

                    // Send a notification to the blog owner
                    /*const string notificationType = "Remove UpVote";
                    var notificationMessage = $"Your blog '{blog.Title}' has been Remove UpVoted.";
                    await _notificationService.SendNotificationAsync(blog.UserId, notificationType, notificationMessage);*/

                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful Remove UpVote the Blog."
                    };
                    return StatusCode(StatusCodes.Status200OK, _response);
                }

            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
