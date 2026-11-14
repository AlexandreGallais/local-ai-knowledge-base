---
title: "GC class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GC class (part 4 of 5)

## GC.SuppressFinalize(Object) method

```csharp
public static void SuppressFinalize (object obj);
```

Requests that the common language runtime not call the finalizer for the specified object.

Parameters:

- `obj`: The object whose finalizer must not be executed.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

#### Remarks

This method sets a bit in the object header of `obj`, which the runtime checks when calling finalizers. A finalizer, which is represented by the `Object.Finalize` method, is used to release unmanaged resources before an object is garbage-collected.
If `obj` does not have a finalizer or the GC has already signaled the finalizer thread to run the finalizer, the call to the `GC.SuppressFinalize` method has no effect.

Objects that implement the `IDisposable` interface can call this method from the object's `IDisposable.Dispose` implementation to prevent the garbage collector from calling `Object.Finalize` on an object that does not require it. Typically, this is done to prevent the finalizer from releasing unmanaged resources that have already been freed by the `IDisposable.Dispose` implementation.

#### Examples
The following example demonstrates how to use the `GC.SuppressFinalize` method in a resource class to prevent a redundant garbage collection from being called. The example uses the dispose pattern to free both managed resources (that is, objects that implement `IDisposable`) and unmanaged resources.

_Code sample not included: ~/snippets/csharp/System/GC/SuppressFinalize/suppressfinalize1.cs._

## GC.TryStartNoGCRegion(Int64) method

```csharp
public static bool TryStartNoGCRegion (long totalSize);
```

Attempts to disallow garbage collection during the execution of a critical path if a specified amount of memory is available.

Parameters:

- `totalSize`: The amount of memory in bytes to allocate without triggering a garbage collection. It must be less than or equal to the size of an ephemeral segment. For information on the size of an ephemeral segment, see the "Ephemeral generations and segments" section in the Fundamentals of Garbage Collection article.

Returns: `true` if the runtime was able to commit the required amount of memory and the garbage collector is able to enter no GC region latency mode; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `totalSize` exceeds the ephemeral segment size.
- `InvalidOperationException`: The process is already in no GC region latency mode.

#### Remarks
The `TryStartNoGCRegion` method attempts to place the garbage collector in no GC region latency mode, which disallows garbage collection while an app executes a critical region of code.  If the runtime is unable to initially allocate the requested amount of memory, the garbage collector performs a full blocking garbage collection in an attempt to free additional memory. The garbage collector enters no GC region latency mode if it is able to allocate the required amount of memory, which in this case is actually 2 * `totalSize` bytes (it attempts to allocate `totalSize` bytes for the small object heap and `totalSize` bytes for the large object heap).

`totalSize` must be large enough to handle all memory allocations that occur in the critical path. This includes allocations by the app, as well as allocations that the runtime makes on the app's behalf.

> **Important:**
>  You cannot nest calls to the `GC.TryStartNoGCRegion` method, and you should only call the `GC.EndNoGCRegion` method if the runtime is currently in no GC region latency mode. In other words, you should not call `GC.TryStartNoGCRegion` multiple times (after the first method call, subsequent calls will not succeed), and you should not expect calls to `GC.EndNoGCRegion` to succeed just because the first call to `GC.TryStartNoGCRegion` succeeded.

You exit the no GC region latency mode by calling the `GC.EndNoGCRegion` method.

## GC.TryStartNoGCRegion(Int64, Boolean) method

```csharp
public static bool TryStartNoGCRegion (long totalSize, bool disallowFullBlockingGC);
```

Attempts to disallow garbage collection during the execution of a critical path if a specified amount of memory is available, and controls whether the garbage collector does a full blocking garbage collection if not enough memory is initially available.

Parameters:

- `totalSize`: The amount of memory in bytes to allocate without triggering a garbage collection. It must be less than or equal to the size of an ephemeral segment. For information on the size of an ephemeral segment, see the "Ephemeral generations and segments" section in the Fundamentals of Garbage Collection article.
- `disallowFullBlockingGC`: `true` to omit a full blocking garbage collection if the garbage collector is initially unable to allocate `totalSize` bytes; otherwise, `false`.

Returns: `true` if the runtime was able to commit the required amount of memory and the garbage collector is able to enter no GC region latency mode; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `totalSize` exceeds the ephemeral segment size.
- `InvalidOperationException`: The process is already in no GC region latency mode.

#### Remarks
The `TryStartNoGCRegion` method attempts to place the garbage collector in no GC region latency mode, which disallows garbage collection while an app executes a critical region of code.  If the runtime is unable to initially allocate the requested amount of memory and the `disallowFullBlockingGC` argument is `false`, the garbage collector performs a full blocking garbage collection in an attempt to free additional memory; otherwise, the allocation fails, and the method returns `false`. The garbage collector enters no GC region latency mode if it is able to allocate the required amount of memory, which in this case is actually 2 * `totalSize` (it attempts to allocate `totalSize` for the small object heap and `totalSize` for the large object heap).

`totalSize` must be large enough to handle all memory allocations that occur in the critical path. This includes allocations by the app, as well as allocations that the runtime makes on the app's behalf.

Setting `disallowFullBlockingGC` to `true` to prevent a full blocking garbage collection if not enough memory is initially available is most useful in load balancing scenarios: one system can call this method and report itself as ready to accept requests if it returns `true`, and have the load balancer redirect requests to other systems if it returns `false`. It can then do a full blocking garbage collection when it's not handling requests by calling the `Collect` method.

