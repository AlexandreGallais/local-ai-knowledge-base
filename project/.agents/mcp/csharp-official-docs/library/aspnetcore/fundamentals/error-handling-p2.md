---
title: "Handle errors in ASP.NET Core (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/error-handling.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core (part 2 of 4)

## IExceptionHandler

IExceptionHandler is an interface that gives the developer a callback for handling known exceptions in a central location. The interface contains a single method, `TryHandleAsync`, which receives an `HttpContext` and an `Exception` parameter.

`IExceptionHandler` implementations are registered by calling `IServiceCollection.AddExceptionHandler<T>`. The lifetime of an `IExceptionHandler` instance is singleton. Multiple implementations can be added, and they're called in the order registered.

> **Important:**
> Registering an `IExceptionHandler` implementation isn't sufficient on its own. Registered handlers are invoked by the exception handling middleware, so the app must also add that middleware by calling `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`. If `UseExceptionHandler` isn't called, the registered `IExceptionHandler` implementations are never called.

Exception handling middleware iterates through registered exception handlers in order until one returns `true` from `TryHandleAsync`, indicating that the exception has been handled. If an exception handler handles an exception, it can return `true` to stop processing. If an exception isn't handled by any exception handler, then control falls back to the default behavior and options from the middleware.

Starting in .NET 10, the default behavior is to suppress emission of diagnostics such as logs and metrics for handled exceptions (when `TryHandleAsync` returns `true`). This differs from earlier versions (.NET 8 and 9) where diagnostics were always emitted regardless of whether the exception was handled. The default behavior can be changed by setting SuppressDiagnosticsCallback.

The following example shows an `IExceptionHandler` implementation:

```csharp
using Microsoft.AspNetCore.Diagnostics;

namespace ErrorHandlingSample
{
    public class CustomExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<CustomExceptionHandler> logger;
        public CustomExceptionHandler(ILogger<CustomExceptionHandler> logger)
        {
            this.logger = logger;
        }
        public ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken <example-value>)
        {
            var exceptionMessage = exception.Message;
            logger.LogError(
                "Error Message: {exceptionMessage}, Time of occurrence {time}",
                exceptionMessage, DateTime.UtcNow);
            // Return false to continue with the default behavior
            // - or - return true to signal that this exception is handled
            return ValueTask.FromResult(false);
        }
    }
}
```
The following example shows how to register an `IExceptionHandler` implementation for dependency injection and add the exception handling middleware that calls it:

```csharp
using ErrorHandlingSample;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddRazorPages();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Remaining Program.cs code omitted for brevity
```
### Configure `UseExceptionHandler` when using `IExceptionHandler`

The exception handling middleware requires a fallback for exceptions that no `IExceptionHandler` handles. If none is configured, calling `app.UseExceptionHandler()` with no arguments throws the following exception at startup:

`System.InvalidOperationException: An error occurred when configuring the exception handler middleware. Either the 'ExceptionHandlingPath' or the 'ExceptionHandler' property must be set in 'UseExceptionHandler()'.`

Use any one of the following to satisfy the requirement:

* Specify an error path: `app.UseExceptionHandler("/Error");`
* Enable problem details: call `builder.Services.AddProblemDetails();` and then `app.UseExceptionHandler();`
* Supply a fallback handler: `app.UseExceptionHandler(exceptionHandlerApp => { ... });`

The `IExceptionHandler` implementations still run first in all of these cases. The configured path, problem details response, or fallback handler is used only when every `TryHandleAsync` returns `false`.

If an `IExceptionHandler` returns `true` without writing a response or setting a status code, the response ends up as `404 Not Found` and the middleware logs:

`The exception handler configured on ExceptionHandlerOptions produced a 404 status response.`

An `IExceptionHandler` that returns `true` should write the complete response, including the status code. For example, set `httpContext.Response.StatusCode` and write the body, or call `IProblemDetailsService.TryWriteAsync`. If a 404 response is intentional, set `Microsoft.AspNetCore.Builder.ExceptionHandlerOptions.AllowStatusCode404Response` to `true`.

When the preceding code runs in the `Development` environment:

* The `CustomExceptionHandler` is called first to handle an exception.
* After logging the exception, the `TryHandleAsync` method returns `false`, so the developer exception page is shown.

In other environments:

* The `CustomExceptionHandler` is called first to handle an exception.
* After logging the exception, the `TryHandleAsync` method returns `false`, so the `/Error` page is shown.

If `TryHandleAsync` returns `true` instead:

* The remaining `IExceptionHandler` implementations aren't called.
* The exception handler page, path, or lambda configured on `UseExceptionHandler` isn't used. The handler is responsible for writing the entire response.

### SuppressDiagnosticsCallback

Starting in .NET 10, you can control whether the exception handling middleware writes diagnostics for handled exceptions by configuring the `SuppressDiagnosticsCallback` property on `ExceptionHandlerOptions`. This callback receives the exception context and allows you to determine whether diagnostics should be suppressed based on the specific exception or request.

To revert to the .NET 8 and 9 behavior where diagnostics are always emitted for handled exceptions, set the callback to always return `false`:

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    SuppressDiagnosticsCallback = context => false
});
```

You can also conditionally suppress diagnostics based on the exception type or other context:

```csharp
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    SuppressDiagnosticsCallback = context => context.Exception is ArgumentException
});
```

When an exception isn't handled by any `IExceptionHandler` implementation (all handlers return `false` from `TryHandleAsync`), control falls back to the default behavior and options from the middleware, and diagnostics are emitted according to the middleware's standard behavior.
