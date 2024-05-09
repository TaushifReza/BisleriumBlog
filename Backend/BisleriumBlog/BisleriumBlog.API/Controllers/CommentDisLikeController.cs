using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.DataAccess.Service.IService;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs.CommentDisLike;
using BisleriumBlog.Models.DTOs.CommentLike;
using BisleriumBlog.Models.EntityModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentDisLikeController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<UpVoteController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public CommentDisLikeController(IMapper mapper, ILogger<UpVoteController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
        }

        [HttpGet("GetAllCommentDisLikeForComment")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> GetAllCommentDisLikeForComment(int id, int pageSize = 3, int pageNumber = 1)
        {
            try
            {
                var comment = await _unitOfWork.CommentDisLike.GetAsync(u => u.Id == id);
                if (comment == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Comment with ID {id} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                var commentDisLike = await _unitOfWork.CommentDisLike.GetAllAsync(u => u.CommentId == id, pageSize: pageSize,
                    pageNumber: pageNumber);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    commentDisLike = _mapper.Map<List<CommentDisLikeDTO>>(commentDisLike),
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            }
            return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("DisLikeComment")]
        public async Task<ActionResult<APIResponse>> DisLikeComment([FromForm] CommentDisLikeCreateDTO commentDisLikeCreateDto)
        {
            try
            {
                var comment = await _unitOfWork.Comment.GetAsync(u => u.Id == commentDisLikeCreateDto.CommentId);
                if (comment == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.Result = new
                    {
                        error = $"Comment with ID {commentDisLikeCreateDto.CommentId} Not Found!"
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }

                // Retrieve user claims from JWT token
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                commentDisLikeCreateDto.UserId = userId;
                var alreadyDisLikeComment = await _unitOfWork.CommentDisLike.GetAsync(u =>
                    u.UserId == userId && u.CommentId == commentDisLikeCreateDto.CommentId);

                // Create a CommentDisLike and Increase CommentDisLike count for Comment
                if (alreadyDisLikeComment == null)
                {
                    // Check if CommentLike for Comment
                    var hasLikeComment = await _unitOfWork.CommentLike.GetAsync(u =>
                        u.UserId == userId && u.CommentId == commentDisLikeCreateDto.CommentId);
                    if (hasLikeComment != null)
                    {
                        // Delete CommentLike
                        _unitOfWork.CommentLike.Remove(hasLikeComment);
                        await _unitOfWork.SaveAsync();

                        // Decrease CommentLike count
                        comment.LikeCount--;
                        await _unitOfWork.SaveAsync();
                    }

                    // create a CommentDisLike for comment
                    var commentDisLike = _mapper.Map<CommentDisLike>(commentDisLikeCreateDto);

                    await _unitOfWork.CommentDisLike.CreateAsync(commentDisLike);
                    await _unitOfWork.SaveAsync();

                    // Increase CommentDisLike Count for Comment
                    comment.DisLikeCount += 1;
                    _unitOfWork.Comment.Update(comment);
                    await _unitOfWork.SaveAsync();

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful DisLike the Comment."
                    };
                    return StatusCode(StatusCodes.Status201Created, _response);
                }
                else
                {
                    // remove a CommentDisLike and decrees DisLike count for blog
                    _unitOfWork.CommentDisLike.Remove(alreadyDisLikeComment);
                    await _unitOfWork.SaveAsync();

                    comment.DisLikeCount -= 1;
                    await _unitOfWork.SaveAsync();

                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Successful Remove DisLike from the Comment."
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
