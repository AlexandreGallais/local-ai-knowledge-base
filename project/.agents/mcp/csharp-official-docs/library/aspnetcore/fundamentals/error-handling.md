---
title: "Handle errors in ASP.NET Core (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/error-handling.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core

This article covers common approaches to handling errors in ASP.NET Core web apps. See also Handle errors in ASP.NET Core APIs.

For Blazor error handling guidance, which adds to or supersedes the guidance in this article, see Handle errors in ASP.NET Core Blazor apps.

## Developer exception page

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

## Exception handler page

To configure a custom error handling page for the `Production` environment, call `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. This exception handling middleware:

* Catches and logs unhandled exceptions.
* Re-executes the request in an alternate pipeline using the path indicated. The request isn't re-executed if the response has started. The template-generated code re-executes the request using the `/Error` path.

> **Warning:**
> If the alternate pipeline throws an exception of its own, exception handling middleware rethrows the original exception.

Since this middleware can re-execute the request pipeline:

* Middlewares need to handle reentrancy with the same request. This normally means either cleaning up their state after calling `_next` or caching their processing on the `HttpContext` to avoid redoing it. When dealing with the request body, this either means buffering or caching the results like the Form reader.
* For the `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler(Microsoft.AspNetCore.Builder.IApplicationBuilder,System.String)` overload that is used in templates, only the request path is modified, and the route data is cleared. Request data such as headers, method, and items are all reused as-is.
* Scoped services remain the same.

In the following example, `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*` adds the exception handling middleware in non-`Development` environments:

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
```
The Razor Pages app template provides an Error page (`.cshtml`) and `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class (`ErrorModel`) in the *Pages* folder. For an MVC app, the project template includes an `Error` action method and an Error view for the Home controller.

The exception handling middleware re-executes the request using the *original* HTTP method. If an error handler endpoint is restricted to a specific set of HTTP methods, it runs only for those HTTP methods. For example, an MVC controller action that uses the `[HttpGet]` attribute runs only for GET requests. To ensure that *all* requests reach the custom error handling page, don't restrict them to a specific set of HTTP methods.

To handle exceptions differently based on the original HTTP method:

* For Razor Pages, create multiple handler methods. For example, use `OnGet` to handle GET exceptions and use `OnPost` to handle POST exceptions.
* For MVC, apply HTTP verb attributes to multiple actions. For example, use `[HttpGet]` to handle GET exceptions and use `[HttpPost]` to handle POST exceptions.

To allow unauthenticated users to view the custom error handling page, ensure that it supports anonymous access.

### Access the exception and original routing details

Use `Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature` or `Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature` to access the exception, the original request path, and endpoint metadata in an error handler.

The exception handling middleware clears the original endpoint and route data from `Microsoft.AspNetCore.Http.HttpContext` so error-handling endpoints don't execute filters or route constraints from the failed endpoint. As a result, calling `HttpContext.GetEndpoint` or `HttpContext.GetRouteData` directly does not return the original endpoint or route values that triggered the exception. To inspect the original endpoint or route values that caused the exception, retrieve them from the exception feature:

```csharp
var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerFeature>();
var originalEndpoint = exceptionFeature?.Endpoint;
var routeValues = exceptionFeature?.RouteValues;
```

The following example uses `Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature` to get more information about the exception that was thrown:

```csharp
[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
[IgnoreAntiforgeryToken]
public class ErrorModel : PageModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

    public string? ExceptionMessage { get; set; }

    public void OnGet()
    {
        RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;

        var exceptionHandlerPathFeature =
            HttpContext.Features.Get<IExceptionHandlerPathFeature>();

        if (exceptionHandlerPathFeature?.Error is FileNotFoundException)
        {
            ExceptionMessage = "The file was not found.";
        }

        if (exceptionHandlerPathFeature?.Path == "/")
        {
            ExceptionMessage ??= string.Empty;
            ExceptionMessage += " Page: Home.";
        }
    }
}
```
> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.

## Exception handler lambda

An alternative to a custom exception handler page is to provide a lambda to `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. Using a lambda allows access to the error before returning the response.

The following code uses a lambda for exception handling:

```csharp
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(exceptionHandlerApp =>
    {
        exceptionHandlerApp.Run(async context =>
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            // using static System.Net.Mime.MediaTypeNames;
            context.Response.ContentType = Text.Plain;

            await context.Response.WriteAsync("An exception was thrown.");

            var exceptionHandlerPathFeature =
                context.Features.Get<IExceptionHandlerPathFeature>();

            if (exceptionHandlerPathFeature?.Error is FileNotFoundException)
            {
                await context.Response.WriteAsync(" The file was not found.");
            }

            if (exceptionHandlerPathFeature?.Path == "/")
            {
                await context.Response.WriteAsync(" Page: Home.");
            }
        });
    });

    app.UseHsts();
}
```
Another way to use a lambda is to set the status code based on the exception type, as in the following example:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(new ExceptionHandlerOptions
    {
        StatusCodeSelector = ex => ex is TimeoutException
            ? StatusCodes.Status503ServiceUnavailable
            : StatusCodes.Status500InternalServerError
    });
}
```
> **Warning:**
> Do **not** serve sensitive error information to clients. Serving errors is a security risk.
