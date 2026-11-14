---
title: "IObservableInstrumentsSource interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/IObservableInstrumentsSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IObservableInstrumentsSource interface

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public interface IObservableInstrumentsSource
```

An interface registered with each IMetricsListener using `IMetricsListener.Initialize`.

The listener can call `IObservableInstrumentsSource.RecordObservableInstruments` to receive the current set of measurements for enabled observable instruments.

## IObservableInstrumentsSource.RecordObservableInstruments() method

```csharp
public void RecordObservableInstruments ();
```

Requests that the current set of metrics for enabled instruments be sent to the listener's `MeasurementCallback<T>` objects.

To be added.
