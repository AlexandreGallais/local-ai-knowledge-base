---
title: "DebugLoggerFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/DebugLoggerFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebugLoggerFactoryExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class DebugLoggerFactoryExtensions
```

Extension methods for the `ILoggerFactory` class.

To be added.

## DebugLoggerFactoryExtensions.AddDebug(ILoggerFactory) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddDebug (this Microsoft.Extensions.Logging.ILoggerFactory factory);
```

Adds a debug logger that is enabled for log levels of minLevel or higher.

Parameters:

- `factory`: The extension method argument.

Returns: To be added.

To be added.

## DebugLoggerFactoryExtensions.AddDebug(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddDebug (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds a debug logger named 'Debug' to the factory.

Parameters:

- `builder`: The extension method argument.

Returns: To be added.

To be added.

## DebugLoggerFactoryExtensions.AddDebug(ILoggerFactory, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddDebug (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.LogLevel minLevel);
```

Adds a debug logger that is enabled for `LogLevel`.Information or higher.

Parameters:

- `factory`: The extension method argument.
- `minLevel`: The minimum `LogLevel` to be logged.  This parameter is no longer honored and will be ignored.

Returns: To be added.

To be added.

## DebugLoggerFactoryExtensions.AddDebug(ILoggerFactory, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddDebug (this Microsoft.Extensions.Logging.ILoggerFactory factory, Func<string,Microsoft.Extensions.Logging.LogLevel,bool> filter);
```

Adds a debug logger that is enabled as defined by the filter function.

Parameters:

- `factory`: The extension method argument.
- `filter`: The function used to filter events based on the log level. This parameter is no longer honored and is ignored.

Returns: To be added.

To be added.
