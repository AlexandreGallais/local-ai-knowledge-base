---
title: "Minimal APIs quick reference (part 7 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Minimal APIs quick reference (part 7 of 7)

## CORS

Routes can be CORS enabled using CORS policies. CORS can be declared via the `[EnableCors]` attribute or by using the
`Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors*` method. The following samples enable CORS:

```csharp
const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

var app = builder.Build();
app.UseCors();

app.MapGet("/",() => "Hello CORS!");

app.Run();
```

```csharp
using Microsoft.AspNetCore.Cors;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

var app = builder.Build();
app.UseCors();

app.MapGet("/cors", [EnableCors(MyAllowSpecificOrigins)] () => 
                           "This endpoint allows cross origin requests!");
app.MapGet("/cors2", () => "This endpoint allows cross origin requests!")
                     .RequireCors(MyAllowSpecificOrigins);

app.Run();
```

For more information, see Enable Cross-Origin Requests (CORS) in ASP.NET Core

## ValidateScopes and ValidateOnBuild

`Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` and `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateOnBuild` are enabled by default in the Development environment but disabled in other environments.

When `ValidateOnBuild` is `true`, the DI container validates the service configuration at build time. If the service configuration is invalid, the build fails at app startup, rather than at runtime when the service is requested.

When `ValidateScopes` is `true`, the DI container validates that a scoped service isn't resolved from the root scope. Resolving a scoped service from the root scope can result in a memory leak because the service is retained in memory longer than the scope of the request.

`ValidateScopes` and `ValidateOnBuild` are false by default in non-Development modes for performance reasons.

The following code shows `ValidateScopes` is enabled by default in development mode but disabled in release mode:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/ValidateOnBuildWeb/Program.cs._
The following code shows `ValidateOnBuild` is enabled by default in development mode but disabled in release mode:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/ValidateOnBuildWeb/Program.cs._
The following code disables `ValidateScopes` and `ValidateOnBuild` in `Development`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/ValidateOnBuildWeb/Program.cs._
## See also

* Minimal APIs quick reference
* Generate OpenAPI documents
* Create responses in Minimal API applications
* Filters in Minimal API apps
* Handle errors in ASP.NET Core APIs
* Authentication and authorization in Minimal APIs
* Test Minimal API apps
* Short-circuit routing
* Identity API endpoints
* Keyed service dependency injection container support
* A look behind the scenes of Minimal API endpoints
* Organizing ASP.NET Core Minimal APIs
* Fluent validation discussion on GitHub
