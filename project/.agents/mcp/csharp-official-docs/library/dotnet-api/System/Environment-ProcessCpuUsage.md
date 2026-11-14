---
title: "Environment+ProcessCpuUsage struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment+ProcessCpuUsage.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment+ProcessCpuUsage struct

Namespace: `System`

```csharp
public readonly struct Environment.ProcessCpuUsage
```

Represents the CPU usage statistics of a process.

The CPU usage statistics include information about the time spent by the process in the application code (user mode) and the operating system code (kernel mode), as well as the total time spent by the process in both user mode and kernel mode.

## Environment+ProcessCpuUsage.PrivilegedTime property

```csharp
public TimeSpan PrivilegedTime { get; }
```

Gets the amount of time the process has spent running code inside the operating system code.

Returns: To be added.

To be added.

## Environment+ProcessCpuUsage.TotalTime property

```csharp
public TimeSpan TotalTime { get; }
```

Gets the amount of time the process has spent utilizing the CPU, including the process time spent in the application code and in the operating system code.

Returns: To be added.

To be added.

## Environment+ProcessCpuUsage.UserTime property

```csharp
public TimeSpan UserTime { get; }
```

Gets the amount of time the associated process has spent running code inside the application portion of the process (not the operating system code).

Returns: To be added.

To be added.
