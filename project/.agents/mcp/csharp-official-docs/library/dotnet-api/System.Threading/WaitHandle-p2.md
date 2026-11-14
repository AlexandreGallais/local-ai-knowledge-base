---
title: "WaitHandle class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandle class (part 2 of 4)

## WaitHandle.WaitAll(WaitHandle[], Int32) method

```csharp
public static bool WaitAll (System.Threading.WaitHandle[] waitHandles, int millisecondsTimeout);
```

Waits for all the elements in the specified array to receive a signal, using an `Int32` value to specify the time interval.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait. This array cannot contain multiple references to the same object (duplicates).
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` when every element in `waitHandles` has received a signal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.

-or-

`waitHandles` is an array with no elements.
- `DuplicateWaitObjectException`: The `waitHandles` array contains elements that are duplicates.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.

-or-

The current thread is in `ApartmentState.STA` state, and `waitHandles` contains more than one element.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAll` method returns when the wait terminates, which means either when all the handles are signaled or when time-out occurs. If more than 64 handles are passed, a `NotSupportedException` is thrown. If there are duplicates in the array, the call fails with a `DuplicateWaitObjectException`.

> **Note:**
> The `WaitHandle.WaitAll` method is not supported on threads in `STA` state.

Calling this method overload is the same as calling the `WaitAll` overload and specifying `false` for `exitContext`.

## WaitHandle.WaitAll(WaitHandle[], TimeSpan) method

```csharp
public static bool WaitAll (System.Threading.WaitHandle[] waitHandles, TimeSpan timeout);
```

Waits for all the elements in the specified array to receive a signal, using a `TimeSpan` value to specify the time interval.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait. This array cannot contain multiple references to the same object.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds, to wait indefinitely.

Returns: `true` when every element in `waitHandles` has received a signal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.

-or-

`waitHandles` is an array with no elements.
- `DuplicateWaitObjectException`: The `waitHandles` array contains elements that are duplicates.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.

-or-

The current thread is in `ApartmentState.STA` state, and `waitHandles` contains more than one element.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait terminated because a thread exited without releasing a mutex.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
If `timeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

The `WaitHandle.WaitAll` method returns when the wait terminates, which means either all the handles are signaled or a time-out occurs. If more than 64 handles are passed, a `NotSupportedException` is thrown. If the array contains duplicates, the call will fail.

> **Note:**
> The `WaitHandle.WaitAll` method is not supported on threads in `STA` state.

The maximum value for `timeout` is `MaxValue`.

Calling this method overload is the same as calling the `WaitAll` overload and specifying `false` for `exitContext`.

## WaitHandle.WaitAll(WaitHandle[], Int32, Boolean) method

```csharp
public static bool WaitAll (System.Threading.WaitHandle[] waitHandles, int millisecondsTimeout, bool exitContext);
```

Waits for all the elements in the specified array to receive a signal, using an `Int32` value to specify the time interval and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait. This array cannot contain multiple references to the same object (duplicates).
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` when every element in `waitHandles` has received a signal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.

-or-

`waitHandles` is an array with no elements.
- `DuplicateWaitObjectException`: The `waitHandles` array contains elements that are duplicates.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.

-or-

The current thread is in `ApartmentState.STA` state, and `waitHandles` contains more than one element.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `millisecondsTimeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

If a mutex is abandoned, an `AbandonedMutexException` is thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The `WaitHandle.WaitAll` method returns when the wait terminates, which means either when all the handles are signaled or when time-out occurs. If more than 64 handles are passed, a `NotSupportedException` is thrown. If there are duplicates in the array, the call fails with a `DuplicateWaitObjectException`.

> **Note:**
> The `WaitHandle.WaitAll` method is not supported on threads in `STA` state.

#### Examples
The following code example shows how to use the thread pool to asynchronously create and write to a group of files. Each write operation is queued as a work item and signals when it is finished. The main thread waits for all the items to signal and then exits.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAll/source2.cs._

## WaitHandle.WaitAll(WaitHandle[], TimeSpan, Boolean) method

```csharp
public static bool WaitAll (System.Threading.WaitHandle[] waitHandles, TimeSpan timeout, bool exitContext);
```

Waits for all the elements in the specified array to receive a signal, using a `TimeSpan` value to specify the time interval, and specifying whether to exit the synchronization domain before the wait.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait. This array cannot contain multiple references to the same object.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds, to wait indefinitely.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` when every element in `waitHandles` has received a signal; otherwise `false`.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.

-or-

`waitHandles` is an array with no elements.
- `DuplicateWaitObjectException`: The `waitHandles` array contains elements that are duplicates.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.

-or-

The `STAThreadAttribute` attribute is applied to the thread procedure for the current thread, and `waitHandles` contains more than one element.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait terminated because a thread exited without releasing a mutex.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks

If `timeout` is zero, the method does not block. It tests the state of the wait handles and returns immediately.

If a mutex is abandoned, an `AbandonedMutexException` is thrown. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The `WaitHandle.WaitAll` method returns when the wait terminates, which means either all the handles are signaled or a time-out occurs. If more than 64 handles are passed, a `NotSupportedException` is thrown. If the array contains duplicates, the call will fail.

> **Note:**
> The `WaitHandle.WaitAll` method is not supported on threads in `STA` state.

The maximum value for `timeout` is `MaxValue`.

#### Examples
The following code example shows how to use the thread pool to asynchronously create and write to a group of files. Each write operation is queued as a work item and signals when it is finished. The main thread waits for all the items to signal and then exits.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAll/source3.cs._

## WaitHandle.WaitAny(WaitHandle[]) method

```csharp
public static int WaitAny (System.Threading.WaitHandle[] waitHandles);
```

Waits for any of the elements in the specified array to receive a signal.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait.

Returns: The array index of the object that satisfied the wait.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array is `null`.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.
- `ArgumentException`: `waitHandles` is an array with no elements.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
`AbandonedMutexException` is thrown when a mutex is abandoned. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The `WaitHandle.WaitAny` method throws an `AbandonedMutexException` only when the wait completes because of an abandoned mutex. If `waitHandles` contains a released mutex with a lower index number than the abandoned mutex, the `WaitHandle.WaitAny` method completes normally and the exception is not thrown.

This method returns when any handle is signaled. If more than one object becomes signaled during the call, the return value is the array index of the signaled object with the smallest index value of all the signaled objects.

The maximum number of the wait handles is 64, and 63 if the current thread is in `STA` state.

Calling this method overload is equivalent to calling the `WaitAny` method overload and specifying -1 (or `Infinite`) for `millisecondsTimeout` and `true` for `exitContext`.

#### Examples
The following code example demonstrates calling the `WaitHandle.WaitAny` method.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/Overview/WaitHandle.cs._
