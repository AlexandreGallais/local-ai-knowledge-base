---
title: "HttpRetryBudgetOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpRetryBudgetOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRetryBudgetOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpRetryBudgetOptions
```

Options for the retry budget that limits the number of retries relative to the number of requests.

The retry budget tracks the number of requests and retries over a sliding window of `HttpRetryBudgetOptions.SamplingDuration`.
Once the window contains at least `HttpRetryBudgetOptions.MinimumThroughput` requests, a retry is only allowed while the number
of retries in the window is below `HttpRetryBudgetOptions.RetryRatio` multiplied by the number of requests, rounded down.
At least one retry per window is always allowed, unless `HttpRetryBudgetOptions.RetryRatio` is 0, which suppresses every retry.
When the budget is exhausted, the outcome that would have been retried is returned to the caller instead and the
`OnRetryBudgetExhausted` resilience event is reported with `OnRetryBudgetExhaustedArguments`.

The budget prevents retry storms: when a dependency is degraded, retries can multiply the load on it by up to
`MaxRetryAttempts + 1`. A budget caps that amplification to roughly `1 + RetryRatio`.

A budget instance is shared by all requests that use the same resilience pipeline instance. Each named client
(and each authority when `SelectPipelineByAuthority` is used) has its own budget.
The budget is reset when the pipeline is reloaded due to options changes.

## HttpRetryBudgetOptions.HttpRetryBudgetOptions() constructor

```csharp
public HttpRetryBudgetOptions ();
```

To be added.

To be added.

## HttpRetryBudgetOptions.MinimumThroughput property

```csharp
public int MinimumThroughput { get; set; }
```

Gets or sets the minimum number of requests within the sampling window before the budget is enforced.

Returns: The default value is 10. The value must be 1 or greater.

Below this throughput, retries are not limited by the budget, unless `HttpRetryBudgetOptions.RetryRatio` is 0. This keeps
low-traffic clients from having their retries denied because of a small number of requests.

## HttpRetryBudgetOptions.RetryRatio property

```csharp
public double RetryRatio { get; set; }
```

Gets or sets the maximum ratio of retries to requests within the sampling window.

Returns: A value between 0 and 1, inclusive. The default value is 0.1, which allows retries to add at most 10% extra load.
A value of 0 suppresses every retry, regardless of `HttpRetryBudgetOptions.MinimumThroughput`.

To be added.

## HttpRetryBudgetOptions.SamplingDuration property

```csharp
public TimeSpan SamplingDuration { get; set; }
```

Gets or sets the duration of the sliding window used to track requests and retries.

Returns: The default value is 10 seconds. The value must be between 1 second and 1 day.

To be added.
