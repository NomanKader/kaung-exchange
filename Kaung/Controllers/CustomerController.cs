using Kaung.Models;
using Kaung.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kaung.Controllers
{
    public class CustomerController : Controller
    {
        private CustomerServices _service;

        public CustomerController(CustomerServices service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("api/customer")]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerModel model)
        {
            var dataResult = await _service.CreateCustomer(model);
            return dataResult > 0 ? Ok("Success") : StatusCode(StatusCodes.Status409Conflict,
                "Customer Name " + model.CustomerName + " is already exist");
        }

        [HttpGet]
        [Route("api/customer")]
        public async Task<IActionResult> GetCustomer()
        {
            var dataResult = await _service.GetCustomerList();
            return Ok(dataResult);
        }

        [HttpDelete]
        [Route("api/customer")]
        public async Task<IActionResult> DeleteCustomer(int customerId)
        {
            var dataResult = await _service.DeleteCustomer(customerId);
            return dataResult > 0 ? Ok("Success") : BadRequest();
        }

        [HttpPut]
        [Route("api/customer")]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomerModel model)
        {
            var dataResult = await _service.UpdateCustomer(model);
            return dataResult > 0 ? Ok("Success") : StatusCode(StatusCodes.Status409Conflict,
                "Sorry you cannot update.Customer Name " + model.CustomerName + " is already exist");
        }
    }
}
