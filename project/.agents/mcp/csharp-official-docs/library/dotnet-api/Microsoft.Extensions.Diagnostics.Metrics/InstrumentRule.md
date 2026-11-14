---
title: "InstrumentRule class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/InstrumentRule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstrumentRule class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public class InstrumentRule
```

Contains a set of parameters used to determine which instruments are enabled for which listeners. Unspecified
parameters match anything.

Parameters:

- `meterName`: The <see cref="P:System.Diagnostics.Metrics.Meter.Name">Meter.Name</see> or prefix.
- `instrumentName`: The <see cref="P:System.Diagnostics.Metrics.Instrument.Name">Instrument.Name</see>.
- `listenerName`: The <see cref="P:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name">IMetricsListener.Name</see>.
- `scopes`: A bitwise combination of the enumeration values that specifies the scopes to consider.
- `enable`: `true` to enable the matched instrument for this listener; otherwise, `false`.

The most specific rule that matches a given instrument will be used. The priority of parameters is as follows:

- MeterName, either an exact match, or the longest prefix match. See <see cref="P:System.Diagnostics.Metrics.Meter.Name">Meter.Name</see>.

- InstrumentName, an exact match. <see cref="P:System.Diagnostics.Metrics.Instrument.Name">Instrument.Name</see>.

- ListenerName, an exact match. <see cref="P:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name">IMetricsListener.Name</see>.

- Scopes

## InstrumentRule.InstrumentRule(String, String, String, MeterScope, Boolean) constructor

```csharp
public InstrumentRule (string? meterName, string? instrumentName, string? listenerName, Microsoft.Extensions.Diagnostics.Metrics.MeterScope scopes, bool enable);
```

Contains a set of parameters used to determine which instruments are enabled for which listeners. Unspecified
parameters match anything.

Parameters:

- `meterName`: The <see cref="P:System.Diagnostics.Metrics.Meter.Name">Meter.Name</see> or prefix.
- `instrumentName`: The <see cref="P:System.Diagnostics.Metrics.Instrument.Name">Instrument.Name</see>.
- `listenerName`: The <see cref="P:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name">IMetricsListener.Name</see>.
- `scopes`: A bitwise combination of the enumeration values that specifies the scopes to consider.
- `enable`: `true` to enable the matched instrument for this listener; otherwise, `false`.

The most specific rule that matches a given instrument will be used. The priority of parameters is as follows:

- MeterName, either an exact match, or the longest prefix match. See <see cref="P:System.Diagnostics.Metrics.Meter.Name">Meter.Name</see>.

- InstrumentName, an exact match. <see cref="P:System.Diagnostics.Metrics.Instrument.Name">Instrument.Name</see>.

- ListenerName, an exact match. <see cref="P:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name">IMetricsListener.Name</see>.

- Scopes

## InstrumentRule.Enable property

```csharp
public bool Enable { get; }
```

Gets a value that indicates whether the instrument should be enabled for the listener.

Returns: To be added.

To be added.

## InstrumentRule.InstrumentName property

```csharp
public string? InstrumentName { get; }
```

Gets the <see cref="P:System.Diagnostics.Metrics.Instrument.Name">Instrument.Name</see>, an exact match.

Returns: The instrument name. If `null`, all instruments for the meter are matched.

To be added.

## InstrumentRule.ListenerName property

```csharp
public string? ListenerName { get; }
```

Gets the <see cref="P:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name">IMetricsListener.Name</see>, an exact match.

Returns: The listener name. If `null`, all listeners are matched.

To be added.

## InstrumentRule.MeterName property

```csharp
public string? MeterName { get; }
```

Gets the <see cref="P:System.Diagnostics.Metrics.Meter.Name">Meter.Name</see>, either an exact match or the longest prefix match. Only full segment matches are considered.

Returns: The meter name. If `null`, all meters are matched.

To be added.

## InstrumentRule.Scopes property

```csharp
public Microsoft.Extensions.Diagnostics.Metrics.MeterScope Scopes { get; }
```

Gets the `MeterScope`.

Returns: To be added.

This property is used to distinguish between meters created via `Meter` constructors (`MeterScope.Global`)
and those created via Dependency Injection with `IMeterFactory.Create` (`MeterScope.Local`).
