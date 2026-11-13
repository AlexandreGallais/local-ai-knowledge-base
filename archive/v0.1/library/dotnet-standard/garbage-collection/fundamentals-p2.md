---
title: "Fundamentals of garbage collection (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/fundamentals.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Fundamentals of garbage collection (part 2 of 2)

## Generations

The GC algorithm is based on several considerations:

- It's faster to compact the memory for a portion of the managed heap than for the entire managed heap.
- Newer objects have shorter lifetimes, and older objects have longer lifetimes.
- Newer objects tend to be related to each other and accessed by the application around the same time.

Garbage collection primarily occurs with the reclamation of short-lived objects. To optimize the performance of the garbage collector, the managed heap is divided into three generations, 0, 1, and 2, so it can handle long-lived and short-lived objects separately. The garbage collector stores new objects in generation 0. Objects created early in the application's lifetime that survive collections are promoted and stored in generations 1 and 2. Because it's faster to compact a portion of the managed heap than the entire heap, this scheme allows the garbage collector to release the memory in a specific generation rather than release the memory for the entire managed heap each time it performs a collection.

- **Generation 0**: This generation is the youngest and contains short-lived objects. An example of a short-lived object is a temporary variable. Garbage collection occurs most frequently in this generation.

  Newly allocated objects form a new generation of objects and are implicitly generation 0 collections. However, if they're large objects, they go on the large object heap (LOH), which is sometimes referred to as *generation 3*. Generation 3 is a physical generation that's logically collected as part of generation 2.

  Most objects are reclaimed for garbage collection in generation 0 and don't survive to the next generation.

  If an application attempts to create a new object when generation 0 is full, the garbage collector performs a collection to free address space for the object. The garbage collector starts by examining the objects in generation 0 rather than all objects in the managed heap. A collection of generation 0 alone often reclaims enough memory to enable the application to continue creating new objects.

- **Generation 1**: This generation contains short-lived objects and serves as a buffer between short-lived objects and long-lived objects.

  After the garbage collector performs a collection of generation 0, it compacts the memory for the reachable objects and promotes them to generation 1. Because objects that survive collections tend to have longer lifetimes, it makes sense to promote them to a higher generation. The garbage collector doesn't have to reexamine the objects in generations 1 and 2 each time it performs a collection of generation 0.

  If a collection of generation 0 doesn't reclaim enough memory for the application to create a new object, the garbage collector can perform a collection of generation 1 and then generation 2. Objects in generation 1 that survive collections are promoted to generation 2.

- **Generation 2**: This generation contains long-lived objects. An example of a long-lived object is an object in a server application that contains static data that's live for the duration of the process.

  Objects in generation 2 that survive a collection remain in generation 2 until they're determined to be unreachable in a future collection.

  Objects on the large object heap (which is sometimes referred to as *generation 3*) are also collected in generation 2.

Garbage collections occur in specific generations as conditions warrant. Collecting a generation means collecting objects in that generation and all its younger generations. A generation 2 garbage collection is also known as a full garbage collection because it reclaims objects in all generations (that is, all objects in the managed heap).

### Survival and promotions

Objects that aren't reclaimed in a garbage collection are known as survivors and are promoted to the next generation:

- Objects that survive a generation 0 garbage collection are promoted to generation 1.
- Objects that survive a generation 1 garbage collection are promoted to generation 2.
- Objects that survive a generation 2 garbage collection remain in generation 2.

When the garbage collector detects that the survival rate is high in a generation, it increases the threshold of allocations for that generation. The next collection gets a substantial size of reclaimed memory. The CLR continually balances two priorities: not letting an application's working set get too large by delaying garbage collection and not letting the garbage collection run too frequently.

### Ephemeral generations and segments

Because objects in generations 0 and 1 are short-lived, these generations are known as the *ephemeral generations*.

Ephemeral generations are allocated in the memory segment that's known as the ephemeral segment. Each new segment acquired by the garbage collector becomes the new ephemeral segment and contains the objects that survived a generation 0 garbage collection. The old ephemeral segment becomes the new generation 2 segment.

The size of the ephemeral segment varies depending on whether a system is 32-bit or 64-bit and on the type of garbage collector it's running (workstation or server GC). The following table shows the default sizes of the ephemeral segment:

|Workstation/server GC|32-bit|64-bit|
|-|-------------|-------------|
|Workstation GC|16 MB|256 MB|
|Server GC|64 MB|4 GB|
|Server GC with > 4 logical CPUs|32 MB|2 GB|
|Server GC with > 8 logical CPUs|16 MB|1 GB|

The ephemeral segment can include generation 2 objects. Generation 2 objects can use multiple segments as many as your process requires and memory allows for.

The amount of freed memory from an ephemeral garbage collection is limited to the size of the ephemeral segment. The amount of memory that's freed is proportional to the space that was occupied by the dead objects.

## What happens during a garbage collection

A garbage collection has the following phases:

- A marking phase that finds and creates a list of all live objects.

- A relocating phase that updates the references to the objects that are compacted.

- A compacting phase that reclaims the space occupied by the dead objects and compacts the surviving objects. The compacting phase moves objects that have survived a garbage collection towards the older end of the segment.

  Because generation 2 collections can occupy multiple segments, objects that are promoted into generation 2 can be moved into an older segment. Both generation 1 and generation 2 survivors can be moved to a different segment because they're promoted to generation 2.

  Ordinarily, the large object heap (LOH) isn't compacted because copying large objects imposes a performance penalty. However, in .NET Core and in .NET Framework 4.5.1 and later, you can use the `System.Runtime.GCSettings.LargeObjectHeapCompactionMode` property to compact the large object heap on demand. In addition, the LOH is automatically compacted when a hard limit is set by specifying either:

  - A memory limit on a container.
  - The GCHeapHardLimit or GCHeapHardLimitPercent runtime configuration options.

The garbage collector uses the following information to determine whether objects are live:

- **Stack roots**: Stack variables provided by the just-in-time (JIT) compiler and stack walker. JIT optimizations can lengthen or shorten regions of code within which stack variables are reported to the garbage collector.

- **Garbage collection handles**: Handles that point to managed objects and that can be allocated by user code or the common language runtime.

- **Static data**: Static objects in application domains that could be referencing other objects. Each application domain keeps track of its static objects.

Before a garbage collection starts, all managed threads are suspended except for the thread that triggered the garbage collection.

The following illustration shows a thread that triggers a garbage collection and causes the other threads to be suspended:

## Unmanaged resources

For most of the objects your application creates, you can rely on garbage collection to perform the necessary memory management tasks automatically. However, unmanaged resources require explicit cleanup. The most common type of unmanaged resource is an object that wraps an operating system resource, such as a file handle, window handle, or network connection. Although the garbage collector can track the lifetime of a managed object that encapsulates an unmanaged resource, it doesn't have specific knowledge about how to clean up the resource.

When you define an object that encapsulates an unmanaged resource, it's recommended that you provide the necessary code to clean up the unmanaged resource in a public `Dispose` method. By providing a `Dispose` method, you enable users of your object to explicitly release the resource when they're finished with the object. When you use an object that encapsulates an unmanaged resource, make sure to call `Dispose` as necessary.

You must also provide a way for your unmanaged resources to be released in case a consumer of your type forgets to call `Dispose`. You can either use a safe handle to wrap the unmanaged resource, or override the `System.Object.Finalize` method.

For more information about cleaning up unmanaged resources, see Clean up unmanaged resources.

## See also

- Workstation and server garbage collection
- Background garbage collection
- Configuration options for GC
- Garbage collection
