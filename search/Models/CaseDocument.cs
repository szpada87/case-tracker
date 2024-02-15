namespace Search.Models;

public record CaseDocument
{
    public int Id { get; set; }

    public required string Description { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public required DateTime Expire { get; set; }

    public required CaseStatus Status { get; set; }

    public required string OwnerId { get; set; }
}