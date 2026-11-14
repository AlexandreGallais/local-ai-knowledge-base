---
title: "IBufferedLogger interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Abstractions/IBufferedLogger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBufferedLogger interface

Namespace: `Microsoft.Extensions.Logging.Abstractions`

```csharp
public interface IBufferedLogger
```

Represents the ability of a logging provider to support buffered logging.

A logging provider implements the `ILogger` interface that gets invoked by the
logging infrastructure whenever it’s time to log a piece of state.

A logging provider may also optionally implement the `IBufferedLogger` interface.
The logging infrastructure may type-test the `ILogger` object to determine if
it supports the `IBufferedLogger` interface. If it does, that indicates to the
logging infrastructure that the logging provider supports buffering. Whenever log
buffering is enabled, buffered log records may be delivered to the logging provider
in a batch via `IBufferedLogger.LogRecords`.

If a logging provider does not support log buffering, then it will always be given
unbuffered log records. If a logging provider does support log buffering, whether its
`ILogger` or `IBufferedLogger` implementation is used is
determined by the log producer.

## IBufferedLogger.LogRecords(BufferedLogRecord>) method

```csharp
public void LogRecords (System.Collections.Generic.IEnumerable<Microsoft.Extensions.Logging.Abstractions.BufferedLogRecord> records);
```

Delivers a batch of buffered log records to a logging provider.

Parameters:

- `records`: The buffered log records to log.

Once this function returns, the implementation should no longer access the records
or state referenced by these records since the instances may be reused to represent other logs.
