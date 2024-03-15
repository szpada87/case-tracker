using Data.Models.DataTransferObjects;
using FluentValidation;

namespace Data.Models.Validation;

public partial class CreateDebtorRequestValidator : AbstractValidator<CreateDebtorRequest>
{
    public CreateDebtorRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MinimumLength(3)
            .WithMessage("Debtor name should be at least 3 characters long!");
    }
}