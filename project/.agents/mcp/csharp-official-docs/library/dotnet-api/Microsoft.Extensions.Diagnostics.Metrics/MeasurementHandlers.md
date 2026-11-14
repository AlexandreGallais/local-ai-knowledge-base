---
title: "MeasurementHandlers class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/MeasurementHandlers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeasurementHandlers class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public class MeasurementHandlers
```

Represents a set of supported measurement types. If a listener does not support a given type, the measurement is skipped.

To be added.

## MeasurementHandlers.MeasurementHandlers() constructor

```csharp
public MeasurementHandlers ();
```

To be added.

To be added.

## MeasurementHandlers.ByteHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<byte>? ByteHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Byte`. If `null`, byte measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.DecimalHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<decimal>? DecimalHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Decimal`. If `null`, decimal measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.DoubleHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<double>? DoubleHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Double`. If `null`, double measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.FloatHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<float>? FloatHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Single`. If `null`, float measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.IntHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<int>? IntHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Int32`. If `null`, int measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.LongHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<long>? LongHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Int64`. If `null`, long measurements are skipped.

Returns: To be added.

To be added.

## MeasurementHandlers.ShortHandler property

```csharp
public System.Diagnostics.Metrics.MeasurementCallback<short>? ShortHandler { get; set; }
```

Gets or sets a `MeasurementCallback<T>` for `Int16`. If `null`, short measurements are skipped.

Returns: To be added.

To be added.