> **Important:**
>  You cannot nest calls to the `GC.TryStartNoGCRegion` method, and you should only call the `GC.EndNoGCRegion` method if the runtime is currently in no GC region latency mode. In other words, you should not call `GC.TryStartNoGCRegion` multiple times (after the first method call, subsequent calls will not succeed), and you should not expect calls to `GC.EndNoGCRegion` to succeed just because the first call to `GC.TryStartNoGCRegion` succeeded.

You exit the no GC region latency mode by calling the `GC.EndNoGCRegion` method.

## GC.TryStartNoGCRegion(Int64, Int64) method

```csharp
public static bool TryStartNoGCRegion (long totalSize, long lohSize);
```

Attempts to disallow garbage collection during the execution of a critical path if a specified amount of memory is available for the large object heap and the small object heap.

Parameters:

- `totalSize`: The amount of memory in bytes to allocate without triggering a garbage collection. `totalSize` -`lohSize` must be less than or equal to the size of an ephemeral segment. For information on the size of an ephemeral segment, see the "Ephemeral generations and segments" section in the Fundamentals of Garbage Collection article.
- `lohSize`: The number of bytes in `totalSize` to use for large object heap (LOH) allocations.

Returns: `true` if the runtime was able to commit the required amount of memory and the garbage collector is able to enter no GC region latency mode; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `totalSize` - `lohSize` exceeds the ephemeral segment size.
- `InvalidOperationException`: The process is already in no GC region latency mode.

#### Remarks
The `TryStartNoGCRegion` method attempts to place the garbage collector in no GC region latency mode, which disallows garbage collection while an app executes a critical region of code.  If the runtime is unable to initially allocate the requested amount of memory, the garbage collector performs a full blocking garbage collection in an attempt to free additional memory. The garbage collector enters no GC region latency mode if it is able to allocate `lohSize` for the LOH and `totalSize` - `lohSize` for the small object heap (SOH).

`lohSize` must be large enough to handle all memory allocations that occur in the critical path for the LOH, and `totalSize` - `lohSize` must be large enough to handle all memory allocations that occur in the critical path for the SOH. This includes allocations by the app, as well as allocations that the runtime makes on the app's behalf.

> **Important:**
>  You cannot nest calls to the `GC.TryStartNoGCRegion` method, and you should only call the `GC.EndNoGCRegion` method if the runtime is currently in no GC region latency mode. In other words, you should not call `GC.TryStartNoGCRegion` multiple times (after the first method call, subsequent calls will not succeed), and you should not expect calls to `GC.EndNoGCRegion` to succeed just because the first call to `GC.TryStartNoGCRegion` succeeded.

You exit the no GC region latency mode by calling the `GC.EndNoGCRegion` method.

## GC.TryStartNoGCRegion(Int64, Int64, Boolean) method

```csharp
public static bool TryStartNoGCRegion (long totalSize, long lohSize, bool disallowFullBlockingGC);
```

Attempts to disallow garbage collection during the execution of a critical path if a specified amount of memory is available for the large object heap and the small object heap, and controls whether the garbage collector does a full blocking garbage collection if not enough memory is initially available.

Parameters:

- `totalSize`: The amount of memory in bytes to allocate without triggering a garbage collection. `totalSize` -`lohSize` must be less than or equal to the size of an ephemeral segment. For information on the size of an ephemeral segment, see the "Ephemeral generations and segments" section in the Fundamentals of Garbage Collection article.
- `lohSize`: The number of bytes in `totalSize` to use for large object heap (LOH) allocations.
- `disallowFullBlockingGC`: `true` to omit a full blocking garbage collection if the garbage collector is initially unable to allocate the specified memory on the small object heap (SOH) and LOH; otherwise, `false`.

Returns: `true` if the runtime was able to commit the required amount of memory and the garbage collector is able to enter no GC region latency mode; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `totalSize` - `lohSize` exceeds the ephemeral segment size.
- `InvalidOperationException`: The process is already in no GC region latency mode.

#### Remarks
The `TryStartNoGCRegion` method attempts to place the garbage collector in no GC region latency mode, which disallows garbage collection while an app executes a critical region of code.  If the runtime is unable to initially allocate the requested amount of memory and the `disallowFullBlockingGC` argument is `false`, the garbage collector performs a full blocking garbage collection in an attempt to free additional memory; otherwise, the allocation fails, and the method returns `false`. The garbage collector enters no GC region latency mode if it is able to allocate `lohSize` for the LOH and `totalSize` - `lohSize` for the small object heap (SOH).

`lohSize` must be large enough to handle all memory allocations that occur in the critical path for the LOH, and `totalSize` - `lohSize` must be large enough to handle all memory allocations that occur in the critical path for the SOH. This includes allocations by the app, as well as allocations that the runtime makes on the app's behalf.

Setting `disallowFullBlockingGC` to `true` to prevent a full blocking garbage collection if not enough memory is initially available is most useful in load balancing scenarios: one system can call this method and report itself as ready to accept requests if it returns `true`, and have the load balancer redirect requests to other systems if it returns `false`. It can then do a full blocking garbage collection when it's not handling requests by calling the `Collect` method.

> **Important:**
>  You cannot nest calls to the `GC.TryStartNoGCRegion` method, and you should only call the `GC.EndNoGCRegion` method if the runtime is currently in no GC region latency mode. In other words, you should not call `GC.TryStartNoGCRegion` multiple times (after the first method call, subsequent calls will not succeed), and you should not expect calls to `GC.EndNoGCRegion` to succeed just because the first call to `GC.TryStartNoGCRegion` succeeded.

You exit the no GC region latency mode by calling the `GC.EndNoGCRegion` method.
