using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CyberApi.Models;

[Table("favorites")]
public class Favorite
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("product_id")]
    public int ProductId { get; set; }

    [Column("created_at")]
    public DateTime? CreatedAt { get; set; }
}
