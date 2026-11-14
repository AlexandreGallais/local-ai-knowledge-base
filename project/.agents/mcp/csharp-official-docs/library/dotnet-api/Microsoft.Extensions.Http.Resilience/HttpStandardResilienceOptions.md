---
title: "HttpStandardResilienceOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpStandardResilienceOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpStandardResilienceOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpStandardResilienceOptions
```

Options for resilience strategies for usage in HTTP scenarios.

These options represent configuration for five chained resilience strategies in this order (from the outermost to the innermost):

Bulkhead -> Total Request Timeout -> Retry -> Circuit Breaker -> Attempt Timeout.

The configuration of each pipeline is initialized with the default options per type. The request goes through these strategies:

- Total request timeout pipeline applies an overall timeout to the execution,
ensuring that the request including hedging attempts, does not exceed the configured limit.
- The retry pipeline retries the request in case the dependency is slow or returns a transient error.
- The bulkhead pipeline limits the maximum number of concurrent requests being send to the dependency.
- The circuit breaker blocks the execution if too many direct failures or timeouts are detected.
- The attempt timeout pipeline limits each request attempt duration and throws if its exceeded.

## HttpStandardResilienceOptions.HttpStandardResilienceOptions() constructor

```csharp
public HttpStandardResilienceOptions ();
```

To be added.

To be added.

## HttpStandardResilienceOptions.AttemptTimeout property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpTimeoutStrategyOptions AttemptTimeout { get; set; }
```

Gets or sets the options for the timeout pipeline applied per each request attempt.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpTimeoutStrategyOptions`
using custom `TimeoutStrategyOptions.Timeout` of 10 seconds.

## HttpStandardResilienceOptions.CircuitBreaker property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpCircuitBreakerStrategyOptions CircuitBreaker { get; set; }
```

Gets or sets the circuit breaker options.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpCircuitBreakerStrategyOptions` using default properties values.

## HttpStandardResilienceOptions.RateLimiter property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpRateLimiterStrategyOptions RateLimiter { get; set; }
```

Gets or sets the bulkhead options.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpRateLimiterStrategyOptions` using default properties values.

## HttpStandardResilienceOptions.Retry property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions Retry { get; set; }
```

Gets or sets the retry pipeline options.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpRetryStrategyOptions` using default properties values.

## HttpStandardResilienceOptions.TotalRequestTimeout property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpTimeoutStrategyOptions TotalRequestTimeout { get; set; }
```

Gets or sets the timeout Strategy options for the total timeout applied on the request's execution.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpTimeoutStrategyOptions`.
