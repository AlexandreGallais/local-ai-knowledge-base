---
title: "PollingCounter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/PollingCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PollingCounter class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class PollingCounter : System.Diagnostics.Tracing.DiagnosticCounter
```

Provides a variant of `EventCounter` that collects and calculates similar statistics as `EventCounter`.

#### Remarks

`PollingCounter` is a variant of `EventCounter` that uses a callback method to poll for values rather than requiring the writer to explicitly call `EventCounter.WriteMetric` each time a value is tracked, `metricProvider` is a callback method that polls for values. The `PollingCounter` instance polls and reports a value retrieved by calling `metricProvider` exactly once per the interval requested by the listener.

A `PollingCounter` lives as long as the `EventSource` that it is attached to unless it is explicitly disposed.

`PollingCounter` differs from `EventCounter` in that it takes a callback function to collect metrics on its own rather than requiring the user to call `EventCounter.WriteMetric` every time.

For an example that uses `PollingCounter` inside the runtime for runtime performance counters, see the CoreCLR source for RuntimeEventSource on GitHub.

## PollingCounter.PollingCounter(String, EventSource, Double>) constructor

```csharp
public PollingCounter (string name, System.Diagnostics.Tracing.EventSource eventSource, Func<double> metricProvider);
```

Initializes a new instance of the `PollingCounter` class.

Parameters:

- `name`: The name for this `PollingCounter` instance.
- `eventSource`: The event source.
- `metricProvider`: A method that will be used to poll the value.

To be added.

## PollingCounter.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current polling counter instance.

Returns: The name and mean of the current polling counter.

To be added.
