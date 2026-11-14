---
title: "Configure metrics - .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/metrics-configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configure metrics

Use `Microsoft.Extensions.Configuration.IConfiguration` to filter instruments for custom metrics listeners that integrate with dependency injection (DI). These filters control which instruments a listener can subscribe to, not how it aggregates or exports measurements.

## Metrics listeners

A metrics listener receives measurements from instruments, such as counters and histograms, created by a `System.Diagnostics.Metrics.Meter`. The `System.Diagnostics.Metrics.MeterListener` class provides a low-level API to discover instruments and subscribe to their measurements directly. The metrics collection tutorial shows how to use this API.

The `Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener` interface lets custom listeners integrate with DI and configuration-based filters. The metrics infrastructure creates a `MeterListener` internally for each registered `IMetricsListener` implementation. It applies the configured rules before it calls `Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.InstrumentPublished*` to offer an instrument to the implementation. If the listener accepts the instrument, the infrastructure delivers measurements to the callbacks that the implementation provides.

To register a custom listener, use `Microsoft.Extensions.Diagnostics.Metrics.MetricsBuilderExtensions.AddListener*`. The configuration in this article applies to these registered listeners, not to `MeterListener` instances that your code or a collector configures directly.

## Load configuration

Generic Host applications that use the default builder settings automatically call `Microsoft.Extensions.DependencyInjection.MetricsServiceExtensions.AddMetrics*` and load the `Metrics` section from `IConfiguration`. In a non-hosted DI application, call `AddMetrics` and `Microsoft.Extensions.Diagnostics.Metrics.MetricsBuilderConfigurationExtensions.AddConfiguration(Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder,Microsoft.Extensions.Configuration.IConfiguration)` explicitly to bind the same section:

```csharp
services.AddMetrics(metrics =>
    metrics.AddConfiguration(configuration.GetSection("Metrics")));
```

To use these extension methods, import the `Microsoft.Extensions.DependencyInjection` and `Microsoft.Extensions.Diagnostics.Metrics` namespaces.

> **Important:**
> The `Metrics` configuration only filters instruments for registered `IMetricsListener` implementations. It doesn't register listeners or activate their subscriptions, create metrics, aggregate measurements, export data, or automatically configure OpenTelemetry, Prometheus, `dotnet-counters`, or any other collector.

## Select meters and instruments

Use the following sections to choose which meters the rules apply to:

| Section | Applies to |
| --- | --- |
| `EnabledMetrics` | Both global and local meters. |
| `EnabledGlobalMetrics` | Meters without a scope, such as meters created directly with `Meter`. |
| `EnabledLocalMetrics` | Meters scoped to the service container's `System.Diagnostics.Metrics.IMeterFactory`. |

An `EnabledMetrics`, `EnabledGlobalMetrics`, or `EnabledLocalMetrics` section directly under `Metrics` applies to every registered listener. To target one listener, nest the section under the listener's `Microsoft.Extensions.Diagnostics.Metrics.IMetricsListener.Name` value, such as `Metrics:MyListener:EnabledMetrics`. Listener and instrument names require exact matches without regard to case.

Within any of these sections, a Boolean meter entry enables or disables every instrument whose meter name matches. To set instrument-level rules, use an object with instrument names as keys. The special `Default` entry supplies a fallback. A Boolean `Default` entry at the meter level applies to otherwise unmatched meters. Within a meter object, `Default` applies to otherwise unmatched instruments. A listener doesn't receive an instrument if no rule matches it.

The following `appsettings.json` example enables instruments from meters whose names start with `Contoso.Web`, except for instruments named `request-duration`:

```json
{
  "Metrics": {
    "EnabledMetrics": {
      "Contoso.Web": {
        "Default": true,
        "request-duration": false
      }
    }
  }
}
```
## Match rules and resolve conflicts

Meter names use case-insensitive prefix matching. A meter name can contain at most one `*` wildcard to match a prefix and suffix. More-specific rules take precedence in this order: listener-specific rules, longer meter-name patterns, instrument-specific rules, and scope-specific rules. If equally specific rules conflict, the last configured rule wins.

## See also

- Collect metrics
- Create custom metrics
