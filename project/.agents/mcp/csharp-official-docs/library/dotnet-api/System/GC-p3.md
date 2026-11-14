---
title: "GC class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GC class (part 3 of 5)

## GC.GetTotalMemory(Boolean) method

```csharp
public static long GetTotalMemory (bool forceFullCollection);
```

Retrieves the heap size excluding fragmentation. For example if the total GC heap size is 100mb and fragmentation, ie, space taken up by free objects, takes up 40mb, this API would report 60mb. A parameter indicates whether this method can wait a short interval before returning, to allow the system to collect garbage and finalize objects.

Parameters:

- `forceFullCollection`: `true` to indicate that this method can wait for garbage collection to occur before returning; otherwise, `false`.

Returns: The heap size, in bytes, excluding fragmentation.

#### Remarks
If the `forceFullCollection` parameter is `true`, this method waits a short interval before returning while the system collects garbage and finalizes objects. The duration of the interval is an internally specified limit determined by the number of garbage collection cycles completed and the change in the amount of memory recovered between cycles. The garbage collector does not guarantee that all inaccessible memory is collected.

#### Examples
The following example demonstrates how to use the `GC.GetTotalMemory` method to get and display the number of bytes currently allocated in managed memory.

_Code sample not included: ~/snippets/csharp/System/GC/Overview/class1.cs._

## GC.GetTotalPauseDuration() method

```csharp
public static TimeSpan GetTotalPauseDuration ();
```

Gets the total amount of time paused in GC since the beginning of the process.

Returns: The total amount of time paused in GC since the beginning of the process.

To be added.

## GC.KeepAlive(Object) method

```csharp
public static void KeepAlive (object? obj);
```

References the specified object, which makes it ineligible for garbage collection from the start of the current routine to the point where this method is called.

Parameters:

- `obj`: The object to reference.

#### Remarks
The purpose of the `GC.KeepAlive` method is to ensure the existence of a reference to an object that is at risk of being prematurely reclaimed by the garbage collector. A common scenario where this might happen is when there are no references to the object in managed code or data, but the object is still in use in unmanaged code such as Windows APIs, unmanaged DLLs, or methods using COM.

This method references the `obj` parameter, making that object ineligible for garbage collection from the start of the routine to the point, in execution order, where this method is called. Code this method at the end, not the beginning, of the range of instructions where `obj` must be available.

The `GC.KeepAlive` method performs no operation and produces no side effects other than extending the lifetime of the object passed in as a parameter.

#### Examples
The following code example creates an object at the beginning of its `Main` method and does not refer to the object again until the end, when the `GC.KeepAlive` method is called. The object persists for the 30-second duration of the `Main` method, despite calls to the `GC.Collect` and `GC.WaitForPendingFinalizers` methods.

_Code sample not included: ~/snippets/csharp/System/GC/KeepAlive/gckeepalive.cs._

## GC.RefreshMemoryLimit() method

```csharp
public static void RefreshMemoryLimit ();
```

Instructs the Garbage Collector to reconfigure itself by detecting the various memory limits on the system.

Exceptions:

- `InvalidOperationException`: The hard limit is too low. This can happen if the heap hard limit that the refresh will set, either because of new AppData settings or implied by the container memory-limit changes, is lower than what's already committed.

-or-

The hard limit is invalid. This can happen, for example, with negative heap hard-limit percentages.

In addition to actual physical memory limit and container-limit settings, these configuration settings can be overwritten:

- GCHeapHardLimit
- GCHeapHardLimitPercent
- GCHeapHardLimitSOH
- GCHeapHardLimitLOH
- GCHeapHardLimitPOH
- GCHeapHardLimitSOHPercent
- GCHeapHardLimitLOHPercent
- GCHeapHardLimitPOHPercent

