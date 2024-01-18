using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KaungExchange_Api.Controllers
{
    public class AccountManagementController : Controller
    {
        private AccountServices _accountSerivces;

        public AccountManagementController(AccountServices accountSerivces)
        {
            _accountSerivces = accountSerivces;
        }

        [Route("api/wallet")]
        [HttpPost]
        public async Task<IActionResult> CreateAccountControl([FromBody] AccountModel model)
        {
            var dataResult = await _accountSerivces.CreateAccountControl(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status202Accepted);
        }

        [Route("api/wallet")]
        [HttpGet]
        public async Task<IActionResult> GetAccountControllerList()
        {
            var dataResult = await _accountSerivces.GetAccountControllerList();
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }

        [Route("api/wallet")]
        [HttpPut]
        public async Task<IActionResult> UpdateAccountController([FromBody] AccountModel model)
        {
            var dataResult = await _accountSerivces.UpdateAccountController(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status202Accepted);
        }

        [Route("api/wallet")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAccountController([FromBody] AccountModel model)
        {
            var dataResult = await _accountSerivces.DeleteAccountController(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status202Accepted);
        }

    }
}
