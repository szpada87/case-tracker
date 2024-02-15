using Data.Models.DataTransferObjects;
using FluentValidation;

namespace Data.Models.Validation;

public partial class CreateCaseRequestValidator : AbstractValidator<CreateCaseRequest>
{
    public CreateCaseRequestValidator()
    {
        RuleFor(x => x.Expire)
            .NotEmpty().WithMessage("Expiration date is required.")
            .GreaterThan(DateTime.Now)
            .WithMessage("Expiration date must be in the future.");
    }
}