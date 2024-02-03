using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KaungExchange_Api.Controllers
{
    public class SaleController : Controller
    {
        private SaleServices _saleServices;

        public SaleController(SaleServices saleservices)
        {
            _saleServices = saleservices;
        }

        [Route("api/sale")]
        [HttpPost]
        public async Task<IActionResult> AddSale([FromBody] SalesModel model)
        {
            var dataResult = await _saleServices.AddSale(model);
            if (dataResult > 0)
            {
                return StatusCode(StatusCodes.Status200OK);
            }
            else if (dataResult == -1)
            {
                return StatusCode(StatusCodes.Status402PaymentRequired);
            }
            else if (dataResult == -2)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }

        [Route("api/sale")]
        [HttpGet]
        public async Task<IActionResult> SaleHistory()
        {
            var dataResult = await _saleServices.SaleHistory();
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }
    }
}
