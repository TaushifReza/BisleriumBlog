
using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models.EntityModels;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs.CommentLike;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BisleriumBlog.Models.DTOs.UpVote;
using System.Net;
using System.Reflection.Metadata;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentLikeController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<UpVoteController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public CommentLikeController(IMapper mapper, ILogger<UpVoteController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
        }

        [HttpGet("GetAllCommentLikeForComment")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllCommentLikeForComment(int id, int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var comment = await _unitOfWork.CommentLike.GetAsync(u => u.Id == id);
                if (comment == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Blog with ID {id} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                var commentLike = await _unitOfWork.CommentLike.GetAllAsync(u => u.CommentId == id, pageSize: pageSize,
                    pageNumber: pageNumber);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    commentLike = _mapper.Map<List<CommentLikeDTO>>(commentLike),
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("LikeComment")]
        [Authorize]
        public async Task<ActionResult<APIResponse>> LikeComment([FromForm] CommentLikeCreateDTO commentLikeCreateDto)
        {
            try
            {
                var comment = await _unitOfWork.Comment.GetAsync(u=>u.Id==commentLikeCreateDto.CommentId);
                if (comment == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Comment with ID {commentLikeCreateDto.CommentId} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                commentLikeCreateDto.UserId = userId;
                var alreadyLikeComment = await _unitOfWork.CommentLike.GetAsync(u =>
                    u.UserId == userId && u.CommentId == commentLikeCreateDto.CommentId);

                // Create a CommentLike and Increase CommentLike count for Comment
                if (alreadyLikeComment == null)
                {
                    // Check if CommentDisk for Comment
                    var hasDisLikeComment = await _unitOfWork.CommentDisLike.GetAsync(u =>
                        u.UserId == userId && u.CommentId == commentLikeCreateDto.CommentId);
                    if (hasDisLikeComment != null)
                    {
                        // Delete CommentDisLike
                        _unitOfWork.CommentDisLike.Remove(hasDisLikeComment);
                        await _unitOfWork.SaveAsync();

                        // Decrease CommentDislike count
                        comment.DisLikeCount--;
                        await _unitOfWork.SaveAsync();
                    }

                    // create a CommentLike for comment
                    var commentLike = _mapper.Map<CommentLike>(commentLikeCreateDto);

                    await _unitOfWork.CommentLike.CreateAsync(commentLike);
                    await _unitOfWork.SaveAsync();

                    // Increase CommentLike Count for Comment
                    comment.LikeCount += 1;
                    _unitOfWork.Comment.Update(comment);
                    await _unitOfWork.SaveAsync();

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful Like the Comment."
                    };
                    return StatusCode(StatusCodes.Status201Created, _response);
                }else
                {
                    // remove a CommentLike and decrees Like count for blog
                    _unitOfWork.CommentLike.Remove(alreadyLikeComment);
                    await _unitOfWork.SaveAsync();

                    comment.LikeCount -= 1;
                    await _unitOfWork.SaveAsync();

                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful Remove Like from the Comment."
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
