---
title: "PerformanceCounterInstanceLifetime enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterInstanceLifetime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterInstanceLifetime enum

Namespace: `System.Diagnostics`

```csharp
public enum PerformanceCounterInstanceLifetime
```

Specifies the lifetime of a performance counter instance.

#### Remarks
The default behavior is Global, which specifies the removal of the performance counter instance when no counters are using the process category.

> **Note:**
>  If the `CategoryType` property is `SingleInstance`, the `PerformanceCounter.InstanceLifetime` value for the performance counter must be `Global`.

## PerformanceCounterInstanceLifetime.Global field

```csharp
Global
```

Remove the performance counter instance when no counters are using the process category.

## PerformanceCounterInstanceLifetime.Process field

```csharp
Process
```

Remove the performance counter instance when the process is closed.
