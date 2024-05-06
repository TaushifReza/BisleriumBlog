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

namespace BisleriumBlog.API.Controllers
{

    [Route("api/DownVote")]
    [ApiController]
    [Authorize]
    public class DownVoteController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<UpVoteController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IPhotoManager _photoManager;

        public DownVoteController(IMapper mapper, ILogger<UpVoteController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager, IPhotoManager photoManager)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _photoManager = photoManager;
            this._response = new();
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
    }
}
