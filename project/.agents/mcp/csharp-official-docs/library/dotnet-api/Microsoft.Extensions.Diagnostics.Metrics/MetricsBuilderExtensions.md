---
title: "MetricsBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/MetricsBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetricsBuilderExtensions class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public static class MetricsBuilderExtensions
```

Extension methods for `IMetricsBuilder` to add or clear `IMetricsListener` registrations, and to enable or disable metrics.

To be added.

## MetricsBuilderExtensions.AddListener(IMetricsBuilder, IMetricsListener) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder AddListener (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener listener);
```

Registers a new `IMetricsListener` instance.

Parameters:

- `listener`: The implementation type of the listener.
- `builder`: The `IMetricsBuilder`.

Returns: Returns the original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.AddListener<T>(IMetricsBuilder) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder AddListener<T> (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder) where T : class, Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener;
```

Registers a new `IMetricsListener` of type `T`.

Parameters:

- `T`: The implementation type of the listener.
- `builder`: The `IMetricsBuilder`.

Returns: Returns the original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.ClearListeners(IMetricsBuilder) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder ClearListeners (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder);
```

Removes all `IMetricsListener` registrations from the dependency injection container.

Parameters:

- `builder`: The `IMetricsBuilder`.

Returns: Returns the original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.DisableMetrics(IMetricsBuilder, String) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder DisableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, string? meterName);
```

Disables all instruments for the given meter, for all registered listeners.

Parameters:

- `builder`: The `IMetricsBuilder`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.

Returns: The original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.DisableMetrics(MetricsOptions, String) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions DisableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions options, string? meterName);
```

Disables all instruments for the given meter, for all registered listeners.

Parameters:

- `options`: The `MetricsOptions`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.

Returns: The original `MetricsOptions` for chaining.

To be added.

## MetricsBuilderExtensions.DisableMetrics(IMetricsBuilder, String, String, String, MeterScope) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder DisableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, string? meterName, string? instrumentName = default, string? listenerName = default, Microsoft.Extensions.Diagnostics.Metrics.MeterScope scopes = Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Global | Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Local);
```

Disables a specified `Instrument` for the given `Meter` and `IMetricsListener`.

Parameters:

- `builder`: The `IMetricsBuilder`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.
- `instrumentName`: The `Instrument.Name`. A null value matches all instruments.
- `listenerName`: The `IMetricsListener`.Name. A null value matches all listeners.
- `scopes`: Indicates which meter scopes to consider. Defaults to all scopes.

Returns: The original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.DisableMetrics(MetricsOptions, String, String, String, MeterScope) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions DisableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions options, string? meterName, string? instrumentName = default, string? listenerName = default, Microsoft.Extensions.Diagnostics.Metrics.MeterScope scopes = Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Global | Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Local);
```

Disables a specified `Instrument` for the given `Meter` and `IMetricsListener`.

Parameters:

- `options`: The `MetricsOptions`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.
- `instrumentName`: The `Instrument.Name`. A null value matches all instruments.
- `listenerName`: The `IMetricsListener`.Name. A null value matches all listeners.
- `scopes`: Indicates which meter scopes to consider. Defaults to all scopes.

Returns: The original `MetricsOptions` for chaining.

To be added.

## MetricsBuilderExtensions.EnableMetrics(IMetricsBuilder, String) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder EnableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, string? meterName);
```

Enables all instruments for the given meter, for all registered listeners.

Parameters:

- `builder`: The `IMetricsBuilder`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.

Returns: The original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.EnableMetrics(MetricsOptions, String) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions EnableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions options, string? meterName);
```

Enables all instruments for the given meter, for all registered listeners.

Parameters:

- `options`: The `MetricsOptions`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.

Returns: The original `MetricsOptions` for chaining.

To be added.

## MetricsBuilderExtensions.EnableMetrics(IMetricsBuilder, String, String, String, MeterScope) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder EnableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, string? meterName, string? instrumentName = default, string? listenerName = default, Microsoft.Extensions.Diagnostics.Metrics.MeterScope scopes = Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Global | Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Local);
```

Enables a specified `Instrument` for the given `Meter` and `IMetricsListener`.

Parameters:

- `builder`: The `IMetricsBuilder`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.
- `instrumentName`: The `Instrument.Name`. A null value matches all instruments.
- `listenerName`: The `IMetricsListener`.Name. A null value matches all listeners.
- `scopes`: Indicates which meter scopes to consider. Defaults to all scopes.

Returns: The original `IMetricsBuilder` for chaining.

To be added.

## MetricsBuilderExtensions.EnableMetrics(MetricsOptions, String, String, String, MeterScope) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions EnableMetrics (this Microsoft.Extensions.Diagnostics.Metrics.MetricsOptions options, string? meterName, string? instrumentName = default, string? listenerName = default, Microsoft.Extensions.Diagnostics.Metrics.MeterScope scopes = Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Global | Microsoft.Extensions.Diagnostics.Metrics.MeterScope.Local);
```

Enables a specified `Instrument` for the given `Meter` and `IMetricsListener`.

Parameters:

- `options`: The `MetricsOptions`.
- `meterName`: The `Meter.Name` or prefix. A null value matches all meters.
- `instrumentName`: The `Instrument.Name`. A null value matches all instruments.
- `listenerName`: The `IMetricsListener`.Name. A null value matches all listeners.
- `scopes`: Indicates which meter scopes to consider. Default to all scopes.

Returns: The original `MetricsOptions` for chaining.

To be added.
