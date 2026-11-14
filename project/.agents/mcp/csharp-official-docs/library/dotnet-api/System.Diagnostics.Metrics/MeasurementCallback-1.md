---
title: "MeasurementCallback<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/MeasurementCallback`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeasurementCallback<T> delegate

Namespace: `System.Diagnostics.Metrics`

```csharp
public delegate void MeasurementCallback<T>(Instrument instrument, T measurement, ReadOnlySpan<KeyValuePair<string,object?>> tags, object? state) where T : struct;
```

A delegate to represent the Meterlistener callbacks that are used when recording measurements.

Parameters:

- `T`: The type that the measurement represents.
- `instrument`: The instrument that sent the measurement.
- `measurement`: The measurement value.
- `tags`: A span of key-value pair tags associated with the measurement.
- `state`: The state object originally passed to `MeterListener.EnableMeasurementEvents` method.

To be added.
