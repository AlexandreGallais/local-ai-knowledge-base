---
title: "Timer class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Timer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Timer class

Namespace: `System.Threading`

```csharp
public sealed class Timer : MarshalByRefObject, System.Threading.ITimer
```

Provides a mechanism for executing a method on a thread pool thread at specified intervals. This class cannot be inherited.

#### Remarks

Use a `TimerCallback` delegate to specify the method you want the `Timer` to execute. The signature of the `TimerCallback` delegate is:

```csharp
void TimerCallback(Object state)
```

```vb
Sub TimerCallback(state As Object)
```

The timer delegate is specified when the timer is constructed and cannot be changed. The method does not execute on the thread that created the timer; it executes on a `ThreadPool` thread supplied by the system.

> **Tip:**
> .NET includes several timer classes, each of which offers different functionality:
>
> - `Timer`, which fires an event and executes the code in one or more event sinks at regular intervals. The class is intended for use as a server-based or service component in a multithreaded environment; it has no user interface and is not visible at runtime.
> - `Timer`, which executes a single callback method on a thread pool thread at regular intervals. The callback method is defined when the timer is instantiated and cannot be changed. Like the `Timer` class, this class is intended for use as a server-based or service component in a multithreaded environment; it has no user interface and is not visible at runtime.
> - `Timer`, a Windows Forms component that fires an event and executes the code in one or more event sinks at regular intervals. The component has no user interface and is designed for use in a single-threaded environment; it executes on the UI thread.
> - `DispatcherTimer`, a timer that's integrated into the `Dispatcher` queue. This timer is processed with a specified priority at a specified time interval.

When you create a timer, you can specify an amount of time to wait before the first execution of the method (due time), and an amount of time to wait between subsequent executions (period). The `Timer` class has the same resolution as the system clock. This means that if the period is less than the resolution of the system clock, the `TimerCallback` delegate will execute at intervals defined by the resolution of the system clock, which is approximately 15 milliseconds on Windows 7 and Windows 8 systems. You can change the due time and period, or disable the timer, by using the `Timer.Change` method.

> **Note:**
> As long as you are using a `Timer`, you must keep a reference to it. As with any managed object, a `Timer` is subject to garbage collection when there are no references to it. The fact that a `Timer` is still active does not prevent it from being collected.

> **Note:**
> The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

When a timer is no longer needed, use the `Timer.Dispose` method to free the resources held by the timer. Note that callbacks can occur after the `Dispose` method overload has been called, because the timer queues callbacks for execution by thread pool threads. You can use the `Dispose` method overload to wait until all callbacks have completed.

The callback method executed by the timer should be reentrant, because it is called on `ThreadPool` threads. The callback can be executed simultaneously on two thread pool threads if the timer interval is less than the time required to execute the callback, or if all thread pool threads are in use and the callback is queued multiple times.

> **Note:**
> `Timer` is a simple, lightweight timer that uses callback methods and is served by thread pool threads. It is not recommended for use with Windows Forms, because its callbacks do not occur on the user interface thread. `Timer` is a better choice for use with Windows Forms. For server-based timer functionality, you might consider using `Timer`, which raises events and has additional features.

#### Examples

The following example defines a `StatusChecker` class that includes a `CheckStatus` method whose signature is the same as the `TimerCallback` delegate. The  `state` argument of the `CheckStatus` method is an `AutoResetEvent` object that is used to synchronize the application thread and the thread pool thread that executes the callback delegate. The `StatusChecker` class also includes two state variables:

`invokeCount`\
Indicates the number of times the callback method has been invoked.

`maxCount`\
Determines the maximum number of times the callback method should be invoked.

The application thread creates the timer, which waits one second and then executes  the `CheckStatus` callback method every 250 milliseconds. The application thread then blocks until the `AutoResetEvent` object is signaled. When the `CheckStatus` callback method executes `maxCount` times, it calls the `AutoResetEvent.Set` method to set the state of the `AutoResetEvent` object to signaled. The first time this happens, the application thread calls the `Change` method so that the callback method now executes every half second. It once again blocks until the `AutoResetEvent` object is signaled. When this happens, the timer is destroyed by calling its `Timer.Dispose` method, and the application terminates.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/Overview/source.cs._

## Timer.Timer(TimerCallback) constructor

```csharp
public Timer (System.Threading.TimerCallback callback);
```

Initializes a new instance of the `Timer` class with an infinite period and an infinite due time, using the newly created `Timer` object as the state object.

Parameters:

- `callback`: A `TimerCallback` delegate representing a method to be executed.

#### Remarks
Call this constructor when you want to use the `Timer` object itself as the state object. After creating the timer, use the `Timer.Change` method to set the interval and due time.

This constructor specifies an infinite due time before the first callback and an infinite interval between callbacks, in order to prevent the first callback from occurring before the `Timer` object is assigned to the state object.

The method specified for `callback` should be reentrant, because it is called on `ThreadPool` threads. The method can be executed simultaneously on two thread pool threads if the timer interval is less than the time required to execute the method, or if all thread pool threads are in use and the method is queued multiple times.

