---
title: "ResourceUtilizationHealthCheckOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/ResourceUtilizationHealthCheckOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceUtilizationHealthCheckOptions class

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public class ResourceUtilizationHealthCheckOptions
```

Options for the resource utilization health check.

To be added.

## ResourceUtilizationHealthCheckOptions.ResourceUtilizationHealthCheckOptions() constructor

```csharp
public ResourceUtilizationHealthCheckOptions ();
```

To be added.

To be added.

## ResourceUtilizationHealthCheckOptions.CpuThresholds property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUsageThresholds CpuThresholds { get; set; }
```

Gets or sets thresholds for CPU utilization.

Returns: To be added.

The thresholds are periodically compared against the utilization samples provided by the Resource Monitoring library.

## ResourceUtilizationHealthCheckOptions.MemoryThresholds property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUsageThresholds MemoryThresholds { get; set; }
```

Gets or sets thresholds for memory utilization.

Returns: To be added.

The thresholds are periodically compared against the utilization samples provided by the Resource Monitoring library.

## ResourceUtilizationHealthCheckOptions.SamplingWindow property

```csharp
public TimeSpan SamplingWindow { get; set; }
```

Gets or sets the time window used for calculating CPU and memory utilization averages.

Returns: The default value is 5 seconds.

To be added.

## ResourceUtilizationHealthCheckOptions.UseObservableResourceMonitoringInstruments property

```csharp
public bool UseObservableResourceMonitoringInstruments { get; set; }
```

Gets or sets a value indicating whether the observable instruments will be used for getting CPU and Memory usage
as opposed to the default `IResourceMonitor` API which is obsolete.

Returns: `true` if the observable instruments are used. The default is `false`.
In the future the default will be `true`.

To be added.
