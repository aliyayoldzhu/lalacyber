using CyberApi.Models;

namespace CyberApi.Services.Interfaces;

public interface IProductService
{
    Task<(IEnumerable<Product> items, int total)> QueryAsync(string? category, string? q, int page, int pageSize);
    Task<Product?> GetAsync(int id);
    Task<Product> CreateAsync(Product p);
    Task<bool> UpdateAsync(Product p);
    Task<bool> DeleteAsync(int id);
}
