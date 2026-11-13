---
title: "Latency Modes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/latency.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Latency modes

To reclaim objects, the garbage collector (GC) must stop all the executing threads in an application. The period of time during which the garbage collector is active is referred to as its *latency*.

In some situations, such as when an application retrieves data or displays content, a full garbage collection can occur at a critical time and impede performance. You can adjust the intrusiveness of the garbage collector by setting the `System.Runtime.GCSettings.LatencyMode` property to one of the `System.Runtime.GCLatencyMode` values.

## Low latency settings

Using a "low" latency setting means the garbage collector intrudes less in your application. Garbage collection is more conservative about reclaiming memory.

The `System.Runtime.GCLatencyMode` enumeration provides two low latency settings:

- GCLatencyMode.LowLatency suppresses generation 2 collections and performs only generation 0 and 1 collections. It can be used only for short periods of time. Over longer periods, if the system is under memory pressure, the garbage collector will trigger a collection, which can briefly pause the application and disrupt a time-critical operation. This setting is available only for workstation garbage collection.

- GCLatencyMode.SustainedLowLatency suppresses foreground generation 2 collections and performs only generation 0, 1, and background generation 2 collections. It can be used for longer periods of time, and is available for both workstation and server garbage collection. This setting cannot be used if background garbage collection is disabled.

During low latency periods, generation 2 collections are suppressed unless the following occurs:

- The system receives a low memory notification from the operating system.

- Application code induces a collection by calling the `System.GC.Collect*` method and specifying 2 for the `generation` parameter.

## Scenarios

The following table lists the application scenarios for using the `System.Runtime.GCLatencyMode` values:

|Latency mode|Application scenarios|
|------------------|---------------------------|
|`System.Runtime.GCLatencyMode.Batch`|For applications that have no user interface (UI) or server-side operations.When background garbage collection is disabled, this is the default mode for workstation and server garbage collection. `System.Runtime.GCLatencyMode.Batch` mode also overrides the gcConcurrent setting, that is, it prevents background or concurrent collections.|
|`System.Runtime.GCLatencyMode.Interactive`|For most applications that have a UI.This is the default mode for workstation and server garbage collection. However, if an app is hosted, the garbage collector settings of the hosting process take precedence.|
|`System.Runtime.GCLatencyMode.LowLatency`|For applications that have short-term, time-sensitive operations during which interruptions from the garbage collector could be disruptive. For example, applications that render animations or data acquisition functions.|
|`System.Runtime.GCLatencyMode.SustainedLowLatency`|For applications that have time-sensitive operations for a contained but potentially longer duration of time during which interruptions from the garbage collector could be disruptive. For example, applications that need quick response times as market data changes during trading hours.This mode results in a larger managed heap size than other modes. Because it does not compact the managed heap, higher fragmentation is possible. Ensure that sufficient memory is available.|

## Guidelines for using low latency

When you use GCLatencyMode.LowLatency mode, consider the following guidelines:

- Keep the period of time in low latency as short as possible.

- Avoid allocating high amounts of memory during low latency periods. Low memory notifications can occur because garbage collection reclaims fewer objects.

- While in the low latency mode, minimize the number of new allocations, in particular allocations onto the large object heap and pinned objects.

- Be aware of threads that could be allocating. Because the `System.Runtime.GCSettings.LatencyMode` property setting is process-wide, `System.OutOfMemoryException` exceptions can be generated on any thread that is allocating.

- Wrap the low latency code in constrained execution regions. For more information, see Constrained execution regions.

- You can force generation 2 collections during a low latency period by calling the `System.GC.Collect(System.Int32,System.GCCollectionMode)` method.

## See also

- `System.GC`
- Induced Collections
- Garbage Collection
