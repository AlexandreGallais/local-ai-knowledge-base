---
title: "HttpCircuitBreakerStrategyOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpCircuitBreakerStrategyOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpCircuitBreakerStrategyOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpCircuitBreakerStrategyOptions : Polly.CircuitBreaker.CircuitBreakerStrategyOptions<System.Net.Http.HttpResponseMessage>
```

Implementation of the `CircuitBreakerStrategyOptions<T>` for `HttpResponseMessage` results.

To be added.

## HttpCircuitBreakerStrategyOptions.HttpCircuitBreakerStrategyOptions() constructor

```csharp
public HttpCircuitBreakerStrategyOptions ();
```

Initializes a new instance of the `HttpCircuitBreakerStrategyOptions` class.

By default the options is set to handle only transient failures,
that is, timeouts, 5xx responses, and `HttpRequestException` exceptions.
