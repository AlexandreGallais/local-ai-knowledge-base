---
title: "Enrich HTTP request logs in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/http-logging/http-log-enricher.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Enrich HTTP request logs in ASP.NET Core

-->
-->

You can create a custom HTTP log enricher by creating a class that implements the `Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher` interface. Unlike general-purpose log enrichers that enrich all logs in your application, HTTP log enrichers specifically target incoming HTTP request logs in ASP.NET Core, allowing you to add contextual information based on the `HttpContext` of each request.

After the class is created, you register it with `Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`. Once registered, the logging infrastructure automatically calls the `Enrich()` method on every registered enricher for each incoming HTTP request processed by the ASP.NET Core pipeline.

> **Important:**
> The `IHttpLogEnricher` interface is experimental and requires the `EXTEXP0013` diagnostic ID suppression. For more information, see Experimental features in .NET Extensions.

## Install the package

To get started, install the Microsoft.AspNetCore.Diagnostics.Middleware NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.AspNetCore.Diagnostics.Middleware
```

### PackageReference

```xml
<PackageReference Include="Microsoft.AspNetCore.Diagnostics.Middleware"
                  Version="*" /> <!-- Adjust version -->
```

---

## IHttpLogEnricher implementation

Your custom HTTP log enricher needs to implement a single `Microsoft.AspNetCore.Diagnostics.Logging.IHttpLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector,Microsoft.AspNetCore.Http.HttpContext)` method. During enrichment, this method is called and given an `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector` instance along with the `Microsoft.AspNetCore.Http.HttpContext` for the incoming request. The enricher then calls one of the overloads of the `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)` method to record any properties it wants.

> **Note:**
> If your custom HTTP log enricher calls `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)`,
> it's acceptable to send any type of argument to the `value` parameter as-is, because it's parsed into the actual type and serialized internally
> to be sent further down the logging pipeline.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/httplogging/httplogenricher/CustomHttpLogEnricher.cs._
And you register it as shown in the following code using `Microsoft.Extensions.DependencyInjection.HttpLoggingServiceCollectionExtensions.AddHttpLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/httplogging/httplogenricher/Program.cs._
## Key differences from general log enrichers

HTTP log enrichers differ from general-purpose log enrichers (`Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher`) in several important ways:

- **Scope**: HTTP log enrichers only enrich logs produced by incoming ASP.NET Core HTTP requests, while general log enrichers enrich all logs in the application.
- **Context**: HTTP log enrichers have access to the full `HttpContext`, including the request, response, user, connection, and any other context data associated with the incoming request.
- **Package**: HTTP log enrichers require the `Microsoft.AspNetCore.Diagnostics.Middleware` package, while general log enrichers use the `Microsoft.Extensions.Telemetry.Abstractions` package.
- **Direction**: HTTP log enrichers target **incoming** server-side requests, while `Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher` targets **outgoing** client-side HTTP requests.

## Remarks

- The `Enrich` method is called during the HTTP response phase of the request/response lifecycle, after the response has been processed.
- The `httpContext` parameter is always provided and will never be `null`.
- Multiple enrichers can be registered and will be executed in the order they were registered.
- If an enricher throws an exception, it's logged and execution continues with the remaining enrichers.
- The `IHttpLogEnricher` interface is marked as experimental with diagnostic ID `EXTEXP0013` and requires .NET 8 or later.
- Calling `AddHttpLogEnricher<T>()` automatically sets up the required HTTP logging redaction infrastructure by internally calling `AddHttpLoggingRedaction()`.
- You must still add the `UseHttpLogging()` middleware in the application pipeline for HTTP logs to be emitted.

## See also

- View or download sample code (how to download)
- HTTP logging in ASP.NET Core
