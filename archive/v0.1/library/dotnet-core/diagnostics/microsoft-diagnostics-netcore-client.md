---
title: "Microsoft.Diagnostics.NETCore.Client API (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/microsoft-diagnostics-netcore-client.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Diagnostics.NETCore.Client API

This section describes the APIs of the diagnostics client library.

## DiagnosticsClient class

```cs
public sealed class DiagnosticsClient
{
    public DiagnosticsClient(int processId);

    public EventPipeSession StartEventPipeSession(
        IEnumerable<EventPipeProvider> providers,
        bool requestRundown = true,
        int circularBufferMB = 256);

    public EventPipeSession StartEventPipeSession(
        EventPipeProvider provider,
        bool requestRundown = true,
        int circularBufferMB = 256);

    public EventPipeSession StartEventPipeSession(
        EventPipeSessionConfiguration config);

    public Task<EventPipeSession> StartEventPipeSessionAsync(
        IEnumerable<EventPipeProvider> providers,
        bool requestRundown,
        int circularBufferMB = 256,
        CancellationToken token = <example-value>);

    public Task<EventPipeSession> StartEventPipeSessionAsync(
        EventPipeProvider provider,
        bool requestRundown,
        int circularBufferMB = 256,
        CancellationToken token = <example-value>);

    public Task<EventPipeSession> StartEventPipeSessionAsync(
        EventPipeSessionConfiguration configuration,
        CancellationToken token);

    public void WriteDump(
        DumpType dumpType,
        string dumpPath,
        bool logDumpGeneration = false);

    public void WriteDump(
        DumpType dumpType,
        string dumpPath,
        WriteDumpFlags flags);

    public Task WriteDumpAsync(
        DumpType dumpType,
        string dumpPath,
        bool logDumpGeneration,
        CancellationToken token);

    public Task WriteDumpAsync(
        DumpType dumpType,
        string dumpPath,
        WriteDumpFlags flags,
        CancellationToken token);

    public void AttachProfiler(
        TimeSpan attachTimeout,
        Guid profilerGuid,
        string profilerPath,
        byte[] additionalData = null);

    public void SetStartupProfiler(
        Guid profilerGuid,
        string profilerPath);

    public void ResumeRuntime();

    public void SetEnvironmentVariable(
        string name,
        string value);

    public Dictionary<string, string> GetProcessEnvironment();

    public void ApplyStartupHook(
        string startupHookPath);

    public Task ApplyStartupHookAsync(
        string startupHookPath,
        CancellationToken token);

    public void EnablePerfMap(
        PerfMapType type);

    public void DisablePerfMap();

    public static IEnumerable<int> GetPublishedProcesses();
}
```

### Constructor

```csharp
public DiagnosticsClient(int processId);
```

Creates a new instance of `DiagnosticsClient` for a compatible .NET process running with process ID of `processId`.

`processID` : Process ID of the target application.

### StartEventPipeSession methods

```csharp
public EventPipeSession StartEventPipeSession(
    IEnumerable<EventPipeProvider> providers,
    bool requestRundown = true,
    int circularBufferMB = 256);

public Task<EventPipeSession> StartEventPipeSessionAsync(
    IEnumerable<EventPipeProvider> providers,
    bool requestRundown,
    int circularBufferMB = 256,
    CancellationToken token = <example-value>);
```

Starts an EventPipe tracing session using the given providers and settings.

* `providers` : An `IEnumerable` of `EventPipeProvider`s to start tracing.
* `requestRundown`: A `bool` specifying whether rundown provider events from the target app's runtime should be requested.
* `circularBufferMB`: An `int` specifying the total size of circular buffer used by the target app's runtime on collecting events.
* `token` (for the async overload): The token to monitor for cancellation requests.

```csharp
public EventPipeSession StartEventPipeSession(
    EventPipeProvider provider,
    bool requestRundown = true,
    int circularBufferMB = 256);

public Task<EventPipeSession> StartEventPipeSessionAsync(
    EventPipeProvider provider,
    bool requestRundown,
    int circularBufferMB = 256,
    CancellationToken token = <example-value>);
```

Starts an EventPipe tracing session using a single provider.

* `provider` : An `EventPipeProvider` to start tracing.
* `requestRundown`: A `bool` specifying whether rundown provider events from the target app's runtime should be requested.
* `circularBufferMB`: An `int` specifying the total size of circular buffer used by the target app's runtime on collecting events.
* `token` (for the async overload): The token to monitor for cancellation requests.

