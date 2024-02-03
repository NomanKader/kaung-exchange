using KaungExchange_Api.Models;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace KaungExchange_Api.Controllers
{
    public class SaleController : Controller
    {
        private SaleServices _Saleservices;

        public SaleController(SaleServices saleservices)
        {
            _Saleservices = saleservices;
        }

        [Route("api/addsale")]
        [HttpPost]
        public async Task<IActionResult> AddSale([FromBody] SalesModel model)
        {
            var dataResult = await _Saleservices.AddSale(model);
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
    }
}
