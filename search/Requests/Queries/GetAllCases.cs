using MediatR;
using Search.Models.DataTransferObjects;

namespace Search.Requests.Queries;

public record GetAllCases : GetAllCasesRequest, IRequest<List<CaseResponse>>
{ }