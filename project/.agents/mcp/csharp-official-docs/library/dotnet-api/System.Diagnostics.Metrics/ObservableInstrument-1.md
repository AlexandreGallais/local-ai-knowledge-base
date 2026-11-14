---
title: "ObservableInstrument<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/ObservableInstrument`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObservableInstrument<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public abstract class ObservableInstrument<T> : System.Diagnostics.Metrics.Instrument where T : struct
```

ObservableInstrument{T} is the base class from which all metrics observable instruments will inherit.

Parameters:

- `T`: The type that the observable instrument represents.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## ObservableInstrument<T>.ObservableInstrument(Meter, String, String, String) constructor

```csharp
protected ObservableInstrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit, string? description);
```

Initializes a new instance of the `ObservableInstrument<T>` class using the specified meter, name, description, and unit.
All classes that extend ObservableInstrument{T} must call this constructor when constructing objects of the extended class.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

To be added.

## ObservableInstrument<T>.ObservableInstrument(Meter, String, String, String, Object>>) constructor

```csharp
protected ObservableInstrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Initializes a new instance of the `ObservableInstrument<T>` class with the specified meter, name, description, and unit.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. Cannot be `null`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

All classes extending `ObservableInstrument<T>` need to call this constructor when constructing an object of the extended class.

## ObservableInstrument<T>.IsObservable property

```csharp
public override bool IsObservable { get; }
```

Gets a value that indicates if the instrument is an observable instrument.

Returns: `true` if the instrument is metrics-observable; `false` otherwise.

To be added.

## ObservableInstrument<T>.Observe() method

```csharp
protected abstract System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>> Observe ();
```

Fetches the current measurements being tracked by this instrument. All classes extending ObservableInstrument{T} need to implement this method.

Returns: The current measurements tracked by this instrument.

To be added.
