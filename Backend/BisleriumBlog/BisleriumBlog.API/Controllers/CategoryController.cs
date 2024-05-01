using System.Net;
using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/Category")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private IMapper _mapper;
        protected APIResponse _response;
        private readonly ILogger<CategoryController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IMapper mapper, ILogger<CategoryController> logger, IUnitOfWork unitOfWork)
        {
            this._response = new();
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAllCategory")]
        public async Task<ActionResult<APIResponse>> GetAllCategory()
        {
            try
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new { message = "Get All Category " };
                return Ok(_response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return BadRequest(_response);
        }
    }
}