#### Examples
The following code example creates a new timer, using the timer itself as the state object. The `Timer.Change` method is used to start the timer. When the timer callback occurs, the state object is used to turn the timer off.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/.ctor/source.cs._

## Timer.Timer(TimerCallback, Object, Int32, Int32) constructor

```csharp
public Timer (System.Threading.TimerCallback callback, object? state, int dueTime, int period);
```

Initializes a new instance of the `Timer` class, using a 32-bit signed integer to specify the time interval.

Parameters:

- `callback`: A `TimerCallback` delegate representing a method to be executed.
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

#### Examples
The following code example shows how to create a `TimerCallback` delegate and initialize a new instance of the `Timer` class.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/Overview/source.cs._

## Timer.Timer(TimerCallback, Object, Int64, Int64) constructor

```csharp
public Timer (System.Threading.TimerCallback callback, object? state, long dueTime, long period);
```

Initializes a new instance of the `Timer` class, using 64-bit signed integers to measure time intervals.

Parameters:

- `callback`: A `TimerCallback` delegate representing a method to be executed.
- `state`: An object containing information to be used by the callback method, or `null`.
- `dueTime`: The amount of time to delay before `callback` is invoked, in milliseconds. Specify `Timeout.Infinite` to prevent the timer from starting. Specify zero (0) to start the timer immediately.
- `period`: The time interval between invocations of `callback`, in milliseconds. Specify `Timeout.Infinite` to disable periodic signaling.

Exceptions:

- `ArgumentOutOfRangeException`: The `dueTime` or `period` parameter is negative and is not equal to `Timeout.Infinite`.
- `NotSupportedException`: The `dueTime` or `period` parameter is greater than 4294967294.

#### Remarks
The delegate specified by the `callback` parameter is invoked once after `dueTime` elapses, and thereafter each time the `period` time interval elapses.

If `dueTime` is zero (0), `callback` is invoked immediately. If `dueTime` is `Infinite`, `callback` is not invoked; the timer is disabled, but can be re-enabled by calling the `Timer.Change` method.

Because the `Timer` class has the same resolution as the system clock, which is approximately 15 milliseconds on Windows 7 and Windows 8 systems, the `callback` delegate executes at intervals defined by the resolution of the system clock if `period` is less than the resolution of the system clock.

If `period` is zero (0) or `Infinite` and `dueTime` is not `Infinite`, `callback` is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled using the `Timer.Change` method.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

The method specified for `callback` should be reentrant, because it is called on `ThreadPool` threads. The method can be executed simultaneously on two thread pool threads if the timer interval is less than the time required to execute the method, or if all thread pool threads are in use and the method is queued multiple times.

## Timer.Timer(TimerCallback, Object, TimeSpan, TimeSpan) constructor

```csharp
public Timer (System.Threading.TimerCallback callback, object? state, TimeSpan dueTime, TimeSpan period);
```

Initializes a new instance of the `Timer` class, using `TimeSpan` values to measure time intervals.

Parameters:

- `callback`: A delegate representing a method to be executed.
- `state`: An object containing information to be used by the callback method, or `null`.
- `dueTime`: The amount of time to delay before the `callback` is invoked. Specify `Timeout.InfiniteTimeSpan` to prevent the timer from starting. Specify `TimeSpan.Zero` to start the timer immediately.
- `period`: The time interval between invocations of `callback`. Specify `Timeout.InfiniteTimeSpan` to disable periodic signaling.

Exceptions:

- `ArgumentOutOfRangeException`: The number of milliseconds in the value of `dueTime` or `period` is negative and not equal to `Timeout.Infinite`, or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentNullException`: The `callback` parameter is `null`.

#### Remarks
The delegate specified by the `callback` parameter is invoked once after `dueTime` elapses, and thereafter each time the `period` time interval elapses.

If `dueTime` is zero (0), `callback` is invoked immediately. If `dueTime` is negative one (-1) milliseconds, `callback` is not invoked; the timer is disabled, but can be re-enabled by calling the `Timer.Change` method.

Because the `Timer` class has the same resolution as the system clock, which is approximately 15 milliseconds on Windows 7 and Windows 8 systems, the `callback` delegate executes at intervals defined by the resolution of the system clock if `period` is less than the resolution of the system clock. If `period` is zero (0) or negative one (-1) milliseconds and `dueTime` is positive, `callback` is invoked once; the periodic behavior of the timer is disabled, but can be re-enabled using the `Timer.Change` method.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

The method specified for `callback` should be reentrant, because it is called on `ThreadPool` threads. The method can be executed simultaneously on two thread pool threads if the timer interval is less than the time required to execute the method, or if all thread pool threads are in use and the method is queued multiple times.

#### Examples
The following code example shows how to create a `TimerCallback` delegate and initialize a new instance of the `Timer` class.

_Code sample not included: ~/snippets/csharp/System.Threading/Timer/.ctor/source2.cs._
