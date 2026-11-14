---
title: "StandardHedgingHandlerBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/StandardHedgingHandlerBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StandardHedgingHandlerBuilderExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class StandardHedgingHandlerBuilderExtensions
```

Extensions for `IStandardHedgingHandlerBuilder`.

To be added.

## StandardHedgingHandlerBuilderExtensions.Configure(IStandardHedgingHandlerBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder Configure (this Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures the `HttpStandardHedgingResilienceOptions` for the standard hedging pipeline.

Parameters:

- `builder`: The pipeline builder.
- `section`: The section that the options will bind against.

Returns: The value of `builder`.

To be added.

## StandardHedgingHandlerBuilderExtensions.Configure(IStandardHedgingHandlerBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder Configure (this Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder builder, Action<Microsoft.Extensions.Http.Resilience.HttpStandardHedgingResilienceOptions,IServiceProvider> configure);
```

Configures the `HttpStandardResilienceOptions` for the standard hedging pipeline.

Parameters:

- `builder`: The pipeline builder.
- `configure`: The configure method.

Returns: The value of `builder`.

To be added.

## StandardHedgingHandlerBuilderExtensions.Configure(IStandardHedgingHandlerBuilder, HttpStandardHedgingResilienceOptions>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder Configure (this Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder builder, Action<Microsoft.Extensions.Http.Resilience.HttpStandardHedgingResilienceOptions> configure);
```

Configures the `HttpStandardResilienceOptions` for the standard hedging pipeline.

Parameters:

- `builder`: The pipeline builder.
- `configure`: The configure method.

Returns: The value of `builder`.

To be added.

## StandardHedgingHandlerBuilderExtensions.SelectPipelineBy(IStandardHedgingHandlerBuilder, String>>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder SelectPipelineBy (this Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder builder, Func<IServiceProvider,Func<System.Net.Http.HttpRequestMessage,string>> selectorFactory);
```

Instructs the underlying pipeline builder to select the pipeline instance by custom selector.

Parameters:

- `builder`: The builder instance.
- `selectorFactory`: The factory that returns key selector.

Returns: The value of `builder`.

The pipeline key is used in metrics and logs, so don't return any sensitive values.

## StandardHedgingHandlerBuilderExtensions.SelectPipelineByAuthority(IStandardHedgingHandlerBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder SelectPipelineByAuthority (this Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder builder);
```

Instructs the underlying pipeline builder to select the pipeline instance by redacted authority (scheme + host + port).

Parameters:

- `builder`: The builder instance.

Returns: The value of `builder`.

To be added.
