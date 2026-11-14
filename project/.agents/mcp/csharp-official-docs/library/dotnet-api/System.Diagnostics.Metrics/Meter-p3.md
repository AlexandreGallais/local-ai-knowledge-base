---
title: "Meter class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Meter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Meter class (part 3 of 3)

## Meter.CreateObservableUpDownCounter<T>(String, Measurement<T>>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<System.Diagnostics.Metrics.Measurement<T>> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Create an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument which reports increasing or decreasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.

Example uses for ObservableUpDownCounter: the process heap size or the approximate number of items in a lock-free circular buffer.

## Meter.CreateObservableUpDownCounter<T>(String, Func<T>, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.ObservableUpDownCounter<T> CreateObservableUpDownCounter<T> (string name, Func<T> observeValue, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Create an ObservableUpDownCounter object. ObservableUpDownCounter is an Instrument which reports increasing or decreasing value(s) when the instrument is being observed.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `observeValue`: The callback to call to get the measurements when the `ObservableInstrument<T>.Observe` is called by `MeterListener.RecordObservableInstruments`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new observable up down counter.

#### Remarks

> **Note:**
> Unlike UpDownCounter which takes the increment/delta value, the callback function reports the absolute value of the ObservableUpDownCounter. To determine the reported rate the ObservableUpDownCounter is changing, the difference between successive measurements is used.

Example uses for ObservableUpDownCounter: the process heap size or the approximate number of items in a lock-free circular buffer.

## Meter.CreateUpDownCounter<T>(String, String, String) method

```csharp
public System.Diagnostics.Metrics.UpDownCounter<T> CreateUpDownCounter<T> (string name, string? unit = default, string? description = default) where T : struct;
```

Create a metrics UpDownCounter object.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

Returns: A new up down counter.

#### Remarks

UpDownCounter is an Instrument which supports reporting positive or negative metric values.
Example uses for UpDownCounter: reporting the change in active requests or queue size.

## Meter.CreateUpDownCounter<T>(String, String, String, Object>>) method

```csharp
public System.Diagnostics.Metrics.UpDownCounter<T> CreateUpDownCounter<T> (string name, string? unit, string? description, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> tags) where T : struct;
```

Create a metrics UpDownCounter object.

Parameters:

- `T`: The numerical type of the measurement.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.
- `tags`: tags to attach to the counter.

Returns: A new up down counter.

UpDownCounter is an Instrument which supports reporting positive or negative metric values.
Example uses for UpDownCounter: reporting the change in active requests or queue size.

## Meter.Dispose() method

```csharp
public void Dispose ();
```

Dispose the Meter which will disable all instruments created by this meter.

To be added.

## Meter.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Dispose the Meter which will disable all instruments created by this meter.

Parameters:

- `disposing`: `true` if called from Dispose(), `false` if called from a finalizer.

To be added.
