using Data.Models.DataTransferObjects;
using MediatR;

namespace Data.Requests.Queries;

public record GetAllCases() : IRequest<IEnumerable<CaseDetailsResponse>>;