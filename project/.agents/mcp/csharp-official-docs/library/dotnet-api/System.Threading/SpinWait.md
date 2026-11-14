---
title: "SpinWait struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SpinWait.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpinWait struct

Namespace: `System.Threading`

```csharp
public struct SpinWait
```

Provides support for spin-based waiting.

#### Remarks
`SpinWait` encapsulates common spinning logic. On single-processor machines, yields are always used instead of busy waits, and on computers with Intel processors employing Hyper-Threading technology, it helps to prevent hardware thread starvation. SpinWait encapsulates a good mixture of spinning and true yielding.

`SpinWait` is a value type, which means that low-level code can utilize SpinWait without fear of unnecessary allocation overheads. SpinWait is not generally useful for ordinary applications. In most cases, you should use the synchronization classes provided by .NET, such as `Monitor`. For most purposes where spin waiting is required, however, the `SpinWait` type should be preferred over the `Thread.SpinWait` method.

#### Examples
The following example shows how to use a `SpinWait`:

_Code sample not included: ~/snippets/csharp/System.Threading/SpinWait/Overview/spinwait.cs._

## SpinWait.Count property

```csharp
public int Count { get; }
```

Gets the number of times `SpinWait.SpinOnce` has been called on this instance.

Returns: Returns an integer that represents the number of times `SpinWait.SpinOnce` has been called on this instance.

To be added.

## SpinWait.NextSpinWillYield property

```csharp
public bool NextSpinWillYield { get; }
```

Gets whether the next call to `SpinWait.SpinOnce` will yield the processor, triggering a forced context switch.

Returns: Whether the next call to `SpinWait.SpinOnce` will yield the processor, triggering a forced context switch.

#### Remarks
On a single-CPU machine, `SpinWait.SpinOnce` always yields the processor. On machines with multiple CPUs, `SpinWait.SpinOnce` may yield after an unspecified number of calls.

## SpinWait.Reset() method

```csharp
public void Reset ();
```

Resets the spin counter.

#### Remarks
This makes `SpinWait.SpinOnce` and `SpinWait.NextSpinWillYield` behave as though no calls to `SpinWait.SpinOnce` had been issued on this instance. If a `SpinWait` instance is reused many times, it may be useful to reset it to avoid yielding too soon.

#### Examples
The following is an example of using SpinWait in a simple lock-free stack implementation. (This is just an example. If an efficient, thread-safe stack is needed, consider using ConcurrentStack.)

_Code sample not included: ~/snippets/csharp/System.Threading/SpinWait/Overview/reset.cs._

## SpinWait.SpinOnce() method

```csharp
public void SpinOnce ();
```

Performs a single spin.

#### Remarks
This method is typically called in a loop and may change in behavior based on the number of times `SpinWait.SpinOnce` has been called so far on this instance. Each spin results in the `Thread.SpinWait` method being called. A count is kept of the number of times `SpinWait.SpinOnce` is called, and after a threshold count is reached, the `Thread.Yield` method is called.

## SpinWait.SpinOnce(Int32) method

```csharp
public void SpinOnce (int sleep1Threshold);
```

Performs a single spin and calls `Thread.Sleep` after a minimum spin count.

Parameters:

- `sleep1Threshold`: A minimum spin count after which `Thread.Sleep(1)` may be used. A value of -1 disables the use of `Thread.Sleep(1)`.

Exceptions:

- `ArgumentOutOfRangeException`: `sleep1Threshold` is less than -1.

This method is typically called in a loop and may change in behavior based on the number of times `SpinOnce` has been called so far on this instance.

## SpinWait.SpinUntil(Boolean>) method

```csharp
public static void SpinUntil (Func<bool> condition);
```

Spins until the specified condition is satisfied.

Parameters:

- `condition`: A delegate to be executed over and over until it returns true.

Exceptions:

- `ArgumentNullException`: The `condition` argument is null.

To be added.

## SpinWait.SpinUntil(Boolean>, Int32) method

```csharp
public static bool SpinUntil (Func<bool> condition, int millisecondsTimeout);
```

Spins until the specified condition is satisfied or until the specified timeout is expired.

Parameters:

- `condition`: A delegate to be executed over and over until it returns true.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if the condition is satisfied within the timeout; otherwise, false.

Exceptions:

- `ArgumentNullException`: The `condition` argument is null.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

To be added.

## SpinWait.SpinUntil(Boolean>, TimeSpan) method

```csharp
public static bool SpinUntil (Func<bool> condition, TimeSpan timeout);
```

Spins until the specified condition is satisfied or until the specified timeout is expired.

Parameters:

- `condition`: A delegate to be executed over and over until it returns true.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a TimeSpan that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the condition is satisfied within the timeout; otherwise, false.

Exceptions:

- `ArgumentNullException`: The `condition` argument is null.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out -or- timeout is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.
