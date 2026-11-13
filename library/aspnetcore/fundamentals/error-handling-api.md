---
title: "Handle errors in ASP.NET Core APIs (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/error-handling-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core APIs

-->
-->

#### Minimal APIs

This article describes how to handle errors in ASP.NET Core APIs. Documentation for Minimal APIs is selected. To see documentation for controller-based APIs, select the **Controllers** tab. For Blazor error handling guidance, see Handle errors in ASP.NET Core Blazor apps.

#### Controllers

This article describes how to handle errors in ASP.NET Core APIs. Documentation for Controller-based APIs is selected. To see documentation for **Minimal APIs**, select the **Minimal APIs** tab. For Blazor error handling guidance, see Handle errors in ASP.NET Core Blazor apps.

---

## Developer Exception Page

The *Developer Exception Page* displays detailed information about unhandled request exceptions. It uses `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware` to capture synchronous and asynchronous exceptions from the HTTP pipeline and to generate error responses. The developer exception page runs early in the middleware pipeline, so that it can catch unhandled exceptions thrown in middleware that follows.

ASP.NET Core apps enable the developer exception page by default when both:

* Running in the `Development` environment.
* The app was created with the current templates, that is, by using `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*`.

Apps created using earlier templates, that is, by using `Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*`, can enable the developer exception page by calling `app.UseDeveloperExceptionPage`).

> **Warning:**
> Don't enable the Developer Exception Page **unless the app is running in the `Development` environment**. Don't share detailed exception information publicly when the app runs in production. For more information on configuring environments, see ASP.NET Core runtime environments.

The Developer Exception Page can include the following information about the exception and the request:

* Stack trace
* Query string parameters, if any
* Cookies, if any
* Headers
* Endpoint metadata, if any

The Developer Exception Page isn't guaranteed to provide any information. Use Logging for complete error information.

The following image shows a sample developer exception page with animation to show the tabs and the information displayed:

In response to a request with an `Accept: text/plain` header, the Developer Exception Page returns plain text instead of HTML. For example:

```text
Status: 500 Internal Server Error
Time: 9.39 msSize: 480 bytes
FormattedRawHeadersRequest
Body
text/plain; charset=utf-8, 480 bytes
System.InvalidOperationException: Sample Exception
   at WebApplicationMinimal.Program.<>c.<Main>b__0_0() in C:\Source\WebApplicationMinimal\Program.cs:line 12
   at lambda_method1(Closure, Object, HttpContext)
   at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddlewareImpl.Invoke(HttpContext context)

HEADERS
=======
Accept: text/plain
Host: localhost:7267
traceparent: 00-0eab195ea19d07b90a46cd7d6bf2f
```

#### Minimal APIs

To see the Developer Exception Page in a Minimal API:

* Run the sample app in the `Development` environment.
* Go to the `/exception` endpoint.

This section refers to the following sample app to demonstrate ways to handle exceptions in a Minimal API. It throws an exception when the endpoint `/exception` is requested:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/exception", () => 
{
    throw new InvalidOperationException("Sample Exception");
});

app.MapGet("/", () => "Test by calling /exception");

app.Run();
```
#### Controllers

To see the Developer Exception Page in a controller-based API:

* Add the following controller action to a controller-based API. The action throws an exception when the endpoint is requested.

```csharp
[HttpGet("Throw")]
public IActionResult Throw() =>
    throw new Exception("Sample exception.");
```
* Run the app in the development environment.
* Go to the endpoint defined by the controller action.

---

## Exception handler

In non-development environments, use the exception handler middleware to produce an error payload.

#### Minimal APIs

To configure the `exception handler middleware`, call `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. For example, the following code changes the app to respond with an RFC 7807-compliant payload to the client. For more information, see the Problem Details section later in this article.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseExceptionHandler(exceptionHandlerApp 
    => exceptionHandlerApp.Run(async context 
        => await Results.Problem()
                     .ExecuteAsync(context)));

app.MapGet("/exception", () => 
{
    throw new InvalidOperationException("Sample Exception");
});

app.MapGet("/", () => "Test by calling /exception");

app.Run();
```
#### Controllers

1. In `Program.cs`, call `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*` to add the exception handling middleware:

```csharp
var app = builder.Build();

app.UseHttpsRedirection();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.UseAuthorization();

app.MapControllers();

app.Run();
```
1. Configure a controller action to respond to the `/error` route:

```csharp
[Route("/error")]
public IActionResult HandleError() =>
    Problem();
```
The preceding `HandleError` action sends an RFC 7807-compliant payload to the client.

> **Warning:**
> Don't mark the error handler action method with HTTP method attributes, such as `HttpGet`. Explicit verbs prevent some requests from reaching the action method.
>
> For web APIs that use Swagger / OpenAPI, mark the error handler action with the [ApiExplorerSettings] attribute and set its `Microsoft.AspNetCore.Mvc.ApiExplorerSettingsAttribute.IgnoreApi` property to `true`. This attribute configuration excludes the error handler action from the app's OpenAPI specification:
>
> ```csharp
> [ApiExplorerSettings(IgnoreApi = true)]
> ```
>
> Allow anonymous access to the method if unauthenticated users should see the error.

---

## Client and Server error responses

#### Minimal APIs

Consider the following Minimal API app.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)));

app.MapGet("/", () => "Test by calling /users/{id:int}");

app.Run();

public record User(int Id);
```
The `/users` endpoint produces `200 OK` with a `json` representation of `User` when `id` is greater than `0`, otherwise a `400 BAD REQUEST` status code without a response body. For more information about creating a response, see Create responses in Minimal API apps.

The `Status Code Pages middleware` can be configured to produce a common body content, **when empty**, for all HTTP client (`400`-`499`) or server (`500` -`599`) responses. The middleware is configured by calling the
UseStatusCodePages extension method.

For example, the following example changes the app to respond with an RFC 7807-compliant payload to the client for all client and server responses, including routing errors (for example, `404 NOT FOUND`). For more information, see the Problem Details section.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStatusCodePages(async statusCodeContext 
    => await Results.Problem(statusCode: statusCodeContext.HttpContext.Response.StatusCode)
                 .ExecuteAsync(statusCodeContext.HttpContext));

app.MapGet("/users/{id:int}", (int id) 
    => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)) );

app.MapGet("/", () => "Test by calling /users/{id:int}");

app.Run();

public record User(int Id);
```
#### Controllers

For controller-based APIs, the error response can be configured in one of the following ways:

1. Use the problem details service
1. Implement ProblemDetailsFactory
1. Use ApiBehaviorOptions.ClientErrorMapping

An *error result* is defined as a result with an HTTP status code of 400 or higher. For web API controllers, MVC transforms an error result to produce a `Microsoft.AspNetCore.Mvc.ProblemDetails`.

The automatic creation of a `ProblemDetails` for error status codes is enabled by default.

---
