---
title: "HTTP client log enricher"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/enrichment/http-client-log-enricher.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# HTTP client log enricher

You can create a custom HTTP client log enricher by creating a class that implements the `Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher` interface. Unlike general-purpose log enrichers that enrich all logs in your application, HTTP client log enrichers specifically target outgoing HTTP client logs, allowing you to add contextual information based on the HTTP request, response, and any exceptions that occurred.

After the class is created, you register it with `Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher*`. Once registered, the logging infrastructure automatically calls the `Enrich()` method exactly once on every registered enricher for each HTTP request/response produced by the HTTP client.

## Install the package

To get started, install the 📦 Microsoft.Extensions.Http.Diagnostics NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Http.Diagnostics
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.Http.Diagnostics
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.Http.Diagnostics"
                  Version="*" /> <!-- Adjust version -->
```

---

## IHttpClientLogEnricher implementation

Your custom HTTP client log enricher needs to implement a single `Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher.Enrich(Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector,System.Net.Http.HttpRequestMessage,System.Net.Http.HttpResponseMessage,System.Exception)` method. During enrichment, this method is called and given an `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector` instance, along with the HTTP request, response (if available), and exception (if any). The enricher then calls one of the overloads of the `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)` method to record any properties it wants.

> **Note:**
> If your custom HTTP client log enricher calls `Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(System.String,System.Object)`,
> it's acceptable to send any type of argument to the `value` parameter as-is, because it's parsed into the actual type and serialized internally
> to be sent further down the logging pipeline.

```csharp
﻿using Microsoft.Extensions.Diagnostics.Enrichment;
using Microsoft.Extensions.Http.Logging;

public class CustomHttpClientLogEnricher : IHttpClientLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpRequestMessage request,
        HttpResponseMessage? response, Exception? exception)
    {
        // Add custom tags based on the request
        collector.Add("request_method", request.Method.ToString());

        // Add tags based on the response (if available)
        if (response is not null)
        {
            collector.Add("response_status_code", (int)response.StatusCode);
        }

        // Add tags based on the exception (if available)
        if (exception is not null)
        {
            collector.Add("error_type", exception.GetType().Name);
        }
    }
}
```
And you register it as shown in the following code using `Microsoft.Extensions.DependencyInjection.HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`:

```csharp
var builder = Host.CreateApplicationBuilder();

builder.Services.AddHttpClient();
builder.Services.AddExtendedHttpClientLogging();
builder.Services.AddHttpClientLogEnricher<CustomHttpClientLogEnricher>();
builder.Services.AddRedaction();
```

## Key <example-value> from general log enrichers

HTTP client log enrichers differ from general-purpose log enrichers (`Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher`) in several important ways:

- **Scope**: HTTP client log enrichers only enrich logs produced by HTTP client requests, while general log enrichers enrich all logs in the application.
- **Context**: HTTP client log enrichers have access to the `HttpRequestMessage`, `HttpResponseMessage`, and any exceptions that occurred during the request, allowing for HTTP-specific enrichment.
- **Package**: HTTP client log enrichers require the `Microsoft.Extensions.Http.Diagnostics` package, while general log enrichers use the `Microsoft.Extensions.Telemetry.Abstractions` package.

## Remarks

- The `Enrich` method is called exactly once during the HTTP request/response lifecycle for each registered enricher to add custom tags to the HTTP client logs.
- The `request` parameter is always provided and will never be `null`.
- The `response` parameter might be `null` if the request failed before receiving a response.
- The `exception` parameter might be `null` if no exception occurred during the request processing.
- Multiple enrichers can be registered for the same HTTP client and will be executed in the order they were registered.
- HTTP client log enrichers are executed as part of the extended HTTP client logging infrastructure provided by the `Microsoft.Extensions.Http.Diagnostics` package.

## See also

- HTTP client logging in .NET
