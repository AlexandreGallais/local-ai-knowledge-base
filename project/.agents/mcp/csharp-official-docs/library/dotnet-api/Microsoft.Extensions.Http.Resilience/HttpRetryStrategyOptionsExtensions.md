---
title: "HttpRetryStrategyOptionsExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpRetryStrategyOptionsExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRetryStrategyOptionsExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class HttpRetryStrategyOptionsExtensions
```

Extensions for `HttpRetryStrategyOptions`.

To be added.

## HttpRetryStrategyOptionsExtensions.DisableFor(HttpRetryStrategyOptions, HttpMethod[]) method

```csharp
public static void DisableFor (this Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions options, params System.Net.Http.HttpMethod[] methods);
```

Disables retry attempts for the given list of HTTP methods.

Parameters:

- `options`: The retry strategy options.
- `methods`: The list of HTTP methods.

To be added.

## HttpRetryStrategyOptionsExtensions.DisableForUnsafeHttpMethods(HttpRetryStrategyOptions) method

```csharp
public static void DisableForUnsafeHttpMethods (this Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions options);
```

Disables retry attempts for POST, PATCH, PUT, DELETE, and CONNECT HTTP methods.

Parameters:

- `options`: The retry strategy options.

To be added.

## HttpRetryStrategyOptionsExtensions.UseBudgetedRetries(HttpRetryStrategyOptions) method

```csharp
public static void UseBudgetedRetries (this Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions options);
```

Enables a retry budget with default values to reduce the extra load that retries put on a degraded dependency.

Parameters:

- `options`: The retry strategy options.

This method sets `HttpRetryStrategyOptions.RetryBudget` to a new `HttpRetryBudgetOptions` instance
with default values, overwriting any existing budget. Other retry options are not changed.
Values set after calling this method take precedence. Use
`HttpRetryResiliencePipelineBuilderExtensions.AddRetryWithBudget`
to apply the retry budget in custom pipelines. Polly's `AddRetry` can't apply it and throws a
`ValidationException` instead.
