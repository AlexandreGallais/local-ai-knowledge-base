---
title: "GC class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GC class (part 2 of 5)

## GC.Collect(Int32) method

```csharp
public static void Collect (int generation);
```

Forces an immediate garbage collection from generation 0 through a specified generation.

Parameters:

- `generation`: The number of the oldest generation to be garbage collected.

Exceptions:

- `ArgumentOutOfRangeException`: `generation` is not valid.

#### Remarks
Use this method to try to reclaim memory that is inaccessible. However, using this method does not guarantee that all inaccessible memory in the specified generation is reclaimed.

If object aging is implemented, the garbage collector does not collect objects with a generation number that is higher than the specified generation. If object aging is not implemented, the garbage collector considers all objects during the garbage collection.

Use the `MaxGeneration` property to determine the maximum valid value of the `generation` parameter.

To have the garbage collector consider all objects regardless of their generation, use the version of this method that takes no parameters. To have the garbage collector reclaim objects based on a `GCCollectionMode` setting, use the `Collect` method overload.

#### Examples
The following example demonstrates how to use the `GC.Collect` method to perform a collection on individual layers of memory. The code generates a number of unused objects, and then calls the `GC.Collect` method to clean them from memory.

_Code sample not included: ~/snippets/csharp/System/GC/Overview/class1.cs._

## GC.Collect(Int32, GCCollectionMode) method

```csharp
public static void Collect (int generation, GCCollectionMode mode);
```

Forces a garbage collection from generation 0 through a specified generation, at a time specified by a `GCCollectionMode` value.

Parameters:

- `generation`: The number of the oldest generation to be garbage collected.
- `mode`: An enumeration value that specifies whether the garbage collection is forced (`GCCollectionMode.Default` or `GCCollectionMode.Forced`) or optimized (`GCCollectionMode.Optimized`).

Exceptions:

- `ArgumentOutOfRangeException`: `generation` is not valid.

-or-

`mode` is not one of the `GCCollectionMode` values.

#### Remarks
Use the `mode` parameter to specify whether garbage collection should occur immediately or only if the time is optimal to reclaim objects. Using this method does not guarantee that all inaccessible memory in the specified generation is reclaimed.

To adjust the intrusiveness of garbage collection during critical periods in your application, set the `LatencyMode` property.

The garbage collector does not collect objects with a generation number higher than specified by the `generation` parameter. Use the `MaxGeneration` property to determine the maximum valid value of `generation`.

To have the garbage collector consider all objects regardless of their generation, use the version of this method that takes no parameters.

To have the garbage collector reclaim objects up to a specified generation of objects, use the `Collect` method overload. When you specify the maximum generation, all objects are collected.

#### Examples
The following example forces a garbage collection for generation 2 objects with the `Optimized` setting.

_Code sample not included: ~/snippets/csharp/System/GC/Collect/Program.cs._

## GC.Collect(Int32, GCCollectionMode, Boolean) method

```csharp
public static void Collect (int generation, GCCollectionMode mode, bool blocking);
```

Forces a garbage collection from generation 0 through a specified generation, at a time specified by a `GCCollectionMode` value, with a value specifying whether the collection should be blocking.

Parameters:

- `generation`: The number of the oldest generation to be garbage collected.
- `mode`: An enumeration value that specifies whether the garbage collection is forced (`GCCollectionMode.Default` or `GCCollectionMode.Forced`) or optimized (`GCCollectionMode.Optimized`).
- `blocking`: `true` to perform a blocking garbage collection; `false` to perform a background garbage collection where possible.

Exceptions:

- `ArgumentOutOfRangeException`: `generation` is not valid.

-or-

`mode` is not one of the `GCCollectionMode` values.

#### Remarks
The following table summarizes the interaction of the `mode` and `blocking` parameters:

