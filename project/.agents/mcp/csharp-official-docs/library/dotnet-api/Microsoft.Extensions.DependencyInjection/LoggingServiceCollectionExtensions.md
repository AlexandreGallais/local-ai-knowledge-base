---
title: "LoggingServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/LoggingServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggingServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class LoggingServiceCollectionExtensions
```

Extension methods for setting up logging services in an `IServiceCollection`.

To be added.

## LoggingServiceCollectionExtensions.AddLogging(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds logging services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## LoggingServiceCollectionExtensions.AddLogging(IServiceCollection, ILoggingBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Logging.ILoggingBuilder> configure);
```

Adds logging services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `configure`: The `ILoggingBuilder` configuration delegate.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
