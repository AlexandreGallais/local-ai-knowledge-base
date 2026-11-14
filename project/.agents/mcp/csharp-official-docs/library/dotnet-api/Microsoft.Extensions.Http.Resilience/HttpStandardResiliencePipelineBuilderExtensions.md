---
title: "HttpStandardResiliencePipelineBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpStandardResiliencePipelineBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpStandardResiliencePipelineBuilderExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class HttpStandardResiliencePipelineBuilderExtensions
```

Extensions for `IHttpStandardResiliencePipelineBuilder`.

To be added.

## HttpStandardResiliencePipelineBuilderExtensions.Configure(IHttpStandardResiliencePipelineBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder Configure (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures the `HttpStandardResilienceOptions` for the standard resilience pipeline.

Parameters:

- `builder`: The pipeline builder.
- `section`: The section that the options will bind against.

Returns: The value of `builder`.

To be added.

## HttpStandardResiliencePipelineBuilderExtensions.Configure(IHttpStandardResiliencePipelineBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder Configure (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder, Action<Microsoft.Extensions.Http.Resilience.HttpStandardResilienceOptions,IServiceProvider> configure);
```

Configures the `HttpStandardResilienceOptions` for the standard resilience pipeline.

Parameters:

- `builder`: The pipeline builder.
- `configure`: The configure method.

Returns: The value of `builder`.

To be added.

## HttpStandardResiliencePipelineBuilderExtensions.Configure(IHttpStandardResiliencePipelineBuilder, HttpStandardResilienceOptions>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder Configure (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder, Action<Microsoft.Extensions.Http.Resilience.HttpStandardResilienceOptions> configure);
```

Configures the `HttpStandardResilienceOptions` for the standard resilience pipeline.

Parameters:

- `builder`: The pipeline builder.
- `configure`: The configure method.

Returns: The value of `builder`.

To be added.

## HttpStandardResiliencePipelineBuilderExtensions.SelectPipelineBy(IHttpStandardResiliencePipelineBuilder, String>>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder SelectPipelineBy (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder, Func<IServiceProvider,Func<System.Net.Http.HttpRequestMessage,string>> selectorFactory);
```

Instructs the underlying builder to select the pipeline instance by custom selector.

Parameters:

- `builder`: The pipeline builder.
- `selectorFactory`: The factory that returns a key selector.

Returns: The value of `builder`.

The pipeline key is used in metrics and logs, so don't return any sensitive values.

## HttpStandardResiliencePipelineBuilderExtensions.SelectPipelineByAuthority(IHttpStandardResiliencePipelineBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder SelectPipelineByAuthority (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder);
```

Instructs the underlying builder to select the pipeline instance by redacted authority (scheme + host + port).

Parameters:

- `builder`: The pipeline builder.

Returns: The value of `builder`.

To be added.

## HttpStandardResiliencePipelineBuilderExtensions.UseBudgetedRetries(IHttpStandardResiliencePipelineBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder UseBudgetedRetries (this Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder builder);
```

Enables a retry budget with default values for the standard resilience pipeline.

Parameters:

- `builder`: The pipeline builder.

Returns: The value of `builder`.

This method applies `HttpRetryStrategyOptionsExtensions.UseBudgetedRetries` to
`HttpStandardResilienceOptions.Retry`. Options are configured in registration order, so a
`HttpRetryStrategyOptions.RetryBudget` configured before this call, including through configuration sections
passed to `AddStandardResilienceHandler`, is overwritten. Configuration registered after this call takes precedence.
