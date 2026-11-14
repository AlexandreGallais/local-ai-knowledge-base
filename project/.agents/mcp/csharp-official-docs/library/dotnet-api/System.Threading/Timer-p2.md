---
title: "Timer class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Timer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Timer class (part 2 of 2)

## Timer.Timer(TimerCallback, Object, UInt32, UInt32) constructor

```csharp
public Timer (System.Threading.TimerCallback callback, object? state, uint dueTime, uint period);
```

Initializes a new instance of the `Timer` class, using 32-bit unsigned integers to measure time intervals.

Parameters:

- `callback`: A delegate representing a method to be executed.
- `state`: An object containing information to be used by the callback method, or `null`.
- `dueTime`: The amount of time to delay before `callback` is invoked, in milliseconds. Specify `Timeout.Infinite` to prevent the timer from starting. Specify zero (0) to start the timer immediately.
- `period`: The time interval between invocations of `callback`, in milliseconds. Specify `Timeout.Infinite` to disable periodic signaling.

Exceptions:

- `ArgumentOutOfRangeException`: The `dueTime` or `period` parameter is negative and is not equal to `Timeout.Infinite`.
- `ArgumentNullException`: The `callback` parameter is `null`.

#### Remarks
The delegate specified by the `callback` parameter is invoked once after `dueTime` elapses, and thereafter each time the `period` time interval elapses.

If `dueTime` is zero (0), `callback` is invoked immediately. If `dueTime` is `Infinite`, `callback` is not invoked; the timer is disabled, but can be re-enabled by calling the `Timer.Change` method.

Because the `Timer` class has the same resolution as the system clock, which is approximately 15 milliseconds on Windows 7 and Windows 8 systems, the `callback` delegate executes at intervals defined by the resolution of the system clock if `period` is less than the resolution of the system clock. If `period` is zero (0) or `Infinite` and `dueTime` is not `Infinite`, `callback` is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled using the `Timer.Change` method.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

The method specified for `callback` should be reentrant, because it is called on `ThreadPool` threads. The method can be executed simultaneously on two thread pool threads if the timer interval is less than the time required to execute the method, or if all thread pool threads are in use and the method is queued multiple times.

## Timer.ActiveCount property

```csharp
public static long ActiveCount { get; }
```

Gets the number of timers that are currently active. An active timer is registered to tick at some point in the future, and has not yet been canceled.

Returns: The number of timers that are currently active.

To be added.

## Timer.Change(Int32, Int32) method

```csharp
public bool Change (int dueTime, int period);
```

Changes the start time and the interval between method invocations for a timer, using 32-bit signed integers to measure time intervals.

Parameters:

- `dueTime`: The amount of time to delay before the invoking the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to prevent the timer from restarting. Specify zero (0) to restart the timer immediately.
- `period`: The time interval between invocations of the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to disable periodic signaling.

Returns: `true` if the timer was successfully updated; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Timer` has already been disposed.
- `ArgumentOutOfRangeException`: The `dueTime` or `period` parameter is negative and is not equal to `Timeout.Infinite`.

#### Remarks
The callback method is invoked once after `dueTime` elapses, and thereafter each time the time interval specified by `period` elapses.

If `dueTime` is zero (0), the callback method is invoked immediately. If `dueTime` is `Infinite`, the callback method is never invoked; the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `dueTime`.

If `period` is zero (0) or `Infinite`, and `dueTime` is not `Infinite`, the callback method is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `period`.

The `Timer.Change` method can be called from the `TimerCallback` delegate.

#### Examples
The following code example demonstrates how to start a `Timer` and, after a set number of invocations, change its period.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/Overview/source.cs._

## Timer.Change(Int64, Int64) method

```csharp
public bool Change (long dueTime, long period);
```

Changes the start time and the interval between method invocations for a timer, using 64-bit signed integers to measure time intervals.

Parameters:

- `dueTime`: The amount of time to delay before the invoking the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to prevent the timer from restarting. Specify zero (0) to restart the timer immediately.  This value must be less than or equal to 4294967294.
- `period`: The time interval between invocations of the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to disable periodic signaling.

Returns: `true` if the timer was successfully updated; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Timer` has already been disposed.
- `ArgumentOutOfRangeException`: `dueTime` or `period` is less than -1.

-or-

`dueTime` or `period` is greater than 4294967294.

#### Remarks
The callback method is invoked once after `dueTime` elapses, and thereafter each time the time interval specified by `period` elapses.

If `dueTime` is zero (0), the callback method is invoked immediately. If `dueTime` is `Infinite`, the callback method is never invoked; the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `dueTime`.

