using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KaungExchange_Api.Controllers
{
    public class WalletExchangeController : Controller
    {
        private WalletExchangeService _service;

        public WalletExchangeController(WalletExchangeService service)
        {
            _service = service;
        }

        [Route("api/exchangewallet")]
        [HttpPost]
        public async Task<IActionResult> ExchangeWallet([FromBody] WalletExchangeModel model)
        {
            var dataResult = await _service.ExchangeWallet(model);
            if (dataResult > 0)
            {
                return StatusCode(StatusCodes.Status200OK);
            }
            else if (dataResult == -1)
            {
                return StatusCode(StatusCodes.Status402PaymentRequired);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }

        [Route("api/exchangewallet")]
        [HttpGet]
        public async Task<IActionResult> WalletExchangeHistoryList(DateTime? fromDate, DateTime? toDate)
        {
            var dataResult = await _service.WalletExchangeHistoryList(fromDate, toDate);
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }
    }
}
