---
title: "MeterListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/MeterListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeterListener class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class MeterListener : IDisposable
```

The MeterListener is class used to listen to the metrics instrument measurements recording.

To be added.

## MeterListener.MeterListener() constructor

```csharp
public MeterListener ();
```

Initializes a new instance of the `MeterListener` class.

To be added.

## MeterListener.InstrumentPublished property

```csharp
public Action<System.Diagnostics.Metrics.Instrument,System.Diagnostics.Metrics.MeterListener>? InstrumentPublished { get; set; }
```

Gets or sets the callback to get notified when an instrument is published.

Returns: The callback to get notified when an instrument is published.

To be added.

## MeterListener.MeasurementsCompleted property

```csharp
public Action<System.Diagnostics.Metrics.Instrument,object?>? MeasurementsCompleted { get; set; }
```

Gets or sets the callback to get notified when the measurement is stopped on some instrument.
This can happen when the Meter or the Listener is disposed or calling `MeterListener.Dispose` on the listener.

Returns: The callback to get notified when the measurement is stopped on some instrument.

To be added.

## MeterListener.DisableMeasurementEvents(Instrument) method

```csharp
public object? DisableMeasurementEvents (System.Diagnostics.Metrics.Instrument instrument);
```

Stops listening to a specific instrument measurement recording.

Parameters:

- `instrument`: The instrument to stop listening to.

Returns: The state object originally passed to `MeterListener.EnableMeasurementEvents` method.

To be added.

## MeterListener.Dispose() method

```csharp
public void Dispose ();
```

Disposes the listeners which will stop it from listening to any instrument.

To be added.

## MeterListener.EnableMeasurementEvents(Instrument, Object) method

```csharp
public void EnableMeasurementEvents (System.Diagnostics.Metrics.Instrument instrument, object? state = default);
```

Starts listening to a specific instrument measurement recording.

Parameters:

- `instrument`: The instrument to listen to.
- `state`: A state object that will be passed back to the callback getting measurements events.

To be added.

## MeterListener.RecordObservableInstruments() method

```csharp
public void RecordObservableInstruments ();
```

Calls all Observable instruments that the listener is listening to, and calls `MeterListener.SetMeasurementEventCallback<T>` with every collected measurement.

To be added.

## MeterListener.SetMeasurementEventCallback<T>(MeasurementCallback<T>) method

```csharp
public void SetMeasurementEventCallback<T> (System.Diagnostics.Metrics.MeasurementCallback<T>? measurementCallback) where T : struct;
```

Sets a callback for a specific numeric type to get the measurement recording notification from all instruments that enabled listening and were created with the same specified numeric type.
If a measurement of type T is recorded and a callback of type T is registered, that callback will be used.

Parameters:

- `T`: The type of the numeric measurement.
- `measurementCallback`: The callback that can be used to get measurement recording of numeric type T.

To be added.

## MeterListener.Start() method

```csharp
public void Start ();
```

Enables the listener to start listening to instruments measurement recording.

To be added.
