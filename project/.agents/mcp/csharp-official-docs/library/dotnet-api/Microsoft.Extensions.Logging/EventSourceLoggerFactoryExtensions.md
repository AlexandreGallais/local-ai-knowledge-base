---
title: "EventSourceLoggerFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/EventSourceLoggerFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceLoggerFactoryExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class EventSourceLoggerFactoryExtensions
```

Extension methods for the `ILoggerFactory` class.

To be added.

## EventSourceLoggerFactoryExtensions.AddEventSourceLogger(ILoggerFactory) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddEventSourceLogger (this Microsoft.Extensions.Logging.ILoggerFactory factory);
```

Adds a logger that writes messages to the `LoggingEventSource` instance.

Parameters:

- `factory`: The extension method argument.

Returns: The `ILoggerFactory` so that additional calls can be chained.

To be added.

## EventSourceLoggerFactoryExtensions.AddEventSourceLogger(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddEventSourceLogger (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds a logger that writes messages to the `LoggingEventSource` instance.

Parameters:

- `builder`: The extension method argument.

Returns: The `ILoggingBuilder` so that additional calls can be chained.

The `EventSourceLoggerProvider` does not cache logger instances. A new logger instance
is created for each call to `ILoggerProvider.CreateLogger`. Consumers should
cache loggers obtained from `ILoggerFactory` if the same category name will be used
multiple times.
