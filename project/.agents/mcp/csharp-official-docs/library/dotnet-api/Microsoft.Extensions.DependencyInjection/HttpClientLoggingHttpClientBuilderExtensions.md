---
title: "HttpClientLoggingHttpClientBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientLoggingHttpClientBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientLoggingHttpClientBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HttpClientLoggingHttpClientBuilderExtensions
```

Extensions to register extended HTTP client logging features.

To be added.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Argument `builder` is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `section`: The `IConfigurationSection` to use for configuring `LoggingOptions`.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder, LoggingOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.Http.Logging.LoggingOptions> configure);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configure`: The delegate to configure `LoggingOptions` with.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, bool wrapHandlersPipeline);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `wrapHandlersPipeline`: When `true`, the logger is placed at the beginning of the request pipeline, wrapping all other handlers.
When `false`, the logger is placed at the end of the pipeline, right before the primary message handler.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Argument `builder` is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder, IConfigurationSection, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section, bool wrapHandlersPipeline);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `section`: The `IConfigurationSection` to use for configuring `LoggingOptions`.
- `wrapHandlersPipeline`: When `true`, the logger is placed at the beginning of the request pipeline, wrapping all other handlers.
When `false`, the logger is placed at the end of the pipeline, right before the primary message handler.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.

## HttpClientLoggingHttpClientBuilderExtensions.AddExtendedHttpClientLogging(IHttpClientBuilder, LoggingOptions>, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddExtendedHttpClientLogging (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.Http.Logging.LoggingOptions> configure, bool wrapHandlersPipeline);
```

Adds an `IHttpClientAsyncLogger` to emit logs for outgoing requests for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configure`: The delegate to configure `LoggingOptions` with.
- `wrapHandlersPipeline`: When `true`, the logger is placed at the beginning of the request pipeline, wrapping all other handlers.
When `false`, the logger is placed at the end of the pipeline, right before the primary message handler.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

All other loggers are removed - including the default one, registered via `HttpClientBuilderExtensions.AddDefaultLogger`.
Information logged by this method is added as key/value pairs to log state.
