---
title: "ObservableUpDownCounter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/ObservableUpDownCounter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObservableUpDownCounter<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class ObservableUpDownCounter<T> : System.Diagnostics.Metrics.ObservableInstrument<T> where T : struct
```

A metrics-observable instrument that reports increasing or decreasing values when the instrument is being observed.
Use this instrument to monitor the process heap size or the approximate number of items in a lock-free circular buffer, for example.
To create an ObservableUpDownCounter object, use the `CreateObservableUpDownCounter` methods.

Parameters:

- `T`: The type that the counter represents.

#### Remarks

> **Note:**
> Unlike `UpDownCounter`, which takes the increment/delta value, the callback function reports the absolute value of the `ObservableUpDownCounter`. To determine the reported rate that the `ObservableUpDownCounter` is changing, the difference between successive measurements is used.

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## ObservableUpDownCounter<T>.Observe() method

```csharp
protected override System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>> Observe ();
```

Fetches the current measurements being tracked by this observable counter.

Returns: To be added.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.
