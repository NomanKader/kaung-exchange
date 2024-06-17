using Kaung.Models;
using Kaung.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kaung.Controllers
{
    public class PriceController : Controller
    {
        private PriceService _service;

        public PriceController(PriceService service)
        {
            _service = service;
        }

        [HttpPut]
        [Route("api/price")]
        public async Task<IActionResult> UpdatePrice([FromBody] PriceModel model)
        {
            var dataResult = await _service.UpdatePrice(model);
            return dataResult > 0 ? Ok("Success") : BadRequest();
        }

        [HttpGet]
        [Route("api/price")]
        public async Task<IActionResult> GetPrice()
        {
            var dataResult = await _service.GetPriceList();
            return Ok(dataResult);
        }
    }
}