```csharp
public EventPipeSession StartEventPipeSession(
    EventPipeSessionConfiguration config);

public Task<EventPipeSession> StartEventPipeSessionAsync(
    EventPipeSessionConfiguration configuration,
    CancellationToken token);
```

Starts an EventPipe tracing session using an `EventPipeSessionConfiguration`.

* `config` / `configuration` : An `EventPipeSessionConfiguration` that defines the session.
* `token` (for the async overload): The token to monitor for cancellation requests.

> **Note:**
> Rundown events contain payloads that may be needed for post analysis, such as resolving method names of thread samples. Unless you know you do not want this, we recommend setting `requestRundown` to true. In large applications, this may take a while.

### WriteDump method

```csharp
public void WriteDump(
    DumpType dumpType,
    string dumpPath,
    bool logDumpGeneration=false);
```

Request a dump for post-mortem debugging of the target application. The type of the dump can be specified using the `DumpType` enum.

* `dumpType` : Type of the dump to be requested.
* `dumpPath` : The path to the dump to be written out to.
* `logDumpGeneration` : If set to `true`, the target application will write out diagnostic logs during dump generation.

```csharp
public void WriteDump(
    DumpType dumpType,
    string dumpPath,
    WriteDumpFlags flags)
```

Request a dump for post-mortem debugging of the target application. The type of the dump can be specified using the `DumpType` enum.

* `dumpType` : Type of the dump to be requested.
* `dumpPath` : The path to the dump to be written out to.
* `flags` : logging and crash report flags. On runtimes less than 6.0, only LoggingEnabled is supported.

```csharp
public Task WriteDumpAsync(
    DumpType dumpType,
    string dumpPath,
    bool logDumpGeneration,
    CancellationToken token)
```

Request a dump for post-mortem debugging of the target application. The type of the dump can be specified using the `DumpType` enum.

* `dumpType` : Type of the dump to be requested.
* `dumpPath` : The path to the dump to be written out to.
* `logDumpGeneration` : If set to `true`, the target application will write out diagnostic logs during dump generation.
* `token` : The token to monitor for cancellation requests.

```csharp
public Task WriteDumpAsync(
    DumpType dumpType,
    string dumpPath,
    WriteDumpFlags flags,
    CancellationToken token)
```

Request a dump for post-mortem debugging of the target application. The type of the dump can be specified using the `DumpType` enum.

* `dumpType` : Type of the dump to be requested.
* `dumpPath` : The path to the dump to be written out to.
* `flags` : logging and crash report flags. On runtimes less than 6.0, only LoggingEnabled is supported.
* `token` : The token to monitor for cancellation requests.

### ApplyStartupHook methods

```csharp
public void ApplyStartupHook(
    string startupHookPath);

public Task ApplyStartupHookAsync(
    string startupHookPath,
    CancellationToken token);
```

Loads the specified assembly with a `StartupHook` in the target process.

* `startupHookPath` : The path to the assembly containing the startup hook.
* `token` (for the async overload): The token to monitor for cancellation requests.

### PerfMap methods

```csharp
public void EnablePerfMap(
    PerfMapType type);

public void DisablePerfMap();
```

Controls generation of perf maps in the target process.

* `type` : The `PerfMapType` indicating the type of perf map to enable.

### AttachProfiler method

```csharp
public void AttachProfiler(
    TimeSpan attachTimeout,
    Guid profilerGuid,
    string profilerPath,
    byte[] additionalData=null);
```

Request to attach an ICorProfiler to the target application.

* `attachTimeout` : A `TimeSpan` after which attach will be aborted.
* `profilerGuid` :  `Guid` of the ICorProfiler to be attached.
* `profilerPath` : Path to the ICorProfiler dll to be attached.
* `additionalData` : Optional additional data that can be passed to the runtime during profiler attach.

### SetStartupProfiler method

```csharp
public void SetStartupProfiler(
        Guid profilerGuid,
        string profilerPath);
```

Set a profiler as the startup profiler. It is only valid to issue this command while the runtime is paused at startup.

* `profilerGuid` : `Guid` for the profiler to be attached.
* `profilerPath` : Path to the profiler to be attached.

### ResumeRuntime method

```csharp
public void ResumeRuntime();
```

Tell the runtime to resume execution after being paused at startup.

### SetEnvironmentVariable method

```csharp
public void SetEnvironmentVariable(
    string name,
    string value);
```

Set an environment variable in the target process.

* `name` : The name of the environment variable to set.
* `value` : The value of the environment variable to set.

### GetProcessEnvironment

```csharp
public Dictionary<string, string> GetProcessEnvironment()
```

Gets all environment variables and their values from the target process.

