---
title: "LoggerExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggerExtensions
```

ILogger extension methods for common scenarios.

To be added.

## LoggerExtensions.BeginScope(ILogger, String, Object[]) method

```csharp
public static IDisposable? BeginScope (this Microsoft.Extensions.Logging.ILogger logger, string messageFormat, params object?[] args);
```

Formats the message and creates a scope.

Parameters:

- `logger`: The `ILogger` to create the scope in.
- `messageFormat`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

Returns: A disposable scope object. Can be null.

To be added.

```csharp

            using(logger.BeginScope("Processing request from {Address}", address)) { }
            
```

## LoggerExtensions.Log(ILogger, LogLevel, String, Object[]) method

```csharp
public static void Log (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.LogLevel logLevel, string? message, params object?[] args);
```

Formats and writes a log message at the specified log level.

Parameters:

- `logger`: The `ILogger` to write to.
- `logLevel`: Entry will be written on this level.
- `message`: Format string of the log message.
- `args`: An object array that contains zero or more objects to format.

To be added.

## LoggerExtensions.Log(ILogger, LogLevel, EventId, String, Object[]) method

```csharp
public static void Log (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes a log message at the specified log level.

Parameters:

- `logger`: The `ILogger` to write to.
- `logLevel`: Entry will be written on this level.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message.
- `args`: An object array that contains zero or more objects to format.

To be added.

## LoggerExtensions.Log(ILogger, LogLevel, Exception, String, Object[]) method

```csharp
public static void Log (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.LogLevel logLevel, Exception? exception, string? message, params object?[] args);
```

Formats and writes a log message at the specified log level.

Parameters:

- `logger`: The `ILogger` to write to.
- `logLevel`: Entry will be written on this level.
- `exception`: The exception to log.
- `message`: Format string of the log message.
- `args`: An object array that contains zero or more objects to format.

To be added.

## LoggerExtensions.Log(ILogger, LogLevel, EventId, Exception, String, Object[]) method

```csharp
public static void Log (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes a log message at the specified log level.

Parameters:

- `logger`: The `ILogger` to write to.
- `logLevel`: Entry will be written on this level.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message.
- `args`: An object array that contains zero or more objects to format.

To be added.

## LoggerExtensions.LogCritical(ILogger, String, Object[]) method

```csharp
public static void LogCritical (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes a critical log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogCritical("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogCritical(ILogger, EventId, String, Object[]) method

```csharp
public static void LogCritical (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes a critical log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogCritical(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogCritical(ILogger, Exception, String, Object[]) method

```csharp
public static void LogCritical (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes a critical log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogCritical(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogCritical(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogCritical (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes a critical log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogCritical(0, exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogDebug(ILogger, String, Object[]) method

```csharp
public static void LogDebug (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes a debug log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogDebug("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogDebug(ILogger, EventId, String, Object[]) method

```csharp
public static void LogDebug (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes a debug log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogDebug(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogDebug(ILogger, Exception, String, Object[]) method

```csharp
public static void LogDebug (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes a debug log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogDebug(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogDebug(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogDebug (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes a debug log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogDebug(0, exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogError(ILogger, String, Object[]) method

```csharp
public static void LogError (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes an error log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogError("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogError(ILogger, EventId, String, Object[]) method

```csharp
public static void LogError (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes an error log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogError(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogError(ILogger, Exception, String, Object[]) method

```csharp
public static void LogError (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes an error log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogError(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogError(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogError (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes an error log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogError(0, exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogInformation(ILogger, String, Object[]) method

```csharp
public static void LogInformation (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes an informational log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogInformation("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogInformation(ILogger, EventId, String, Object[]) method

```csharp
public static void LogInformation (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes an informational log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogInformation(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogInformation(ILogger, Exception, String, Object[]) method

```csharp
public static void LogInformation (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes an informational log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogInformation(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogInformation(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogInformation (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes an informational log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogInformation(0, exception, "Error while processing request from {Address}", address)
            
```
