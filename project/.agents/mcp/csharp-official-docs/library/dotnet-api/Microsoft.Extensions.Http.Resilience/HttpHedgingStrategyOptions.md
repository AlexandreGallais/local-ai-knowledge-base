---
title: "HttpHedgingStrategyOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpHedgingStrategyOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpHedgingStrategyOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpHedgingStrategyOptions : Polly.Hedging.HedgingStrategyOptions<System.Net.Http.HttpResponseMessage>
```

Implementation of the `HedgingStrategyOptions<T>` class for `HttpResponseMessage` results.

To be added.

## HttpHedgingStrategyOptions.HttpHedgingStrategyOptions() constructor

```csharp
public HttpHedgingStrategyOptions ();
```

Initializes a new instance of the `HttpHedgingStrategyOptions` class.

By default, the options are configured to handle only transient failures.
Specifically, this includes HTTP status codes 408, 429, 500 and above,
as well as `HttpRequestException`, `BrokenCircuitException`, and `TimeoutRejectedException` exceptions.
