using Kaung.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Kaung.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            string authHeader = context.Request.Headers["Authorization"];
            string requestPath = context.Request.Path;
            if (requestPath == "/api/login" || requestPath == "/api/register" || requestPath == "weatherforecast")
            {
                await _next.Invoke(context);
            }
            else
            {
                if (authHeader != null && authHeader.StartsWith("Bearer"))
                {
                    string[] header_and_token = authHeader.Split(' ');
                    string header = header_and_token[0];
                    string token = header_and_token[1];
                    TokenValidationController tokenValidationController = new TokenValidationController();
                    ObjectResult objectResult = (ObjectResult)tokenValidationController.Validate_JWT_Token(context);
                    if (objectResult.StatusCode == 200)
                    {
                        if (requestPath == "/api/jwt")
                        {
                            context.Response.StatusCode = 200;
                        }
                        else
                        {
                            await _next.Invoke(context);
                        }
                    }
                    else
                    {
                        context.Response.StatusCode = 401;
                        return;
                    }
                }
                //if authHeader null or not Bearer
                else
                {
                    context.Response.StatusCode = 401;
                    return;
                }

            }
        }
    }
}
