---
title: "HttpStandardHedgingResilienceOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpStandardHedgingResilienceOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpStandardHedgingResilienceOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpStandardHedgingResilienceOptions
```

Options for the pipeline of resilience strategies for usage in hedging HTTP scenarios.

These options represents configuration for 5 chained layers in this order (from the outermost to the innermost):

Total Request Timeout -> Hedging -> Bulkhead (per endpoint) -> Circuit Breaker (per endpoint) -> Attempt Timeout (per endpoint).

The configuration of each resilience strategy is initialized with the default options per type. The request goes through these resilience strategies:

- Total request timeout strategy applies an overall timeout to the execution,
ensuring that the request including hedging attempts does not exceed the configured limit.
- The hedging strategy executes the requests against multiple endpoints in case the dependency is slow or returns a transient error.
- The rate limiter pipeline limits the maximum number of requests being send to the dependency.
- The circuit breaker blocks the execution if too many direct failures or timeouts are detected.
- The attempt timeout strategy limits each request attempt duration and throws if its exceeded.

The last three strategies are assigned to each individual endpoint. The selection of endpoint can be customized by
`StandardHedgingHandlerBuilderExtensions.SelectPipelineByAuthority` or
`StandardHedgingHandlerBuilderExtensions.SelectPipelineBy` extensions.

By default, the endpoint is selected by authority (scheme + host + port).

## HttpStandardHedgingResilienceOptions.HttpStandardHedgingResilienceOptions() constructor

```csharp
public HttpStandardHedgingResilienceOptions ();
```

To be added.

To be added.

## HttpStandardHedgingResilienceOptions.Endpoint property

```csharp
public Microsoft.Extensions.Http.Resilience.HedgingEndpointOptions Endpoint { get; set; }
```

Gets or sets the hedging endpoint options.

Returns: To be added.

By default, this property is initialized with a unique instance of `HedgingEndpointOptions` using default property values.

## HttpStandardHedgingResilienceOptions.Hedging property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpHedgingStrategyOptions Hedging { get; set; }
```

Gets or sets the hedging strategy options.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpHedgingStrategyOptions` using default property values.

## HttpStandardHedgingResilienceOptions.TotalRequestTimeout property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpTimeoutStrategyOptions TotalRequestTimeout { get; set; }
```

Gets or sets the timeout strategy options for the total timeout applied on the request execution.

Returns: To be added.

By default, this property is initialized with a unique instance of `HttpTimeoutStrategyOptions`
using default property values.