Instead of updating the environment variable (which won't be read), these override these settings by using a ulong value in the AppContext.

For example, you can use `AppContext.SetData("GCHeapHardLimit", (ulong) 100 * 1024 * 1024)` to override the GCHeapHardLimit to 100M.

This API only handles configs that can be handled when the runtime is loaded. For configs that don't have any effects on 32-bit systems (like the GCHeapHardLimit* ones), this API will not handle it.

## GC.RegisterForFullGCNotification(Int32, Int32) method

```csharp
public static void RegisterForFullGCNotification (int maxGenerationThreshold, int largeObjectHeapThreshold);
```

Specifies that a garbage collection notification should be raised when conditions favor full garbage collection and when the collection has been completed.

Parameters:

- `maxGenerationThreshold`: A number between 1 and 99 that specifies when the notification should be raised based on the objects allocated in generation 2.
- `largeObjectHeapThreshold`: A number between 1 and 99 that specifies when the notification should be raised based on objects allocated in the large object heap.

Exceptions:

- `ArgumentOutOfRangeException`: `maxGenerationThreshold` or `largeObjectHeapThreshold` is not between 1 and 99.
- `InvalidOperationException`: This member is not available when concurrent garbage collection is enabled. See the <gcConcurrent> runtime setting for information about how to disable concurrent garbage collection.

#### Remarks
For each generation, the garbage collector sets a threshold for allocations into that generation. When the size of allocations exceeds this threshold, a garbage collection is triggered on that generation. For example, if generation 2's threshold is 20MB (which means that 20MB survives generation 1 collections and is promoted into generation 2), and more than 20MB has survived generation 1 and is prompted into generation 2, the next garbage collection will be attempted as a generation 2 collection. Similarly, if the large object heap's (LOH's) threshold is 20MB and your app has allocated more than 20MB of large objects, the next garbage collection will also be attempted as a generation 2 collection (since the LOH is only collected in gen2 garbage collections).

The `maxGenerationThreshold` and `largeObjectHeapThreshold` thresholds control how much in advance you are notified before a full garbage collection occurs. The greater the threshold, the more allocations that can occur between notification and the next full garbage collection.

If you have situations in which a full garbage collection by the common language runtime would adversely affect your application's performance, you can ask to be notified when the runtime is about to do a full garbage collection and circumvent that collection by inducing a collection yourself (using the `GC.Collect` method) when conditions are still favorable. In addition to changing the garbage collection schedule yourself, full GC notification is useful in following the scenarios:

- You monitor for the approach of a full garbage collection and, when you are notified that one is approaching, you reduce live data size (for example, by releasing some cache entries). As a result, when the garbage collection occurs, it is able to reclaim more memory.

- You monitor for the completion of a full garbage collection so that you can collect some statistics.  For example, you might want to measure the size of the heap at GC completion so that you know the size of live data. (After a full GC, the heap is at its smallest size.)

For more information about what represents a full garbage collection, see Garbage Collection Notifications.

When you register for a garbage collection notification, you can be notified when a full garbage collection is approaching and when it is completed. This pattern resembles how the operating system monitors for low memory notifications.

Use the following guidelines for specifying the `maxGenerationThreshold` and `largeObjectHeapThreshold` parameters:

- The larger the threshold value, the more allocations will occur between the notification and the full garbage collection.

A larger threshold value provides more opportunities for the runtime to check for an approaching collection. This increases the likelihood that you will be notified. However, you should not set the threshold too high because that results in more allocations before the runtime induces the next collection.

When you induce a collection yourself upon notification using a high threshold value, fewer objects are reclaimed than would be reclaimed by the runtime's next collection.

- The smaller the threshold value, the fewer the allocations between notification and the full garbage collection.

#### Examples
The following example shows how to register a garbage collection notification and start a thread to monitor the status of the garbage collection notification. This code example is part of a larger example provided for Garbage Collection Notifications topic.

_Code sample not included: ~/snippets/csharp/System/GC/CancelFullGCNotification/Program.cs._

## GC.RegisterNoGCRegionCallback(Int64, Action) method

```csharp
public static void RegisterNoGCRegionCallback (long totalSize, Action callback);
```

Registers a callback to be invoked when a certain amount of memory is allocated in the no GC region.

Parameters:

- `totalSize`: The total size of the no GC region.
- `callback`: The callback to be executed when a certain amount of memory is allocated in the no GC region.

Exceptions:

- `ArgumentOutOfRangeException`: `totalSize` is less than or equal to 0.
- `ArgumentNullException`: The `callback` argument is `null`.
- `InvalidOperationException`: The GC is not currently under a NoGC region.

-or-

Another callback is already registered.

-or-

The `totalSize` exceeds the size of the No GC region.

-or-

The operation to withhold memory for the callback failed.

To be added.

## GC.RemoveMemoryPressure(Int64) method

```csharp
public static void RemoveMemoryPressure (long bytesAllocated);
```

Informs the runtime that unmanaged memory has been released and no longer needs to be taken into account when scheduling garbage collection.

Parameters:

- `bytesAllocated`: The amount of unmanaged memory that has been released.

Exceptions:

- `ArgumentOutOfRangeException`: `bytesAllocated` is less than or equal to 0.

-or-

On a 32-bit computer, `bytesAllocated` is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The common pattern for releasing native resources is via a type's finalizer. If a managed object uses native memory, it can free that native memory in its finalizer. The garbage collector only knows about managed memory and schedules collections based on this knowledge. Imagine a scenario where a small managed object is associated with a large amount of native memory usage, and this managed object now lives in gen2. A gen2 GC might not happen for some time, which means the large amount of native memory won't be released until the next gen2 happens. The runtime provides the `GC.AddMemoryPressure` and `GC.RemoveMemoryPressure` methods to help with this scenario. The runtime keeps an internal record of how much memory pressure these APIs added and removed, and triggers a gen2 GC if deemed productive. So this is not a feature of the GC but rather something that the runtime provides to trigger GCs.

The `GC.AddMemoryPressure` and `GC.RemoveMemoryPressure` methods improve performance only for types that exclusively depend on finalizers to release the unmanaged resources. It's not necessary to use these methods in types that follow the dispose pattern, where finalizers are used to clean up unmanaged resources only in the event that a consumer of the type forgets to call `Dispose`. For more information on object finalization and the dispose pattern, see Cleaning Up Unmanaged Resources.

In the simplest usage pattern, a managed object allocates unmanaged memory in the constructor and releases it in the `Finalize` method. Call the `GC.AddMemoryPressure` method after allocating the unmanaged memory, and call the `GC.RemoveMemoryPressure` method after releasing it.

In more complicated scenarios, where the unmanaged memory allocation changes substantially during the lifetime of the managed object, you can call the `GC.AddMemoryPressure` and `GC.RemoveMemoryPressure` methods to communicate these incremental changes to the runtime.

> **Caution:**
>  You must ensure that you remove exactly the amount of pressure you add. Failing to do so can adversely affect the performance of the system in applications that run for long periods of time.

## GC.ReRegisterForFinalize(Object) method

```csharp
public static void ReRegisterForFinalize (object obj);
```

Requests that the system call the finalizer for the specified object for which `GC.SuppressFinalize` has previously been called.

Parameters:

- `obj`: The object that a finalizer must be called for.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

#### Remarks
The `GC.ReRegisterForFinalize` method adds the `obj` parameter to the list of objects that request finalization before the garbage collector frees the object. The `obj` parameter must be the caller of this method.

Calling the `GC.ReRegisterForFinalize` method does not guarantee that the garbage collector will call an object's finalizer.

By default, all objects that implement finalizers are added to the list of objects that require finalization; however, an object might have already been finalized or might have disabled finalization by calling the `GC.SuppressFinalize` method.

A finalizer can use this method to resurrect itself or an object that it references.

#### Examples
The following example demonstrates how to use the `GC.ReRegisterForFinalize` method to finalize an object a second time after garbage collection.

_Code sample not included: ~/snippets/csharp/System/GC/ReRegisterForFinalize/class1.cs._
