---
title: "Instrument<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Instrument`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Instrument<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public abstract class Instrument<T> : System.Diagnostics.Metrics.Instrument where T : struct
```

The base class for all non-observable instruments.

Parameters:

- `T`: The type that the instrument represents.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## Instrument<T>.Instrument(Meter, String) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name);
```

Constructs a new instance of `Instrument<T>`.

Parameters:

- `meter`: The meter that created the instrument. Cannot be `null`.
- `name`: The instrument name. Cannot be `null`.

To be added.

## Instrument<T>.Instrument(Meter, String, String, String) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit, string? description);
```

Create the metrics instrument using the properties meter, name, description, and unit.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

All classes that extend Instrument{T} must call this constructor when constructing objects of the extended class.

## Instrument<T>.Instrument(Meter, String, String, String, Object>>) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags);
```

Initializes a new instance of the `Instrument<T>` class with the specified meter, name, description, and unit.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. Cannot be `null`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: Optional instrument tags.

All classes that extend `Instrument<T>` need to call this constructor when constructing an object of the extended class.

## Instrument<T>.Instrument(Meter, String, String, String, Object>>, InstrumentAdvice<T>) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit = default, string? description = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Diagnostics.Metrics.InstrumentAdvice<T>? advice = default);
```

Constructs a new instance of `Instrument<T>`.

Parameters:

- `meter`: The meter that created the instrument. Cannot be `null`.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: Optional instrument tags.
- `advice`: Optional `InstrumentAdvice<T>`.

To be added.

## Instrument<T>.Advice property

```csharp
public System.Diagnostics.Metrics.InstrumentAdvice<T>? Advice { get; }
```

Gets the `InstrumentAdvice<T>` associated with the instrument.

Returns: To be added.

To be added.

## Instrument<T>.RecordMeasurement(T) method

```csharp
protected void RecordMeasurement (T measurement);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.

To be added.

## Instrument<T>.RecordMeasurement(T, Object>) method

```csharp
protected void RecordMeasurement (T measurement, System.Collections.Generic.KeyValuePair<string,object?> tag);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.
- `tag`: A key-value pair tag associated with the measurement.

To be added.

## Instrument<T>.RecordMeasurement(T, TagList) method

```csharp
protected void RecordMeasurement (T measurement, in System.Diagnostics.TagList tagList);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.
- `tagList`: The tags associated with the measurement.

To be added.

## Instrument<T>.RecordMeasurement(T, Object>>) method

```csharp
protected void RecordMeasurement (T measurement, ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.
- `tags`: A span of key-value pair tags associated with the measurement.

To be added.

## Instrument<T>.RecordMeasurement(T, Object>, Object>) method

```csharp
protected void RecordMeasurement (T measurement, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.

To be added.

## Instrument<T>.RecordMeasurement(T, Object>, Object>, Object>) method

```csharp
protected void RecordMeasurement (T measurement, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2, System.Collections.Generic.KeyValuePair<string,object?> tag3);
```

Records a measurement by notifying all `MeterListener` objects that are listening to this instrument.

Parameters:

- `measurement`: The measurement value.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.
- `tag3`: A third key-value pair tag associated with the measurement.

To be added.