|`mode`|`blocking` is `true`|`blocking` is `false`|
|-|-|-|
|`Forced` or `Default`|A blocking collection is performed as soon as possible. If a background collection is in progress and `generation` is 0 or 1, the `Collect` method immediately triggers a blocking collection and returns when the collection is finished. If a background collection is in progress and `generation` is 2, the method waits until the background collection is finished, triggers a blocking generation 2 collection, and then returns.|A collection is performed as soon as possible. The `Collect` method requests a background collection, but this is not guaranteed; depending on the circumstances, a blocking collection may still be performed. If a background collection is already in progress, the method returns immediately.|
|`Optimized`|A blocking collection may be performed, depending on the state of the garbage collector and the `generation` parameter. The garbage collector tries to provide optimal performance.|A collection may be performed, depending on the state of the garbage collector. The `Collect` method requests a background collection, but this is not guaranteed; depending on the circumstances, a blocking collection may still be performed. The garbage collector tries to provide optimal performance. If a background collection is already in progress, the method returns immediately.|

If a call to the `Collect` method performs a full blocking garbage collection, you can also compact the large object heap by setting the `LargeObjectHeapCompactionMode` property to `CompactOnce` before calling the `GC.Collect` method.

## GC.Collect(Int32, GCCollectionMode, Boolean, Boolean) method

```csharp
public static void Collect (int generation, GCCollectionMode mode, bool blocking, bool compacting);
```

Forces a garbage collection from generation 0 through a specified generation, at a time specified by a `GCCollectionMode` value, with values that specify whether the collection should be blocking and compacting.

Parameters:

- `generation`: The number of the oldest generation to be garbage collected.
- `mode`: An enumeration value that specifies whether the garbage collection is forced (`GCCollectionMode.Default` or `GCCollectionMode.Forced`) or optimized (`GCCollectionMode.Optimized`).
- `blocking`: `true` to perform a blocking garbage collection; `false` to perform a background garbage collection where possible.
- `compacting`: `true` to compact the small object heap; `false` to sweep only.

#### Remarks
If `blocking` is `false`, the GC decides whether to perform a background or a blocking garbage collection. If `compacting` is `true`, it performs a blocking garbage collection.

If `compacting` is `true`, the runtime compacts the small object heap (SOH). The large object heap (LOH) is not compacted unless the `LargeObjectHeapCompactionMode` property is set to `CompactOnce`. Note that this includes all blocking garbage collections, not just full blocking garbage collections.

You can call the `Collect` method to reduce the managed heap to the smallest size possible, as the following code fragment illustrates.

_Code sample not included: ~/snippets/csharp/System/GC/Collect/collect4.cs._

Specifying `true` for the `compacting` argument guarantees a compacting, full blocking garbage collection. Setting the `LargeObjectHeapCompactionMode` property to `CompactOnce` ensures that both the LOH and SOH are compacted.

## GC.CollectionCount(Int32) method

```csharp
public static int CollectionCount (int generation);
```

Returns the number of times garbage collection has occurred for the specified generation of objects.

Parameters:

- `generation`: The generation of objects for which the garbage collection count is to be determined.

Returns: The number of times garbage collection has occurred for the specified generation since the process was started.

Exceptions:

- `ArgumentOutOfRangeException`: `generation` is less than 0.

#### Remarks
If you implement your own resource management, you might need to force garbage collection periodically by calling the `GC.Collect` method. Because this is an expensive operation, you can improve performance by skipping the call when a garbage collection has occurred recently. Save the value returned by `GC.CollectionCount` immediately after calling `GC.Collect`. The next time you need to call `GC.Collect`, compare the current value returned by `GC.CollectionCount` to the saved value. If the two values are equal, no collection has occurred in the interim and it is reasonable to call `GC.Collect` again.

## GC.EndNoGCRegion() method

```csharp
public static void EndNoGCRegion ();
```

Ends the no GC region latency mode.

Exceptions:

- `InvalidOperationException`: The garbage collector is not in no-GC-region latency mode.

-or-

The no-GC-region latency mode was ended previously because a garbage collection was induced.

-or-

A memory allocation exceeded the amount specified in the call to the `GC.TryStartNoGCRegion` method.

#### Remarks

The `GC.EndNoGCRegion` method throws an `InvalidOperationException` if the garbage collector is not in no-GC-region latency mode. This occurs under any of the following conditions:

- The `GC.TryStartNoGCRegion` method was not called previously.
- The call to the `GC.TryStartNoGCRegion` method returned `false`.
- The call to the `GC.TryStartNoGCRegion` method threw an exception.

