---
title: "IncrementingPollingCounter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/IncrementingPollingCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IncrementingPollingCounter class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class IncrementingPollingCounter : System.Diagnostics.Tracing.DiagnosticCounter
```

Provides a variant of `EventCounter` for variables that are ever-increasing, such as the number of exceptions in the runtime.

#### Remarks

`IncrementingPollingCounter` objects live as long as the `EventSource` that they are attached to unless they are explicitly disposed.

`totalValueProvider` is a method used for polling the values at the interval specified by the listener. This method is expected to return an incrementing float value; otherwise, an increment of a negative value may be reported.

`IncrementingPollingCounter` does not calculate statistics like mean and standard deviation because it only accumulates the counter value. Unlike `IncrementingEventCounter`, this takes in a polling callback that it can call to update  its own metric periodically.

For an example that uses `IncrementingPollingCounter` inside the runtime as for runtime performance counters, see the CoreCLR source for RuntimeEventSource on GitHub.

## IncrementingPollingCounter.IncrementingPollingCounter(String, EventSource, Double>) constructor

```csharp
public IncrementingPollingCounter (string name, System.Diagnostics.Tracing.EventSource eventSource, Func<double> totalValueProvider);
```

Initializes a new instance of the `IncrementingPollingCounter` class.

Parameters:

- `name`: The name for this `IncrementingPollingCounter` instance.
- `eventSource`: The event source this instance is a part of.
- `totalValueProvider`: A method that will be used to poll the value.

To be added.

## IncrementingPollingCounter.DisplayRateTimeScale property

```csharp
public TimeSpan DisplayRateTimeScale { get; set; }
```

Gets or sets rate at which this metric should be displayed as.

Returns: The rate at which this metric should be displayed.

#### Remarks

The value of the `DisplayRateTimeScale` property is included as a string in the payload.

## IncrementingPollingCounter.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current incrementing polling counter instance.

Returns: The name and increment of the current incrementing polling counter.

To be added.
