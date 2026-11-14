---
title: "WaitHandle class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandle class (part 3 of 4)

## WaitHandle.WaitAny(WaitHandle[], Int32) method

```csharp
public static int WaitAny (System.Threading.WaitHandle[] waitHandles, int millisecondsTimeout);
```

Waits for any of the elements in the specified array to receive a signal, using a 32-bit signed integer to specify the time interval.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The array index of the object that satisfied the wait, or `WaitHandle.WaitTimeout` if no object satisfied the wait and a time interval equivalent to `millisecondsTimeout` has passed.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `ArgumentException`: `waitHandles` is an array with no elements.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAny` method throws an `AbandonedMutexException` only when the wait completes because of an abandoned mutex. If `waitHandles` contains a released mutex with a lower index number than the abandoned mutex, the `WaitHandle.WaitAny` method completes normally and the exception is not thrown.

This method returns when the wait terminates, either when any of the handles are signaled or when a timeout occurs. If more than one object becomes signaled during the call, the return value is the array index of the signaled object with the smallest index value of all the signaled objects.

The maximum number of the wait handles is 64, and 63 if the current thread is in `STA` state.

Calling this method overload is the same as calling the `WaitAny` overload and specifying `false` for `exitContext`.

## WaitHandle.WaitAny(WaitHandle[], TimeSpan) method

```csharp
public static int WaitAny (System.Threading.WaitHandle[] waitHandles, TimeSpan timeout);
```

Waits for any of the elements in the specified array to receive a signal, using a `TimeSpan` to specify the time interval.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: The array index of the object that satisfied the wait, or `WaitHandle.WaitTimeout` if no object satisfied the wait and a time interval equivalent to `timeout` has passed.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `ArgumentException`: `waitHandles` is an array with no elements.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `timeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAny` method throws an `AbandonedMutexException` only when the wait completes because of an abandoned mutex. If `waitHandles` contains a released mutex with a lower index number than the abandoned mutex, the `WaitHandle.WaitAny` method completes normally and the exception is not thrown.

This method returns when the wait terminates, either when any of the handles are signaled or when a time-out occurs. If more than one object becomes signaled during the call, the return value is the array index of the signaled object with the smallest index value of all the signaled objects.

The maximum number of the wait handles is 64, and 63 if the current thread is in `STA` state.

The maximum value for `timeout` is `MaxValue`.

Calling this method overload is the same as calling the `WaitAny` overload and specifying `false` for `exitContext`.

## WaitHandle.WaitAny(WaitHandle[], Int32, Boolean) method

```csharp
public static int WaitAny (System.Threading.WaitHandle[] waitHandles, int millisecondsTimeout, bool exitContext);
```

Waits for any of the elements in the specified array to receive a signal, using a 32-bit signed integer to specify the time interval, and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: The array index of the object that satisfied the wait, or `WaitHandle.WaitTimeout` if no object satisfied the wait and a time interval equivalent to `millisecondsTimeout` has passed.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `ArgumentException`: `waitHandles` is an array with no elements.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAny` method throws an `AbandonedMutexException` only when the wait completes because of an abandoned mutex. If `waitHandles` contains a released mutex with a lower index number than the abandoned mutex, the `WaitHandle.WaitAny` method completes normally and the exception is not thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

This method returns when the wait terminates, either when any of the handles are signaled or when a timeout occurs. If more than one object becomes signaled during the call, the return value is the array index of the signaled object with the smallest index value of all the signaled objects.

The maximum number of the wait handles is 64, and 63 if the current thread is in `STA` state.

#### Examples
The following code example demonstrates how to use the thread pool to simultaneously search for a file on multiple disks. For space considerations, only the root directory of each disk is searched.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAny/source2.cs._

## WaitHandle.WaitAny(WaitHandle[], TimeSpan, Boolean) method

```csharp
public static int WaitAny (System.Threading.WaitHandle[] waitHandles, TimeSpan timeout, bool exitContext);
```

Waits for any of the elements in the specified array to receive a signal, using a `TimeSpan` to specify the time interval and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: The array index of the object that satisfied the wait, or `WaitHandle.WaitTimeout` if no object satisfied the wait and a time interval equivalent to `timeout` has passed.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `ArgumentException`: `waitHandles` is an array with no elements.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `timeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAny` method throws an `AbandonedMutexException` only when the wait completes because of an abandoned mutex. If `waitHandles` contains a released mutex with a lower index number than the abandoned mutex, the `WaitHandle.WaitAny` method completes normally and the exception is not thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

This method returns when the wait terminates, either when any of the handles are signaled or when a time-out occurs. If more than one object becomes signaled during the call, the return value is the array index of the signaled object with the smallest index value of all the signaled objects.

The maximum number of the wait handles is 64, and 63 if the current thread is in `STA` state.

The maximum value for `timeout` is `MaxValue`.

#### Examples
The following code example demonstrates how to use the thread pool to simultaneously search for a file on multiple disks. For space considerations, only the root directory of each disk is searched.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAny/source3.cs._

## WaitHandle.WaitOne() method

```csharp
public virtual bool WaitOne ();
```

Blocks the current thread until the current `WaitHandle` receives a signal.

Returns: `true` if the current instance receives a signal. If the current instance is never signaled, `WaitHandle.WaitOne` never returns.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The current instance is a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
`AbandonedMutexException` is thrown when a mutex is abandoned. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The caller of this method blocks indefinitely until the current instance receives a signal. Use this method to block until a `WaitHandle` receives a signal from another thread, such as is generated when an asynchronous operation completes. For more information, see the `IAsyncResult` interface.

Calling this method overload is equivalent to calling the `WaitOne` method overload and specifying -1 or `Infinite` for the first parameter and `false` for the second parameter.

Override this method to customize the behavior of derived classes.

#### Examples
The following code example shows how to use a wait handle to keep a process from terminating while it waits for a background thread to finish executing.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitOne/source1.cs._

## WaitHandle.WaitOne(Int32) method

```csharp
public virtual bool WaitOne (int millisecondsTimeout);
```

Blocks the current thread until the current `WaitHandle` receives a signal, using a 32-bit signed integer to specify the time interval in milliseconds.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if the current instance receives a signal; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The current instance is a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handle and returns immediately.

The caller of this method blocks until the current instance receives a signal or a time-out occurs. Use this method to block until a `WaitHandle` receives a signal from another thread, such as is generated when an asynchronous operation completes. For more information, see the `IAsyncResult` interface.

Override this method to customize the behavior of derived classes.

Calling this method overload is the same as calling the `WaitOne` overload and specifying `false` for `exitContext`.

#### Examples
The following code example shows how to use a wait handle to keep a process from terminating while it waits for a background thread to finish executing.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitOne/source2.cs._
