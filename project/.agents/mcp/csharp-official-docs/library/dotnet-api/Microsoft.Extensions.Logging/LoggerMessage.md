---
title: "LoggerMessage class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerMessage.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerMessage class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggerMessage
```

Creates delegates that can be later cached to log messages in a performant way.

To be added.

## LoggerMessage.Define(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,Exception?> Define (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,Exception?> Define (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,Exception?> Define<T1> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,Exception?> Define<T1> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,Exception?> Define<T1,T2> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,Exception?> Define<T1,T2> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,Exception?> Define<T1,T2,T3> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,Exception?> Define<T1,T2,T3> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,Exception?> Define<T1,T2,T3,T4> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,Exception?> Define<T1,T2,T3,T4> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4,T5>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,Exception?> Define<T1,T2,T3,T4,T5> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4,T5>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,Exception?> Define<T1,T2,T3,T4,T5> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4,T5,T6>(LogLevel, EventId, String) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,T6,Exception?> Define<T1,T2,T3,T4,T5,T6> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `T6`: The type of the sixth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.Define<T1,T2,T3,T4,T5,T6>(LogLevel, EventId, String, LogDefineOptions) method

```csharp
public static Action<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,T6,Exception?> Define<T1,T2,T3,T4,T5,T6> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, string formatString, Microsoft.Extensions.Logging.LogDefineOptions? options);
```

Creates a delegate that can be invoked for logging a message.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `T6`: The type of the sixth parameter passed to the named format string.
- `logLevel`: The `LogLevel`.
- `eventId`: The event ID.
- `formatString`: The named format string.
- `options`: The `LogDefineOptions`.

Returns: A delegate that, when invoked, creates a log message.

To be added.

## LoggerMessage.DefineScope(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,IDisposable?> DefineScope (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.

## LoggerMessage.DefineScope<T1>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,IDisposable?> DefineScope<T1> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.

## LoggerMessage.DefineScope<T1,T2>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,T2,IDisposable?> DefineScope<T1,T2> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.

## LoggerMessage.DefineScope<T1,T2,T3>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,IDisposable?> DefineScope<T1,T2,T3> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.

## LoggerMessage.DefineScope<T1,T2,T3,T4>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,IDisposable?> DefineScope<T1,T2,T3,T4> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.
