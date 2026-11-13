---
title: ".NET garbage collection"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Garbage collection

.NET's garbage collector manages the allocation and release of memory for your application. Each time you create a new object, the common language runtime allocates memory for the object from the managed heap. As long as address space is available in the managed heap, the runtime continues to allocate space for new objects. However, memory is not infinite. Eventually the garbage collector must perform a collection in order to free some memory. The garbage collector's optimizing engine determines the best time to perform a collection, based upon the allocations being made. When the garbage collector performs a collection, it checks for objects in the managed heap that are no longer being used by the application and performs the necessary operations to reclaim their memory.

## In this section

|Title|Description|
|-----------|-----------------|
|Fundamentals of garbage collection|Describes how garbage collection works, how objects are allocated on the managed heap, and other core concepts.|
|Workstation and server garbage collection|Describes the differences between workstation garbage collection for client apps and server garbage collection for server apps.|
|Background garbage collection|Describes background garbage collection, which is the collection of generation 0 and 1 objects while generation 2 collection is in progress.|
|The large object heap|Describes the large object heap (LOH) and how large objects are garbage-collected.|
|Garbage collection and performance|Describes the performance checks you can use to diagnose garbage collection and performance issues.|
|Induced collections|Describes how to make a garbage collection occur.|
|Latency modes|Describes the modes that determine the intrusiveness of garbage collection.|
|Optimization for shared web hosting|Describes how to optimize garbage collection on servers shared by several small Web sites.|
|Garbage collection notifications|Describes how to determine when a full garbage collection is approaching and when it has completed.|
|Application domain resource monitoring|Describes how to monitor CPU and memory usage by an application domain.|
|Weak references|Describes features that permit the garbage collector to collect an object while still allowing the application to access that object.|

## Reference

- `System.GC`
- `System.GCCollectionMode`
- `System.GCNotificationStatus`
- `System.Runtime.GCLatencyMode`
- `System.Runtime.GCSettings`
- `System.Runtime.GCSettings.LargeObjectHeapCompactionMode*`
- `System.Object.Finalize*`
- `System.IDisposable`

## See also

- Clean up unmanaged resources
