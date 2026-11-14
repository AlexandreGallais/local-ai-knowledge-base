---
title: "problem-details-service"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/problem-details-service.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# problem-details-service

Problem Details are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the `Microsoft.AspNetCore.Http.IProblemDetailsService` interface, which supports creating problem details in ASP.NET Core. The `Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method on `Microsoft.Extensions.DependencyInjection.IServiceCollection` registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the `Accept` request HTTP header doesn't include one of the content types supported by the registered `Microsoft.AspNetCore.Http.IProblemDetailsWriter` (default: `application/json`):

* `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware`: Generates a problem details response when a custom handler is not defined.
* `Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware`: Generates a problem details response by default.
* `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware`: Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.
