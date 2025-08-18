using CyberApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CyberApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Favorite> Favorites => Set<Favorite>();

    // snake_case conversion (PostgreSQL naming)
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseNpgsql()
            .UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");

        // tables (lowercase/snaked)
        modelBuilder.Entity<Product>().ToTable("products");
        modelBuilder.Entity<CartItem>().ToTable("cart_items")
            .HasKey(c => new { c.UserId, c.ProductId });
        modelBuilder.Entity<Favorite>().ToTable("favorites")
            .HasKey(f => new { f.UserId, f.ProductId });

        // JSONB field conversion for technical_specs
        modelBuilder.Entity<Product>()
            .Property(p => p.TechnicalSpecs)
            .HasColumnType("jsonb")
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<Dictionary<string, object>>(v, (JsonSerializerOptions?)null)
            );

        base.OnModelCreating(modelBuilder);
    }
}