---
title: "FilterLoggingBuilderExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/FilterLoggingBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FilterLoggingBuilderExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class FilterLoggingBuilderExtensions
```

Extension methods for setting up logging services in an `IServiceCollection`.

To be added.

## FilterLoggingBuilderExtensions.AddFilter(ILoggingBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to add the filter to.
- `levelFilter`: The filter to be added. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(ILoggingBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Func<string?,Microsoft.Extensions.Logging.LogLevel,bool> categoryLevelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to add the filter to.
- `categoryLevelFilter`: The filter to be added. The filter function receives the logger category name and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message and receives two parameters:

- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(ILoggingBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Func<string?,string?,Microsoft.Extensions.Logging.LogLevel,bool> filter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to add the filter to.
- `filter`: The filter to be added. The filter function receives the provider type full name, the logger category name, and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message and receives three parameters:

- The full type name of the `ILoggerProvider` (e.g., "Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider").
- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(LoggerFilterOptions, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `LoggerFilterOptions` to add the filter to.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(LoggerFilterOptions, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, Func<string?,Microsoft.Extensions.Logging.LogLevel,bool> categoryLevelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `LoggerFilterOptions` to add the filter to.
- `categoryLevelFilter`: The filter function to apply. The filter function receives the logger category name and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message and receives two parameters:

- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(LoggerFilterOptions, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, Func<string?,string?,Microsoft.Extensions.Logging.LogLevel,bool> filter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `LoggerFilterOptions` to add the filter to.
- `filter`: The filter function to apply. The filter function receives the provider type full name, the logger category name, and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message and receives three parameters:

- The full type name of the `ILoggerProvider` (e.g., "Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider").
- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(ILoggingBuilder, String, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter (this Microsoft.Extensions.Logging.ILoggingBuilder builder, string? category, Microsoft.Extensions.Logging.LogLevel level);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to add the filter to.
- `category`: The category to filter.
- `level`: The level to filter.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## FilterLoggingBuilderExtensions.AddFilter(ILoggingBuilder, String, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter (this Microsoft.Extensions.Logging.ILoggingBuilder builder, string? category, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to add the filter to.
- `category`: The category to filter.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message from the specified category and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter(LoggerFilterOptions, String, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, string? category, Microsoft.Extensions.Logging.LogLevel level);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `LoggerFilterOptions` to add the filter to.
- `category`: The category to filter.
- `level`: The level to filter.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

To be added.

## FilterLoggingBuilderExtensions.AddFilter(LoggerFilterOptions, String, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, string? category, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter);
```

Adds a log filter to the factory.

Parameters:

- `builder`: The `LoggerFilterOptions` to add the filter to.
- `category`: The category to filter.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message from the specified category and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter<T>(ILoggingBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter<T> (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `ILoggingBuilder` to add the filter to.
- `levelFilter`: The filter to be added. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter<T>(ILoggingBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter<T> (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Func<string?,Microsoft.Extensions.Logging.LogLevel,bool> categoryLevelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `ILoggingBuilder` to add the filter to.
- `categoryLevelFilter`: The filter to be added. The filter function receives the logger category name and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and receives two parameters:

- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter<T>(LoggerFilterOptions, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter<T> (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `LoggerFilterOptions` to add the filter to.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter<T>(LoggerFilterOptions, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.LoggerFilterOptions AddFilter<T> (this Microsoft.Extensions.Logging.LoggerFilterOptions builder, Func<string?,Microsoft.Extensions.Logging.LogLevel,bool> categoryLevelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `LoggerFilterOptions` to add the filter to.
- `categoryLevelFilter`: The filter function to apply. The filter function receives the logger category name and the log level, and returns `true` to log the message or `false` to filter it out.

Returns: The `LoggerFilterOptions` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and receives two parameters:

- The logger category name (e.g., "MyNamespace.MyClass").
- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.

## FilterLoggingBuilderExtensions.AddFilter<T>(ILoggingBuilder, String, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter<T> (this Microsoft.Extensions.Logging.ILoggingBuilder builder, string? category, Microsoft.Extensions.Logging.LogLevel level) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `ILoggingBuilder` to add the filter to.
- `category`: The category to filter.
- `level`: The level to filter.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## FilterLoggingBuilderExtensions.AddFilter<T>(ILoggingBuilder, String, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFilter<T> (this Microsoft.Extensions.Logging.ILoggingBuilder builder, string? category, Func<Microsoft.Extensions.Logging.LogLevel,bool> levelFilter) where T : Microsoft.Extensions.Logging.ILoggerProvider;
```

Adds a log filter for the given `ILoggerProvider`.

Parameters:

- `T`: The `ILoggerProvider` which this filter will be added for.
- `builder`: The `ILoggingBuilder` to add the filter to.
- `category`: The category to filter.
- `levelFilter`: The filter function to apply. The filter function receives the log level and returns `true` to log the message or `false` to filter it out.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The filter function is called for each log message from the specified provider and category and receives one parameter:

- The `LogLevel` of the log message.
Return `true` to allow the message to be logged, or `false` to filter it out.
