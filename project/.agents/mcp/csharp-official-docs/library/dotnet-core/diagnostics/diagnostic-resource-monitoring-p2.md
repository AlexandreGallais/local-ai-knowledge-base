---
title: "Diagnostic resource monitoring (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/diagnostic-resource-monitoring.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Diagnostic resource monitoring (part 2 of 2)

## Kubernetes resource monitoring

When your application runs inside a Kubernetes cluster, you typically configure resource limits and requests in your pod specification. The Microsoft.Extensions.Diagnostics.ResourceMonitoring.Kubernetes NuGet package extends the base resource monitoring library to read these values from environment variables exposed by the Kubernetes Downward API.

This package automatically detects your container's CPU and memory boundaries and emits accurate utilization metrics relative to those values.

> **Tip:**
> If your cluster runs Kubernetes v1.32 or later with cgroup v2, always prefer `AddKubernetesResourceMonitoring()` over `AddResourceMonitoring()` for accurate request-based utilization metrics. The Kubernetes package reads CPU and memory requests directly from environment variables, bypassing the cgroup weight inversion that can produce inaccurate values. See Known limitations for details.

### How it works

The Kubernetes Downward API can expose pod resource limits and requests as environment variables. The `Microsoft.Extensions.Diagnostics.ResourceMonitoring.Kubernetes` package reads these environment variables at startup and uses them to calculate utilization metrics.

You choose a prefix for your environment variables (for example, `MY_APP_`). The library then looks for the following variables:

| Environment variable | Description |
| --- | --- |
| `<PREFIX>LIMITS_CPU` | CPU limit in millicores (for example, `2000` for 2 cores) |
| `<PREFIX>LIMITS_MEMORY` | Memory limit in bytes |
| `<PREFIX>REQUESTS_CPU` | CPU request in millicores (optional, defaults to limit value) |
| `<PREFIX>REQUESTS_MEMORY` | Memory request in bytes (optional, defaults to limit value) |

At minimum, you must set `<PREFIX>LIMITS_CPU` and `<PREFIX>LIMITS_MEMORY` to non-zero values. If you omit the request variables or set them to zero, the library defaults them to the corresponding limit values.

### Configure the Downward API

To expose resource limits as environment variables, add `resourceFieldRef` entries to your Kubernetes deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      containers:
        - name: my-app
          resources:
            requests:
              cpu: "500m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"
          env:
            - name: MY_APP_LIMITS_CPU
              valueFrom:
                resourceFieldRef:
                  resource: limits.cpu
                  divisor: "1m"
            - name: MY_APP_LIMITS_MEMORY
              valueFrom:
                resourceFieldRef:
                  resource: limits.memory
                  divisor: "1"
            - name: MY_APP_REQUESTS_CPU
              valueFrom:
                resourceFieldRef:
                  resource: requests.cpu
                  divisor: "1m"
            - name: MY_APP_REQUESTS_MEMORY
              valueFrom:
                resourceFieldRef:
                  resource: requests.memory
                  divisor: "1"
```

The `divisor: "1m"` for CPU fields ensures Kubernetes expresses the value in millicores (for example, a `500m` limit becomes `500`). The `divisor: "1"` for memory fields returns the value in bytes.

### Register Kubernetes resource monitoring

In your application code, call `Microsoft.Extensions.DependencyInjection.KubernetesResourceQuotaServiceCollectionExtensions.AddKubernetesResourceMonitoring*` with the environment variable prefix that matches your Kubernetes manifest:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var app = Host.CreateDefaultBuilder()
    .ConfigureServices(services =>
    {
        services.AddKubernetesResourceMonitoring("MY_APP_");
    })
    .Build();

await app.RunAsync();
```
The `"MY_APP_"` prefix tells the library to look for environment variables named `MY_APP_LIMITS_CPU`, `MY_APP_LIMITS_MEMORY`, `MY_APP_REQUESTS_CPU`, and `MY_APP_REQUESTS_MEMORY`.

> **Important:**
> Don't call `AddResourceMonitoring()` in addition to `AddKubernetesResourceMonitoring()`. The Kubernetes method already registers all necessary base resource monitoring components. Calling both methods can result in conflicting service registrations.

### Emitted metrics

Once registered, the library emits the following metrics under the `Microsoft.Extensions.Diagnostics.ResourceMonitoring` meter. It uses the Kubernetes resource boundaries you configured for its calculations:

| Metric name | Type | Description |
| --- | --- | --- |
| `container.cpu.limit.utilization` | ObservableGauge | CPU usage relative to the configured limit, in the range [0, 1] |
| `container.cpu.request.utilization` | ObservableGauge | CPU usage relative to the configured request, in the range [0, 1] |
| `container.cpu.time` | ObservableCounter | Total CPU time consumed in seconds, with a `cpu.mode` dimension (user/system) |
| `container.memory.limit.utilization` | ObservableGauge | Memory usage relative to the configured limit, in the range [0, 1] |
| `container.memory.request.utilization` | ObservableGauge | Memory usage relative to the configured request, in the range [0, 1] |
| `container.memory.usage` | ObservableUpDownCounter | Memory usage in bytes |
| `process.cpu.utilization` | ObservableGauge | Process CPU usage relative to the CPU limit, in the range [0, 1] |
| `dotnet.process.memory.virtual.utilization` | ObservableGauge | Process memory usage relative to the memory limit, in the range [0, 1] |

