---
title: "Task class (part 9 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 9 of 11)

## Task.WaitAny(Task[]) method

```csharp
public static int WaitAny (params System.Threading.Tasks.Task[] tasks);
```

Waits for any of the provided `Task` objects to complete execution.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.

Returns: The index of the completed `Task` object in the `tasks` array.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentException`: The `tasks` argument contains a null element.

#### Examples
The following example launches five tasks, each of which sleeps for a minimum of 50 milliseconds or a maximum of 1,050 milliseconds. The `Task.WaitAny` method then waits for any of the tasks to complete. The example displays the task ID of the task that ended the wait, as well as the current status of all the tasks.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/WaitAny/WaitAny1.cs._

## Task.WaitAny(Task[], Int32) method

```csharp
public static int WaitAny (System.Threading.Tasks.Task[] tasks, int millisecondsTimeout);
```

Waits for any of the provided `Task` objects to complete execution within a specified number of milliseconds.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The index of the completed task in the `tasks` array argument, or -1 if the timeout occurred.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `ArgumentException`: The `tasks` argument contains a null element.

To be added.

## Task.WaitAny(Task[], CancellationToken) method

```csharp
public static int WaitAny (System.Threading.Tasks.Task[] tasks, System.Threading.CancellationToken <example-value>);
```

Waits for any of the provided `Task` objects to complete execution unless the wait is cancelled.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `cancellationToken`: A `TaskFactory.CancellationToken` to observe while waiting for a task to complete.

Returns: The index of the completed task in the `tasks` array argument.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentException`: The `tasks` argument contains a null element.
- `OperationCanceledException`: The `cancellationToken` was canceled.

To be added.

## Task.WaitAny(Task[], TimeSpan) method

```csharp
public static int WaitAny (System.Threading.Tasks.Task[] tasks, TimeSpan timeout);
```

Waits for any of the provided `Task` objects to complete execution within a specified time interval.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: The index of the completed task in the `tasks` array argument, or -1 if the timeout occurred.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentOutOfRangeException`: The `TimeSpan.TotalMilliseconds` property of the `timeout` argument is a negative number other than -1, which represents an infinite time-out.

-or-

The `TimeSpan.TotalMilliseconds` property of the `timeout` argument is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentException`: The `tasks` argument contains a null element.

To be added.

## Task.WaitAny(Task[], Int32, CancellationToken) method

```csharp
public static int WaitAny (System.Threading.Tasks.Task[] tasks, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Waits for any of the provided `Task` objects to complete execution within a specified number of milliseconds or until a cancellation token is cancelled.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A `TaskFactory.CancellationToken` to observe while waiting for a task to complete.

Returns: The index of the completed task in the `tasks` array argument, or -1 if the timeout occurred.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `ArgumentException`: The `tasks` argument contains a null element.
- `OperationCanceledException`: The `cancellationToken` was canceled.

To be added.

## Task.WaitAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitAsync (System.Threading.CancellationToken <example-value>);
```

Gets a `Task` that will complete when this `Task` completes or when the specified `Threading.CancellationToken` has cancellation requested.

Parameters:

- `cancellationToken`: The `Threading.CancellationToken` to monitor for a cancellation request.

Returns: The `Task` representing the asynchronous wait. It may or may not be the same instance as the current instance.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Task.Wait`.

## Task.WaitAsync(TimeSpan) method

```csharp
public System.Threading.Tasks.Task WaitAsync (TimeSpan timeout);
```

Gets a `Task` that will complete when this `Task` completes or when the specified timeout expires.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.

Returns: The `Task` representing the asynchronous wait. It may or may not be the same instance as the current instance.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Task.Wait`.

## Task.WaitAsync(TimeSpan, CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitAsync (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Gets a `Task` that will complete when this `Task` completes, when the specified timeout expires, or when the specified `Threading.CancellationToken` has cancellation requested.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `cancellationToken`: The `Threading.CancellationToken` to monitor for a cancellation request.

Returns: The `Task` representing the asynchronous wait. It may or may not be the same instance as the current instance.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Task.Wait`.

## Task.WaitAsync(TimeSpan, TimeProvider) method

```csharp
public System.Threading.Tasks.Task WaitAsync (TimeSpan timeout, TimeProvider timeProvider);
```

Gets a `Task` that will complete when this `Task` completes or when the specified timeout expires.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.

Returns: The `Task` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

Exceptions:

- `ArgumentNullException`: The `timeProvider` argument is `null`.

To be added.

## Task.WaitAsync(TimeSpan, TimeProvider, CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitAsync (TimeSpan timeout, TimeProvider timeProvider, System.Threading.CancellationToken <example-value>);
```

Gets a `Task` that will complete when this `Task` completes, when the specified timeout expires, or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.
- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

Exceptions:

- `ArgumentNullException`: The `timeProvider` argument is `null`.
- `TimeoutException`: The timeout expired. This exception is stored into the returned task.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Task.WhenAll(Task>) method

```csharp
public static System.Threading.Tasks.Task WhenAll (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task> tasks);
```

Creates a task that will complete when all of the `Task` objects in an enumerable collection have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` collection contained a `null` task.

#### Remarks
The overloads of the `Task.WhenAll` method that return a `Task` object are typically called when you are interested in the status of a set of tasks or in the exceptions thrown by a set of tasks.

> **Note:**
>  The call to `WhenAll` method does not block the calling thread.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a `Faulted` state,  where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the `Canceled` state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the `RanToCompletion` state.

If the supplied array/enumerable contains no tasks, the returned task will immediately transition to a `RanToCompletion` state before it's returned to the caller.

#### Examples
The following example creates a set of tasks that ping the URLs in an array. The tasks are stored in a `List<Task>` collection that is passed to the `WhenAll` method. After the call to the `Task.Wait` method ensures that all threads have completed, the example examines the `Status` property to determine whether any tasks have faulted.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/WhenAll/WhenAll4.cs._

## Task.WhenAll(Task>) method

```csharp
public static System.Threading.Tasks.Task WhenAll (scoped ReadOnlySpan<System.Threading.Tasks.Task> tasks);
```

Creates a task that will complete when all of the supplied tasks have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentException`: The `tasks` array contains a `null` task.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a Faulted state, where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the Canceled state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the RanToCompletion state.

If the supplied span contains no tasks, the returned task will immediately transition to a RanToCompletion state before it's returned to the caller.

## Task.WhenAll(Task[]) method

```csharp
public static System.Threading.Tasks.Task WhenAll (params System.Threading.Tasks.Task[] tasks);
```

Creates a task that will complete when all of the `Task` objects in an array have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` array contained a `null` task.

#### Remarks
The overloads of the `Task.WhenAll` method that return a `Task` object are typically called when you are interested in the status of a set of tasks or in the exceptions thrown by a set of tasks.

> **Note:**
>  The call to `WhenAll` method does not block the calling thread.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a `Faulted` state, where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the `Canceled` state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the `RanToCompletion` state.

If the supplied array/enumerable contains no tasks, the returned task will immediately transition to a `RanToCompletion` state before it's returned to the caller.

#### Examples
The following example creates a set of tasks that ping the URLs in an array. The tasks are stored in a `List<Task>` collection that is converted to an array and passed to the `WhenAll` method. After the call to the `Task.Wait` method ensures that all threads have completed, the example examines the `Status` property to determine whether any tasks have faulted.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/WhenAll/WhenAll3.cs._
