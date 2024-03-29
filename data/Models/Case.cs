using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public record Case
{
    public int Id { get; set; }

    public required string Description { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public required DateTime Expire { get; set; }

    public required CaseStatus Status { get; set; }

    public required string OwnerId { get; set; }

    public required Debtor Debtor { get; set; }

    public required int DebtorId { get; set; }
}