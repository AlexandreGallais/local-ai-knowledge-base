---
title: "MetricsBuilderConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/MetricsBuilderConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetricsBuilderConfigurationExtensions class

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public static class MetricsBuilderConfigurationExtensions
```

Extensions for `IMetricsBuilder` for enabling metrics based on `IConfiguration`.

To be added.

## MetricsBuilderConfigurationExtensions.AddConfiguration(IMetricsBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder AddConfiguration (this Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder builder, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Reads metrics configuration from the provided `IConfiguration` section and configures
which <see cref="T:System.Diagnostics.Metrics.Meter">Meters</see>, <see cref="T:System.Diagnostics.Metrics.Instrument">Instruments</see>, and <see cref="T:Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener">IMetricsListeners</see> are enabled.

Parameters:

- `builder`: The `IMetricsBuilder`.
- `configuration`: The `IConfiguration` section to load.

Returns: The original `IMetricsBuilder` for chaining.

To be added.
