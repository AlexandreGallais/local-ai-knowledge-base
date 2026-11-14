---
title: "ResilienceHttpClientBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ResilienceHttpClientBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResilienceHttpClientBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ResilienceHttpClientBuilderExtensions
```

Extensions for `IHttpClientBuilder`.

To be added.

## ResilienceHttpClientBuilderExtensions.AddResilienceHandler(IHttpClientBuilder, String, ResilienceHandlerContext>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder AddResilienceHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, string pipelineName, Action<Polly.ResiliencePipelineBuilder<System.Net.Http.HttpResponseMessage>,Microsoft.Extensions.Http.Resilience.ResilienceHandlerContext> configure);
```

Adds a resilience pipeline handler that uses a named inline resilience pipeline.

Parameters:

- `builder`: The builder instance.
- `pipelineName`: The custom identifier for the resilience pipeline, used in the name of the pipeline.
- `configure`: The callback that configures the pipeline.

Returns: The value of `builder`.

The final pipeline name is combination of `IHttpClientBuilder.Name` and `pipelineName`.
Use pipeline name identifier if your HTTP client contains multiple resilience handlers.

## ResilienceHttpClientBuilderExtensions.AddResilienceHandler(IHttpClientBuilder, String, HttpResponseMessage>>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder AddResilienceHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, string pipelineName, Action<Polly.ResiliencePipelineBuilder<System.Net.Http.HttpResponseMessage>> configure);
```

Adds a resilience pipeline handler that uses a named inline resilience pipeline.

Parameters:

- `builder`: The builder instance.
- `pipelineName`: The custom identifier for the resilience pipeline, used in the name of the pipeline.
- `configure`: The callback that configures the pipeline.

Returns: The value of `builder`.

The final pipeline name is combination of `IHttpClientBuilder.Name` and `pipelineName`.
Use pipeline name identifier if your HTTP client contains multiple resilience handlers.

## ResilienceHttpClientBuilderExtensions.AddStandardHedgingHandler(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder AddStandardHedgingHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Adds a standard hedging handler that wraps the execution of the request with a standard hedging mechanism.

Parameters:

- `builder`: The HTTP client builder.

Returns: A `IStandardHedgingHandlerBuilder` instance that can be used to configure the standard hedging behavior.

The standard hedging uses a pool of circuit breakers to ensure that unhealthy endpoints are not hedged against.
By default, the selection from pool is based on the URL Authority (scheme + host + port).
It is recommended that you configure the way the strategies are selected by calling
`StandardHedgingHandlerBuilderExtensions.SelectPipelineByAuthority`
extensions.

See `HttpStandardHedgingResilienceOptions` for more details about the used resilience strategies.

## ResilienceHttpClientBuilderExtensions.AddStandardHedgingHandler(IHttpClientBuilder, IRoutingStrategyBuilder>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IStandardHedgingHandlerBuilder AddStandardHedgingHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.Http.Resilience.IRoutingStrategyBuilder> configure);
```

Adds a standard hedging handler that wraps the execution of the request with a standard hedging mechanism.

Parameters:

- `builder`: The HTTP client builder.
- `configure`: Configures the routing strategy associated with this handler.

Returns: A `IStandardHedgingHandlerBuilder` instance that can be used to configure the standard hedging behavior.

The standard hedging uses a pool of circuit breakers to ensure that unhealthy endpoints are not hedged against.
By default, the selection from pool is based on the URL Authority (scheme + host + port).
It is recommended that you configure the way the strategies are selected by calling
`StandardHedgingHandlerBuilderExtensions.SelectPipelineByAuthority`
extensions.

See `HttpStandardHedgingResilienceOptions` for more details about the used resilience strategies.

## ResilienceHttpClientBuilderExtensions.AddStandardResilienceHandler(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder AddStandardResilienceHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Adds a standard resilience handler that uses multiple resilience strategies with default options to send the requests and handle any transient errors.

Parameters:

- `builder`: The builder instance.

Returns: The value of `builder`.

The resilience pipeline combines multiple strategies that are configured based on HTTP-specific `HttpStandardResilienceOptions` options with recommended defaults.
See `HttpStandardResilienceOptions` for more details about the individual resilience strategies configured by this method.

## ResilienceHttpClientBuilderExtensions.AddStandardResilienceHandler(IHttpClientBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder AddStandardResilienceHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds a standard resilience handler that uses multiple resilience strategies with default options to send the requests and handle any transient errors.

Parameters:

- `builder`: The builder instance.
- `section`: The section that the options will bind against.

Returns: The value of `builder`.

The resilience pipeline combines multiple strategies that are configured based on HTTP-specific `HttpStandardResilienceOptions` options with recommended defaults.
See `HttpStandardResilienceOptions` for more details about the individual resilience strategies configured by this method.

## ResilienceHttpClientBuilderExtensions.AddStandardResilienceHandler(IHttpClientBuilder, HttpStandardResilienceOptions>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpStandardResiliencePipelineBuilder AddStandardResilienceHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.Http.Resilience.HttpStandardResilienceOptions> configure);
```

Adds a standard resilience handler that uses multiple resilience strategies with default options to send the requests and handle any transient errors.

Parameters:

- `builder`: The builder instance.
- `configure`: The callback that configures the options.

Returns: The value of `builder`.

The resilience pipeline combines multiple strategies that are configured based on HTTP-specific `HttpStandardResilienceOptions` options with recommended defaults.
See `HttpStandardResilienceOptions` for more details about the individual resilience strategies configured by this method.

## ResilienceHttpClientBuilderExtensions.RemoveAllResilienceHandlers(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder RemoveAllResilienceHandlers (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Removes all resilience handlers registered earlier.

Parameters:

- `builder`: The builder instance.

Returns: The value of `builder`.

To be added.
