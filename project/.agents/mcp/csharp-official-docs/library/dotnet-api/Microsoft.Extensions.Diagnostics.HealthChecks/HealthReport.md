---
title: "HealthReport class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthReport.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthReport class

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public sealed class HealthReport
```

Represents the result of executing a group of `IHealthCheck` instances.

To be added.

## HealthReport.HealthReport(HealthReportEntry>, TimeSpan) constructor

```csharp
public HealthReport (System.Collections.Generic.IReadOnlyDictionary<string,Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry> entries, TimeSpan totalDuration);
```

Create a new `HealthReport` from the specified results.

Parameters:

- `entries`: A `IReadOnlyDictionary<T1,T2>` containing the results from each health check.
- `totalDuration`: A value indicating the time the health check service took to execute.

To be added.

## HealthReport.HealthReport(HealthReportEntry>, HealthStatus, TimeSpan) constructor

```csharp
public HealthReport (System.Collections.Generic.IReadOnlyDictionary<string,Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry> entries, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus status, TimeSpan totalDuration);
```

Create a new `HealthReport` from the specified results.

Parameters:

- `entries`: A `IReadOnlyDictionary<T1,T2>` containing the results from each health check.
- `status`: A `HealthStatus` representing the aggregate status of all the health checks.
- `totalDuration`: A value indicating the time the health check service took to execute.

To be added.

## HealthReport.Entries property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,Microsoft.Extensions.Diagnostics.HealthChecks.HealthReportEntry> Entries { get; }
```

A `IReadOnlyDictionary<T1,T2>` containing the results from each health check.

Returns: To be added.

The keys in this dictionary map the name of each executed health check to a `HealthReportEntry` for the
result data returned from the corresponding health check.

## HealthReport.Status property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus Status { get; }
```

Gets a `HealthStatus` representing the aggregate status of all the health checks. The value of `HealthReport.Status`
will be the most severe status reported by a health check. If no checks were executed, the value is always `HealthStatus.Healthy`.

Returns: To be added.

To be added.

## HealthReport.TotalDuration property

```csharp
public TimeSpan TotalDuration { get; }
```

Gets the time the health check service took to execute.

Returns: To be added.

To be added.
