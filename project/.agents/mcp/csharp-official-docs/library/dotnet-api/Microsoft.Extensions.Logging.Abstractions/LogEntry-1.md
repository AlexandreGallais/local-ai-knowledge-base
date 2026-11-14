---
title: "LogEntry<TState> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Abstractions/LogEntry`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LogEntry<TState> struct

Namespace: `Microsoft.Extensions.Logging.Abstractions`

```csharp
public readonly struct LogEntry<TState>
```

Holds the information for a single log entry.

To be added.

## LogEntry<TState>.LogEntry(LogLevel, String, EventId, TState, Exception, String>) constructor

```csharp
public LogEntry (Microsoft.Extensions.Logging.LogLevel logLevel, string category, Microsoft.Extensions.Logging.EventId eventId, TState state, Exception? exception, Func<TState,Exception?,string> formatter);
```

Initializes an instance of the LogEntry struct.

Parameters:

- `logLevel`: The log level.
- `category`: The category name for the log.
- `eventId`: The log event Id.
- `state`: The state for which log is being written.
- `exception`: The log exception.
- `formatter`: The formatter.

To be added.

## LogEntry<TState>.Category property

```csharp
public string Category { get; }
```

Gets the log category.

Returns: A string that represents the log category.

To be added.

## LogEntry<TState>.EventId property

```csharp
public Microsoft.Extensions.Logging.EventId EventId { get; }
```

Gets the log event ID.

Returns: An `EventId` instance.

To be added.

## LogEntry<TState>.Exception property

```csharp
public Exception? Exception { get; }
```

Gets the log exception.

Returns: An `Exception` instance.

To be added.

## LogEntry<TState>.Formatter property

```csharp
public Func<TState,Exception?,string> Formatter { get; }
```

Gets the formatter.

Returns: The encapsulated method that represents a formatter, which takes a `TState` and a `Exception`, and returns a string.

To be added.

## LogEntry<TState>.LogLevel property

```csharp
public Microsoft.Extensions.Logging.LogLevel LogLevel { get; }
```

Gets the log level.

Returns: A `LogLevel` instance.

To be added.

## LogEntry<TState>.State property

```csharp
public TState State { get; }
```

Gets the state.

Returns: An object of type `TState`.

To be added.
