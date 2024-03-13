using Data.Extensions;
using Data.Routes;
using Utils.Extensions;

var builder = WebApplication.CreateBuilder(args);
// Test

builder.AddAuthentication();
builder.AddAuthorization(new List<string>() {"cases:read", "cases:add", "cases:delete"});
builder.RegisterServiceBus();
builder.AddSwagger();
builder.RegisterDependencies();
builder.AddValidation();
builder.AddLogging();

var app = builder.Build();
app.EnsureDatabaseIsCreated();
app.UseSwagger("data");
app.UseLogging();
app.UseAuthentication();
app.UseAuthorization();
app.UseErrorHandling();
app.UseValidation();

app.RegisterUtilityRoutes();
app.RegisterCaseRoutes();

app.Run("http://*:3000");
