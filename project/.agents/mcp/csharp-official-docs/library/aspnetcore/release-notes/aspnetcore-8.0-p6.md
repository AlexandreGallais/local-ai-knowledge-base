---
title: "What's new in ASP.NET Core in .NET 8 (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-8.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 8 (part 6 of 6)

## Miscellaneous

The following sections describe miscellaneous new features in ASP.NET Core in .NET 8.

### Keyed services support in Dependency Injection

*Keyed services* refers to a mechanism for registering and retrieving Dependency Injection (DI) services using keys. A service is associated with a key by calling `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedSingleton*` (or `AddKeyedScoped` or `AddKeyedTransient`) to register it. Access a registered service by specifying the key with the `[FromKeyedServices]` attribute. The following code shows how to use keyed services:

_Code sample not included: ~/../AspNetCore.Docs.Samples/samples/KeyedServices/Program.cs._
### Visual Studio project templates for SPA apps with ASP.NET Core backend

Visual Studio project templates are now the recommended way to create single-page apps (SPAs) that have an ASP.NET Core backend. Templates are provided that create apps based on the JavaScript technologies, such as Angular, React, and Vue. These templates:

* Create a Visual Studio solution with a frontend project and a backend project.
* Use the Visual Studio project type for JavaScript and TypeScript (*.esproj*) for the frontend.
* Use an ASP.NET Core project for the backend.

For more information about the Visual Studio templates and how to access the legacy templates, see Overview of Single Page Apps (SPAs) - ASP.NET Core

### Support for generic attributes

Attributes that previously required a `System.Type` parameter are now available in cleaner generic variants. This is made possible by support for generic attributes in C# 11. For example, the syntax for annotating the response type of an action can be modified as follows:

```diff
[ApiController]
[Route("api/[controller]")]
public class TodosController : Controller
{
  [HttpGet("/")]
- [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
+ [ProducesResponseType<Todo>(StatusCodes.Status200OK)]
  public Todo Get() => new Todo(1, "Write a sample", DateTime.Now, false);
}
```

Generic variants are supported for the following attributes:

* `[ProducesResponseType<T>]`
* `[Produces<T>]`
* `[MiddlewareFilter<T>]`
* `[ModelBinder<T>]`
* `[ModelMetadataType<T>]`
* `[ServiceFilter<T>]`
* `[TypeFilter<T>]`

### Code analysis in ASP.NET Core apps

The new analyzers shown in the following table are available in .NET 8.

| Diagnostic ID | Breaking or nonbreaking | Description |
| --- | --- | --- |
| ASP0016 | Nonbreaking | Don't return a value from RequestDelegate |
| ASP0019 | Nonbreaking | Suggest using IHeaderDictionary.Append or the indexer |
| ASP0020 | Nonbreaking | Complex types referenced by route parameters must be parsable |
| ASP0021 | Nonbreaking | The return type of the BindAsync method must be `ValueTask<T>` |
| ASP0022 | Nonbreaking | Route conflict detected between route handlers |
| ASP0023 | Nonbreaking | MVC: Route conflict detected between route handlers |
| ASP0024 | Nonbreaking | Route handler has multiple parameters with the `[FromBody]` attribute |
| ASP0025 | Nonbreaking | Use AddAuthorizationBuilder |

### Route tooling

ASP.NET Core is built on routing. Minimal APIs, Web APIs, Razor Pages, and Blazor all use routes to customize how HTTP requests map to code.

In .NET 8 we've invested in a suite of new features to make routing easier to learn and use. These new features include:

* Route syntax highlighting
* Autocomplete of parameter and route names
* Autocomplete of route constraints
* Route analyzers and fixers
  * Route syntax analyzer
  * Mismatched parameter optionality analyzer and fixer
  * Ambiguous Minimal API and Web API route analyzer
* Support for Minimal APIs, Web APIs, and Blazor

For more information, see Route tooling in .NET 8.

### ASP.NET Core metrics

Metrics are measurements reported over time and are most often used to monitor the health of an app and to generate alerts. For example, a counter that reports failed HTTP requests could be displayed in dashboards or generate alerts when failures pass a threshold.

This preview adds new metrics throughout ASP.NET Core using `System.Diagnostics.Metrics`. `Metrics` is a modern API for reporting and collecting information about apps.

Metrics offers many improvements compared to existing event counters:

* New kinds of measurements with counters, gauges and histograms.
* Powerful reporting with multi-dimensional values.
* Integration into the wider cloud native ecosystem by aligning with OpenTelemetry standards.

Metrics have been added for ASP.NET Core hosting, Kestrel, and SignalR. For more information, see System.Diagnostics.Metrics.

### IExceptionHandler

`Microsoft.AspNetCore.Diagnostics.IExceptionHandler` is a new interface that gives the developer a callback for handling known exceptions in a central location.

`IExceptionHandler` implementations are registered by calling `IServiceCollection.AddExceptionHandler<T>`. Multiple implementations can be added, and they're called in the order registered. If an exception handler handles a request, it can return `true` to stop processing. If an exception isn't handled by any exception handler, then control falls back to the default behavior and options from the middleware.

For more information, see IExceptionHandler.

### Improved debugging experience