### GetPublishedProcesses method

```csharp
public static IEnumerable<int> GetPublishedProcesses();
```

Get an `IEnumerable` of process IDs of all the active .NET processes that can be attached to.

## EventPipeSessionConfiguration class

```csharp
public sealed class EventPipeSessionConfiguration
{
    public EventPipeSessionConfiguration(
        IEnumerable<EventPipeProvider> providers,
        int circularBufferSizeMB = 256,
        bool requestRundown = true,
        bool requestStackwalk = true);

    public EventPipeSessionConfiguration(
        IEnumerable<EventPipeProvider> providers,
        int circularBufferSizeMB,
        long rundownKeyword,
        bool requestStackwalk = true);

    public EventPipeSessionConfiguration(
        IEnumerable<EventPipeProvider> providers,
        int circularBufferSizeMB,
        long rundownKeyword,
        bool requestStackwalk,
        EventPipeBufferingMode bufferingMode);

    public bool RequestRundown { get; }

    public int CircularBufferSizeInMB { get; }

    public bool RequestStackwalk { get; }

    public long RundownKeyword { get; }

    public EventPipeBufferingMode BufferingMode { get; }

    public IReadOnlyCollection<EventPipeProvider> Providers { get; }
}
```

Represents the configuration for an `EventPipeSession`.

* `providers` : An `IEnumerable` of `EventPipeProvider`s to enable.
* `circularBufferSizeMB` : The size in MB of the runtime's buffer for collecting events.
* `requestRundown` : If `true`, request rundown events from the runtime.
* `requestStackwalk` : If `true`, record a stack trace for every emitted event.
* `rundownKeyword` : The keyword mask used for rundown events.
* `bufferingMode` : The `EventPipeBufferingMode` for the session. Use `Block` to request non-lossy collection. Passing `Block` requires a .NET 11+ target runtime; on an older runtime, `StartEventPipeSession` throws `UnsupportedCommandException`.

The `BufferingMode` property returns the buffering mode for the session. The default value, `Drop`, keeps the runtime's lossy buffer.

## EventPipeProvider class

```cs
public class EventPipeProvider
{
    public EventPipeProvider(
        string name,
        EventLevel eventLevel,
        long keywords = 0,
        IDictionary<string, string> arguments = null)

    public EventPipeProvider(
        string name,
        EventLevel eventLevel,
        long keywords,
        IDictionary<string, string> arguments,
        EventPipeProviderEventFilter eventFilter)

    public string Name { get; }

    public EventLevel EventLevel { get; }

    public long Keywords { get; }

    public IDictionary<string, string> Arguments { get; }

    public EventPipeProviderEventFilter EventFilter { get; }

    public override string ToString();

    public override bool Equals(object obj);

    public override int GetHashCode();

    public static bool operator ==(Provider left, Provider right);

    public static bool operator !=(Provider left, Provider right);
}
```

### Constructor

```csharp
public EventPipeProvider(
    string name,
    EventLevel eventLevel,
    long keywords = 0,
    IDictionary<string, string> arguments = null)

public EventPipeProvider(
    string name,
    EventLevel eventLevel,
    long keywords,
    IDictionary<string, string> arguments,
    EventPipeProviderEventFilter eventFilter)
```

Creates a new instance of `EventPipeProvider` with the given provider name, `System.Diagnostics.Tracing.EventLevel`, keywords, and arguments. The second overload also takes an `EventPipeProviderEventFilter` that filters which Event IDs the runtime enables for the provider. When you set an event filter, the session requires a .NET 10+ target runtime.

### Name property

```csharp
public string Name { get; }
```

Gets the name of the Provider.

### EventLevel property

```csharp
public EventLevel EventLevel { get; }
```

Gets the `EventLevel` of the given instance of `EventPipeProvider`.

### Keywords property

```csharp
public long Keywords { get; }
```

Gets a value that represents bitmask for keywords of the `EventSource`.

### Arguments property

```csharp
public IDictionary<string, string> Arguments { get; }
```

Gets an `IDictionary` of key-value pair strings representing optional arguments to be passed to `EventSource` representing the given `EventPipeProvider`.

### EventFilter property

```csharp
public EventPipeProviderEventFilter EventFilter { get; }
```

Gets the optional `EventPipeProviderEventFilter` that the runtime applies to this provider's Event IDs after the keyword and level filter. When the value is `null`, the runtime enables every Event ID that the keyword and level filter allows.

### Remarks

This class is immutable, because EventPipe does not allow a provider's configuration to be modified during an EventPipe session as of .NET Core 3.1.
