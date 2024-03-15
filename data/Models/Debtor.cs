namespace Data.Models;

public record Debtor
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required ICollection<Case> Cases { get; set; }
}