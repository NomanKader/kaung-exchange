using KaungExchange_Api.Models.Entities;
using KaungExchange_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace KaungExchange_Api.Controllers
{
    public class TransferRateController : Controller
    {
        private TransferRateServices _service;

        public TransferRateController(TransferRateServices service)
        {
            _service = service;
        }

        [Route("api/transferrate")]
        [HttpPost]
        public async Task<IActionResult> SetupTransferRate([FromBody] TransferRateModel model)
        {
            var dataResult = await _service.SetupTransferRate(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK, "Success") :
                StatusCode(StatusCodes.Status202Accepted);
        }

        [Route("api/transferrate")]
        [HttpPut]
        public async Task<IActionResult> UpdateTransferRate([FromBody] TransferRateModel model)
        {
            var dataResult = await _service.UpdateTransferRate(model);
            return dataResult > 0 ? StatusCode(StatusCodes.Status200OK, "Success") :
                StatusCode(StatusCodes.Status202Accepted);
        }

        [Route("api/transferrate")]
        [HttpGet]
        public async Task<IActionResult> GetTransferRateList()
        {
            var dataResult = await _service.TransferRateList();
            return Content(JsonConvert.SerializeObject(dataResult), "application/json");
        }
    }
}
