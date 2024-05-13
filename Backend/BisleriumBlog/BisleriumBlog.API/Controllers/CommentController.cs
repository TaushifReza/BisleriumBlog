using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using BisleriumBlog.Models.DTOs.Blog;
using System.Reflection.Metadata;
using System.Text.Json;
using BisleriumBlog.Models.ServiceModel;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/Comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<CommentController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;
        private readonly INotificationService _notificationService;

        public CommentController(IMapper mapper, ILogger<CommentController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
            _notificationService = notificationService;
        }

        [HttpGet("GetAllCommentForBlog/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllCommentForBlog(int id, int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == id);
                if (blog == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = $"BLog with ID {id} not found.";
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                var comments = await _unitOfWork.Comment.GetAllAsync(u=>u.BlogId==blog.Id,pageSize: pageSize, pageNumber: pageNumber);

                Pagination pagination = new() { PageNumber = pageNumber, PageSize = pageSize };

                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = comments;
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpGet("GetComment/{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetComment(int id)
        {
            try
            {
                var comment = await _unitOfWork.Comment.GetAsync(u => u.Id == id);
                if (comment == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        error = $"Comment with ID {id} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    commentData = _mapper.Map<CommentDTO>(comment)
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("CreateComment")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> CreateComment(CommentCreateDTO commentCreateDto)
        {
            try
            {
                var blog = await _unitOfWork.Blog.GetAsync(u => u.Id == commentCreateDto.BlogId);
                if (blog == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        error = $"Blog with ID {commentCreateDto.BlogId} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                commentCreateDto.UserId = userId;

                // Check if the user has already made a comment on this blog
                var existingComment = await _unitOfWork.Comment.GetAsync(c => c.BlogId == commentCreateDto.BlogId 
                                                                              && c.UserId == userId && c.ParentCommentId == null);
                if (existingComment != null && commentCreateDto.ParentCommentId == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = "You have already made a comment on this blog."
                    };
                    return StatusCode(StatusCodes.Status400BadRequest, _response);
                }

                var comment = _mapper.Map<Comment>(commentCreateDto);
                // Create a Comment
                await _unitOfWork.Comment.CreateAsync(comment);
                await _unitOfWork.SaveAsync();
                // Increase Comment count for Blog
                blog.CommentCount += 1;
                await _unitOfWork.SaveAsync();

                // Send a notification to the blog owner
                const string notificationType = "Comment";
                var notificationMessage = $"Your blog '{blog.Title}' has been Commented.";
                await _notificationService.SendNotificationAsync(blog.UserId, notificationType, notificationMessage);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    message = "Comment add successful to blog",
                    commentData = _mapper.Map<CommentDTO>(comment)
                };
                return StatusCode(StatusCodes.Status201Created, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPut("UpdateComment/{id:int}")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> UpdateComment(int id, CommentCreateDTO commentCreateDto)
        {
            try
            {
                // Check if the comment exists
                var comment = await _unitOfWork.Comment.GetAsync(u => u.Id == id);
                if (comment == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { $"Comment with ID {id} not found" };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Check if user is the owner of the comment
                if (comment.UserId != userId) {
                    _response.StatusCode = HttpStatusCode.Forbidden;
                    _response.ErrorMessage = new List<string> { "You are not authorized to update this comment" };
                    return StatusCode(StatusCodes.Status403Forbidden, _response);
                }

                // Update the comment properties
                comment.Content = commentCreateDto.Content;
                comment.UpdatedAt = DateTime.Now;

                // Save the changes
                _unitOfWork.Comment.Update(comment);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.ResetContent;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    message = "Comment has been Updated successful",
                    updatedComment = _mapper.Map<CommentDTO>(comment)
                };

                return StatusCode(StatusCodes.Status205ResetContent, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpDelete("DeleteComment/{id:int}")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> DeleteComment(int id)
        {
            try
            {
                // Check if the comment exists
                var comment = await _unitOfWork.Comment.GetAsync(u => u.Id == id);
                if (comment == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = new List<string> { $"Comment with ID {id} not found" };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Check if user is the owner of the comment
                if (comment.UserId != userId) {
                    _response.StatusCode = HttpStatusCode.Forbidden;
                    _response.ErrorMessage = new List<string> { "You are not authorized to update this comment" };
                    return StatusCode(StatusCodes.Status403Forbidden, _response);
                }

                _unitOfWork.Comment.Remove(comment);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.NoContent;
                _response.Result = new
                {
                    message = "Comment Deleted successful"
                };
                return StatusCode(StatusCodes.Status204NoContent, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
