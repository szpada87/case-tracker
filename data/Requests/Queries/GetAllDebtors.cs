using Data.Models.DataTransferObjects;
using MediatR;

namespace Data.Requests.Queries;

public record GetAllDebtors() : IRequest<IEnumerable<DebtorDetailsResponse>>;