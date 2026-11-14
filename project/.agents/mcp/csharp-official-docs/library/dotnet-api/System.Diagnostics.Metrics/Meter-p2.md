---
title: "Meter class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Meter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Meter class (part 2 of 3)

## Meter.CreateObservableCounter<T>(String, Measurement<T>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Creates an ObservableCounter instance, which is an Instrument that reports monotonically increasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike Counter which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for ObservableCounter: The number of page faults for each process.

## Meter.CreateObservableCounter<T>(String, Func<T>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableCounter<T> CreateObservableCounter<T> (string name, Func<T> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Creates an ObservableCounter instance, which is an Instrument that reports monotonically increasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new observable counter.

#### Remarks

> **Note:**
> Unlike Counter which takes the increment/delta value, the callback function reports the absolute value of the counter. To determine the reported rate the counter is changing, the difference between successive measurements is used.

Example uses for ObservableCounter: The number of page faults for each process.

## Meter.CreateObservableGauge<T>(String, Measurement<T>>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableGauge, which is an asynchronous instrument that reports non-additive values when the instrument is being observed.

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

Returns: A new observable gauge.

An example of a non-additive value is the room temperature; that is, it doesn't make sense to report the temperature value from multiple rooms and sum them up.

## Meter.CreateObservableGauge<T>(String, Measurement<T>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableGauge, which is an asynchronous instrument that reports non-additive values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when
```csharp
ObservableCounter{T}.Observe()
```
is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable gauge.

An example of a non-additive value is the room temperature; that is, it doesn't make sense to report the temperature value from multiple rooms and sum them up.

## Meter.CreateObservableGauge<T>(String, Func<T>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<T> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableGauge, which is an asynchronous instrument that reports non-additive values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when
```csharp
ObservableCounter{T}.Observe()
```
is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable gauge.

An example of a non-additive value is the room temperature; that is, it doesn't make sense to report the temperature value from multiple rooms and sum them up.

## Meter.CreateObservableGauge<T>(String, Measurement<T>>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Creates an ObservableGauge instance, which is an asynchronous Instrument that reports non-additive value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. It cannot be `null`.
- `observeValues`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: The tags to attach to the counter.

Returns: A new observable gauge.

For example: The room temperature - it makes no sense to report the temperature value from multiple rooms and sum them up.

## Meter.CreateObservableGauge<T>(String, Measurement<T>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

ObservableGauge is an asynchronous Instrument which reports non-additive value(s) (e.g. the room temperature - it makes no sense to report the temperature value from multiple rooms and sum them up) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new observable gauge.

To be added.

## Meter.CreateObservableGauge<T>(String, Func<T>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableGauge<T> CreateObservableGauge<T> (string name, Func<T> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

ObservableGauge is an asynchronous Instrument which reports non-additive value(s) (e.g. the room temperature - it makes no sense to report the temperature value from multiple rooms and sum them up) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new observable gauge.

To be added.

## Meter.CreateObservableUpDownCounter<T>(String, Measurement<T>>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument that reports increasing or decreasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValues`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.

Example uses for ObservableUpDownCounter: the process heap size or the approximate number of items in a lock-free circular buffer.

## Meter.CreateObservableUpDownCounter<T>(String, Measurement<T>>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument that reports increasing or decreasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.

Example uses for ObservableUpDownCounter: the process heap size or the approximate number of items in a lock-free circular buffer.

## Meter.CreateObservableUpDownCounter<T>(String, Func<T>, String, String) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<T> observeValue, string? unit = default, string? description = default) where T : struct;
```

Creates an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument that reports increasing or decreasing values when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.

Example uses for ObservableUpDownCounter: the process heap size or the approximate number of items in a lock-free circular buffer.

## Meter.CreateObservableUpDownCounter<T>(String, Measurement<T>>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<System.Collections.Generic.IEnumerable<System.Diagnostics.Metrics.Measurement<T>>> observeValues, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Create an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument which reports increasing or decreasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValues`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike `UpDownCounter`, which takes the increment/delta value, the callback function reports the absolute value of the `ObservableUpDownCounter`. To determine the reported rate the `ObservableUpDownCounter` is changing, the difference between successive measurements is used.

Example uses for `ObservableUpDownCounter`: the process heap size or the approximate number of items in a lock-free circular buffer.
