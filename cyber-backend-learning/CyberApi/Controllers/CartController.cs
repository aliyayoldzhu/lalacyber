using CyberApi.Data;
using CyberApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CyberApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Require valid JWT
public class CartController : ControllerBase
{
    private readonly AppDbContext _db;

    public CartController(AppDbContext db)
    {
        _db = db;
    }

    // Extracts the user id from JWT claims
    private Guid? GetUserId()
    {
        var claim = User.FindFirstValue("sub") ?? User.FindFirstValue("user_id");
        return Guid.TryParse(claim, out var g) ? g : null;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var uid = GetUserId(); 
        if (uid is null) return Unauthorized();

        var items = await _db.CartItems
            .Where(c => c.UserId == uid)
            .Join(_db.Products, c => c.ProductId, p => p.Id, (c, p) => new
            {
                p.Id,
                p.Name,
                p.Price,
                c.Quantity,
                c.IsSelected,
                p.Brand,
                p.Model
            })
            .ToListAsync();

        var total = items
            .Where(i => i.IsSelected)
            .Sum(i => i.Price * i.Quantity);

        return Ok(new { items, total });
    }

    [HttpPost("{productId:int}")]
    public async Task<IActionResult> Add(int productId)
    {
        var uid = GetUserId(); 
        if (uid is null) return Unauthorized();

        var item = await _db.CartItems.FindAsync(uid, productId);
        if (item is null)
        {
            _db.CartItems.Add(new CartItem
            {
                UserId = uid.Value,
                ProductId = productId,
                Quantity = 1
            });
        }
        else
        {
            item.Quantity += 1;
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{productId:int}/quantity/{qty:int}")]
    public async Task<IActionResult> SetQuantity(int productId, int qty)
    {
        var uid = GetUserId(); 
        if (uid is null) return Unauthorized();
        if (qty < 1) return BadRequest("qty >= 1");

        var item = await _db.CartItems.FindAsync(uid, productId);
        if (item is null) return NotFound();

        item.Quantity = qty;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{productId:int}/select/{selected:bool}")]
    public async Task<IActionResult> Select(int productId, bool selected)
    {
        var uid = GetUserId(); 
        if (uid is null) return Unauthorized();

        var item = await _db.CartItems.FindAsync(uid, productId);
        if (item is null) return NotFound();

        item.IsSelected = selected;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{productId:int}")]
    public async Task<IActionResult> Remove(int productId)
    {
        var uid = GetUserId(); 
        if (uid is null) return Unauthorized();

        var item = await _db.CartItems.FindAsync(uid, productId);
        if (item is null) return NotFound();

        _db.CartItems.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
