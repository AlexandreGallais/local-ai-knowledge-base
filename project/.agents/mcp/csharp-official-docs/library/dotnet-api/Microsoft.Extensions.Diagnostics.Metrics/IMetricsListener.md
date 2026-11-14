---
title: "IMetricsListener interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/IMetricsListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IMetricsListener interface

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public interface IMetricsListener
```

Listens to metrics emitted from the system.

To be added.

## IMetricsListener.Name property

```csharp
public string Name { get; }
```

Gets the name of the listener. This is used to identify the listener in the rules configuration.

Returns: To be added.

To be added.

## IMetricsListener.GetMeasurementHandlers() method

```csharp
public Microsoft.Extensions.Diagnostics.Metrics.MeasurementHandlers GetMeasurementHandlers ();
```

Called once to get the `MeasurementHandlers` that will be used to process measurements.

Returns: The `MeasurementHandlers`.

To be added.

## IMetricsListener.Initialize(IObservableInstrumentsSource) method

```csharp
public void Initialize (Microsoft.Extensions.Diagnostics.Metrics.IObservableInstrumentsSource source);
```

Called once by the runtime to provide a `IObservableInstrumentsSource` used to pull for fresh metrics data.

Parameters:

- `source`: A `IObservableInstrumentsSource` that can be called to request current metrics.

To be added.

## IMetricsListener.InstrumentPublished(Instrument, Object) method

```csharp
public bool InstrumentPublished (System.Diagnostics.Metrics.Instrument instrument, out object? userState);
```

Called when a new instrument is created and enabled by a matching rule.

Parameters:

- `instrument`: The new `Instrument`.
- `userState`: Listener state associated with this instrument. This will be returned to `MeasurementCallback<T>`
and `IMetricsListener.MeasurementsCompleted`.

Returns: `true` if the listener wants to subscribe to this instrument, otherwise `false`.

To be added.

## IMetricsListener.MeasurementsCompleted(Instrument, Object) method

```csharp
public void MeasurementsCompleted (System.Diagnostics.Metrics.Instrument instrument, object? userState);
```

Called when a instrument is disabled by the producer or a rules change.

Parameters:

- `instrument`: The `Instrument` being disabled.
- `userState`: The original listener state returned by `IMetricsListener.InstrumentPublished`.

To be added.
