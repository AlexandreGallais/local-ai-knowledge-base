---
title: "Microsoft.Diagnostics.NETCore.Client API (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/microsoft-diagnostics-netcore-client.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Diagnostics.NETCore.Client API (part 2 of 2)

## EventPipeProviderEventFilter class

```csharp
public sealed class EventPipeProviderEventFilter
{
    public EventPipeProviderEventFilter(
        bool enable,
        IReadOnlyList<uint> eventIds);

    public bool Enable { get; }

    public IReadOnlyList<uint> EventIds { get; }
}
```

Represents an optional per-provider filter on Event IDs. The runtime applies the filter after the keyword and level filter of the associated `EventPipeProvider`. Event filters require a .NET 10+ target runtime.

### Constructor

```csharp
public EventPipeProviderEventFilter(
    bool enable,
    IReadOnlyList<uint> eventIds);
```

Creates a new instance of `EventPipeProviderEventFilter`.

* `enable` : If `true`, `eventIds` is an allow-list and the runtime enables only those Event IDs. If `false`, `eventIds` is a deny-list and the runtime enables every Event ID except those listed. An empty deny-list therefore enables all events.
* `eventIds` : The Event IDs to enable or disable, as determined by `enable`.

### Enable property

```csharp
public bool Enable { get; }
```

Gets a value that indicates whether `EventIds` is an allow-list (`true`) or a deny-list (`false`).

### EventIds property

```csharp
public IReadOnlyList<uint> EventIds { get; }
```

Gets the list of Event IDs that the filter enables or disables.

## EventPipeSession class

```csharp
public class EventPipeSession : IDisposable
{
    public Stream EventStream { get; }

    public void Stop();

    public Task StopAsync(
        CancellationToken cancellationToken);

    public void Dispose();
}
```

This class represents an ongoing EventPipe session. It is immutable and acts as a handle to an EventPipe session of the given runtime.

### EventStream property

```csharp
public Stream EventStream { get; }
```

Gets a `Stream` that can be used to read the event stream.

### Stop methods

```csharp
public void Stop();

public Task StopAsync(
    CancellationToken cancellationToken);
```

Stops the given `EventPipe` session.

* `cancellationToken` (for the async overload): The token to monitor for cancellation requests.

### Dispose method

```csharp
public void Dispose();
```

Releases resources associated with the `EventPipeSession`.

## DiagnosticsClientConnector class

```csharp
public sealed class DiagnosticsClientConnector : IAsyncDisposable
{
    public DiagnosticsClient Instance { get; }

    public ValueTask DisposeAsync();

    public static Task<DiagnosticsClientConnector> FromDiagnosticPort(
        string diagnosticPort,
        CancellationToken ct);
}
```

Represents a helper that creates a `DiagnosticsClient` from a diagnostic port and manages the lifetime of the underlying diagnostics server connection.

* `Instance` : The `DiagnosticsClient` connected to the target runtime.
* `DisposeAsync` : Disposes the underlying server/connection asynchronously.
* `FromDiagnosticPort` : Creates a new `DiagnosticsClientConnector` from the specified diagnostic port.

```csharp
public static Task<DiagnosticsClientConnector> FromDiagnosticPort(
    string diagnosticPort,
    CancellationToken ct)
```

* `diagnosticPort` : The diagnostic port string (for example, a listen or connect port) to connect through.
* `ct` : The token to monitor for cancellation requests.

## DumpType enum

```csharp
public enum DumpType
{
    Normal = 1,
    WithHeap = 2,
    Triage = 3,
    Full = 4
}
```

Represents the type of dump that can be requested.

* `Normal`: Include just the information necessary to capture stack traces for all existing traces for all existing threads in a process. Limited GC heap memory and information.
* `WithHeap`: Includes the GC heaps and information necessary to capture stack traces for all existing threads in a process.
* `Triage`: Include just the information necessary to capture stack traces for all existing traces for all existing threads in a process. Limited GC heap memory and information. Some content that is known to contain potentially sensitive information such as full module paths will be redacted. While this is intended to mitigate some cases of sensitive data exposure, there is no guarantee this redaction feature on its own is sufficient to comply with any particular law or standard regarding data privacy.
* `Full`: Include all accessible memory in the process. The raw memory data is included at the end, so that the initial structures can be mapped directly without the raw memory information. This option can result in a very large dump file.

## WriteDumpFlags enum

```csharp
public enum WriteDumpFlags
{
    None = 0x00,
    LoggingEnabled = 0x01,
    VerboseLoggingEnabled = 0x02,
    CrashReportEnabled = 0x04
}
```

Represents additional options that can be specified when requesting a dump.

* `None` : No additional behavior.
* `LoggingEnabled` : Enable basic logging during dump generation.
* `VerboseLoggingEnabled` : Enable verbose logging during dump generation.
* `CrashReportEnabled` : Enable generation of a crash report.

## PerfMapType enum

```csharp
public enum PerfMapType
{
    None = 0,
    All = 1,
    JitDump = 2,
    PerfMap = 3
}
```

Represents the type of perf map behavior that can be enabled.

* `None` : No perf map output.
* `All` : Enable all perf map outputs supported by the runtime.
* `JitDump` : Enable JIT dump perf map output.
* `PerfMap` : Enable traditional perf map output.

## EventPipeBufferingMode enum

```csharp
public enum EventPipeBufferingMode
{
    Drop = 0,
    Block = 1
}
```

Controls how the runtime's per-session event buffer behaves when it fills faster than the session drains it.

* `Drop` : The runtime default. The session uses a buffer that drops events when it overflows, so collection is lossy.
* `Block` : Non-lossy collection. The runtime blocks event producers when the buffer is full instead of dropping events. Use it for collections that must be complete, such as a heap snapshot on a large heap. `Block` is non-lossy only up to the buffer's capacity, not against host memory exhaustion: if the runtime can't allocate the memory it needs to reserve buffer space, or during session shutdown, it drops the event instead of blocking. `Block` requires a .NET 11+ target runtime; on an older runtime, starting the session throws `UnsupportedCommandException`.

## Exceptions

Exceptions that are thrown from the library are of type `DiagnosticsClientException` or a derived type.

```csharp
public class DiagnosticsClientException : Exception
```

### UnsupportedProtocolException

```csharp
public class UnsupportedProtocolException : DiagnosticsClientException
```

This may be thrown when the target process's runtime is not compatible with the diagnostics IPC protocol used by the library.

### ServerNotAvailableException

```csharp
public class ServerNotAvailableException : DiagnosticsClientException
```

This may be thrown when the runtime is not available for diagnostics IPC commands, such as early during runtime startup before the runtime is ready for diagnostics commands, or when the runtime is shutting down.

### ServerErrorException

```csharp
public class ServerErrorException : DiagnosticsClientException
```

This may be thrown when the runtime responds with an error to a given command.

### UnsupportedCommandException

```csharp
public class UnsupportedCommandException : ServerErrorException
```

This exception is thrown when the command is not supported by either the library or the target process's runtime.

### ProfilerAlreadyActiveException

```csharp
public class ProfilerAlreadyActiveException : ServerErrorException
```

This exception is thrown when a profiler is already loaded into the target runtime and another attach is attempted.

### BadEncodingException

```csharp
public class BadEncodingException : ServerErrorException
```

This exception is thrown when the target runtime can't decode the command payload and rejects it. From a well-formed client, it usually means the runtime is too old to understand a newer configured option value, so it rejects the request while parsing.
