---
title: "ConsoleFormatter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Console/ConsoleFormatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleFormatter class

Namespace: `Microsoft.Extensions.Logging.Console`

```csharp
public abstract class ConsoleFormatter
```

Allows custom log messages formatting.

To be added.

## ConsoleFormatter.ConsoleFormatter(String) constructor

```csharp
protected ConsoleFormatter (string name);
```

Initializes a new instance of `ConsoleFormatter`.

To be added.

## ConsoleFormatter.Name property

```csharp
public string Name { get; }
```

Gets the name associated with the console log formatter.

Returns: A string that represents the name associated with the console log formatter.

To be added.

## ConsoleFormatter.Write<TState>(LogEntry<TState>, IExternalScopeProvider, TextWriter) method

```csharp
public abstract void Write<TState> (in Microsoft.Extensions.Logging.Abstractions.LogEntry<TState> logEntry, Microsoft.Extensions.Logging.IExternalScopeProvider? scopeProvider, System.IO.TextWriter textWriter);
```

Writes the log message to the specified TextWriter.

Parameters:

- `TState`: The type of the object to be written.
- `logEntry`: The log entry.
- `scopeProvider`: The provider of scope data.
- `textWriter`: The string writer embedding ansi code for colors.

If the formatter wants to write colors to the console, it can do so by embedding ANSI color codes into the string.
