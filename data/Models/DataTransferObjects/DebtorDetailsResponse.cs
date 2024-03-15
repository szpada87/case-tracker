namespace Data.Models.DataTransferObjects;

public record DebtorDetailsResponse
{
    public required int Id { get; set; }

    public required string Name { get; set; }
}