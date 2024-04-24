using BisleriumBlog.Models;
using BisleriumBlog.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BisleriumBlog.API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected APIResponse _response;
        public UserController()
        {
            this._response = new();
        }

        [HttpPost("Register")]
        public async Task<ActionResult<APIResponse>> Register(UserCreateDTO userCreateDto)
        {
            try
            {

            }
            catch (Exception e)
            {
                _response.ErrorMessage = new List<string?>() { e.ToString() };
            }
            return _response;
        }
    }
}
