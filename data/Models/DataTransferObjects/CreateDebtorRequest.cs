namespace Data.Models.DataTransferObjects;

public record CreateDebtorRequest
{
    public required string Name { get; set; }
}