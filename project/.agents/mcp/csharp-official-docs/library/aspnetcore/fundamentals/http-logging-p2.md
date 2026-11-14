---
title: "HTTP logging in .NET and ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/http-logging/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP logging in .NET and ASP.NET Core (part 2 of 3)

## `IHttpLoggingInterceptor`

`Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor` is the interface for a service that can be implemented to handle per-request and per-response callbacks for customizing what details get logged. Any endpoint-specific log settings are applied first and can then be overridden in these callbacks. An implementation can:

* Inspect a request or response.
* Enable or disable any `Microsoft.AspNetCore.HttpLogging.HttpLoggingFields`.
* Adjust how much of the request or response body is logged.
* Add custom fields to the logs.

Register an `Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor` implementation by calling `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLoggingInterceptor*` in `Program.cs`. If multiple `Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor` instances are registered, they're run in the order registered.

The following example shows how to register an `Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor` implementation:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.Duration;
});
builder.Services.AddHttpLoggingInterceptor<SampleHttpLoggingInterceptor>();
```

The following example is an `Microsoft.AspNetCore.HttpLogging.IHttpLoggingInterceptor` implementation that:

* Inspects the request method and disables logging for POST requests.
* For non-POST requests:
  * Redacts request path, request headers, and response headers.
  * Adds custom fields and field values to the request and response logs.

```csharp
using Microsoft.AspNetCore.HttpLogging;

namespace HttpLoggingSample;

internal sealed class SampleHttpLoggingInterceptor : IHttpLoggingInterceptor
{
    public ValueTask OnRequestAsync(HttpLoggingInterceptorContext logContext)
    {
        if (logContext.HttpContext.Request.Method == "POST")
        {
            // Don't log anything if the request is a POST.
            logContext.LoggingFields = HttpLoggingFields.None;
        }

        // Don't enrich if we're not going to log any part of the request.
        if (!logContext.IsAnyEnabled(HttpLoggingFields.Request))
        {
            return default;
        }

        if (logContext.TryDisable(HttpLoggingFields.RequestPath))
        {
            RedactPath(logContext);
        }

        if (logContext.TryDisable(HttpLoggingFields.RequestHeaders))
        {
            RedactRequestHeaders(logContext);
        }

        EnrichRequest(logContext);

        return default;
    }

    public ValueTask OnResponseAsync(HttpLoggingInterceptorContext logContext)
    {
        // Don't enrich if we're not going to log any part of the response
        if (!logContext.IsAnyEnabled(HttpLoggingFields.Response))
        {
            return default;
        }

        if (logContext.TryDisable(HttpLoggingFields.ResponseHeaders))
        {
            RedactResponseHeaders(logContext);
        }

        EnrichResponse(logContext);

        return default;
    }

    private void RedactPath(HttpLoggingInterceptorContext logContext)
    {
        logContext.AddParameter(nameof(logContext.HttpContext.Request.Path), "RedactedPath");
    }

    private void RedactRequestHeaders(HttpLoggingInterceptorContext logContext)
    {
        foreach (var header in logContext.HttpContext.Request.Headers)
        {
            logContext.AddParameter(header.Key, "RedactedHeader");
        }
    }

    private void EnrichRequest(HttpLoggingInterceptorContext logContext)
    {
        logContext.AddParameter("RequestEnrichment", "Stuff");
    }

    private void RedactResponseHeaders(HttpLoggingInterceptorContext logContext)
    {
        foreach (var header in logContext.HttpContext.Response.Headers)
        {
            logContext.AddParameter(header.Key, "RedactedHeader");
        }
    }

    private void EnrichResponse(HttpLoggingInterceptorContext logContext)
    {
        logContext.AddParameter("ResponseEnrichment", "Stuff");
    }
}
```

With this interceptor, a POST request doesn't generate any logs even if HTTP logging is configured to log `HttpLoggingFields.All`. A GET request generates logs similar to the following example:

```output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Path: RedactedPath
      Accept: RedactedHeader
      Host: RedactedHeader
      User-Agent: RedactedHeader
      Accept-Encoding: RedactedHeader
      Accept-Language: RedactedHeader
      Upgrade-Insecure-Requests: RedactedHeader
      sec-ch-ua: RedactedHeader
      sec-ch-ua-mobile: RedactedHeader
      sec-ch-ua-platform: RedactedHeader
      sec-fetch-site: RedactedHeader
      sec-fetch-mode: RedactedHeader
      sec-fetch-user: RedactedHeader
      sec-fetch-dest: RedactedHeader
      RequestEnrichment: Stuff
      Protocol: HTTP/2
      Method: GET
      Scheme: https
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      Content-Type: RedactedHeader
      MyResponseHeader: RedactedHeader
      ResponseEnrichment: Stuff
      StatusCode: 200
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[4]
      ResponseBody: Hello World!
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[8]
      Duration: 2.2778ms
```

## Logging configuration order of precedence

The following list shows the order of precedence for logging configuration:

1. Global configuration from `Microsoft.AspNetCore.HttpLogging.HttpLoggingOptions`, set by calling `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging*`.
1. Endpoint-specific configuration from the `[HttpLogging]` attribute or the `Microsoft.AspNetCore.Builder.HttpLoggingEndpointConventionBuilderExtensions.WithHttpLogging*` extension method overrides global configuration.
1. `IHttpLoggingInterceptor` is called with the results and can further modify the configuration per request.

## Redacting sensitive data

Http logging with redaction can be enabled by calling `Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLoggingRedaction*`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.Duration;
});

builder.Services.AddRedaction();
builder.Services.AddHttpLoggingRedaction(op => { });
```

For more information about .NET's data redaction library, see Data redaction in .NET.
