---
title: "Request timeouts middleware in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/timeouts.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Request timeouts middleware in ASP.NET Core

By Tom Dykstra

Apps can apply timeout limits selectively to requests. ASP.NET Core servers don't do this by default since request processing times vary widely by scenario. For example, WebSockets, static files, and calling expensive APIs would each require a different timeout limit. So ASP.NET Core provides middleware that configures timeouts per endpoint as well as a global timeout.

When a timeout limit is hit, a `System.Threading.CancellationToken` in `Microsoft.AspNetCore.Http.HttpContext.RequestAborted` has `System.Threading.CancellationToken.IsCancellationRequested` set to `true`. `Microsoft.AspNetCore.Http.HttpContext.Abort` isn't automatically called on the request, so the application may still produce a success or failure response. The default behavior if the app doesn't handle the exception and produce a response is to return status code 504.

This article explains how to configure the timeout middleware. The timeout middleware can be used in all types of ASP.NET Core apps: Minimal API, Web API with controllers, MVC, and Razor Pages. The sample app is a Minimal API, but every timeout feature it illustrates is also supported in the other app types.

Request timeouts are in the `Microsoft.AspNetCore.Http.Timeouts` namespace.

***Note:*** When an app is running in debug mode, the timeout middleware doesn't trigger. This behavior is the same as for Kestrel timeouts. To test timeouts, run the app without the debugger attached.

## Add the middleware to the app

Add the request timeouts middleware to the service collection by calling `Microsoft.Extensions.DependencyInjection.RequestTimeoutsIServiceCollectionExtensions.AddRequestTimeouts*`.

Add the middleware to the request processing pipeline by calling `Microsoft.AspNetCore.Builder.RequestTimeoutsIApplicationBuilderExtensions.UseRequestTimeouts*`.

> **Note:**
> * In apps that explicitly call `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`, `UseRequestTimeouts` must be called after `UseRouting`.

Adding the middleware to the app doesn't automatically start triggering timeouts. Timeout limits have to be explicitly configured.

## Configure one endpoint or page

For Minimal API apps, configure an endpoint to timeout by calling `Microsoft.AspNetCore.Builder.RequestTimeoutsIEndpointConventionBuilderExtensions.WithRequestTimeout*`, or by applying the `[RequestTimeout]` attribute, as shown in the following example:

```csharp
using Microsoft.AspNetCore.Http.Timeouts;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRequestTimeouts();

var app = builder.Build();
app.UseRequestTimeouts();

app.MapGet("/", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch (TaskCanceledException)
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
}).WithRequestTimeout(TimeSpan.FromSeconds(2));
// Returns "Timeout!"

app.MapGet("/attribute",
    [RequestTimeout(milliseconds: 2000)] async (HttpContext context) => {
        try
        {
            await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
        }
        catch (TaskCanceledException)
        {
            return Results.Content("Timeout!", "text/plain");
        }

        return Results.Content("No timeout!", "text/plain");
    });
// Returns "Timeout!"

app.Run();
```
For apps with controllers, apply the `[RequestTimeout]` attribute to the action method or the controller class. For Razor Pages apps, apply the attribute to the Razor page class.

## Configure multiple endpoints or pages

Create named *policies* to specify timeout configuration that applies to multiple endpoints. Add a policy by calling `Microsoft.AspNetCore.Http.Timeouts.RequestTimeoutOptions.AddPolicy*`:

```csharp
builder.Services.AddRequestTimeouts(options => {
    options.DefaultPolicy =
        new RequestTimeoutPolicy { Timeout = TimeSpan.FromMilliseconds(1500) };
    options.AddPolicy("MyPolicy", TimeSpan.FromSeconds(2));
});
```
A timeout can be specified for an endpoint by policy name:

```csharp
app.MapGet("/namedpolicy", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch (TaskCanceledException)
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
}).WithRequestTimeout("MyPolicy");
// Returns "Timeout!"
```
The `[RequestTimeout]` attribute can also be used to specify a named policy.

### Set global default timeout policy

Specify a policy for the global default timeout configuration:

