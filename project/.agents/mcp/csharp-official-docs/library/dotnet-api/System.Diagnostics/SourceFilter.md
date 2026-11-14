---
title: "SourceFilter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SourceFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SourceFilter class

Namespace: `System.Diagnostics`

```csharp
public class SourceFilter : System.Diagnostics.TraceFilter
```

Indicates whether a listener should trace a message based on the source of a trace.

#### Remarks
One of several different types of filters can be assigned to a trace listener to provide a layer of screening beyond that provided by the trace switch. The filter can be used to control the level of tracing that is produced by the listener.

This class filters events based on a specific trace source set by the user.

`SourceFilter` overrides the `TraceFilter.ShouldTrace` method and defines a `Source` property that specifies the name of the trace source to be traced by the listener.

> **Note:**
>  This filter is provided because multiple trace sources can simultaneously use the same trace listener.

## SourceFilter.SourceFilter(String) constructor

```csharp
public SourceFilter (string source);
```

Initializes a new instance of the `SourceFilter` class, specifying the name of the trace source.

Parameters:

- `source`: The name of the trace source.

#### Remarks
The value of the `source` parameter is used to initialize the `Source` property.

#### Examples
The following code example calls the `TraceSource.TraceData` method using two different source filters, one with a fictitious name, the other with the name of the current trace source. In the first case, the trace is not written to the console; in the second case, the trace is written. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## SourceFilter.Source property

```csharp
public string Source { get; set; }
```

Gets or sets the name of the trace source.

Returns: The name of the trace source.

Exceptions:

- `ArgumentNullException`: The value is `null`.

#### Remarks
`SourceFilter.Source` identifies the trace source for which to write trace information. Trace information will not be written for other trace sources. The name of the trace source is the `name` parameter from the constructor for the `TraceSource`.

## SourceFilter.ShouldTrace(TraceEventCache, String, TraceEventType, Int32, String, Object[], Object, Object[]) method

```csharp
public override bool ShouldTrace (System.Diagnostics.TraceEventCache? cache, string source, System.Diagnostics.TraceEventType eventType, int id, string? formatOrMessage, object?[]? args, object? data1, object?[]? data);
```

Determines whether the trace listener should trace the event.

Parameters:

- `cache`: An object that represents the information cache for the trace event.
- `source`: The name of the source.
- `eventType`: One of the enumeration values that identifies the event type.
- `id`: A trace identifier number.
- `formatOrMessage`: The format to use for writing an array of arguments or a message to write.
- `args`: An array of argument objects.
- `data1`: A trace data object.
- `data`: An array of trace data objects.

Returns: `true` if the trace should be produced; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the value of the `source` parameter matches the value of the `Source` property, the method returns `true`.
