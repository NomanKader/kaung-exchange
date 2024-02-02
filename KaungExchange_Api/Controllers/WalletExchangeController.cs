using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}
