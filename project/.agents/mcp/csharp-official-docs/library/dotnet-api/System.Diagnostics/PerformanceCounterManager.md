---
title: "PerformanceCounterManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterManager class

Namespace: `System.Diagnostics`

```csharp
public sealed class PerformanceCounterManager : System.Diagnostics.ICollectData
```

Prepares performance data for the performance.dll the system loads when working with performance counters.

To be added.

## PerformanceCounterManager.PerformanceCounterManager() constructor

```csharp
public PerformanceCounterManager ();
```

Initializes a new instance of the `PerformanceCounterManager` class.

#### Remarks
The performance counter performance.dll calls this constructor as part of its performance data collection routine.

## PerformanceCounterManager.System.Diagnostics.ICollectData.CloseData() method

```csharp
void ICollectData.CloseData ();
```

Called by the perf dll's close performance data.

To be added.

## PerformanceCounterManager.System.Diagnostics.ICollectData.CollectData(Int32, IntPtr, IntPtr, Int32, IntPtr) method

```csharp
void ICollectData.CollectData (int callIdx, IntPtr valueNamePtr, IntPtr dataPtr, int totalBytes, out IntPtr res);
```

Performance data collection routine. Called by the PerfCount perf dll.

Parameters:

- `callIdx`: The call index.
- `valueNamePtr`: A pointer to a Unicode string list with the requested Object identifiers.
- `dataPtr`: A pointer to the data buffer.
- `totalBytes`: A pointer to a number of bytes.
- `res`: When this method returns, contains a `IntPtr` with a value of -1.

To be added.
