using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace CyberApi.Models;

[Table("products")] // table name
public class Product
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required, Column("name")]
    public string Name { get; set; } = string.Empty;

    [Required, Column("category")]
    public string Category { get; set; } = string.Empty;

    [Column("price")]
    public decimal Price { get; set; }

    [Required, Column("status")]
    public string Status { get; set; } = "In Stock";

    [Column("image")]
    public string? Image { get; set; }

    [Column("specs")]
    public string? Specs { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    // postgres text[] <-> string[]
    [Column("features")]
    public string[]? Features { get; set; }
    
    // postgres jsonb <-> Dictionary<string, object>
    [Column("technical_specs", TypeName = "jsonb")]
    public Dictionary<string, object>? TechnicalSpecs { get; set; }

    [Column("brand")]
    public string? Brand { get; set; }

    [Column("model")]
    public string? Model { get; set; }

    [Column("created_at")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
}
