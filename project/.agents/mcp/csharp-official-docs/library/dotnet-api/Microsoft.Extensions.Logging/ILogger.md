---
title: "ILogger interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ILogger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILogger interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface ILogger
```

Represents a type used to perform logging.

This interface aggregates most logging patterns to a single method.

## ILogger.BeginScope<TState>(TState) method

```csharp
public IDisposable? BeginScope<TState> (TState state);
```

Begins a logical operation scope.

Parameters:

- `TState`: The type of the state to begin scope for.
- `state`: The identifier for the scope.

Returns: An `IDisposable` that ends the logical operation scope on dispose.

To be added.

## ILogger.IsEnabled(LogLevel) method

```csharp
public bool IsEnabled (Microsoft.Extensions.Logging.LogLevel logLevel);
```

Checks if the given `logLevel` is enabled.

Parameters:

- `logLevel`: Level to be checked.

Returns: `true` if enabled.

To be added.

## ILogger.Log<TState>(LogLevel, EventId, TState, Exception, String>) method

```csharp
public void Log<TState> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, TState state, Exception? exception, Func<TState,Exception?,string> formatter);
```

Writes a log entry.

Parameters:

- `TState`: The type of the object to be written.
- `logLevel`: The level at which to write the event.
- `eventId`: The ID of the event.
- `state`: The entry to be written. Can also be an object.
- `exception`: The exception related to this entry.
- `formatter`: The function to create a `String` message of the `state` and `exception`.

The default `formatter` provided by the logger extension methods doesn't include the `exception` when formatting messages. It's essential for implementations of this method to decide how exceptions should be incorporated into the logs.
