---
title: "IncrementingEventCounter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/IncrementingEventCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IncrementingEventCounter class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class IncrementingEventCounter : System.Diagnostics.Tracing.DiagnosticCounter
```

Provides a variant of `EventCounter` for variables that are ever-increasing, such as the number of exceptions in the runtime.

#### Remarks

`IncrementingEventCounter` is used for keeping track of values that are always increasing, such as the total number of requests, the total number of exceptions thrown, etc. For such metrics, simply reporting the total value is not necessarily useful for monitoring its health. For example, keeping track of how many bytes have been allocated in total for the entire duration of the process is not useful for diagnosing any potential issues from allocating too much memory. A metric that would help us is how many bytes were allocated in the past minute, hour, or some arbitrary time interval, and not the entire duration of the process. `IncrementingEventCounter` can be used to keep track of and report just the increments over a time interval that was specified by the consumer of the metric.

`IncrementingEventCounter` does not calculate statistics like mean or standard deviation because it only keeps track of the increments over a period of time.

## IncrementingEventCounter.IncrementingEventCounter(String, EventSource) constructor

```csharp
public IncrementingEventCounter (string name, System.Diagnostics.Tracing.EventSource eventSource);
```

Initializes a new instance of the `IncrementingEventCounter` class.

Parameters:

- `name`: The name for this `IncrementingEventCounter` instance.
- `eventSource`: The event source.

#### Remarks

`IncrementingEventCounter` live as long as the `EventSource` that they are attached to unless they are explicitly disposed.

## IncrementingEventCounter.DisplayRateTimeScale property

```csharp
public TimeSpan DisplayRateTimeScale { get; set; }
```

Gets or sets the rate at which this metric should be displayed as.

Returns: Gets or sets the rate at which this metric should be displayed.

#### Remarks

The value of the `DisplayRateTimeScale` property is included as a string in the payload.

## IncrementingEventCounter.Increment(Double) method

```csharp
public void Increment (double increment = 1);
```

Adds a value to a running total that will be published by the counter at the next timer interval.

Parameters:

- `increment`: The value to increment the running total by.

To be added.

## IncrementingEventCounter.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current incrementing event counter instance.

Returns: The name and increment of the current incrementing event counter.

To be added.
