---
title: "LoggingBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggingBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggingBuilderExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggingBuilderExtensions
```

Extension methods for setting up logging services in an `ILoggingBuilder`.

To be added.

## LoggingBuilderExtensions.AddConfiguration(ILoggingBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddConfiguration (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Configures `LoggerFilterOptions` from an instance of `IConfiguration`.

Parameters:

- `builder`: The `ILoggingBuilder` to use.
- `configuration`: The `IConfiguration` to add.

Returns: The builder.

To be added.

## LoggingBuilderExtensions.AddProvider(ILoggingBuilder, ILoggerProvider) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddProvider (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Logging.ILoggerProvider provider);
```

Adds the given `ILoggerProvider` to the `ILoggingBuilder`

Parameters:

- `builder`: The `ILoggingBuilder` to add the `provider` to.
- `provider`: The `ILoggerProvider` to add to the `builder`.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## LoggingBuilderExtensions.ClearProviders(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder ClearProviders (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Removes all `ILoggerProvider`s from `builder`.

Parameters:

- `builder`: The `ILoggingBuilder` to remove `ILoggerProvider`s from.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## LoggingBuilderExtensions.Configure() method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder Configure (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.LoggerFactoryOptions> action);
```

Configures the current logging builder instance with the specified logger factory options.

Returns: The configured logging builder instance so that additional calls can be chained.

To be added.

## LoggingBuilderExtensions.SetMinimumLevel(ILoggingBuilder, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder SetMinimumLevel (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Logging.LogLevel level);
```

Sets a minimum `LogLevel` requirement for log messages to be logged.

Parameters:

- `builder`: The `ILoggingBuilder` to set the minimum level on.
- `level`: The `LogLevel` to set as the minimum.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.
