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

namespace BisleriumBlog.API.Controllers
{
    [Route("api/Comment")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<CommentController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public CommentController(IMapper mapper, ILogger<CommentController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
        }

        [HttpPost("CreateComment")]
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


            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
