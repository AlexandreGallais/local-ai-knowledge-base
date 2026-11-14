---
title: "HedgingEndpointOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HedgingEndpointOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HedgingEndpointOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HedgingEndpointOptions
```

Options for the pipeline of resilience strategies assigned to a particular endpoint.

It is using three chained layers in this order (from the outermost to the innermost): Bulkhead -> Circuit Breaker -> Attempt Timeout.

## HedgingEndpointOptions.HedgingEndpointOptions() constructor

```csharp
public HedgingEndpointOptions ();
```

To be added.

To be added.

## HedgingEndpointOptions.CircuitBreaker property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpCircuitBreakerStrategyOptions CircuitBreaker { get; set; }
```

Gets or sets the circuit breaker options for the endpoint.

Returns: To be added.

By default it is initialized with a unique instance of `HttpCircuitBreakerStrategyOptions` using default properties values.

## HedgingEndpointOptions.RateLimiter property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpRateLimiterStrategyOptions RateLimiter { get; set; }
```

Gets or sets the bulkhead options for the endpoint.

Returns: To be added.

By default it is initialized with a unique instance of `HttpRateLimiterStrategyOptions` using default properties values.

## HedgingEndpointOptions.Timeout property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpTimeoutStrategyOptions Timeout { get; set; }
```

Gets or sets the options for the timeout resilience strategy applied per each request attempt.

Returns: To be added.

By default it is initialized with a unique instance of `HttpTimeoutStrategyOptions`
using a custom `TimeoutStrategyOptions.Timeout` of 10 seconds.
