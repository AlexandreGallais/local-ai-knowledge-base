---
title: "EventCounter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventCounter class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventCounter : System.Diagnostics.Tracing.DiagnosticCounter
```

Provides the ability to collect statistics for very frequent events through the  `EventSource` class.

#### Remarks

For an example of how to use the `EventCounter` class, see Introduction Tutorial: How to measure performance for very frequent events using EventCounters.

## EventCounter.EventCounter(String, EventSource) constructor

```csharp
public EventCounter (string name, System.Diagnostics.Tracing.EventSource eventSource);
```

Initializes a new instance of the `EventCounter` class.

Parameters:

- `name`: The event counter name.
- `eventSource`: The event source.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`eventSource` is `null`.

To be added.

## EventCounter.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current event counter instance.

Returns: The name, count and mean of the current event counter.

To be added.

## EventCounter.WriteMetric(Double) method

```csharp
public void WriteMetric (double value);
```

Writes the metric if performance counters are on.

Parameters:

- `value`: The value to be written.

## Remarks

For an example of how to use the `WriteMetric` method, see Introduction Tutorial: How to measure performance for very frequent events using EventCounters.

## EventCounter.WriteMetric(Single) method

```csharp
public void WriteMetric (float value);
```

Writes the metric if performance counters are on.

Parameters:

- `value`: The value to be written.

## Remarks

For an example of how to use the `WriteMetric` method, see the Introduction Tutorial: How to measure performance for very frequent events using EventCounters topic.
