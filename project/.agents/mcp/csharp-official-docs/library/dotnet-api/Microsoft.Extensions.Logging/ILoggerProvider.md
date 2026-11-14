---
title: "ILoggerProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ILoggerProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILoggerProvider interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface ILoggerProvider : IDisposable
```

Represents a type that can create instances of `ILogger`.

To be added.

## ILoggerProvider.CreateLogger(String) method

```csharp
public Microsoft.Extensions.Logging.ILogger CreateLogger (string categoryName);
```

Creates a new `ILogger` instance.

Parameters:

- `categoryName`: The category name for messages produced by the logger.

Returns: The instance of `ILogger` that was created.

To be added.
