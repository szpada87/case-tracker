using System.Text.Json.Serialization;
using Data.Utilities;

namespace Data.Models.DataTransferObjects;

public record CreateCaseRequest
{
    public required string Description { get; set; }

    public required CaseStatus? Status { get; set; }

    [JsonConverter(typeof(NullableDateTimeConverter))]
    public required DateTime? Expire { get; set; }

    public required int DebtorId { get; set; }
}