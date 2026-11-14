---
title: "GCMemoryInfo struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GCMemoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCMemoryInfo struct

Namespace: `System`

```csharp
public readonly struct GCMemoryInfo
```

Provides a set of APIs that can be used to retrieve garbage collection information.

#### Remarks

A garbage collection (GC) is identified by its `Index`, which starts from 1 and increases with each GC. If you ask for a GC that doesn't exist, you'll get all 0's in the info, including the `Index`. For example, you'll get 0's if you call the `GC.GetGCMemoryInfo` method before a GC has happened, or you ask for a GC of `FullBlocking` and no full blocking GCs have happened. You can use index 0 to detect that no GCs, or no GCs of the kind you specified, have occurred.

## GCMemoryInfo.Compacted property

```csharp
public bool Compacted { get; }
```

Gets a value that indicates if this is a compacting GC or not.

Returns: `true` if this is a compacting GC; `false` otherwise.

A compacting GC is when space occupied by dead objects is reclaimed and surviving objects are compacted.

## GCMemoryInfo.Concurrent property

```csharp
public bool Concurrent { get; }
```

Gets a value that indicates if this is a concurrent GC (background GC) or not.

Returns: `true` if this is a concurrent GC (background GC); `false` otherwise.

To be added.

## GCMemoryInfo.FinalizationPendingCount property

```csharp
public long FinalizationPendingCount { get; }
```

Gets the number of objects that are ready for finalization that this GC observed.

Returns: The total number of objects observed by this GC that are ready for finalization.

To be added.

## GCMemoryInfo.FragmentedBytes property

```csharp
public long FragmentedBytes { get; }
```

Gets the total fragmentation when the last garbage collection occurred.

Returns: The total fragmentation when the last garbage collection occurred.

#### Remarks

For example, the application has the following five objects:

`| OBJ_A |     OBJ_B     | OBJ_C |   OBJ_D   | OBJ_E |`

If `OBJ_B`, `OBJ_C`, and `OBJ_E` are garbage collected but the heap is not compacted, the resulting heap will look like the following:

`| OBJ_A |           F           |   OBJ_D   |`

The memory between `OBJ_A` and `OBJ_D`, which is marked `F`, is considered part of the `FragmentedBytes` and is used to allocate new objects.

The memory after `OBJ_D` is not considered part of the `FragmentedBytes` but is also used to allocate new objects.

## GCMemoryInfo.Generation property

```csharp
public int Generation { get; }
```

Gets the generation this GC collected. Collecting a generation also collects younger generations.

Returns: The generation this GC collected.

To be added.

## GCMemoryInfo.GenerationInfo property

```csharp
public ReadOnlySpan<GCGenerationInfo> GenerationInfo { get; }
```

Gets the generation information for all generations.

Returns: The generation information for all generations.

To be added.

## GCMemoryInfo.HeapSizeBytes property

```csharp
public long HeapSizeBytes { get; }
```

Gets the total heap size when the last garbage collection occurred.

Returns: The total heap size, in bytes, when the last garbage collection occurred.

To be added.

## GCMemoryInfo.HighMemoryLoadThresholdBytes property

```csharp
public long HighMemoryLoadThresholdBytes { get; }
```

Gets the high memory load threshold when the last garbage collection occurred.

Returns: The high memory load threshold, in bytes, when the last garbage collection occurred.

Most of the GC performance heuristics are based on per-process measurements. However, to avoid paging, GC is aware of the global physical memory load on the machine or VM or in the container. GC recognizes a certain memory load percentage as a "high memory load situation". When the memory load percentage is over that threshold, GC becomes more aggressive and will do more full blocking GCs if necessary to reduce the heap size.

## GCMemoryInfo.Index property

```csharp
public long Index { get; }
```

Gets the index of this GC.

Returns: The index of this GC.

GC indices start with 1 and are increased at the beginning of a GC.
Since the information is updated at the end of a GC, this means you can get the information for a background GC with a smaller index than a foreground GC that finished earlier.

## GCMemoryInfo.MemoryLoadBytes property

