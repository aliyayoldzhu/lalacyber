namespace CyberApi.Models.Dtos;

public record ProductCreateDto(
    string Name,
    string Category,
    decimal Price,
    string Status,
    string? Image,
    string? Specs,
    string? Description,
    List<string>? Features,
    Dictionary<string,object>? TechnicalSpecs,
    string? Brand,
    string? Model
);

public record ProductUpdateDto(
    int Id,
    string Name,
    string Category,
    decimal Price,
    string Status,
    string? Image,
    string? Specs,
    string? Description,
    List<string>? Features,
    Dictionary<string,object>? TechnicalSpecs,
    string? Brand,
    string? Model
);
