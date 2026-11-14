---
title: "WaitHandle class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandle class (part 4 of 4)

## WaitHandle.WaitOne(TimeSpan) method

```csharp
public virtual bool WaitOne (TimeSpan timeout);
```

Blocks the current thread until the current instance receives a signal, using a `TimeSpan` to specify the time interval.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the current instance receives a signal; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The current instance is a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `timeout` is zero, the method does not block. It tests the state of the wait handle and returns immediately.

The caller of this method blocks until the current instance receives a signal or a time-out occurs. Use this method to block until a `WaitHandle` receives a signal from another thread, such as is generated when an asynchronous operation completes. For more information, see the `IAsyncResult` interface.

Override this method to customize the behavior of derived classes.

The maximum value for `timeout` is `MaxValue`.

Calling this method overload is the same as calling the `WaitOne` overload and specifying `false` for `exitContext`.

## WaitHandle.WaitOne(Int32, Boolean) method

```csharp
public virtual bool WaitOne (int millisecondsTimeout, bool exitContext);
```

Blocks the current thread until the current `WaitHandle` receives a signal, using a 32-bit signed integer to specify the time interval and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` if the current instance receives a signal; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The current instance is a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handle and returns immediately.

If a mutex is abandoned, an `AbandonedMutexException` is thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The caller of this method blocks until the current instance receives a signal or a time-out occurs. Use this method to block until a `WaitHandle` receives a signal from another thread, such as is generated when an asynchronous operation completes. For more information, see the `IAsyncResult` interface.

Override this method to customize the behavior of derived classes.

#### Examples
The following example shows how the `WaitOne` method overload behaves when it is called within a synchronization domain. First, a thread waits with `exitContext` set to `false` and blocks until the wait timeout expires. A second thread executes after the first thread terminates and waits with `exitContext` set to `true`. The call to signal the wait handle for this second thread is not blocked, and the thread completes before the wait timeout.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitOne/source.cs._

## WaitHandle.WaitOne(TimeSpan, Boolean) method

```csharp
public virtual bool WaitOne (TimeSpan timeout, bool exitContext);
```

Blocks the current thread until the current instance receives a signal, using a `TimeSpan` to specify the time interval and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` if the current instance receives a signal; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The current instance is a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `timeout` is zero, the method does not block. It tests the state of the wait handle and returns immediately.

If a mutex is abandoned, an `AbandonedMutexException` is thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The caller of this method blocks until the current instance receives a signal or a time-out occurs. Use this method to block until a `WaitHandle` receives a signal from another thread, such as is generated when an asynchronous operation completes. For more information, see the `IAsyncResult` interface.

Override this method to customize the behavior of derived classes.

The maximum value for `timeout` is `MaxValue`.

#### Examples
The following code example shows how to use a wait handle to keep a process from terminating while it waits for a background thread to finish executing.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitOne/source3.cs._

## WaitHandle.InvalidHandle field

```csharp
protected static readonly IntPtr InvalidHandle;
```

Represents an invalid native operating system handle. This field is read-only.

#### Remarks
Used internally to initialize the `Handle` property.

## WaitHandle.WaitTimeout field

```csharp
public const int WaitTimeout = 258;
```

Indicates that a `WaitHandle.WaitAny` operation timed out before any of the wait handles were signaled. This field is constant.

#### Remarks
This field is one of the possible return values of `WaitAny`.

#### Examples
The following code example demonstrates how to use the thread pool to simultaneously search for a file on multiple disks. For space considerations, only the root directory of each disk is searched.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAny/source2.cs._
