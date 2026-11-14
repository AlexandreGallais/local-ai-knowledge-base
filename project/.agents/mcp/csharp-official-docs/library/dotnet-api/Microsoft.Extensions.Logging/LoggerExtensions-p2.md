---
title: "LoggerExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerExtensions class (part 2 of 2)

## LoggerExtensions.LogTrace(ILogger, String, Object[]) method

```csharp
public static void LogTrace (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes a trace log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogTrace("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogTrace(ILogger, EventId, String, Object[]) method

```csharp
public static void LogTrace (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes a trace log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogTrace(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogTrace(ILogger, Exception, String, Object[]) method

```csharp
public static void LogTrace (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes a trace log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogTrace(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogTrace(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogTrace (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes a trace log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogTrace(0, exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogWarning(ILogger, String, Object[]) method

```csharp
public static void LogWarning (this Microsoft.Extensions.Logging.ILogger logger, string? message, params object?[] args);
```

Formats and writes a warning log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogWarning("Processing request from {Address}", address)
            
```

## LoggerExtensions.LogWarning(ILogger, EventId, String, Object[]) method

```csharp
public static void LogWarning (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, string? message, params object?[] args);
```

Formats and writes a warning log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogWarning(0, "Processing request from {Address}", address)
            
```

## LoggerExtensions.LogWarning(ILogger, Exception, String, Object[]) method

```csharp
public static void LogWarning (this Microsoft.Extensions.Logging.ILogger logger, Exception? exception, string? message, params object?[] args);
```

Formats and writes a warning log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogWarning(exception, "Error while processing request from {Address}", address)
            
```

## LoggerExtensions.LogWarning(ILogger, EventId, Exception, String, Object[]) method

```csharp
public static void LogWarning (this Microsoft.Extensions.Logging.ILogger logger, Microsoft.Extensions.Logging.EventId eventId, Exception? exception, string? message, params object?[] args);
```

Formats and writes a warning log message.

Parameters:

- `logger`: The `ILogger` to write to.
- `eventId`: The event id associated with the log.
- `exception`: The exception to log.
- `message`: Format string of the log message in message template format. Example: `"User {User} logged in from {Address}"`.
- `args`: An object array that contains zero or more objects to format.

To be added.

```csharp

            logger.LogWarning(0, exception, "Error while processing request from {Address}", address)
            
```
