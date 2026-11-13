---
title: "Handle errors in ASP.NET Core (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/error-handling.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core (part 4 of 4)

## Problem details

Problem Details are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the `Microsoft.AspNetCore.Http.IProblemDetailsService` interface, which supports creating problem details in ASP.NET Core. The `Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method on `Microsoft.Extensions.DependencyInjection.IServiceCollection` registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the `Accept` request HTTP header doesn't include one of the content types supported by the registered `Microsoft.AspNetCore.Http.IProblemDetailsWriter` (default: `application/json`):

* `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware`: Generates a problem details response when a custom handler is not defined.
* `Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware`: Generates a problem details response by default.
* `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware`: Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.

The following code configures the app to generate a problem details response for all HTTP client and server error responses that ***don't have body content yet***:

```csharp
builder.Services.AddProblemDetails();

var app = builder.Build();        

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
    app.UseHsts();
}

app.UseStatusCodePages();
```
The next section shows how to customize the problem details response body.

### Customize problem details

The automatic creation of a `ProblemDetails` can be customized using any of the following options:

1. Use `ProblemDetailsOptions.CustomizeProblemDetails`
2. Use a custom `IProblemDetailsWriter`
3. Call the `IProblemDetailsService` in a middleware

#### `CustomizeProblemDetails` operation

The generated problem details can be customized using `Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails`, and the customizations are applied to all auto-generated problem details.

The following code uses `Microsoft.AspNetCore.Http.ProblemDetailsOptions` to set `Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails`:

```csharp
builder.Services.AddProblemDetails(options =>
    options.CustomizeProblemDetails = ctx =>
            ctx.ProblemDetails.Extensions.Add("nodeId", Environment.MachineName));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
    app.UseHsts();
}

app.UseStatusCodePages();
```
For example, an `HTTP Status 400 Bad Request` endpoint result produces the following problem details response body:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Bad Request",
  "status": 400,
  "nodeId": "my-machine-name"
}
```

#### Custom `IProblemDetailsWriter`

An `Microsoft.AspNetCore.Http.IProblemDetailsWriter` implementation can be created for advanced customizations.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/SampleProblemDetailsWriter.cs._
***Note:*** When using a custom `IProblemDetailsWriter`, the custom `IProblemDetailsWriter` must be registered before calling `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages*`, `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers*`, `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews*`, or `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc*`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
#### Problem details from middleware

An alternative approach to using `Microsoft.AspNetCore.Http.ProblemDetailsOptions` with `Microsoft.AspNetCore.Http.ProblemDetailsOptions.CustomizeProblemDetails` is to set the `Microsoft.AspNetCore.Http.ProblemDetailsContext.ProblemDetails` in middleware. A problem details response can be written by calling `IProblemDetailsService.WriteAsync`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
In the preceding code, the Minimal API endpoints `/divide` and `/squareroot` return the expected custom problem response on error input.

The API controller endpoints return the default problem response on error input, not the custom problem response. The default problem response is returned because the API controller has written to the response stream, Problem details for error status codes, before `IProblemDetailsService.WriteAsync` is called and the response is **not** written again.

The following `ValuesController` returns `Microsoft.AspNetCore.Mvc.BadRequestResult`, which writes to the response stream and therefore prevents the custom problem response from being returned.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs._
The following `Values3Controller` returns `ControllerBase.Problem` so the expected custom problem result is returned:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Controllers/ValuesController.cs._
## Produce a ProblemDetails payload for exceptions

Consider the following app:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
In non-development environments, when an exception occurs, the following is a standard ProblemDetails response that is returned to the client:

```json
{
"type":"https://tools.ietf.org/html/rfc7231#section-6.6.1",
"title":"An error occurred while processing your request.",
"status":500,"traceId":"00-b644<snip>-00"
}
```

For most apps, the preceding code is all that's needed for exceptions. However, the following section shows how to get more detailed problem responses.

An alternative to a custom exception handler page is to provide a lambda to `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. Using a lambda allows access to the error and writing a problem details response with `IProblemDetailsService.WriteAsync`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/middleware/problem-details-service/Program.cs._
> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.

An alternative approach to generate problem details is to use the third-party NuGet package Hellang.Middleware.ProblemDetails that can be used to map exceptions and client errors to problem details.

## Related content

* View or download sample code (how to download)
* Troubleshoot ASP.NET Core on Azure App Service and IIS
* Common error troubleshooting for Azure App Service and IIS with ASP.NET Core
* Handle errors in ASP.NET Core APIs
