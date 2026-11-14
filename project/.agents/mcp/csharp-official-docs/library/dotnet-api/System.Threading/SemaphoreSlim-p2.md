---
title: "SemaphoreSlim class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SemaphoreSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SemaphoreSlim class (part 2 of 2)

## SemaphoreSlim.Wait(Int32, CancellationToken) method

```csharp
public bool Wait (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until it can enter the `SemaphoreSlim`, using a 32-bit signed integer that specifies the timeout, while observing a `CancellationToken`.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, `Timeout.Infinite` (-1) to wait indefinitely, or zero to test the state of the wait handle and return immediately.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the current thread successfully entered the `SemaphoreSlim`; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` was canceled.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite timeout.

-or-

`millisecondsTimeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The `SemaphoreSlim` instance has been disposed, or the `CancellationTokenSource` that created `cancellationToken` has been disposed.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

If `cancellationToken` is cancelled, or if a thread or task is blocked when calling `Wait` and the timeout interval specified by `millisecondsTimeout` expires:

- The thread or task doesn't enter the semaphore.
- The `CurrentCount` property isn't decremented.

If `cancellationToken` is cancelled, the method throws an `OperationCanceledException` exception.

## SemaphoreSlim.Wait(TimeSpan, CancellationToken) method

```csharp
public bool Wait (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until it can enter the `SemaphoreSlim`, using a `TimeSpan` that specifies the timeout, while observing a `CancellationToken`.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, a `TimeSpan` that represents -1 milliseconds to wait indefinitely, or a `TimeSpan` that represents 0 milliseconds to test the wait handle and return immediately.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if the current thread successfully entered the `SemaphoreSlim`; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` was canceled.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1, which represents an infinite timeout.

-or-

In .NET 9 and earlier versions, `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The semaphoreSlim instance has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

If `cancellationToken` is cancelled, or if a thread or task is blocked when calling `Wait` and the timeout interval specified by `millisecondsTimeout` expires:

- The thread or task doesn't enter the semaphore.
- The `CurrentCount` property isn't decremented.

If `cancellationToken` is cancelled, the method throws an `OperationCanceledException` exception.

## SemaphoreSlim.WaitAsync() method

```csharp
public System.Threading.Tasks.Task WaitAsync ();
```

Asynchronously waits to enter the `SemaphoreSlim`.

Returns: A task that will complete when the semaphore has been entered.

Exceptions:

- `ObjectDisposedException`: The `SemaphoreSlim` has been disposed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `SemaphoreSlim.Wait`.

## SemaphoreSlim.WaitAsync(Int32) method

```csharp
public System.Threading.Tasks.Task<bool> WaitAsync (int millisecondsTimeout);
```

Asynchronously waits to enter the `SemaphoreSlim`, using a 32-bit signed integer to measure the time interval.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, `Timeout.Infinite` (-1) to wait indefinitely, or zero to test the state of the wait handle and return immediately.

Returns: A task that will complete with a result of `true` if the current thread successfully entered the `SemaphoreSlim`, otherwise with a result of `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite timeout.

-or-

`millisecondsTimeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Wait`.

## SemaphoreSlim.WaitAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously waits to enter the `SemaphoreSlim`, while observing a `CancellationToken`.

Parameters:

- `cancellationToken`: The `CancellationToken` token to observe.

Returns: A task that will complete when the semaphore has been entered.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `OperationCanceledException`: `cancellationToken` was canceled.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `SemaphoreSlim.Wait`.

## SemaphoreSlim.WaitAsync(TimeSpan) method

```csharp
public System.Threading.Tasks.Task<bool> WaitAsync (TimeSpan timeout);
```

Asynchronously waits to enter the `SemaphoreSlim`, using a `TimeSpan` to measure the time interval.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, a `TimeSpan` that represents -1 milliseconds to wait indefinitely, or a `TimeSpan` that represents 0 milliseconds to test the wait handle and return immediately.

Returns: A task that will complete with a result of `true` if the current thread successfully entered the `SemaphoreSlim`, otherwise with a result of `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1, which represents an infinite timeout.

-or-

In .NET 9 and earlier versions, `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Wait`.

## SemaphoreSlim.WaitAsync(Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<bool> WaitAsync (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Asynchronously waits to enter the `SemaphoreSlim`, using a 32-bit signed integer to measure the time interval, while observing a `CancellationToken`.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, `Timeout.Infinite` (-1) to wait indefinitely, or zero to test the state of the wait handle and return immediately.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: A task that will complete with a result of `true` if the current thread successfully entered the `SemaphoreSlim`, otherwise with a result of `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a number other than -1, which represents an infinite timeout.

-or-

`millisecondsTimeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The current instance has already been disposed.
- `OperationCanceledException`: `cancellationToken` was canceled.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Wait`.

## SemaphoreSlim.WaitAsync(TimeSpan, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<bool> WaitAsync (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Asynchronously waits to enter the `SemaphoreSlim`, using a `TimeSpan` to measure the time interval, while observing a `CancellationToken`.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, a `TimeSpan` that represents -1 milliseconds to wait indefinitely, or a `TimeSpan` that represents 0 milliseconds to test the wait handle and return immediately.
- `cancellationToken`: The `CancellationToken` token to observe.

Returns: A task that will complete with a result of `true` if the current thread successfully entered the `SemaphoreSlim`, otherwise with a result of `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1, which represents an infinite timeout.

-or-

In .NET 9 and earlier versions, `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `OperationCanceledException`: `cancellationToken` was canceled.
- `ObjectDisposedException`: The `SemaphoreSlim` has been disposed.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Wait`.
