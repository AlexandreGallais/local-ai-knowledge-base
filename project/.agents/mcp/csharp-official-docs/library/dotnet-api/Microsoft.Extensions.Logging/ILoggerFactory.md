---
title: "ILoggerFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ILoggerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILoggerFactory interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface ILoggerFactory : IDisposable
```

Represents a type used to configure the logging system and create instances of `ILogger` from
the registered `ILoggerProvider`s.

To be added.

## ILoggerFactory.AddProvider(ILoggerProvider) method

```csharp
public void AddProvider (Microsoft.Extensions.Logging.ILoggerProvider provider);
```

Adds an `ILoggerProvider` to the logging system.

Parameters:

- `provider`: The `ILoggerProvider`.

To be added.

## ILoggerFactory.CreateLogger(String) method

```csharp
public Microsoft.Extensions.Logging.ILogger CreateLogger (string categoryName);
```

Creates a new `ILogger` instance.

Parameters:

- `categoryName`: The category name for messages produced by the logger.

Returns: The `ILogger`.

To be added.
