---
title: ".NET extensions metrics"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/built-in-metrics-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET extensions metrics

This article describes the built-in metrics for diagnostic .NET extensions libraries that are produced using the
`System.Diagnostics.Metrics` API. For a listing of metrics based on the older EventCounters API, see Available counters.

> **Tip:**
> For more information about how to collect and report these metrics, see Collecting Metrics.

## `Microsoft.Extensions.Diagnostics.HealthChecks`

The `Microsoft.Extensions.Diagnostics.HealthChecks` metrics report health check information from .NET health checks:

- `dotnet.health_check.reports`
- `dotnet.health_check.unhealthy_checks`

You can enable these metrics by calling the `Microsoft.Extensions.DependencyInjection.CommonHealthChecksExtensions.AddTelemetryHealthCheckPublisher*` extension method. These metrics can only be enabled for push-based metrics and aren't available for pull-based metrics.

##### Metric: `dotnet.health_check.reports`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.health_check.reports` | `System.Diagnostics.Metrics.Counter`1` | `{report}` | Number of times a health report reported the health status of an application. |

| Attribute                    | Type     | Description                          | Examples               | Presence |
|------------------------------|----------|--------------------------------------|------------------------|----------|
| `dotnet.health_check.status` | `string` | The health status of an application. | `Healthy`; `Unhealthy` | Always   |

`dotnet.health_check.status` is one of the following:

| Value       | Description                           |
|-------------|---------------------------------------|
| `Degraded`  | An application was in degraded state. |
| `Healthy`   | An application was healthy.           |
| `Unhealthy` | An application was unhealthy.         |

Available starting in: .NET 8.

##### Metric: `dotnet.health_check.unhealthy_checks`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.health_check.unhealthy_checks` | `System.Diagnostics.Metrics.Counter`1` | `{unhealthy_check}` | Number of times a health check reported the health status of an application as `Degraded` or `Unhealthy`. |

| Attribute                    | Type     | Description                          | Examples               | Presence |
|------------------------------|----------|--------------------------------------|------------------------|----------|
| `dotnet.health_check.name`   | `string` | The name of the health check.        | `ApplicationLifecycle` | Always   |
| `dotnet.health_check.status` | `string` | The health status of an application. | `Healthy`; `Unhealthy` | Always   |

`dotnet.health_check.status` is one of the following:

| Value       | Description                           |
|-------------|---------------------------------------|
| `Degraded`  | An application was in degraded state. |
| `Healthy`   | An application was healthy.           |
| `Unhealthy` | An application was unhealthy.         |

Available starting in: .NET 8.

## `Microsoft.Extensions.Diagnostics.ResourceMonitoring`

The `Microsoft.Extensions.Diagnostics.ResourceMonitoring` metrics report resource information from resource monitoring:

- `container.cpu.limit.utilization`
- `container.cpu.request.utilization`
- `container.cpu.time`
- `container.memory.limit.utilization`
- `container.memory.request.utilization`
- `container.memory.usage`
- `process.cpu.utilization`
- `dotnet.process.memory.virtual.utilization`
- `system.network.connections`

> **Note:**
> Some metrics emitted by the `Microsoft.Extensions.Diagnostics.ResourceMonitoring` meter (such as disk I/O) are in experimental stage and not documented here.

##### Metric: `container.cpu.limit.utilization`

The instrument is only available on a system running on containers both on Windows and Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.cpu.limit.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The CPU consumption of the running containerized application relative to resource limit. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 8.8.0.

##### Metric: `container.cpu.request.utilization`

The instrument is only available on a system running on containers both on Windows and Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.cpu.request.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The CPU consumption of the running containerized application relative to resource request. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 8.8.0.

##### Metric: `container.cpu.time`

The instrument is only available on a system running on a container either on Windows or Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.cpu.time` | `System.Diagnostics.Metrics.ObservableCounter`1` | `s` | CPU time used by the container. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 9.8.0.

##### Metric: `container.memory.limit.utilization`

The instrument is only available on a system running on containers both on Windows and Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.memory.limit.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The memory consumption of the running containerized application relative to resource limit. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 8.8.0.

##### Metric: `container.memory.request.utilization`

The instrument is only available on a system running on containers both on Windows and Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.memory.request.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The memory consumption of the running containerized application relative to resource request. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 9.8.0.

##### Metric: `container.memory.usage`

The instrument is only available on a system running on containers either on Windows or Linux.

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `container.memory.usage` | `System.Diagnostics.Metrics.ObservableUpDownCounter`1` | `By` | Memory usage of all processes in the container measured in bytes. |

Available starting in `Microsoft.Extensions.Diagnostics.ResourceMonitoring` 9.8.0.

##### Metric: `process.cpu.utilization`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `process.cpu.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The CPU consumption of the running application. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in: .NET 8.

##### Metric: `dotnet.process.memory.virtual.utilization`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.process.memory.virtual.utilization` | `System.Diagnostics.Metrics.ObservableGauge`1` | `1` | The memory consumption of the running application. Linux: range `[0, 1]` by default. Windows: range `[0, 100]` by default. See `UseZeroToOneRangeForMetrics` and `UseZeroToOneRangeForLinuxMetrics` options to change the default behavior. |

Available starting in: .NET 8.

##### Metric: `system.network.connections`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `system.network.connections` | `System.Diagnostics.Metrics.ObservableUpDownCounter`1` | `{connection}` | Number of network connections by state. |

| Attribute              | Type     | Description                              | Examples          | Presence |
|------------------------|----------|------------------------------------------|-------------------|----------|
| `network.type`         | `string` | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6`    | Always   |
| `system.network.state` | `string` | The state of a network connection.       | `close`; `listen` | Always   |

Available starting in: .NET 8.
