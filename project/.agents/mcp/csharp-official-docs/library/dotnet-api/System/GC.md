---
title: "GC class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GC class

Namespace: `System`

```csharp
public static class GC
```

Controls the system garbage collector, a service that automatically reclaims unused memory.

The `GC` class controls the garbage collector. The garbage collector is a common language runtime component that controls the allocation and release of managed memory. The methods in this class influence when garbage collection is performed on an object and when resources allocated by an object are released. Properties in this class provide information about the total amount of memory available in the system and the age category, or generation, of memory allocated to an object.

The garbage collector tracks and reclaims objects allocated in managed memory. Periodically, the garbage collector performs garbage collection to reclaim memory allocated to objects for which there are no valid references. Garbage collection happens automatically when a request for memory cannot be satisfied using available free memory. Alternatively, an application can force garbage collection using the `GC.Collect` method.

Garbage collection consists of the following steps:

1. The garbage collector searches for managed objects that are referenced in managed code.
2. The garbage collector tries to finalize objects that are not referenced.
3. The garbage collector frees objects that are not referenced and reclaims their memory.

#### Unmanaged resources

During a collection, the garbage collector will not free an object if it finds one or more references to the object in managed code. However, the garbage collector does not recognize references to an object from unmanaged code, and might free objects that are being used exclusively in unmanaged code unless explicitly prevented from doing so. The `GC.KeepAlive` method provides a mechanism that prevents the garbage collector from collecting objects that are still in use in unmanaged code.

Aside from managed memory allocations, implementations of the garbage collector do not maintain information about resources held by an object, such as file handles or database connections. When a type uses unmanaged resources that must be released before instances of the type are reclaimed, the type can implement a finalizer.

In most cases, finalizers are implemented by overriding the `Object.Finalize` method; however, types written in C# or C++ implement destructors, which compilers turn into an override of `Object.Finalize`. In most cases, if an object has a finalizer, the garbage collector calls it prior to freeing the object. However, the garbage collector is not required to call finalizers in all situations; for example, the `GC.SuppressFinalize` method explicitly prevents an object's finalizer from being called. Also, the garbage collector is not required to use a specific thread to finalize objects, or guarantee the order in which finalizers are called for objects that reference each other but are otherwise available for garbage collection.

In scenarios where resources must be released at a specific time, classes can implement the `IDisposable` interface, which contains the `IDisposable.Dispose` method that performs resource management and cleanup tasks. Classes that implement `IDisposable.Dispose` must specify, as part of their class contract, if and when class consumers call the method to clean up the object. The garbage collector does not, by default, call the `IDisposable.Dispose` method; however, implementations of the `IDisposable.Dispose` method can call methods in the `GC` class to customize the finalization behavior of the garbage collector.

For more information on object finalization and the dispose pattern, see Cleaning Up Unmanaged Resources.

#### Object aging and generations

The garbage collector in the common language runtime supports object aging using generations. A generation is a unit of measure of the relative age of objects in memory. The generation number, or age, of an object indicates the generation to which an object belongs. Objects created more recently are part of newer generations, and have lower generation numbers than objects created earlier in the application life cycle. Objects in the most recent generation are in generation 0. This implementation of the garbage collector supports three generations of objects, generations 0, 1, and 2. You can retrieve the value of the `MaxGeneration` property to determine the maximum generation number supported by the system.

Object aging allows applications to target garbage collection at a specific set of generations rather than requiring the garbage collector to evaluate all generations. Overloads of the `GC.Collect` method that include a `generation` parameter allow you to specify the oldest generation to be garbage collected.

#### Disallowing garbage collection

The garbage collector supports a no GC region latency mode that can be used during the execution of critical paths in which garbage collection can adversely affect an app's performance. The no GC region latency mode requires that you specify an amount of memory that can be allocated without interference from the garbage collector. If the runtime can allocate that memory, the runtime will not perform a garbage collection while code in the critical path is executing.

You define the beginning of the critical path of the no GC region by calling one of the overloads of the `GC.TryStartNoGCRegion`. You specify the end of its critical path by calling the `GC.EndNoGCRegion` method.

You cannot nest calls to the `GC.TryStartNoGCRegion` method, and you should only call the `GC.EndNoGCRegion` method if the runtime is currently in no GC region latency mode. In other words, you should not call `GC.TryStartNoGCRegion` multiple times (after the first method call, subsequent calls will not succeed), and you should not expect calls to `GC.EndNoGCRegion` to succeed just because the first call to `GC.TryStartNoGCRegion` succeeded.

