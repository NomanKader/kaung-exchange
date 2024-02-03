using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KaungExchange_Api.Controllers
{
    public class UserController : Controller
    {
        private UserServices _userServices;

        public UserController(UserServices userService)
        {
            _userServices = userService;
        }

        [Route("api/user")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserModel model)
        {
            var dataResult = await _userServices.UserRegister(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status409Conflict);
        }

        [Route("api/user/login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserModel model)
        {
            var dataResult = await _userServices.Login(model.UserName, model.Password);
            return dataResult != null ? StatusCode(StatusCodes.Status200OK, JsonConvert.SerializeObject(dataResult))
                : StatusCode(StatusCodes.Status401Unauthorized);
        }

        [Route("api/user")]
        [HttpGet]
        public async Task<IActionResult> UserList()
        {
            var dataResult = await _userServices.UserList();
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }

        [Route("api/walletlistbystaffid")]
        [HttpGet]
        public async Task<IActionResult> WallListByStaffId(int staffID)
        {
            var dataResult = await _userServices.GetWalletByStaffId(staffID);
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }

        [Route("api/user")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UserModel model)
        {
            var dataResult = await _userServices.UpdateUser(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status202Accepted);
        }

        [Route("api/user")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] UserModel model)
        {
            var dataResult = await _userServices.DeleteUser(model.Id);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status202Accepted);
        }
    }
}
