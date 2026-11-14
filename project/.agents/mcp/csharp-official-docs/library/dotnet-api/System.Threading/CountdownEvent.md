---
title: "CountdownEvent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CountdownEvent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CountdownEvent class

Namespace: `System.Threading`

```csharp
public class CountdownEvent : IDisposable
```

Represents a synchronization primitive that is signaled when its count reaches zero.

#### Examples

The following example shows how to use a `CountdownEvent`:

_Code sample not included: ~/snippets/csharp/System.Threading/CountdownEvent/Overview/countdownevent.cs._

## CountdownEvent.CountdownEvent(Int32) constructor

```csharp
public CountdownEvent (int initialCount);
```

Initializes a new instance of `CountdownEvent` class with the specified count.

Parameters:

- `initialCount`: The number of signals initially required to set the `CountdownEvent`.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCount` is less than 0.

#### Remarks
If `initialCount` is 0, the event is created in a signaled state.

## CountdownEvent.CurrentCount property

```csharp
public int CurrentCount { get; }
```

Gets the number of remaining signals required to set the event.

Returns: The number of remaining signals required to set the event.

To be added.

## CountdownEvent.InitialCount property

```csharp
public int InitialCount { get; }
```

Gets the numbers of signals initially required to set the event.

Returns: The number of signals initially required to set the event.

To be added.

## CountdownEvent.IsSet property

```csharp
public bool IsSet { get; }
```

Indicates whether the `CountdownEvent` object's current count has reached zero.

Returns: `true` if the current count is zero; otherwise, `false`.

#### Remarks
The `CountdownEvent` does not raise an event when the countdown has reached zero. Instead, the `CurrentCount` property equals zero, and the `IsSet` property equals `true`.

## CountdownEvent.WaitHandle property

```csharp
public System.Threading.WaitHandle WaitHandle { get; }
```

Gets a `WaitHandle` that is used to wait for the event to be set.

Returns: A `WaitHandle` that is used to wait for the event to be set.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.

#### Remarks
`CountdownEvent.WaitHandle` should only be used if it's needed for integration with code bases that rely on having a WaitHandle. If all that's needed is to wait for the `CountdownEvent` to be set, the `CountdownEvent.Wait` method should be preferred.

## CountdownEvent.AddCount() method

```csharp
public void AddCount ();
```

Increments the `CountdownEvent`'s current count by one.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: The current instance is already set.

-or-

`CountdownEvent.CurrentCount` is equal to or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## CountdownEvent.AddCount(Int32) method

```csharp
public void AddCount (int signalCount);
```

Increments the `CountdownEvent`'s current count by a specified value.

Parameters:

- `signalCount`: The value by which to increase `CountdownEvent.CurrentCount`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `signalCount` is less than or equal to 0.
- `InvalidOperationException`: The current instance is already set.

-or-

`CountdownEvent.CurrentCount` is equal to or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> after count is incremented by `signalCount`.

To be added.

## CountdownEvent.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `CountdownEvent` class.

#### Remarks
Call `Dispose` when you are finished using the `CountdownEvent`. The `Dispose` method leaves the `CountdownEvent` in an unusable state. After calling `Dispose`, you must release all references to the `CountdownEvent` so the garbage collector can reclaim the memory that the `CountdownEvent` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `CountdownEvent`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CountdownEvent` object's `Finalize` method.

## CountdownEvent.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `CountdownEvent`, and optionally releases the managed resources.

Parameters:

- `disposing`: true to release both managed and unmanaged resources; false to release only unmanaged resources.

#### Remarks
Unlike most of the members of `CountdownEvent`, `CountdownEvent.Dispose` is not thread-safe and may not be used concurrently with other members of this instance.

## CountdownEvent.Reset() method

```csharp
public void Reset ();
```

Resets the `CountdownEvent.CurrentCount` to the value of `CountdownEvent.InitialCount`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.

#### Remarks
Unlike most of the members of `CountdownEvent`, Reset is not thread-safe and may not be used concurrently with other members of this instance.

## CountdownEvent.Reset(Int32) method

