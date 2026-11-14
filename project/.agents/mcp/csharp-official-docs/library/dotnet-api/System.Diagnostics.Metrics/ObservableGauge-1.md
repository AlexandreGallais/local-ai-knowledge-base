---
title: "ObservableGauge<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/ObservableGauge`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObservableGauge<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class ObservableGauge<T> : System.Diagnostics.Metrics.ObservableInstrument<T> where T : struct
```

Represents an observable instrument that reports non-additive values when the instrument is being observed, for example, the current room temperature. Call `CreateObservableGauge` to create the observable counter object.

Parameters:

- `T`: To be added.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## ObservableGauge<T>.Observe() method

```csharp
protected override System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>> Observe ();
```

Fetches the current measurements being tracked by this observable counter.

Returns: An enumeration of measurements of type ``T`` that are being tracked by this observable counter.

To be added.
