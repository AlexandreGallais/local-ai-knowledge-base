---
title: "EventLoggerFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/EventLoggerFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLoggerFactoryExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class EventLoggerFactoryExtensions
```

Extension methods for the `ILoggerFactory` class.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggerFactory) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddEventLog (this Microsoft.Extensions.Logging.ILoggerFactory factory);
```

Adds an event logger that is enabled for `LogLevel`.Information or higher.

Parameters:

- `factory`: The extension method argument.

Returns: To be added.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddEventLog (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds an event logger named 'EventLog' to the factory.

Parameters:

- `builder`: The extension method argument.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggerFactory, EventLogSettings) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddEventLog (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.EventLog.EventLogSettings settings);
```

Adds an event logger. Use `settings` to enable logging for specific log levels.

Parameters:

- `factory`: The extension method argument.
- `settings`: The `EventLogSettings`.

Returns: To be added.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggerFactory, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddEventLog (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.LogLevel minLevel);
```

Adds an event logger that is enabled for `LogLevel`s of minLevel or higher.

Parameters:

- `factory`: The extension method argument.
- `minLevel`: The minimum `LogLevel` to be logged.

Returns: To be added.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggingBuilder, EventLogSettings) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddEventLog (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Logging.EventLog.EventLogSettings settings);
```

Adds an event logger. Use `settings` to enable logging for specific log levels.

Parameters:

- `builder`: The extension method argument.
- `settings`: The `EventLogSettings`.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.

## EventLoggerFactoryExtensions.AddEventLog(ILoggingBuilder, EventLogSettings>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddEventLog (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.EventLog.EventLogSettings> configure);
```

Adds an event logger. Use `configure` to enable logging for specific log levels.

Parameters:

- `builder`: The extension method argument.
- `configure`: A delegate to configure the `EventLogSettings`.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

To be added.