Debug customization attributes have been added to types like `HttpContext`, `HttpRequest`, `HttpResponse`, `ClaimsPrincipal`, and `WebApplication`. The enhanced debugger displays for these types make finding important information easier in an IDE's debugger. The following screenshots show the difference that these attributes make in the debugger's display of `HttpContext`.

.NET 7:

.NET 8:

The debugger display for `WebApplication` highlights important information such as configured endpoints, middleware, and `IConfiguration` values.

.NET 7:

.NET 8:

For more information about debugging improvements in .NET 8, see:

* Debugging Enhancements in .NET 8
* GitHub issue dotnet/aspnetcore 48205

### `IPNetwork.Parse` and `TryParse`

The new `System.Net.IPNetwork.Parse*` and `System.Net.IPNetwork.TryParse*` methods on `System.Net.IPNetwork` add support for creating an `IPNetwork` by using an input string in CIDR notation or "slash notation".

Here are IPv4 examples:

```csharp
// Using Parse
var network = IPNetwork.Parse("192.168.0.1/32");
```

```csharp
// Using TryParse
bool success = IPNetwork.TryParse("192.168.0.1/32", out var network);
```

```csharp
// Constructor equivalent
var network = new IPNetwork(IPAddress.Parse("192.168.0.1"), 32);
```

And here are examples for IPv6:

```csharp
// Using Parse
var network = IPNetwork.Parse("2001:db8:3c4d::1/128");
```

```csharp
// Using TryParse
bool success = IPNetwork.TryParse("2001:db8:3c4d::1/128", out var network);
```

```csharp
// Constructor equivalent
var network = new IPNetwork(IPAddress.Parse("2001:db8:3c4d::1"), 128);
```

### Redis-based output caching

ASP.NET Core in .NET 8 adds support for using Redis as a distributed cache for output caching. Output caching is a feature that enables an app to cache the output of a Minimal API endpoint, controller action, or Razor Page. For more information, see Output caching.

### Short-circuit middleware after routing

When routing matches an endpoint, it typically lets the rest of the middleware pipeline run before invoking the endpoint logic. Services can reduce resource usage by filtering out known requests early in the pipeline. Use the `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` extension method to cause routing to invoke the endpoint logic immediately and then end the request. For example, a given route might not need to go through authentication or CORS middleware. The following example short-circuits requests that match the `/short-circuit` route:

```csharp
app.MapGet("/short-circuit", () => "Short circuiting!").ShortCircuit();
```
Use the `Microsoft.AspNetCore.Routing.RouteShortCircuitEndpointRouteBuilderExtensions.MapShortCircuit*` method to set up short-circuiting for multiple routes at once, by passing to it a params array of URL prefixes. For example, browsers and bots often probe servers for well known paths like `robots.txt` and `favicon.ico`. If the app doesn't have those files, one line of code can configure both routes:

```csharp
app.MapShortCircuit(404, "robots.txt", "favicon.ico");
```
For more information, see Short-circuit middleware after routing.

### HTTP logging middleware extensibility

The HTTP logging middleware has several new capabilities:

* `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.Duration`: When enabled, the middleware emits a new log at the end of the request and response that measures the total time taken for processing. This new field has been added to the `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.All` set.
* `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions.CombineLogs`: When enabled, the middleware consolidates all of its enabled logs for a request and response into one log at the end. A single log message includes the request, request body, response, response body, and duration.
* `Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor`: A new interface for a service that can be implemented and registered (using `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLoggingInterceptor*`) to receive per-request and per-response callbacks for customizing what details get logged. Any endpoint-specific log settings are applied first and can then be overridden in these callbacks. An implementation can:
  * Inspect a request and response.
  * Enable or disable any `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields`.
  * Adjust how much of the request or response body is logged.
  * Add custom fields to the logs.

For more information, see HTTP logging in .NET and ASP.NET Core.

### New APIs in ProblemDetails to support more resilient integrations

In .NET 7, the ProblemDetails service was introduced to improve the experience for generating error responses that comply with the ProblemDetails specification. In .NET 8, a new API was added to make it easier to implement fallback behavior if `Microsoft.AspNetCore.Http.IProblemDetailsService` isn't able to generate `Microsoft.AspNetCore.Mvc.ProblemDetails`. The following example illustrates use of the new `Microsoft.AspNetCore.Http.IProblemDetailsService.TryWriteAsync*` API:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async httpContext =>
    {
        var pds = httpContext.RequestServices.GetService<IProblemDetailsService>();
        if (pds == null
            || !await pds.TryWriteAsync(new() { HttpContext = httpContext }))
        {
            // Fallback behavior
            await httpContext.Response.WriteAsync("Fallback: An error occurred.");
        }
    });
});

app.MapGet("/exception", () =>
{
    throw new InvalidOperationException("Sample Exception");
});

app.MapGet("/", () => "Test by calling /exception");

app.Run();
```
For more information, see IProblemDetailsService fallback

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.

## Related content

* Announcing ASP.NET Core in .NET 8 (blog post)
* ASP.NET Core announcements and breaking changes (`aspnet/Announcements` GitHub repository)
* .NET announcements and breaking changes (`dotnet/Announcements` GitHub repository)
