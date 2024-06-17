using Kaung.Models;
using Kaung.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kaung.Controllers
{
    public class BuyController : Controller
    {
        private BuyServices _service;

        public BuyController(BuyServices service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("api/buy")]
        public async Task<IActionResult> SaveBuyRecord([FromBody] BuyModel model)
        {
            var dataResult = await _service.SaveBuyRecord(model);
            return dataResult > 0 ? Ok("Success") : BadRequest();
        }

        [HttpGet]
        [Route("api/buy")]
        public async Task<IActionResult> GetBuyList(DateTime fromDate, DateTime toDate, string customerName)
        {
            var dataResult = await _service.GetBuyList(fromDate, toDate, customerName);
            return Ok(dataResult);
        }
    }
}
