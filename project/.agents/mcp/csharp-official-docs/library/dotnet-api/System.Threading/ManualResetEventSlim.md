---
title: "ManualResetEventSlim class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ManualResetEventSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ManualResetEventSlim class

Namespace: `System.Threading`

```csharp
public class ManualResetEventSlim : IDisposable
```

Represents a thread synchronization event that, when signaled, must be reset manually. This class is a lightweight alternative to `ManualResetEvent`.

#### Remarks
You can use this class for better performance than `ManualResetEvent` when wait times are expected to be very short, and when the event does not cross a process boundary. `ManualResetEventSlim` uses busy spinning for a short time while it waits for the event to become signaled. When wait times are short, spinning can be much less expensive than waiting by using wait handles. However, if the event does not become signaled within a certain period of time, `ManualResetEventSlim` resorts to a regular event handle wait.

> **Note:**
> The default spin-waiting duration is short (on the order of tens of microseconds), depending on platform and processor. If you expect wait times to be much longer than that, you can still use this class instead of `ManualResetEvent` (perhaps configured with less or no spin-waiting). However, the performance benefit would likely be only marginal.

#### Examples
The following example shows how to use a `ManualResetEventSlim`.

_Code sample not included: ~/snippets/csharp/System.Threading/ManualResetEventSlim/Overview/mres.cs._

## ManualResetEventSlim.ManualResetEventSlim() constructor

```csharp
public ManualResetEventSlim ();
```

Initializes a new instance of the `ManualResetEventSlim` class with an initial state of nonsignaled.

To be added.

## ManualResetEventSlim.ManualResetEventSlim(Boolean) constructor

```csharp
public ManualResetEventSlim (bool initialState);
```

Initializes a new instance of the `ManualResetEventSlim` class with a Boolean value indicating whether to set the initial state to signaled.

Parameters:

- `initialState`: true to set the initial state signaled; false to set the initial state to nonsignaled.

To be added.

## ManualResetEventSlim.ManualResetEventSlim(Boolean, Int32) constructor

```csharp
public ManualResetEventSlim (bool initialState, int spinCount);
```

Initializes a new instance of the `ManualResetEventSlim` class with a Boolean value indicating whether to set the initial state to signaled and a specified spin count.

Parameters:

- `initialState`: true to set the initial state to signaled; false to set the initial state to nonsignaled.
- `spinCount`: The number of spin waits that will occur before falling back to a kernel-based wait operation.

Exceptions:

- `ArgumentOutOfRangeException`: `spinCount` is less than 0 or greater than the maximum allowed value.

To be added.

## ManualResetEventSlim.IsSet property

```csharp
public bool IsSet { get; }
```

Gets whether the event is set.

Returns: true if the event is set; otherwise, false.

To be added.

## ManualResetEventSlim.SpinCount property

```csharp
public int SpinCount { get; }
```

Gets the number of spin waits that will occur before falling back to a kernel-based wait operation.

Returns: Returns the number of spin waits that will occur before falling back to a kernel-based wait operation.

To be added.

## ManualResetEventSlim.WaitHandle property

```csharp
public System.Threading.WaitHandle WaitHandle { get; }
```

Gets the underlying `WaitHandle` object for this `ManualResetEventSlim`.

Returns: The underlying `WaitHandle` event object for this `ManualResetEventSlim`.

#### Remarks
Accessing this property forces initialization of an underlying event object if one hasn't already been created. To simply wait on this `ManualResetEventSlim`, the public Wait methods should be preferred. It is recommended to dispose the `ManualResetEventSlim` instance after accessing this property, in order to prevent a resource leak.

## ManualResetEventSlim.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ManualResetEventSlim` class.

#### Remarks
Call `Dispose` when you are finished using the `ManualResetEventSlim`. The `Dispose` method leaves the `ManualResetEventSlim` in an unusable state. After calling `Dispose`, you must release all references to the `ManualResetEventSlim` so the garbage collector can reclaim the memory that the `ManualResetEventSlim` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `ManualResetEventSlim`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `ManualResetEventSlim` object's `Finalize` method.

## ManualResetEventSlim.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `ManualResetEventSlim`, and optionally releases the managed resources.

Parameters:

- `disposing`: true to release both managed and unmanaged resources; false to release only unmanaged resources.

#### Remarks
Unlike most of the members of `ManualResetEventSlim`, `ManualResetEventSlim.Dispose` is not thread-safe and may not be used concurrently with other members of this instance.

## ManualResetEventSlim.Reset() method

```csharp
public void Reset ();
```

Sets the state of the event to nonsignaled, which causes threads to block.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

#### Remarks
`ManualResetEventSlim.Reset` can be called concurrently with all members except `ManualResetEventSlim.WaitHandle`.

## ManualResetEventSlim.Set() method

```csharp
public void Set ();
```

Sets the state of the event to signaled, which allows one or more threads waiting on the event to proceed.

To be added.

## ManualResetEventSlim.Wait() method

```csharp
public void Wait ();
```

Blocks the current thread until the current `ManualResetEventSlim` is set.

Exceptions:

- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `ObjectDisposedException`: The object has already been disposed.

#### Remarks
The caller of this method blocks indefinitely until the current instance is set. The caller will return immediately if the event is currently in a set state.

## ManualResetEventSlim.Wait(Int32) method

```csharp
public bool Wait (int millisecondsTimeout);
```

Blocks the current thread until the current `ManualResetEventSlim` is set, using a 32-bit signed integer to measure the time interval.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.

Returns: `true` if the `ManualResetEventSlim` was set; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## ManualResetEventSlim.Wait(CancellationToken) method

```csharp
public void Wait (System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the current `ManualResetEventSlim` receives a signal, while observing a `CancellationToken`.

Parameters:

- `cancellationToken`: The `CancellationToken` to observe.

Exceptions:

- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `OperationCanceledException`: `cancellationToken` was canceled.
- `ObjectDisposedException`: The object has already been disposed or the `CancellationTokenSource` that created `cancellationToken` has been disposed.
- `OperationCanceledException`: `cancellationToken` was
canceled.

#### Remarks
The caller of this method blocks indefinitely until the current instance is set. The caller will return immediately if the event is currently in a set state.

## ManualResetEventSlim.Wait(TimeSpan) method

```csharp
public bool Wait (TimeSpan timeout);
```

Blocks the current thread until the current `ManualResetEventSlim` is set, using a `TimeSpan` to measure the time interval.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the `ManualResetEventSlim` was set; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

The number of milliseconds in `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## ManualResetEventSlim.Wait(Int32, CancellationToken) method

```csharp
public bool Wait (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the current `ManualResetEventSlim` is set, using a 32-bit signed integer to measure the time interval, while observing a `CancellationToken`.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the `ManualResetEventSlim` was set; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `ObjectDisposedException`: The object has already been disposed or the `CancellationTokenSource` that created `cancellationToken` has been disposed.
- `OperationCanceledException`: `cancellationToken` was canceled.

To be added.

## ManualResetEventSlim.Wait(TimeSpan, CancellationToken) method

```csharp
public bool Wait (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until the current `ManualResetEventSlim` is set, using a `TimeSpan` to measure the time interval, while observing a `CancellationToken`.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the `ManualResetEventSlim` was set; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

The number of milliseconds in `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `InvalidOperationException`: The maximum number of waiters has been exceeded.
- `ObjectDisposedException`: The object has already been disposed or the `CancellationTokenSource` that created `cancellationToken` has been disposed.
- `OperationCanceledException`: `cancellationToken` was canceled.

To be added.
