using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Claims;
using Data.Models.DataTransferObjects;
using Data.Requests.Commands;
using Data.Requests.Queries;
using FluentValidation;
using MediatR;

namespace Data.Routes;

public static class DebtorRoutesExtensions
{
    public static void RegisterDebtorRoutes(this WebApplication app)
    {
        app.MapGet("/api/data/debtor/{id:int}", async (IMediator mediator, int id) =>
        {
            var debtorDetails = await mediator.Send(new GetDebtorDetailsById(id));
            return debtorDetails is not null ? Results.Ok(debtorDetails) : Results.NotFound();
        }).WithName("DebtorDetailsById")
        .Produces<DebtorDetailsResponse>((int)HttpStatusCode.OK)
        .RequireAuthorization("cases:read");

        app.MapGet("/api/data/debtor", async (IMediator mediator) =>
        {
            var debtors = await mediator.Send(new GetAllDebtors());
            return debtors is not null ? Results.Ok(debtors) : Results.NotFound();
        }).WithName("AllDebtors")
        .Produces<IEnumerable<DebtorDetailsResponse>>((int)HttpStatusCode.OK)
        .RequireAuthorization("cases:read");

        app.MapPost("/api/data/debtor", async (IValidator<CreateDebtorRequest> validator, IMediator mediator, CreateDebtorRequest request) =>
        {
            validator.ValidateAndThrow(request);
            var newDebtor = await mediator.Send(new CreateDebtorCommand(request));
            return Results.CreatedAtRoute("DebtorDetailsById", new { id = newDebtor.Id }, newDebtor);
        }).WithName("CreateDebtor").WithOpenApi(operation =>
        {
            operation.Description = "Creates new debtor.";
            return operation;
        }).Produces<DebtorDetailsResponse>((int)HttpStatusCode.Created)
        .ProducesValidationProblem((int)HttpStatusCode.BadRequest)
        .RequireAuthorization("cases:add");
    }
}