The following example uses several GC methods to get generation and memory information about a block of unused objects and print it to the console. The unused objects are then collected, and the resulting memory totals are displayed.

_Code sample not included: ~/snippets/csharp/System/GC/Overview/class1.cs._

## GC.MaxGeneration property

```csharp
public static int MaxGeneration { get; }
```

Gets the maximum number of generations that the system currently supports.

Returns: A value that ranges from zero to the maximum number of supported generations.

#### Remarks
The generation number, or age, of an object is an implementation-defined relative measure of an object's lifespan. The most recently created objects are in generation 0 and the oldest objects are in a generation less than or equal to the generation returned by the `MaxGeneration` property.

The garbage collector assumes that newer memory is more likely to be eligible for garbage collection than older memory. Therefore, the garbage collector improves its performance by adjusting generation numbers each time it reclaims memory, and the `MaxGeneration` property value can grow over time.

If object aging is implemented, the `MaxGeneration` property returns the maximum generation number used by the system; otherwise, this property returns zero.

For this implementation, the value returned by the `MaxGeneration` property is guaranteed to remain constant for the lifetime of an executing application.

Use the `MaxGeneration` property to determine the maximum value you can specify when calling the `Collect` method that takes a generation parameter.

#### Examples
The following example demonstrates how to use the `MaxGeneration` property to display the largest generation number currently in use.

_Code sample not included: ~/snippets/csharp/System/GC/Overview/class1.cs._

## GC.AddMemoryPressure(Int64) method

```csharp
public static void AddMemoryPressure (long bytesAllocated);
```

Informs the runtime of a large allocation of unmanaged memory that should be taken into account when scheduling garbage collection.

Parameters:

- `bytesAllocated`: The incremental amount of unmanaged memory that has been allocated.

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

## GC.AllocateArray<T>(Int32, Boolean) method

```csharp
public static T[] AllocateArray<T> (int length, bool pinned = false);
```

Allocates an array.

Parameters:

- `T`: Specifies the type of the array element.
- `length`: Specifies the length of the array.
- `pinned`: Specifies whether the allocated array must be pinned.

Returns: An array object.

To be added.

## GC.AllocateUninitializedArray<T>(Int32, Boolean) method

```csharp
public static T[] AllocateUninitializedArray<T> (int length, bool pinned = false);
```

Allocates an array while skipping zero-initialization, if possible.

Parameters:

- `T`: Specifies the type of the array element.
- `length`: Specifies the length of the array.
- `pinned`: Specifies whether the allocated array must be pinned.

Returns: An array object with uninitialized memory.

#### Remarks

Skipping zero-initialization is a security risk. The uninitialized array can contain invalid valuetype instances or sensitive information created by other parts of the application.
The code operating on uninitialized arrays should be heavily scrutinized to ensure that the uninitialized data is never read.

Skipping zero-initialization using this API only has a material performance benefit for large arrays, such as buffers of several kilobytes or more.

## GC.CancelFullGCNotification() method

```csharp
public static void CancelFullGCNotification ();
```

Cancels the registration of a garbage collection notification.

Exceptions:

- `InvalidOperationException`: Concurrent garbage collection is enabled.

#### Remarks
This method cancels a garbage collection notification that was registered by using the `GC.RegisterForFullGCNotification` method. You do not have to call this method before adjusting threshold parameter values in subsequent calls to the `GC.RegisterForFullGCNotification` method.

#### Examples
The following example cancels a garbage collection registration. This example is part of a larger example provided for the Garbage Collection Notifications article.

_Code sample not included: ~/snippets/csharp/System/GC/CancelFullGCNotification/Program.cs._

## GC.Collect() method

```csharp
public static void Collect ();
```

Forces an immediate garbage collection of all generations.

#### Remarks
Use this method to try to reclaim all memory that is inaccessible. It performs a blocking garbage collection of all generations.

All objects, regardless of how long they have been in memory, are considered for collection; however, objects that are referenced in managed code are not collected. Use this method to force the system to try to reclaim the maximum amount of available memory.

You can compact the large object heap (LOH) by setting the `LargeObjectHeapCompactionMode` property to `CompactOnce` before calling the `GC.Collect` method, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System/GC/Collect/lohcompactionmode1.cs._

#### Examples
The following example demonstrates how to use the `GC.Collect` method to perform a collection on all generations of memory. The code generates a number of unused objects, and then calls the `GC.Collect` method to clean them from memory.

_Code sample not included: ~/snippets/csharp/System/GC/Collect/class1.cs._
