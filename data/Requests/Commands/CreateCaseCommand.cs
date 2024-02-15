using Data.Models.DataTransferObjects;
using MediatR;

namespace Data.Requests.Commands;

public record CreateCaseCommand(CreateCaseRequest CreateCaseRequest, string OwnerId) : IRequest<CaseDetailsResponse>;