---
title: "TraceFilter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceFilter class

Namespace: `System.Diagnostics`

```csharp
public abstract class TraceFilter
```

Provides the base class for trace filter implementations.

#### Remarks
Trace filters can be used by trace listeners to provide an extra layer of filtering beyond that provided by trace switches. The trace filter for a trace listener can be found in the listener's `Filter` property. Trace switches determine if a trace is to be sent to the trace listeners. Trace filters allow the individual trace listeners to determine whether or not the trace is to be written to the associated output medium. For example, as determined by each trace filter, a trace may be written to the console by a `ConsoleTraceListener`, but not to the event log by a `EventLogTraceListener`.

Filters that inherit from the `TraceFilter` class can be used by trace listeners that inherit from the `TraceListener` class to perform filtering of events being traced. `TraceFilter` contains a single method, `TraceFilter.ShouldTrace`, which takes event data and returns a flag indicating whether the event should be traced.

## TraceFilter.TraceFilter() constructor

```csharp
protected TraceFilter ();
```

Initializes a new instance of the `TraceFilter` class.

To be added.

## TraceFilter.ShouldTrace(TraceEventCache, String, TraceEventType, Int32, String, Object[], Object, Object[]) method

```csharp
public abstract bool ShouldTrace (System.Diagnostics.TraceEventCache? cache, string source, System.Diagnostics.TraceEventType eventType, int id, string? formatOrMessage, object?[]? args, object? data1, object?[]? data);
```

When overridden in a derived class, determines whether the trace listener should trace the event.

Parameters:

- `cache`: The `TraceEventCache` that contains information for the trace event.
- `source`: The name of the source.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A trace identifier number.
- `formatOrMessage`: Either the format to use for writing an array of arguments specified by the `args` parameter, or a message to write.
- `args`: An array of argument objects.
- `data1`: A trace data object.
- `data`: An array of trace data objects.

Returns: `true` to trace the specified event; otherwise, `false`.

#### Examples
The following code example shows how to override the `TraceFilter.ShouldTrace` method to indicate tracing should occur when the trace event type of the event is equal to `Error`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceFilter/ShouldTrace/source.cs._