You can prevent an exception for any of these reasons by using code such as the following:

_Code sample not included: ~/snippets/csharp/System/GC/EndNoGCRegion/endnogcregion1.cs._

## GC.GetAllocatedBytesForCurrentThread() method

```csharp
public static long GetAllocatedBytesForCurrentThread ();
```

Gets the total number of bytes allocated to the current thread since the beginning of its lifetime.

Returns: The total number of bytes allocated to the current thread since the beginning of its lifetime.

#### Remarks

The `GetAllocatedBytesForCurrentThread` method returns the total number of bytes allocated on the managed heap during the lifetime of a thread, not the total number of bytes that have survived garbage collection. The returned value also does not include any native allocations.

This method is most useful in monitoring scenarios for measuring the difference in memory allocation between time intervals or events.

## GC.GetConfigurationVariables() method

```csharp
public static System.Collections.Generic.IReadOnlyDictionary<string,object> GetConfigurationVariables ();
```

Gets the configurations used by the garbage collector.

Returns: A read-only dictionary with the configuration names and values as the keys and values of the dictionary, respectively.

The value of these configurations don't necessarily have to be the same as the ones that are passed by the user. For example, for the `GCHeapCount` configuration, if the user supplies a value higher than the number of CPUs, the configuration that's used is that of the number of CPUs.

## GC.GetGCMemoryInfo() method

```csharp
public static GCMemoryInfo GetGCMemoryInfo ();
```

Gets garbage collection memory information.

Returns: An object that contains information about the garbage collector's memory usage.

To be added.

## GC.GetGCMemoryInfo(GCKind) method

```csharp
public static GCMemoryInfo GetGCMemoryInfo (GCKind kind);
```

Gets garbage collection memory information.

Parameters:

- `kind`: The kind of collection for which to retrieve memory information.

Returns: An object that contains information about the garbage collector's memory usage.

To be added.

## GC.GetGeneration(Object) method

```csharp
public static int GetGeneration (object obj);
```

Returns the current generation number of the specified object.

Parameters:

- `obj`: The object that generation information is retrieved for.

Returns: The current generation number of `obj`, or <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

Use this method to determine the age of an object, and then use that information with the `GC.Collect` method to force the garbage collector to collect objects in the same generation. For example, use this method when you have a set of objects that are created as a group and that become inaccessible at the same time.

Starting in .NET 8, this method might return `MaxValue` for objects allocated on non-GC heaps. For more information, see GC.GetGeneration might return Int32.MaxValue.

#### Examples

The following example demonstrates how to use the `GC.GetGeneration` method to determine the age of an object. The example then performs garbage collections to clean up memory and compare the pre and post collection memory totals in the console.

_Code sample not included: ~/snippets/csharp/System/GC/Overview/class1.cs._

## GC.GetGeneration(WeakReference) method

```csharp
public static int GetGeneration (WeakReference wo);
```

Returns the current generation number of the target of a specified weak reference.

Parameters:

- `wo`: A `WeakReference` that refers to the target object whose generation number is to be determined.

Returns: The current generation number of the target of `wo`, or `Int32.MaxValue`.

Exceptions:

- `ArgumentException`: Garbage collection has already been performed on `wo`.
- `ArgumentNullException`: The target of the weak reference
has already been garbage collected.

#### Remarks

Starting in .NET 8, this method might return `MaxValue` for objects allocated on non-GC heaps. For more information, see GC.GetGeneration might return Int32.MaxValue.

#### Examples

The following example demonstrates the use of the `GC.GetGeneration` method to determine the age of a weak reference object.

_Code sample not included: ~/snippets/csharp/System/GC/GetGeneration/systemgcgetgenerationweak.cs._

## GC.GetTotalAllocatedBytes(Boolean) method

```csharp
public static long GetTotalAllocatedBytes (bool precise = false);
```

Gets a count of the bytes allocated over the lifetime of the process. The returned value does not include any native allocations.

Parameters:

- `precise`: If `true`, gather a precise number; otherwise, gather an approximate count. Gathering a precise value entails a significant performance penalty.

Returns: The total number of bytes allocated over the lifetime of the process.

To be added.