If `period` is zero (0) or `Infinite`, and `dueTime` is not `Infinite`, the callback method is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `period`.

The `Timer.Change` method can be called from the `TimerCallback` delegate.

## Timer.Change(TimeSpan, TimeSpan) method

```csharp
public bool Change (TimeSpan dueTime, TimeSpan period);
```

Changes the start time and the interval between method invocations for a timer, using `TimeSpan` values to measure time intervals.

Parameters:

- `dueTime`: A `TimeSpan` representing the amount of time to delay before invoking the callback method specified when the `Timer` was constructed. Specify `Timeout.InfiniteTimeSpan` to prevent the timer from restarting. Specify `TimeSpan.Zero` to restart the timer immediately.
- `period`: The time interval between invocations of the callback method specified when the `Timer` was constructed. Specify `Timeout.InfiniteTimeSpan` to disable periodic signaling.

Returns: `true` if the timer was successfully updated; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Timer` has already been disposed.
- `ArgumentOutOfRangeException`: The `dueTime` or `period` parameter, in milliseconds, is less than -1.
- `NotSupportedException`: The `dueTime` or `period` parameter, in milliseconds, is greater than 4294967294.

#### Remarks
The callback method is invoked once after `dueTime` elapses, and thereafter each time the time interval specified by `period` elapses.

If `dueTime` is `Zero`, the callback method is invoked immediately. If `dueTime` is `InfiniteTimeSpan`, the callback method is never invoked; the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `dueTime`.

If `period` is `Zero` or `InfiniteTimeSpan`, and `dueTime` is positive, the callback method is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a value greater than zero for `period`.

The `Timer.Change` method can be called from the `TimerCallback` delegate.

#### Examples
The following code example demonstrates how to start a `Timer` and, after a set number of invocations, change its period.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/.ctor/source2.cs._

## Timer.Change(UInt32, UInt32) method

```csharp
public bool Change (uint dueTime, uint period);
```

Changes the start time and the interval between method invocations for a timer, using 32-bit unsigned integers to measure time intervals.

Parameters:

- `dueTime`: The amount of time to delay before the invoking the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to prevent the timer from restarting. Specify zero (0) to restart the timer immediately.
- `period`: The time interval between invocations of the callback method specified when the `Timer` was constructed, in milliseconds. Specify `Timeout.Infinite` to disable periodic signaling.

Returns: `true` if the timer was successfully updated; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Timer` has already been disposed.

#### Remarks
The callback method is invoked once after `dueTime` elapses, and thereafter each time the time interval specified by `period` elapses.

If `dueTime` is zero (0), the callback method is invoked immediately. If `dueTime` is `Infinite`, the callback method is never invoked; the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `dueTime`.

If `period` is zero (0) or `Infinite`, and `dueTime` is not `Infinite`, the callback method is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled by calling `Timer.Change` and specifying a positive value for `period`.

The `Timer.Change` method can be called from the `TimerCallback` delegate.

## Timer.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of `Timer`.

#### Remarks
Calling `Dispose` allows the resources used by the `Timer` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

> **Note:**
>  Callbacks can occur after the `Dispose` method overload has been called, because the timer queues callbacks for execution by thread pool threads. You can use the `Dispose` method overload to wait until all callbacks have completed.

#### Examples
The following code example shows how to free the resources held by a `Timer`.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/Overview/source.cs._

## Timer.Dispose(WaitHandle) method

```csharp
public bool Dispose (System.Threading.WaitHandle notifyObject);
```

Releases all resources used by the current instance of `Timer` and signals when the timer has been disposed of.

Parameters:

- `notifyObject`: The `WaitHandle` to be signaled when the `Timer` has been disposed of.

Returns: `true` if the function succeeds; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `notifyObject` parameter is `null`.

#### Remarks
Calling `Dispose` allows the resources used by the `Timer` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

When this method completes, it signals the `WaitHandle` specified by the `notifyObject` parameter.Use this overload of the `Timer.Dispose` method if you want to be able to block until you are certain that the timer has been disposed. The timer is not disposed until all currently queued callbacks have completed.

> **Note:**
>  If the callback uses the `Timer.Change` method to set the `dueTime` parameter to zero, a race condition can occur when the `Dispose` method overload is called: If the timer queues a new callback before the `Dispose` method overload detects that there are no callbacks queued, `Dispose` continues to block; otherwise, the timer is disposed while the new callback is being queued, and an `ObjectDisposedException` is thrown when the new callback calls the `Timer.Change` method.

## Timer.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Releases all resources used by the current instance of `Timer`.

Returns: A `ValueTask` that completes when all work associated with the timer has ceased.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Timer.Dispose`.
