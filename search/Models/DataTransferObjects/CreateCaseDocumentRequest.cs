using System.Text.Json.Serialization;

namespace Search.Models.DataTransferObjects;

public record CreateCaseDocumentRequest
{
    public required string Description { get; set; }

    public required CaseStatus? Status { get; set; }

    public required DateTime? Expire { get; set; }
}