using CyberApi.Data;
using CyberApi.Models;
using CyberApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CyberApi.Services.Implementations;

public class ProductService(AppDbContext db) : IProductService
{
    public async Task<(IEnumerable<Product> items, int total)> QueryAsync(string? category, string? q, int page, int pageSize)
    {
        var qy = db.Products.AsQueryable();
        if (!string.IsNullOrWhiteSpace(category))
            qy = qy.Where(p => p.Category == category);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.ToLower();
            qy = qy.Where(p =>
                p.Name.ToLower().Contains(term) ||
               (p.Brand ?? "").ToLower().Contains(term) ||
               (p.Model ?? "").ToLower().Contains(term));
        }

        var total = await qy.CountAsync();
        var items = await qy
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return (items, total);
    }

    public Task<Product?> GetAsync(int id) => db.Products.FindAsync(id).AsTask();

    public async Task<Product> CreateAsync(Product p)
    {
        db.Products.Add(p);
        await db.SaveChangesAsync();
        return p;
    }

    public async Task<bool> UpdateAsync(Product p)
    {
        if (!await db.Products.AnyAsync(x => x.Id == p.Id)) return false;
        db.Entry(p).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await db.Products.FindAsync(id);
        if (entity is null) return false;
        db.Products.Remove(entity);
        await db.SaveChangesAsync();
        return true;
    }
}
