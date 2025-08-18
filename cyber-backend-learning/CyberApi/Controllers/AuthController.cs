using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CyberApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _cfg;
    public AuthController(IConfiguration cfg) => _cfg = cfg;

    /// <summary>
    /// Development-only helper to mint a JWT.
    /// Example:
    ///   GET /api/auth/dev-token?userId=11111111-1111-1111-1111-111111111111&role=admin&name=Ali
    /// Use the returned token as:  Authorization: Bearer {token}
    /// </summary>
    [HttpGet("dev-token")]
    [AllowAnonymous]
    public IActionResult DevToken(
        [FromQuery] Guid userId,
        [FromQuery] string role = "user",
        [FromQuery] string? name = null)
    {
        // Load signing key & token settings from appsettings: Jwt:Key/Issuer/Audience
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new("sub", userId.ToString()),       // your user id (used later by RLS middleware)
            new(ClaimTypes.Role, role),          // "admin" or "user"
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        if (!string.IsNullOrWhiteSpace(name))
            claims.Add(new Claim("name", name));

        var expires = DateTime.UtcNow.AddHours(8);

        var token = new JwtSecurityToken(
            issuer: _cfg["Jwt:Issuer"],
            audience: _cfg["Jwt:Audience"],
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: expires,
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return Ok(new
        {
            token = jwt,
            expiresAtUtc = expires,
            role,
            userId
        });
    }
}
