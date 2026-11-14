---
title: "FilterLoggingBuilderExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/FilterLoggingBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FilterLoggingBuilderExtensions class (part 2 of 2)

## FilterLoggingBuilderExtensions.AddFilter<T>(LoggerFilterOptions, String, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter<T> (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, string? category, Microsoft.Extensions.Logging.LogLevel level) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `LoggerFilterOptions` to add the filter to.
- `category`: The category to filter.
- `level`: The level to filter.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

To be added.

## FilterLoggingBuilderExtensions.AddFilter<T>(LoggerFilterOptions, String, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter<T> (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, string? category, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `LoggerFilterOptions` to add the filter to.
- `category`: The category to filter.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and category and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.
