using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Search.Models.DataTransferObjects;
using MediatR;
using Search.Services;
using Search.Models;
using Search.Requests.Queries;
using AutoMapper;
using FluentValidation;

namespace Search.Routes;

public static class CaseRoutesExtensions
{
    public static void RegisterCaseRoutes(this WebApplication app)
    {
        // TODO: Cansellation token!
        app.MapGet("/api/search/", async (IMediator mediator, IMapper mapper, IValidator<GetAllCasesRequest> validator, CancellationToken  cancellationToken, [AsParameters] GetAllCasesRequest request) =>
        {
            validator.ValidateAndThrow(request);
            if (request.SortBy is null)
            {
                request.SortBy = "created";
            }
            var result = await mediator.Send(mapper.Map<GetAllCases>(request), cancellationToken);
            return Results.Ok(result);
        }).WithName("SearchCases").RequireAuthorization("cases:read");
    }
}