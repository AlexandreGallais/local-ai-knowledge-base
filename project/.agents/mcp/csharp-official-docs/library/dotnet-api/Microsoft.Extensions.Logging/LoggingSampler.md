---
title: "LoggingSampler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggingSampler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggingSampler class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public abstract class LoggingSampler
```

Controls the number of samples of log records collected and sent to the backend.

To be added.

## LoggingSampler.LoggingSampler() constructor

```csharp
protected LoggingSampler ();
```

To be added.

To be added.

## LoggingSampler.ShouldSample<TState>(LogEntry<TState>) method

```csharp
public abstract bool ShouldSample<TState> (in Microsoft.Extensions.Logging.Abstractions.LogEntry<TState> logEntry);
```

Makes a sampling decision for the provided `logEntry`.

Parameters:

- `TState`: The type of the log entry state.
- `logEntry`: The log entry used to make the sampling decision for.

Returns: `true` if the log record should be sampled; otherwise, `false`.

To be added.
