---
title: "LoggerFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerFactoryExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggerFactoryExtensions
```

ILoggerFactory extension methods for common scenarios.

To be added.

## LoggerFactoryExtensions.CreateLogger(ILoggerFactory, Type) method

```csharp
public static Microsoft.Extensions.Logging.ILogger CreateLogger (this Microsoft.Extensions.Logging.ILoggerFactory factory, Type type);
```

Creates a new `ILogger` instance using the full name of the given `type`.

Parameters:

- `factory`: The factory.
- `type`: The type.

Returns: The `ILogger` that was created.

To be added.

## LoggerFactoryExtensions.CreateLogger<T>(ILoggerFactory) method

```csharp
public static Microsoft.Extensions.Logging.ILogger<T> CreateLogger<T> (this Microsoft.Extensions.Logging.ILoggerFactory factory);
```

Creates a new `ILogger` instance using the full name of the given type.

Parameters:

- `T`: The type.
- `factory`: The factory.

Returns: The `ILogger` that was created.

To be added.
