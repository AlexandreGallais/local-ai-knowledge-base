---
title: "HealthStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthStatus enum

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public enum HealthStatus
```

Represents the reported status of a health check result.

A status of `HealthStatus.Unhealthy` should be considered the default value for a failing health check. Application
developers may configure a health check to report a different status as desired.

The values of this enum or ordered from least healthy to most healthy. So `HealthStatus.Degraded` is
greater than `HealthStatus.Unhealthy` but less than `HealthStatus.Healthy`.

## HealthStatus.Degraded field

```csharp
Degraded
```

Indicates that the health check determined that the component was in a degraded state.

## HealthStatus.Healthy field

```csharp
Healthy
```

Indicates that the health check determined that the component was healthy.

## HealthStatus.Unhealthy field

```csharp
Unhealthy
```

Indicates that the health check determined that the component was unhealthy, or an unhandled
exception was thrown while executing the health check.
