---
title: "HttpRetryResiliencePipelineBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpRetryResiliencePipelineBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRetryResiliencePipelineBuilderExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class HttpRetryResiliencePipelineBuilderExtensions
```

Extensions for adding an HTTP retry strategy to `ResiliencePipelineBuilder<T>`.

To be added.

## HttpRetryResiliencePipelineBuilderExtensions.AddRetryWithBudget(HttpResponseMessage>, HttpRetryStrategyOptions) method

```csharp
public static Polly.ResiliencePipelineBuilder<System.Net.Http.HttpResponseMessage> AddRetryWithBudget (this Polly.ResiliencePipelineBuilder<System.Net.Http.HttpResponseMessage> builder, Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions options);
```

Adds a retry strategy limited by a retry budget to the builder. Use this method instead of
`RetryResiliencePipelineBuilderExtensions.AddRetry<T>`
in custom pipelines, because `AddRetry` can't apply `HttpRetryStrategyOptions.RetryBudget` and rejects
options that set it.

Parameters:

- `builder`: The builder instance.
- `options`: The retry strategy options.

Returns: The value of `builder`.

Exceptions:

- `ValidationException`: Thrown when `options` are invalid.

The budget needs a strategy that counts every request sent through the pipeline, in addition to the retry strategy.
This method adds both. The budget is configured by `HttpRetryStrategyOptions.RetryBudget`. When it's
`null`, a budget with default `HttpRetryBudgetOptions` values is used, without modifying
`options`. Other retry options, such as `RetryStrategyOptions<T>.MaxRetryAttempts`,
are used as is. See `HttpRetryBudgetOptions` for more details.
