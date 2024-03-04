using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Claims;
using Data.Models.DataTransferObjects;
using Data.Requests.Commands;
using Data.Requests.Queries;
using FluentValidation;
using MediatR;

namespace Data.Routes;

public static class CaseRoutesExtensions
{
    public static void RegisterCaseRoutes(this WebApplication app)
    {
        app.MapGet("/api/data/{id:int}", async (IMediator mediator, int id) =>
        {
            var caseDetails = await mediator.Send(new GetCaseDetailsById(id));
            return caseDetails is not null ? Results.Ok(caseDetails) : Results.NotFound();
        }).WithName("CaseDetailsById")
        .Produces<CaseDetailsResponse>((int)HttpStatusCode.OK)
        .RequireAuthorization("cases:read");

        app.MapGet("/api/data", async (IMediator mediator) =>
        {
            var cases = await mediator.Send(new GetAllCases());
            return cases is not null ? Results.Ok(cases) : Results.NotFound();
        }).WithName("AllCases")
        .Produces<IEnumerable<CaseDetailsResponse>>((int)HttpStatusCode.OK)
        .RequireAuthorization("cases:read");

        app.MapPost("/api/data", async (IValidator<CreateCaseRequest> validator, IMediator mediator, CreateCaseRequest request, ClaimsPrincipal user) =>
        {
            // TODO: Maybe validation filter? https://stackoverflow.com/questions/75735862/fluentvalidation-validate-automatically-the-request-net-7-minimal-api
            validator.ValidateAndThrow(request);
            // TODO: Add user validator
            string userId = user.Identity?.Name;
            var newCase = await mediator.Send(new CreateCaseCommand(request, userId));
            return Results.CreatedAtRoute("CaseDetailsById", new { id = newCase.Id }, newCase);
        }).WithName("CreateCase").WithOpenApi(operation =>
        {
            operation.Description = "Creates new case.";
            return operation;
        }).Produces<CaseDetailsResponse>((int)HttpStatusCode.Created)
        .ProducesValidationProblem((int)HttpStatusCode.BadRequest)
        .RequireAuthorization("cases:add");
    }
}