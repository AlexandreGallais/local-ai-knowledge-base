---
title: "ObservableCounter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/ObservableCounter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObservableCounter<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class ObservableCounter<T> : System.Diagnostics.Metrics.ObservableInstrument<T> where T : struct
```

Represents a metrics-observable instrument that reports monotonically increasing values when the instrument is being observed, for example, CPU time (for different processes, threads, user mode, or kernel mode). Call `CreateObservableCounter` to create the observable counter object.

Parameters:

- `T`: The type that the observable counter represents.

#### Remarks

> **Note:**
> Unlike `Counter`, which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## ObservableCounter<T>.Observe() method

```csharp
protected override System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>> Observe ();
```

Fetches the current measurements being tracked by this observable counter.

Returns: The current measurements being tracked by this observable counter.

#### Remarks

> **Note:**
> Unlike Counter which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.
