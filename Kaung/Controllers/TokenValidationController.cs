using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Kaung.Controllers
{
    public class TokenValidationController : Controller
    {
        [HttpGet]
        [Route("api/jwt")]
        public IActionResult Validate_JWT_Token([FromHeader] HttpContext context)
        {
            try
            {
                string authHeader = context.Request.Headers["Authorization"];
                string[] header_and_token = authHeader.Split(' ');
                string header = header_and_token[0];
                string token = header_and_token[1];
                if (header != "Bearer")
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid Token");
                }
                else
                {
                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    JwtSecurityToken jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                    if (jwtToken == null) return StatusCode(StatusCodes.Status401Unauthorized, "Invalid Token");
                    byte[] key = Convert.FromBase64String("zwewaiyanhtetNkSoftwarehouse9911");
                    TokenValidationParameters parameters = new TokenValidationParameters()
                    {
                        RequireExpirationTime = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                    SecurityToken securityToken;
                    ClaimsPrincipal principal = tokenHandler.ValidateToken(token, parameters, out securityToken);
                    if (principal != null)
                    {
                        return StatusCode(StatusCodes.Status200OK, "Token Valid");
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, "Invalid Token");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid Token");
            }
        }
    }
}