```csharp
public long MemoryLoadBytes { get; }
```

Gets the physical memory load when the last garbage collection occurred.

Returns: The physical memory load, in bytes, when the last garbage collection occurred.

When a process is not running in a container or running in a container without a memory limit:

- On Windows, the MemoryLoadBytes is obtained from the MEMORYSTATUS structure in bytes divided by the total physical memory.

- On Linux, the MemoryLoadBytes is obtained from reading the MemAvailable field from `/proc/meminfo` divided by the total physical memory.

When a process is running in a container with a memory limit or when cgroup limits are set:

- On Windows, the MemoryLoadBytes is obtained from the Working Set Size field in the PROCESS_MEMORY_COUNTERS structure in bytes divided by the memory limit.

- On Linux, the MemoryLoadBytes is obtained from the used physical memory via the CGroup Memory Usage file from `memory.usage_in_bytes` for CGroups v1 and `memory.current` for CGroups v2 divided by the memory limit. The cgroup limits don't necessarily mean there is a container. You can use cgroup to set limits on a regular process.

On Linux, when there is no cgroup enabled, the used physical memory is read from the `/proc/statm` file, which provides the process resident set size.

On Linux, the virtual memory load is also used if the virtual memory rlimit is set and if the load is larger than the physical memory load.

Data is only brought into physical memory on first touch. If you allocated a big object but haven't actually used it, most of its memory isn't in physical memory. In this case, the allocation won't affect the memory load significantly.

## GCMemoryInfo.PauseDurations property

```csharp
public ReadOnlySpan<TimeSpan> PauseDurations { get; }
```

Gets the durations of the pauses when all managed threads are suspended.

Returns: A timespan representing the pause durations.

For blocking GCs, there is one pause. Pauses for background GC are illustrated at Background workstation vs. server GC.

## GCMemoryInfo.PauseTimePercentage property

```csharp
public double PauseTimePercentage { get; }
```

Gets the pause time percentage in the GC so far. If the pause time is 1.2%, this property's value is 1.2. The value is calculated by taking the sum of all GC pauses so far and dividing that by the total elapsed time of the process since the runtime was loaded. This running counter is updated at the end of each GC. It does not distinguish between `GCKind`. That is, at every GC, the calculated value is updated, and when you access this property, it gets the latest calculated value.

Returns: The pause time percentage.

To be added.

## GCMemoryInfo.PinnedObjectsCount property

```csharp
public long PinnedObjectsCount { get; }
```

Gets the number of pinned objects this GC observed.

Returns: The total number of pinned objects observed by this GC.

To be added.

## GCMemoryInfo.PromotedBytes property

```csharp
public long PromotedBytes { get; }
```

Gets the promoted bytes for this GC.

Returns: The number of promoted bytes for this GC.

The promoted bytes represent the objects from the generations that the garbage collection is collecting that survived.

## GCMemoryInfo.TotalAvailableMemoryBytes property

```csharp
public long TotalAvailableMemoryBytes { get; }
```

Gets the total available memory for the garbage collector to use when the last garbage collection occurred.

Returns: The total available memory, in bytes, for the garbage collector to use when the last garbage collection occurred.

#### Remarks

This property value will be the value of the `COMPlus_GCHeapHardLimit` environment variable, or the `Server.GC.HeapHardLimit` value in `runtimeconfig.json`, if either is set.

If the program is run in a container, this value is an implementation-defined fraction of the container's size.

Otherwise, the value of the property is the physical memory on the machine that was available for the garbage collector to use when the last garbage collection occurred.

## GCMemoryInfo.TotalCommittedBytes property

```csharp
public long TotalCommittedBytes { get; }
```

Gets the total committed bytes of the managed heap.

Returns: The total committed bytes of the managed heap.

The total committed bytes is the amount of backing store for the memory. On Windows, bytes are committed when `VirtualAlloc` is called with `MEM_COMMIT`. On Linux, bytes are committed when the page mapping is changed to
```csharp
PROT_WRITE | PROT_READ
```
.
