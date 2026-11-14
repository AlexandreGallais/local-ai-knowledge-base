---
title: "HttpClientLoggingServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientLoggingServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientLoggingServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HttpClientLoggingServiceCollectionExtensions
```

Extensions to register extended HTTP client logging features.

To be added.

## HttpClientLoggingServiceCollectionExtensions.AddExtendedHttpClientLogging(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for all HTTP clients created with `IHttpClientFactory`.

Parameters:

- `services`: The `IServiceCollection`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Argument `services` is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.

## HttpClientLoggingServiceCollectionExtensions.AddExtendedHttpClientLogging(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for all HTTP clients created with `IHttpClientFactory`.

Parameters:

- `services`: The `IServiceCollection`.
- `section`: The `IConfigurationSection` to use for configuring `LoggingOptions`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.

## HttpClientLoggingServiceCollectionExtensions.AddExtendedHttpClientLogging(IServiceCollection, LoggingOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Http.Logging.LoggingOptions> configure);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for all HTTP clients created with `IHttpClientFactory`.

Parameters:

- `services`: The `IServiceCollection`.
- `configure`: The delegate to configure `LoggingOptions` with.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.

## HttpClientLoggingServiceCollectionExtensions.AddHttpClientLogEnricher<T>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHttpClientLogEnricher<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where T : class, Microsoft.Extensions.Http.Logging.IHttpClientLogEnricher;
```

Adds an enricher instance of `T` to the `IServiceCollection` to enrich `HttpClient` logs.

Parameters:

- `T`: Type of enricher.
- `services`: The `IServiceCollection` to add the instance of `T` to.

Returns: The value of `services`.

To be added.