```csharp
public void Reset (int count);
```

Resets the `CountdownEvent.InitialCount` property to a specified value.

Parameters:

- `count`: The number of signals required to set the `CountdownEvent`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `count` is less than 0.

#### Remarks
This method resets `CountdownEvent.InitialCount` for all subsequent accesses of the property on the current instance. Unlike most of the members of `CountdownEvent`, Reset is not thread-safe and may not be used concurrently with other members of this instance.

## CountdownEvent.Signal() method

```csharp
public bool Signal ();
```

Registers a signal with the `CountdownEvent`, decrementing the value of `CountdownEvent.CurrentCount`.

Returns: `true` if the signal caused the count to reach zero and the event was set; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: The current instance is already set.

To be added.

## CountdownEvent.Signal(Int32) method

```csharp
public bool Signal (int signalCount);
```

Registers multiple signals with the `CountdownEvent`, decrementing the value of `CountdownEvent.CurrentCount` by the specified amount.

Parameters:

- `signalCount`: The number of signals to register.

Returns: `true` if the signals caused the count to reach zero and the event was set; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `signalCount` is less than 1.
- `InvalidOperationException`: The current instance is already set. -or- Or `signalCount` is greater than `CountdownEvent.CurrentCount`.

To be added.

## CountdownEvent.TryAddCount() method

```csharp
public bool TryAddCount ();
```

Attempts to increment `CountdownEvent.CurrentCount` by one.

Returns: `true` if the increment succeeded; otherwise, false. If `CountdownEvent.CurrentCount` is already at zero, this method will return `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: `CountdownEvent.CurrentCount` is equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## CountdownEvent.TryAddCount(Int32) method

```csharp
public bool TryAddCount (int signalCount);
```

Attempts to increment `CountdownEvent.CurrentCount` by a specified value.

Parameters:

- `signalCount`: The value by which to increase `CountdownEvent.CurrentCount`.

Returns: `true` if the increment succeeded; otherwise, false. If `CountdownEvent.CurrentCount` is already at zero this will return `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `signalCount` is less than or equal to 0.
- `InvalidOperationException`: `CountdownEvent.CurrentCount` + `signalCount` is equal to or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## CountdownEvent.Wait() method

```csharp
public void Wait ();
```

Blocks the current thread until the `CountdownEvent` is set.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.

#### Remarks
The caller of this method blocks indefinitely until the current instance is set. The caller will return immediately if the event is currently in a set state.

## CountdownEvent.Wait(Int32) method

```csharp
public bool Wait (int millisecondsTimeout);
```

Blocks the current thread until the `CountdownEvent` is set, using a 32-bit signed integer to measure the timeout.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.

Returns: `true` if the `CountdownEvent` was set; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

To be added.

## CountdownEvent.Wait(CancellationToken) method

```csharp
public void Wait (System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the `CountdownEvent` is set, while observing a `CancellationToken`.

Parameters:

- `cancellationToken`: The `CancellationToken` to observe.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
The caller of this method blocks indefinitely until the current instance is set. The caller will return immediately if the event is currently in a set state. If the `CancellationToken` being observed is canceled during the wait operation, an `OperationCanceledException` will be thrown.

## CountdownEvent.Wait(TimeSpan) method

```csharp
public bool Wait (TimeSpan timeout);
```

Blocks the current thread until the `CountdownEvent` is set, using a `TimeSpan` to measure the timeout.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the `CountdownEvent` was set; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out -or- timeout is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## CountdownEvent.Wait(Int32, CancellationToken) method

```csharp
public bool Wait (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the `CountdownEvent` is set, using a 32-bit signed integer to measure the timeout, while observing a `CancellationToken`.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the `CountdownEvent` was set; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed. -or- The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

To be added.

## CountdownEvent.Wait(TimeSpan, CancellationToken) method

```csharp
public bool Wait (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the `CountdownEvent` is set, using a `TimeSpan` to measure the timeout, while observing a `CancellationToken`.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the `CountdownEvent` was set; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed. -or- The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out -or- timeout is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.
