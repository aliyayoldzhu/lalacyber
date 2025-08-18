using CyberApi.Data;
using CyberApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberApi.Controllers
{
    [Authorize] // Require authentication for all endpoints
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public FavoritesController(AppDbContext db)
        {
            _db = db;
        }

        // Extract user ID from JWT claims
        private Guid? GetUserId()
        {
            // Try both "sub" and "user_id" claims
            var claimValue = User.FindFirst("sub")?.Value ?? User.FindFirst("user_id")?.Value;

            return Guid.TryParse(claimValue, out var g) ? g : null;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var uid = GetUserId();
            if (uid is null) return Unauthorized();

            var items = await _db.Favorites
                .Where(f => f.UserId == uid)
                .Join(_db.Products, f => f.ProductId, p => p.Id, (f, p) => p)
                .ToListAsync();

            return Ok(items);
        }

        [HttpPost("{productId:int}")]
        public async Task<IActionResult> Add(int productId)
        {
            var uid = GetUserId();
            if (uid is null) return Unauthorized();

            // Check if already exists
            var exists = await _db.Favorites
                .FirstOrDefaultAsync(f => f.UserId == uid && f.ProductId == productId);

            if (exists == null)
            {
                _db.Favorites.Add(new Favorite
                {
                    UserId = uid.Value,
                    ProductId = productId
                });
                await _db.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpDelete("{productId:int}")]
        public async Task<IActionResult> Remove(int productId)
        {
            var uid = GetUserId();
            if (uid is null) return Unauthorized();

            var fav = await _db.Favorites
                .FirstOrDefaultAsync(f => f.UserId == uid && f.ProductId == productId);

            if (fav is null) return NotFound();

            _db.Favorites.Remove(fav);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