For the full list of metrics emitted by the base resource monitoring library, see .NET extensions metrics: Microsoft.Extensions.Diagnostics.ResourceMonitoring.

### Example output

When you run your application inside a Kubernetes pod with the environment variables configured, the metrics produce values such as:

```
Instrument: container.cpu.limit.utilization
  Value: 0.23

Instrument: container.cpu.request.utilization
  Value: 0.46

Instrument: container.memory.limit.utilization
  Value: 0.61

Instrument: container.memory.request.utilization
  Value: 0.78

Instrument: container.memory.usage
  Value: 312475648 (By)

Instrument: container.cpu.time
  Value: 142.35 (s), cpu.mode=user
  Value: 28.91 (s), cpu.mode=system
```

In this example, the pod uses 23% of its CPU limit and 61% of its memory limit. Because the CPU request is lower than the CPU limit, `container.cpu.request.utilization` shows a higher value (46%) for the same absolute CPU usage.

### Collect metrics with OpenTelemetry

To export these metrics to your observability backend, register the meter with OpenTelemetry:

```csharp
services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddMeter("Microsoft.Extensions.Diagnostics.ResourceMonitoring");
        builder.AddOtlpExporter(); // Or any other metrics exporter
    });
```

### Known limitations on cgroup v2

Starting with Kubernetes v1.32 (using runc 1.3.2+ or crun 1.23+), the OCI runtime uses a new quadratic formula to convert cgroup v1 CPU shares to cgroup v2 CPU weight. This change affects the accuracy of the base `AddResourceMonitoring()` method when it attempts to derive CPU request values from cgroup parameters on Linux.

The core issue is that the base resource monitoring library reads `cpu.weight` from the cgroup v2 filesystem and reverse-converts it to estimate the original CPU request in millicores. However, the new conversion formula is **many-to-one**: multiple milliCPU values map to the same `cpu.weight`. For example, milliCPU values from 90 through 109 all produce `cpu.weight = 17`. Reversing this mapping cannot recover the exact original value, which means `container.cpu.request.utilization` may report inaccurate values.

The following metrics are affected:

| Metric | Affected? | Reason |
| --- | --- | --- |
| `container.cpu.request.utilization` | Yes | Relies on inferred CPU request from `cpu.weight` |
| `container.memory.request.utilization` | Yes | Relies on inferred memory request from cgroup parameters |
| `container.cpu.limit.utilization` | No | Uses `cpu.max`, not `cpu.weight` |
| `container.memory.limit.utilization` | No | Uses memory limit directly from cgroup |

**How the Kubernetes package solves this:** `AddKubernetesResourceMonitoring()` reads the actual CPU and memory request values directly from environment variables you configure through the Downward API. It never reverse-converts cgroup parameters, so utilization metrics are always accurate regardless of which OCI runtime conversion formula your cluster uses.

For more information, see:

- New cgroup v1 to v2 CPU conversion formula (Kubernetes blog)
- dotnet/extensions issue #7202

### Best practices

When deploying .NET applications to Kubernetes, consider the following recommendations:

- **Use the Kubernetes package in Kubernetes environments.** Always prefer `AddKubernetesResourceMonitoring()` over `AddResourceMonitoring()` when running in a Kubernetes cluster. It provides accurate resource utilization metrics by reading CPU and memory request values directly from environment variables rather than inferring them from cgroup parameters.

- **Expose resource metadata through the Downward API.** Configure your deployment manifests to expose CPU and memory limits and requests as environment variables. This ensures the library has access to the exact values you specified in your pod spec.

- **Test metric accuracy after cluster upgrades.** When upgrading your Kubernetes cluster or OCI runtime (runc, crun), verify that your resource utilization metrics still report expected values, especially if you use the base `AddResourceMonitoring()` method.

## Kubernetes probes

In addition to resource monitoring, apps that exist within a Kubernetes cluster report their health through diagnostic probes. The Microsoft.Extensions.Diagnostics.Probes NuGet package provides support for Kubernetes probes. It externalizes various health checks that align with various Kubernetes probes, for example:

- Liveness
- Readiness
- Startup

The library communicates the app's current health to a Kubernetes hosting environment. If a process reports as being unhealthy, Kubernetes doesn't send it any traffic, providing the process time to recover or terminate.

To add support for Kubernetes probes, add a package reference to Microsoft.Extensions.Diagnostics.Probes. On an `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance, call `Microsoft.Extensions.DependencyInjection.KubernetesProbesExtensions.AddKubernetesProbes*`.

## See also

- .NET extensions metrics
- Observability with OpenTelemetry
