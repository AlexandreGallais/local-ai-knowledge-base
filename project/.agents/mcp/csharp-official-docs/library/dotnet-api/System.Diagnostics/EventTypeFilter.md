---
title: "EventTypeFilter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventTypeFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventTypeFilter class

Namespace: `System.Diagnostics`

```csharp
public class EventTypeFilter : System.Diagnostics.TraceFilter
```

Indicates whether a listener should trace based on the event type.

#### Remarks
One of several different types of filters can be assigned to a trace listener through the `Filter` property to provide a layer of screening beyond that provided by the `TraceSwitch`. The filter can be used to control the event types that are produced by the listener.

This class filters events based on the value of the `EventType` property. The value of the property indicates the threshold at which to begin tracing. Event types at and above the specified level are traced. The `TraceFilter.ShouldTrace` method, called by listeners to determine if an event should be traced, uses the value of the `EventType` property.

## EventTypeFilter.EventTypeFilter(SourceLevels) constructor

```csharp
public EventTypeFilter (System.Diagnostics.SourceLevels level);
```

Initializes a new instance of the `EventTypeFilter` class.

Parameters:

- `level`: A bitwise combination of the `SourceLevels` values that specifies the event type of the messages to trace.

#### Remarks
The value of the `level` parameter is used to initialize the `EventType` property.

## EventTypeFilter.EventType property

```csharp
public System.Diagnostics.SourceLevels EventType { get; set; }
```

Gets or sets the event type of the messages to trace.

Returns: A bitwise combination of the `SourceLevels` values.

#### Remarks
The `EventType` property indicates the level at which to trace.

## EventTypeFilter.ShouldTrace(TraceEventCache, String, TraceEventType, Int32, String, Object[], Object, Object[]) method

```csharp
public override bool ShouldTrace (System.Diagnostics.TraceEventCache? cache, string source, System.Diagnostics.TraceEventType eventType, int id, string? formatOrMessage, object?[]? args, object? data1, object?[]? data);
```

Determines whether the trace listener should trace the event.

Parameters:

- `cache`: A `TraceEventCache` that represents the information cache for the trace event.
- `source`: The name of the source.
- `eventType`: One of the `TraceEventType` values.
- `id`: A trace identifier number.
- `formatOrMessage`: The format to use for writing an array of arguments, or a message to write.
- `args`: An array of argument objects.
- `data1`: A trace data object.
- `data`: An array of trace data objects.

Returns: `true` if the trace should be produced; otherwise, `false`.

#### Remarks
If the value of the `eventType` parameter is greater than or equal to the value of the `EventType` property, the method returns `true`.
