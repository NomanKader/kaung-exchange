using Kaung.Helper;
using Kaung.Models;
using Kaung.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kaung.Controllers
{
    public class UserController : Controller
    {
        private UserServices _services;
        private EncryptPassword _encryptMethod;
        private DecryptPassword _decryptMethod;
        private GenerateToken _tokenGenerator;

        public UserController(UserServices services, EncryptPassword encryptMethod,
            DecryptPassword decryptMethod, GenerateToken tokenGenerator)
        {
            _services = services;
            _encryptMethod = encryptMethod;
            _decryptMethod = decryptMethod;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        [Route("api/register")]
        public async Task<IActionResult> Register([FromBody] UserModel model)
        {
            LoginResponseModel responseModel = new LoginResponseModel();
            model.Password = _encryptMethod.Encrypt_Password(model.Password);
            var dataResult = await _services.Register(model);
            return dataResult > 0 ? Ok("Success") : BadRequest();
        }

        [HttpPost]
        [Route("api/login")]
        public async Task<IActionResult> Login([FromBody] UserModel model)
        {
            LoginResponseModel responseModel = new LoginResponseModel();
            model.Password = _encryptMethod.Encrypt_Password(model.Password);
            var dataResult = await _services.Login(model);
            if (dataResult.UserID != 0)
            {
                responseModel.Token = _tokenGenerator.Generate_Token(model.UserName, model.Password);
                if (responseModel.Token != null)
                {
                    responseModel.UserID = dataResult.UserID;
                    responseModel.UserName = dataResult.UserName;
                    responseModel.UserRole = dataResult.UserRole;
                    return Ok(responseModel);
                }
            }
            return StatusCode(StatusCodes.Status401Unauthorized, "You are not authenticated user");
        }
    }
}