```csharp
builder.Services.AddRequestTimeouts(options => {
    options.DefaultPolicy =
        new RequestTimeoutPolicy { Timeout = TimeSpan.FromMilliseconds(1500) };
    options.AddPolicy("MyPolicy", TimeSpan.FromSeconds(2));
});
```
The default timeout applies to endpoints that don't have a timeout specified. The following endpoint code checks for a timeout although it doesn't call the extension method or apply the attribute. The global timeout configuration applies, so the code checks for a timeout:

```csharp
app.MapGet("/", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
});
// Returns "Timeout!" due to default policy.
```
## Specify the status code in a policy

The `Microsoft.AspNetCore.Http.Timeouts.RequestTimeoutPolicy` class has a property that can automatically set the status code when a timeout is triggered.

```csharp
builder.Services.AddRequestTimeouts(options => {
    options.DefaultPolicy = new RequestTimeoutPolicy {
        Timeout = TimeSpan.FromMilliseconds(1000),
        TimeoutStatusCode = 503
    };
    options.AddPolicy("MyPolicy2", new RequestTimeoutPolicy {
        Timeout = TimeSpan.FromMilliseconds(1000),
        WriteTimeoutResponse = async (HttpContext context) => {
            context.Response.ContentType = "text/plain";
            await context.Response.WriteAsync("Timeout from MyPolicy2!");
        }
    });
});
```
```csharp
app.MapGet("/", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch (TaskCanceledException)
    {
        throw;
    }

    return Results.Content("No timeout!", "text/plain");
});
// Returns status code 503 due to default policy.
```
## Use a delegate in a policy

The `RequestTimeoutPolicy` class has a `Microsoft.AspNetCore.Http.Timeouts.RequestTimeoutPolicy.WriteTimeoutResponse` property that can be used to customize the response when a timeout is triggered.

```csharp
builder.Services.AddRequestTimeouts(options => {
    options.DefaultPolicy = new RequestTimeoutPolicy {
        Timeout = TimeSpan.FromMilliseconds(1000),
        TimeoutStatusCode = 503
    };
    options.AddPolicy("MyPolicy2", new RequestTimeoutPolicy {
        Timeout = TimeSpan.FromMilliseconds(1000),
        WriteTimeoutResponse = async (HttpContext context) => {
            context.Response.ContentType = "text/plain";
            await context.Response.WriteAsync("Timeout from MyPolicy2!");
        }
    });
});
```
```csharp
app.MapGet("/usepolicy2", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch (TaskCanceledException)
    {
        throw;
    }

    return Results.Content("No timeout!", "text/plain");
}).WithRequestTimeout("MyPolicy2");
// Returns "Timeout from MyPolicy2!" due to WriteTimeoutResponse in MyPolicy2.
```
## Disable timeouts

To disable all timeouts including the default global timeout, use the `[DisableRequestTimeout]` attribute or the `Microsoft.AspNetCore.Builder.RequestTimeoutsIEndpointConventionBuilderExtensions.DisableRequestTimeout*` extension method:

```csharp
app.MapGet("/disablebyattr", [DisableRequestTimeout] async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
});
// Returns "No timeout!", ignores default timeout.
```
```csharp
app.MapGet("/disablebyext", async (HttpContext context) => {
    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    }
    catch
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
}).DisableRequestTimeout();
// Returns "No timeout!", ignores default timeout.
```
## Cancel a timeout

To cancel a timeout that has already been started, use the `Microsoft.AspNetCore.Http.Timeouts.IHttpRequestTimeoutFeature.DisableTimeout` method on `Microsoft.AspNetCore.Http.Timeouts.IHttpRequestTimeoutFeature`. Timeouts cannot be canceled after they've expired.

```csharp
app.MapGet("/canceltimeout", async (HttpContext context) => {
    var timeoutFeature = context.Features.Get<IHttpRequestTimeoutFeature>();
    timeoutFeature?.DisableTimeout();

    try
    {
        await Task.Delay(TimeSpan.FromSeconds(10), context.RequestAborted);
    } 
    catch (TaskCanceledException)
    {
        return Results.Content("Timeout!", "text/plain");
    }

    return Results.Content("No timeout!", "text/plain");
}).WithRequestTimeout(TimeSpan.FromSeconds(1));
// Returns "No timeout!" since the default timeout is not triggered.
```
## See also

* `Microsoft.AspNetCore.Http.Timeouts`
* ASP.NET Core middleware
