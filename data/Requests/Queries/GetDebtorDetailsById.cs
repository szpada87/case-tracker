using Data.Models.DataTransferObjects;
using MediatR;

namespace Data.Requests.Queries;

public record GetDebtorDetailsById(int Id) : IRequest<DebtorDetailsResponse>;