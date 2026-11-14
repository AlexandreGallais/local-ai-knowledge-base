---
title: "Task class (part 8 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 8 of 11)

## Task.Wait(TimeSpan) method

```csharp
public bool Wait (TimeSpan timeout);
```

Waits for the `Task` to complete execution within a specified time interval.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the `Task` completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
`Wait` is a synchronization method that causes the calling thread to wait for the current task instance to complete until one of the following occurs:

- The task completes successfully.

- The task itself is canceled or throws an exception. In this case, you handle an `AggregateException` exception. The `InnerExceptions` property contains details about the exception or exceptions.

- The interval defined by `timeout` elapses. In this case, the current thread resumes execution and the method returns `false`.

#### Examples
The following example starts a task that generates five million random integers between 0 and 100 and computes their mean. The example uses the `Wait` method to wait for the application to complete within 150 milliseconds. If the application completes normally, the task displays the sum and mean of the random numbers that it has generated. If the timeout interval has elapsed, the example displays a message before it terminates.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Wait/Wait6.cs._

## Task.Wait(Int32, CancellationToken) method

```csharp
public bool Wait (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Waits for the `Task` to complete execution. The wait terminates if a timeout interval elapses or a cancellation token is canceled before the task completes.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Returns: `true` if the `Task` completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
`Wait` is a synchronization method that causes the calling thread to wait for the current task instance to complete until one of the following occurs:

- The task completes successfully.

- The task itself is canceled or throws an exception. In this case, you handle an `AggregateException` exception. The `InnerExceptions` property contains details about the exception or exceptions.

- The `cancellationToken` cancellation token is canceled. In this case, the call to the `Wait` method throws an `OperationCanceledException`.

- The interval defined by `millisecondsTimeout` elapses. In this case, the current thread resumes execution and the method returns `false`.

> **Note:**
>  Canceling the `cancellationToken` cancellation token has no effect on the running task unless it has also been passed the cancellation token and is prepared to handle cancellation. Passing the `cancellationToken` object to this method simply allows the wait to be canceled based on some condition.

#### Examples
The following example calls the `Wait` method to provide both a timeout value and a cancellation token that can end the wait for a task'<example-value>'s completion and is provided both a brief timeout value and a cancellation token.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Wait/wait4.cs._

Note that the precise output from the example depends on whether the wait was canceled because of the cancellation token or because the timeout interval elapsed.

## Task.Wait(TimeSpan, CancellationToken) method

```csharp
public bool Wait (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Waits for the `Task` to complete execution.

Parameters:

- `timeout`: The time to wait, or `Timeout.InfiniteTimeSpan` to wait indefinitely
- `cancellationToken`: A `Threading.CancellationToken` to observe while waiting for the task to complete.

Returns: `true` if the `Task` completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `AggregateException`: The `Task` was canceled

-or-

an exception was thrown during the execution of the `Task`.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an
infinite time-out

-or-

timeout is greater than
`Int32.MaxValue`.
- `OperationCanceledException`: The `cancellationToken` was canceled.

To be added.

## Task.WaitAll(Task>) method

```csharp
public static void WaitAll (scoped ReadOnlySpan<System.Threading.Tasks.Task> tasks);
```

Waits for all of the provided `Task` objects to complete execution.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.

Exceptions:

- `ArgumentNullException`: The `tasks` argument contains a `null` element.
- `AggregateException`: At least one of the `Task` instances was canceled.

-or-

An exception was thrown during
the execution of at least one of the `Task` instances.

To be added.

## Task.WaitAll(Task[]) method

```csharp
public static void WaitAll (params System.Threading.Tasks.Task[] tasks);
```

Waits for all of the provided `Task` objects to complete execution.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.

Exceptions:

- `ObjectDisposedException`: One or more of the `Task` objects in `tasks` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentException`: The `tasks` argument contains a null element.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException` exception contains an `OperationCanceledException` exception in its `AggregateException.InnerExceptions` collection.

-or-

An exception was thrown during the execution of at least one of the `Task` instances.

#### Examples
The following example starts 10 tasks, each of which is passed an index as a state object. Tasks with an index from two to five throw exceptions. The call to the `Task.WaitAll` method wraps all exceptions in an `AggregateException` object and propagates it to the calling thread.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/waitall.cs._

## Task.WaitAll(Task>, CancellationToken) method

```csharp
public static void WaitAll (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task> tasks, System.Threading.CancellationToken <example-value> = default);
```

Waits for all of the provided `Task` objects to complete execution unless the wait is cancelled.

Parameters:

- `tasks`: A collection of tasks on which to wait.
- `cancellationToken`: A token to observe while waiting for the tasks to complete.

Exceptions:

- `ArgumentNullException`: The `tasks` argument is `null`.
- `ArgumentException`: The `tasks` argument contains a `null` element.
- `ObjectDisposedException`: One or more of the `Task` objects in tasks has been disposed.
- `OperationCanceledException`: The `cancellationToken` was canceled.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException`
contains an `OperationCanceledException` in its `AggregateException.InnerExceptions` collection.

To be added.

## Task.WaitAll(Task[], Int32) method

```csharp
public static bool WaitAll (System.Threading.Tasks.Task[] tasks, int millisecondsTimeout);
```

Waits for all of the provided `Task` objects to complete execution within a specified number of milliseconds.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if all of the `Task` instances completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: One or more of the `Task` objects in `tasks` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException` contains an `OperationCanceledException` in its `AggregateException.InnerExceptions` collection.

-or-

An exception was thrown during the execution of at least one of the `Task` instances.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `ArgumentException`: The `tasks` argument contains a null element.

To be added.

## Task.WaitAll(Task[], CancellationToken) method

```csharp
public static void WaitAll (System.Threading.Tasks.Task[] tasks, System.Threading.CancellationToken <example-value>);
```

Waits for all of the provided `Task` objects to complete execution unless the wait is cancelled.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `cancellationToken`: A `TaskFactory.CancellationToken` to observe while waiting for the tasks to complete.

Exceptions:

- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException` contains an `OperationCanceledException` in its `AggregateException.InnerExceptions` collection.

-or-

An exception was thrown during the execution of at least one of the `Task` instances.
- `ArgumentException`: The `tasks` argument contains a null element.
- `ObjectDisposedException`: One or more of the `Task` objects in `tasks` has been disposed.

#### Remarks
The `cancellationToken` argument is used to cancel the wait operation. Cancellation of the tasks is a distinct operation, and is signaled by the `AggregateException` as noted above.

## Task.WaitAll(Task[], TimeSpan) method

```csharp
public static bool WaitAll (System.Threading.Tasks.Task[] tasks, TimeSpan timeout);
```

Waits for all of the provided cancellable `Task` objects to complete execution within a specified time interval.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if all of the `Task` instances completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: One or more of the `Task` objects in `tasks` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException` contains an `OperationCanceledException` in its `AggregateException.InnerExceptions` collection.

-or-

An exception was thrown during the execution of at least one of the `Task` instances.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentException`: The `tasks` argument contains a null element.

To be added.

## Task.WaitAll(Task[], Int32, CancellationToken) method

```csharp
public static bool WaitAll (System.Threading.Tasks.Task[] tasks, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Waits for all of the provided `Task` objects to complete execution within a specified number of milliseconds or until the wait is cancelled.

Parameters:

- `tasks`: An array of `Task` instances on which to wait.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A `TaskFactory.CancellationToken` to observe while waiting for the tasks to complete.

Returns: `true` if all of the `Task` instances completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: One or more of the `Task` objects in `tasks` has been disposed.
- `ArgumentNullException`: The `tasks` argument is `null`.
- `AggregateException`: At least one of the `Task` instances was canceled. If a task was canceled, the `AggregateException` contains an `OperationCanceledException` in its `AggregateException.InnerExceptions` collection.

-or-

An exception was thrown during the execution of at least one of the `Task` instances.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `ArgumentException`: The `tasks` argument contains a null element.
- `OperationCanceledException`: The `cancellationToken` was canceled.

#### Remarks
The `cancellationToken` argument is used to cancel the wait operation. Cancellation of the tasks is a distinct operation, and is signaled by the `AggregateException` noted above.
