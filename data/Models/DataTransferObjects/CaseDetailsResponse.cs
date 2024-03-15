namespace Data.Models.DataTransferObjects;

public record CaseDetailsResponse
{
    public required int Id { get; set; }

    public required string Description { get; set; }

    public required DateTime Created { get; set; }

    public required CaseStatus Status { get; set; }

    public required DateTime Expire { get; set; }

    public required string OwnerId { get; set; }

    public required DebtorDetailsResponse DebtorDetails { get; set; }
}