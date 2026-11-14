---
title: "HttpRetryStrategyOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpRetryStrategyOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRetryStrategyOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class HttpRetryStrategyOptions : Polly.Retry.RetryStrategyOptions<System.Net.Http.HttpResponseMessage>
```

Implementation of the `RetryStrategyOptions<T>` for `HttpResponseMessage` results.

To be added.

## HttpRetryStrategyOptions.HttpRetryStrategyOptions() constructor

```csharp
public HttpRetryStrategyOptions ();
```

Initializes a new instance of the `HttpRetryStrategyOptions` class.

By default, the options are configured to handle only transient failures.
Specifically, this includes HTTP status codes 408, 429, 500 and above,
as well as `HttpRequestException` and `TimeoutRejectedException` exceptions.

## HttpRetryStrategyOptions.RetryBudget property

```csharp
public Microsoft.Extensions.Http.Resilience.HttpRetryBudgetOptions? RetryBudget { get; set; }
```

Gets or sets the retry budget options.

Returns: The default value is `null`, which means retries are not limited by a budget.

The budget is applied by the standard resilience handler and by
`HttpRetryResiliencePipelineBuilderExtensions.AddRetryWithBudget`.
`RetryResiliencePipelineBuilderExtensions.AddRetry<T>`
can't apply the budget, so it throws a `ValidationException` when the budget is set, instead of ignoring it.
See `HttpRetryBudgetOptions` for more details.

## HttpRetryStrategyOptions.ShouldRetryAfterHeader property

```csharp
public bool ShouldRetryAfterHeader { get; set; }
```

Gets or sets a value indicating whether to use the `Retry-After` header for the retry delays.

Returns: Defaults to `true`.

If the property is set to `true` then the generator will resolve the delay
based on the `Retry-After` header rules, otherwise it will return `null` and the retry strategy
delay will generate the delay based on the configured options.
