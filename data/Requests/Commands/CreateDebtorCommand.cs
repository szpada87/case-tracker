using Data.Models.DataTransferObjects;
using MediatR;

namespace Data.Requests.Commands;

public record CreateDebtorCommand(CreateDebtorRequest CreateDebtorRequest) : IRequest<DebtorDetailsResponse>;