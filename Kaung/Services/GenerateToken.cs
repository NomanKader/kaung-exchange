using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Kaung.Services
{
    public class GenerateToken
    {
        public string Generate_Token(string user_name, string password)
        {
            string secret_key = "zwewaiyanhtetNkSoftwarehouse9911"; //Secret key which will be used later during validation    
            byte[] key = Convert.FromBase64String(secret_key);
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(key);
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user_name),
                    new Claim(ClaimTypes.SerialNumber, password),
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),//token expires after 30 minutes
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}
