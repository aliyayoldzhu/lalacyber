using CyberApi.Data;
using CyberApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(AppDbContext db) : ControllerBase
{
    // ---- PUBLIC READ ----
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> Get(
        [FromQuery] string? category,
        [FromQuery] string? q,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        if (page < 1) page = 1;
        if (pageSize is < 1 or > 100) pageSize = 20;

        var query = db.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category == category);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim().ToLower();
            query = query.Where(p =>
                EF.Functions.ILike(p.Name, $"%{term}%") ||
                EF.Functions.ILike(p.Brand ?? "", $"%{term}%") ||
                EF.Functions.ILike(p.Model ?? "", $"%{term}%"));
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new { total, page, pageSize, items });
    }

    [AllowAnonymous]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetOne(int id) =>
        await db.Products.FindAsync(id) is { } p ? Ok(p) : NotFound();

    // ---- WRITE: REQUIRE AUTH (and ideally admin) ----
    [Authorize] // swap to: [Authorize(Policy = "AdminOnly")] if you add a policy
    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] Product input)
    {
        // basic server-side validation
        if (string.IsNullOrWhiteSpace(input.Name) || string.IsNullOrWhiteSpace(input.Category))
            return BadRequest("Name and Category are required.");

        db.Products.Add(input);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOne), new { id = input.Id }, input);
    }

    [Authorize] // or AdminOnly
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Product input)
    {
        if (id != input.Id) return BadRequest("Id mismatch.");
        var exists = await db.Products.AnyAsync(p => p.Id == id);
        if (!exists) return NotFound();

        // Attach and mark modified (UpdatedAt is handled in your DbContext override)
        db.Entry(input).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [Authorize] // or AdminOnly
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.Products.FindAsync(id);
        if (entity is null) return NotFound();

        db.Products.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
