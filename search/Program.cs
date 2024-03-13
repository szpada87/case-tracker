using Search.Extensions;
using Search.Routes;
using Utils.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddCors();
builder.AddAuthentication();
builder.AddAuthorization(new List<string>() { "cases:read" });
builder.RegisterServiceBus();
builder.RegisterServiceBusService();
builder.AddSwagger();
builder.RegisterDependencies();
builder.RegisterElasticSearch();
builder.AddValidation();
builder.AddLogging();

var app = builder.Build();
app.UseSwagger("search");
app.UseLogging();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseErrorHandling();
app.UseValidation();

app.RegisterCaseRoutes();

app.Run("http://*:3000");
