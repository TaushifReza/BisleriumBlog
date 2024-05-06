using System.Net;
using System.Security.Claims;
using AutoMapper;
using BisleriumBlog.DataAccess.Repository.IRepository;
using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs.Category;
using BisleriumBlog.Models.EntityModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public CategoryController(IMapper mapper, ILogger<CategoryController> logger, IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            this._response = new();
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpGet("GetAllCategory")]
        public async Task<ActionResult<APIResponse>> GetAllCategory()
        {
            try
            {
                var categories = await _unitOfWork.Category.GetAllAsync();
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    category = _mapper.Map<List<Category>>(categories)
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string>() { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpGet("GetCategory/{id:int}")]
        public async Task<ActionResult<APIResponse>> GetCategory(int id)
        {
            try
            {
                var category = await _unitOfWork.Category.GetAsync(u=>u.Id==id);
                if (category == null) {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = true;
                    _response.Result = new
                    {
                        message = "Category Not Found."
                    };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new
                {
                    category = _mapper.Map<Category>(category)
                };
                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception e) {
                _response.ErrorMessage = new List<string>() { e.Message };
            }
            return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPost("CreateCategory")]
        public async Task<ActionResult<APIResponse>> CreateCategory([FromForm] CategoryCreateDTO categoryCreateDto)
        {
            try
            {
                // Retrieve user claims from the JWT token
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    categoryCreateDto.UserId = userId;
                    var category = _mapper.Map<Category>(categoryCreateDto);

                    await _unitOfWork.Category.CreateAsync(category);
                    await _unitOfWork.SaveAsync();

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = new { message = "Category Created successful" };

                    return StatusCode(StatusCodes.Status201Created, _response);
                }
            }
            catch (Exception e) {
                string errorMessage = e.Message;
                if (e.InnerException != null) {
                    errorMessage += " Inner Exception: " + e.InnerException.Message;
                }

                _logger.LogError(e, "Error occurred while creating category");
                _response.ErrorMessage = new List<string> { errorMessage };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpPut("UpdateCategory/{id:int}")]
        public async Task<ActionResult<APIResponse>> UpdateCategory(int id, [FromForm] CategoryUpdateDTO categoryUpdateDto)
        {
            try
            {
                // Validate that at least one property is provided
                if (string.IsNullOrWhiteSpace(categoryUpdateDto.Name) && string.IsNullOrWhiteSpace(categoryUpdateDto.Description)) {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessage = new List<string> { "At least one property (Name or Description) must be provided." };
                    return StatusCode(StatusCodes.Status400BadRequest, _response);
                }

                var category = await _unitOfWork.Category.GetAsync(c => c.Id == id);
                if (category == null) {
                    _response.ErrorMessage = new List<string> { "Category not found" };
                    return NotFound(_response);
                }

                // Check if the user is authorized to update the category
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId) || category.UserId != userId) {
                    _response.ErrorMessage = new List<string> { "You are Unauthorized to update this category." };
                    return StatusCode(StatusCodes.Status403Forbidden, _response);
                }

                if (!string.IsNullOrWhiteSpace(categoryUpdateDto.Name)) {
                    category.Name = categoryUpdateDto.Name;
                }

                if (!string.IsNullOrWhiteSpace(categoryUpdateDto.Description)) {
                    category.Description = categoryUpdateDto.Description;
                }

                category.UpdatedAt = DateTime.Now;

                _unitOfWork.Category.Update(category);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.ResetContent;
                _response.IsSuccess = true;
                _response.Result = new 
                { 
                    message = "Category updated successfully",
                    category = _mapper.Map<Category>(category)
                };

                return StatusCode(StatusCodes.Status205ResetContent, _response);
            }
            catch (Exception e) {
                _logger.LogError(e, "Error occurred while updating category");
                _response.ErrorMessage = new List<string> { "An error occurred. Please try again later." };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }

        [HttpDelete("DeleteCategory/{id:int}")]
        public async Task<ActionResult<APIResponse>> DeleteCategory(int id)
        {
            try
            {
                var category = await _unitOfWork.Category.GetAsync(c => c.Id == id);
                if (category == null) {
                    _response.ErrorMessage = new List<string> { "Category not found" };
                    return NotFound(_response);
                }

                // Check if the user is authorized to update the category
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId) || category.UserId != userId)
                {
                    _response.ErrorMessage = new List<string> { "You are Unauthorized to delete this category." };
                    return StatusCode(StatusCodes.Status403Forbidden, _response);
                }

                _unitOfWork.Category.Remove(category);
                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                _response.Result = new { message = "Category deleted successfully" };

                return StatusCode(StatusCodes.Status204NoContent, _response);
            }
            catch (Exception e) {
                _logger.LogError(e, "Error occurred while updating category");
                _response.ErrorMessage = new List<string> { e.Message };
            } return StatusCode(StatusCodes.Status500InternalServerError, _response);
        }
    }
}
