---
title: "ConsoleLoggerQueueFullMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Console/ConsoleLoggerQueueFullMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleLoggerQueueFullMode enum

Namespace: `Microsoft.Extensions.Logging.Console`

```csharp
public enum ConsoleLoggerQueueFullMode
```

Describes the console logger behavior when the queue becomes full.

To be added.

## ConsoleLoggerQueueFullMode.DropWrite field

```csharp
DropWrite
```

Drops new log messages when the queue is full.

## ConsoleLoggerQueueFullMode.Wait field

```csharp
Wait
```

Blocks the logging threads once the queue limit is reached.
