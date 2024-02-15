using FluentValidation;

namespace Search.Validation;

public class GetAllCasesValidator : AbstractValidator<GetAllCasesRequest>
{
    public GetAllCasesValidator()
    {
        RuleLevelCascadeMode = ClassLevelCascadeMode;
        var allowedFields = new List<string>
        {
            "created",
            "status"
        };

        RuleFor(x => x.SortBy)
            .Must(x => x == null || allowedFields.Contains(x))
            .WithMessage($"SortBy must be one of the following: {string.Join(", ", allowedFields)}");
    }
}