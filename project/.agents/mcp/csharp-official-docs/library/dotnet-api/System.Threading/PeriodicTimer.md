---
title: "PeriodicTimer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/PeriodicTimer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PeriodicTimer class

Namespace: `System.Threading`

```csharp
public sealed class PeriodicTimer : IDisposable
```

Provides a periodic timer that enables waiting asynchronously for timer ticks.

#### Remarks

This timer is intended to be used only by a single consumer at a time: only one call to `WaitForNextTickAsync` may be in flight at any given moment.

`Dispose` may be used concurrently with an active `WaitForNextTickAsync` to interrupt it and cause it to return `false`.

## PeriodicTimer.PeriodicTimer(TimeSpan) constructor

```csharp
public PeriodicTimer (TimeSpan period);
```

Initializes the timer.

Parameters:

- `period`: The time interval in milliseconds between invocations of the callback.

Exceptions:

- `ArgumentOutOfRangeException`: `period` is less than or equal to 0, or greater than or equal to <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

To be added.

## PeriodicTimer.PeriodicTimer(TimeSpan, TimeProvider) constructor

```csharp
public PeriodicTimer (TimeSpan period, TimeProvider timeProvider);
```

Initializes the timer.

Parameters:

- `period`: The period between ticks.
- `timeProvider`: The `TimeProvider` used to interpret `period`.

Exceptions:

- `ArgumentOutOfRangeException`: `period` must be `Timeout.InfiniteTimeSpan` or represent a number of milliseconds equal to or larger than 1 and smaller than `UInt32.MaxValue`.
- `ArgumentNullException`: `timeProvider` is `null`.

To be added.

## PeriodicTimer.Period property

```csharp
public TimeSpan Period { get; set; }
```

Gets or sets the period between ticks.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` must be `Timeout.InfiniteTimeSpan` or represent a number of milliseconds equal to or larger than 1 and smaller than `UInt32.MaxValue`.

All prior ticks of the timer, including any that might be waiting to be consumed by `PeriodicTimer.WaitForNextTickAsync`, are unaffected by changes to `PeriodicTimer.Period`. Setting `PeriodicTimer.Period` affects only the current period and all subsequent times at which the timer will tick.

## PeriodicTimer.Dispose() method

```csharp
public void Dispose ();
```

Stops the timer and releases the associated managed resources.

#### Remarks

`Dispose` will cause an active wait with `WaitForNextTickAsync` to complete with a value of `false`. All subsequent `WaitForNextTickAsync` invocations will produce a value of `false`.

## PeriodicTimer.Finalize() method

```csharp
~PeriodicTimer ();
```

Ensures that resources are freed and other cleanup operations are performed when the garbage collector reclaims the `PeriodicTimer` object.

To be added.

## PeriodicTimer.WaitForNextTickAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<bool> WaitForNextTickAsync (System.Threading.CancellationToken <example-value> = default);
```

Waits for the next tick of the timer, or for the timer to be stopped.

Parameters:

- `cancellationToken`: A `CancellationToken` for cancelling the asynchronous wait. If cancellation is requested, it affects only the single wait operation; the underlying timer continues firing.

Returns: A `ValueTask<T>` that will be completed due to the timer firing, `PeriodicTimer.Dispose` being called to stop the timer, or cancellation being requested.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The result of the returned `ValueTask<T>` is `true` when it's completed due to the timer firing, and `false` when the timer is disposed. The returned `ValueTask<T>` enters the Canceled state when cancellation is requested. If the `CancellationToken` was already canceled when `WaitForNextTickAsync` was called, the returned `ValueTask<T>` is created in the Canceled state.

The `PeriodicTimer` behaves like an auto-reset event, in that multiple ticks are coalesced into a single tick if they occur between calls to `WaitForNextTickAsync`. Similarly, a call to `Dispose` will void any tick not yet consumed. `WaitForNextTickAsync` may only be used by one consumer at a time, and may be used concurrently with a single call to `Dispose`.
