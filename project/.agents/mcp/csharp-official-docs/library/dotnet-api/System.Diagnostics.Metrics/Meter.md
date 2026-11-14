---
title: "Meter class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Meter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Meter class

Namespace: `System.Diagnostics.Metrics`

```csharp
public class Meter : IDisposable
```

Meter is the class responsible for creating and tracking the Instruments.

To be added.

## Meter.Meter(MeterOptions) constructor

```csharp
public Meter (System.Diagnostics.Metrics.MeterOptions options);
```

Initialize a new instance of the Meter using the `MeterOptions`.

Parameters:

- `options`: The options object that is used to create a meter using its properties.

To be added.

## Meter.Meter(String) constructor

```csharp
public Meter (string name);
```

Initializes a new instance of `Meter` using the specified meter name.

Parameters:

- `name`: The Meter name.

To be added.

## Meter.Meter(String, String) constructor

```csharp
public Meter (string name, string? version);
```

Initializes a new instance of `Meter` using the specified meter name and version.

Parameters:

- `name`: The Meter name.
- `version`: The optional Meter version.

To be added.

## Meter.Meter(String, String, Object>>, Object) constructor

```csharp
public Meter (string name, string? version, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags, object? scope = default);
```

Initializes a new instance of the Meter using the meter name and version.

Parameters:

- `name`: The Meter name.
- `version`: The optional Meter version.
- `tags`: The optional Meter tags.
- `scope`: The optional Meter scope.

You can use the scope object to link several Meters with a particular scope. For instance, a dependency injection container can choose to associate all Meters that are created within the container with its own scope. If the scope object is `null`, it indicates that the Meter is not linked to any particular scope.

## Meter.Name property

```csharp
public string Name { get; }
```

Gets the Meter name.

Returns: The Meter name

To be added.

## Meter.Scope property

```csharp
public object? Scope { get; }
```

Returns the Meter scope object.

Returns: To be added.

To be added.

## Meter.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; }
```

Returns the tags associated with the Meter.

Returns: To be added.

To be added.

## Meter.TelemetrySchemaUrl property

```csharp
public string? TelemetrySchemaUrl { get; }
```

Gets the location of a Schema File that can be retrieved using HTTP or HTTPS protocol.

Returns: To be added.

To be added.

## Meter.Version property

```csharp
public string? Version { get; }
```

Gets the Meter version.

Returns: The Meter version.

To be added.

## Meter.CreateCounter<T>(String, String, String) method

```csharp
public System.Diagnostics.Metrics.Counter<T> CreateCounter<T> (string name, string? unit = default, string? description = default) where T : struct;
```

Create a metrics Counter object.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new counter.

#### Remarks

Counter is an instrument that supports non-negative increments. Example uses for Counter:

- Count the number of bytes received.
- Count the number of requests completed.
- Count the number of accounts created.
- Count the number of checkpoints run.
- Count the number of HTTP 5xx errors.

## Meter.CreateCounter<T>(String, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.Counter<T> CreateCounter<T> (string name, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Creates a metrics Counter object.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new counter.

Counter is an Instrument that supports non-negative increments.

Example uses for Counter:

Count the number of bytes received.
Count the number of requests completed.
Count the number of accounts created.
Count the number of checkpoints run.
Count the number of HTTP 5xx errors.

## Meter.CreateGauge<T>(String) method

```csharp
public System.Diagnostics.Metrics.Gauge<T> CreateGauge<T> (string name) where T : struct;
```

Creates a Gauge instrument, which can be used to record non-additive values.

Parameters:

- `T`: To be added.
- `name`: The instrument name. cannot be `null`.

Returns: To be added.

Gauge is an Instrument which used to record non-additive values.

Example uses for Gauge: record the room background noise level value when changes occur.

## Meter.CreateGauge<T>(String, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.Gauge<T> CreateGauge<T> (string name, string? unit = default, string? description = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default) where T : struct;
```

Create a metrics Gauge object.

Parameters:

- `T`: To be added.
- `name`: The instrument name. cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the Gauge.

Returns: To be added.

Gauge is an Instrument which used to record non-additive values.

Example uses for Gauge: record the room background noise level value when changes occur.

## Meter.CreateHistogram<T>(String) method

```csharp
public System.Diagnostics.Metrics.Histogram<T> CreateHistogram<T> (string name) where T : struct;
```

Histogram is an Instrument which can be used to report arbitrary values that are likely to be statistically meaningful. It is intended for statistics such as histograms, summaries, and percentile.

Parameters:

- `T`: To be added.
- `name`: The instrument name. Cannot be `null`.

Returns: To be added.

Example uses for Histogram: the request duration and the size of the response payload.

## Meter.CreateHistogram<T>(String, String, String) method

```csharp
public System.Diagnostics.Metrics.Histogram<T> CreateHistogram<T> (string name, string? unit, string? description) where T : struct;
```

Creates a Histogram, which is an instrument that can be used to report arbitrary values that are likely to be statistically meaningful. It is intended for statistics such as histograms, summaries, and percentiles.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new histogram.

#### Remarks

Example uses for Histogram: The request duration and the size of the response payload.

## Meter.CreateHistogram<T>(String, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.Histogram<T> CreateHistogram<T> (string name, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags) where T : struct;
```

Creates an Histogram instance, which is an Instrument that can be used to report arbitrary values that are likely to be statistically meaningful. It is intended for statistics such as histograms, summaries, and percentile.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new histogram.

Example uses for Histogram: the request duration and the size of the response payload.

## Meter.CreateHistogram<T>(String, String, String, Object>>, InstrumentAdvice<T>) method

```csharp
public System.Diagnostics.Metrics.Histogram<T> CreateHistogram<T> (string name, string? unit = default, string? description = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Diagnostics.Metrics.InstrumentAdvice<T>? advice = default) where T : struct;
```

Histogram is an Instrument which can be used to report arbitrary values that are likely to be statistically meaningful. It is intended for statistics such as histograms, summaries, and percentile.

Parameters:

- `T`: To be added.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: Optional tags to attach to the histogram.
- `advice`: Optional `InstrumentAdvice<T>` to attach to the histogram.

Returns: To be added.

Example uses for Histogram: the request duration and the size of the response payload.

## Meter.CreateObservableCounter<T>(String, Measurement<T>>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableCounter, which is an instrument that reports monotonically increasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValues`: The callback to call to get the measurements when
```csharp
ObservableCounter{T}.Observe()
```
is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike `Counter`, which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for ObservableCounter: The number of page faults for each process.

## Meter.CreateObservableCounter<T>(String, Measurement<T>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableCounter, which is an instrument that reports monotonically increasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when
```csharp
ObservableCounter{T}.Observe()
```
is called by `MeterListener.RecordObservableInstruments`
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike Counter which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for ObservableCounter: The number of page faults for each process.

## Meter.CreateObservableCounter<T>(String, Func<T>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<T> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableCounter, which is an instrument that reports monotonically increasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement..
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when
```csharp
ObservableCounter{T}.Observe()
```
is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike Counter which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for ObservableCounter: The number of page faults for each process.

## Meter.CreateObservableCounter<T>(String, Measurement<T>>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Creates an ObservableCounter instance, which is an Instrument that reports monotonically increasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `observeValues`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike `Counter`, which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for `ObservableCounter`: The number of page faults for each process.
