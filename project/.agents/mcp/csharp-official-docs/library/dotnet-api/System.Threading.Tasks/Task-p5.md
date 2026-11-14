---
title: "Task class (part 5 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 5 of 11)

## Task.ContinueWith<TResult>(Object,TResult>, Object, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,object?,TResult> continuationFunction, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes based on the specified task continuation options when the target `Task` completes and returns a value. The continuation receives caller-supplied state information and a cancellation token and uses the specified scheduler.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its  execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter  are not met, the continuation task will be canceled instead of scheduled.

## Task.Delay(Int32) method

```csharp
public static System.Threading.Tasks.Task Delay (int millisecondsDelay);
```

Creates a task that completes after a specified number of milliseconds.

Parameters:

- `millisecondsDelay`: The number of milliseconds to wait before completing the returned task, or -1 to wait indefinitely.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsDelay` argument is less than -1.

#### Remarks
The `Task.Delay` method is typically used to delay the operation of all or part of a task for a specified time interval. Most commonly, the time delay is introduced:

- At the beginning of the task, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay5.cs._

- Sometime while the task is executing. In this case, the call to the `Task.Delay` method executes as a child task within a task, as the following example shows. Note that since the task that calls the `Task.Delay` method executes asynchronously, the parent task must wait for it to complete by using the `await` keyword.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay5.cs._

After the specified time delay, the task is completed in the `RanToCompletion` state.

This method depends on the system clock. This means that the time delay will approximately equal the resolution of the system clock if the `millisecondsDelay` argument is less than the resolution of the system clock, which is approximately 15 milliseconds on Windows systems.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

#### Examples
The following example shows a simple use of the `Task.Delay` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay1.cs._

## Task.Delay(TimeSpan) method

```csharp
public static System.Threading.Tasks.Task Delay (TimeSpan delay);
```

Creates a task that completes after a specified time interval.

Parameters:

- `delay`: The time span to wait before completing the returned task, or `Timeout.InfiniteTimeSpan` to wait indefinitely.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: `delay` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

-or-

The `delay` argument's `TimeSpan.TotalMilliseconds` property is greater than 4294967294.

#### Remarks
After the specified time delay, the task is completed in `RanToCompletion` state.

For usage scenarios and additional examples, see the documentation for the `Delay` overload.

This method depends on the system clock. This means that the time delay will approximately equal the resolution of the system clock if the `delay` argument is less than the resolution of the system clock, which is approximately 15 milliseconds on Windows systems.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

#### Examples
The following example shows a simple use of the `Task.Delay` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay2.cs._

## Task.Delay(Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Delay (int millisecondsDelay, System.Threading.CancellationToken <example-value>);
```

Creates a cancellable task that completes after a specified number of milliseconds.

Parameters:

- `millisecondsDelay`: The number of milliseconds to wait before completing the returned task, or -1 to wait indefinitely.
- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsDelay` argument is less than -1.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The provided `cancellationToken` has already been disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
If the cancellation token is signaled before the specified time delay, a `TaskCanceledException` exception results, and the task is completed in the `Canceled` state.  Otherwise, the task is completed in the `RanToCompletion` state once the specified time delay has elapsed.

For usage scenarios and additional examples, see the documentation for the `Delay` overload.

This method depends on the system clock. This means that the time delay will approximately equal the resolution of the system clock if the `millisecondsDelay` argument is less than the resolution of the system clock, which is approximately 15 milliseconds on Windows systems.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

#### Examples
The following example launches a task that includes a call to the `Delay` method with a one second delay. Before the delay interval elapses, the token is cancelled. The output from the example shows that, as a result, a `TaskCanceledException` is thrown, and the tasks' `Status` property is set to `Canceled`.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay3.cs._

## Task.Delay(TimeSpan, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Delay (TimeSpan delay, System.Threading.CancellationToken <example-value>);
```

Creates a cancellable task that completes after a specified time interval.

Parameters:

- `delay`: The time span to wait before completing the returned task, or `Timeout.InfiniteTimeSpan` to wait indefinitely.
- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: `delay` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

-or-

The `delay` argument's `TimeSpan.TotalMilliseconds` property is greater than 4294967294.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The provided `cancellationToken` has already been disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
If the cancellation token is signaled before the specified time delay, a `TaskCanceledException` exception results, and the task is completed in the `Canceled` state.  Otherwise, the task is completed in the `RanToCompletion` state once the specified time delay has elapsed.

For usage scenarios and additional examples, see the documentation for the `Delay` overload.

This method depends on the system clock. This means that the time delay will approximately equal the resolution of the system clock if the `delay` argument is less than the resolution of the system clock, which is approximately 15 milliseconds on Windows systems.

> **Note:**
>  The system clock that is used is the same clock used by GetTickCount, which is not affected by changes made with timeBeginPeriod and timeEndPeriod.

#### Examples
The following example launches a task that includes a call to the `Delay` method with a 1.5 second delay. Before the delay interval elapses, the token is cancelled. The output from the example shows that, as a result, a `TaskCanceledException` is thrown, and the tasks' `Status` property is set to `Canceled`.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Delay/delay4.cs._

Note that this example includes a potential race condition: it depends on the task asynchronously executing the delay when the token is cancelled. Although the 1.5 second delay from the call to the `Delay` method makes that assumption likely, it is nevertheless possible that the call to the `Delay` method could return before the token is cancelled. In that case, the example produces the following output:

```txt
Task t Status: RanToCompletion, Result: 42
```

## Task.Delay(TimeSpan, TimeProvider) method

```csharp
public static System.Threading.Tasks.Task Delay (TimeSpan delay, TimeProvider timeProvider);
```

Creates a task that completes after a specified time interval.

Parameters:

- `delay`: The `TimeSpan` to wait before completing the returned task, or `Timeout.InfiniteTimeSpan` to wait indefinitely.
- `timeProvider`: The `TimeProvider` with which to interpret `delay`.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: `delay` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

-or-

`delay`'s `TimeSpan.TotalMilliseconds` property is greater than 4294967294.
- `ArgumentNullException`: The `timeProvider` argument is `null`.

To be added.

## Task.Delay(TimeSpan, TimeProvider, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Delay (TimeSpan delay, TimeProvider timeProvider, System.Threading.CancellationToken <example-value>);
```

Creates a cancellable task that completes after a specified time interval.

Parameters:

- `delay`: The `TimeSpan` to wait before completing the returned task, or `Timeout.InfiniteTimeSpan` to wait indefinitely.
- `timeProvider`: The `TimeProvider` with which to interpret `delay`.
- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentOutOfRangeException`: `delay` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

-or-

`delay`'s `TimeSpan.TotalMilliseconds` property is greater than 4294967294.
- `ArgumentNullException`: The `timeProvider` argument is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Task.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `Task` class.

Exceptions:

- `InvalidOperationException`: The task is not in one of the final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

#### Remarks
The `Task` class implements the `IDisposable` interface because internally it uses resources that also implement `IDisposable`. However, there is no need to call `Task.Dispose` unless performance or scalability testing indicates that, based on your usage patterns, your app's performance would be improved by disposing of tasks. For more information, see Do I need to dispose of Tasks? in the Parallel Programming with .NET blog.

## Task.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Disposes the `Task`, releasing all of its unmanaged resources.

Parameters:

- `disposing`: A Boolean value that indicates whether this method is being called due to a call to `Task.Dispose`.

Exceptions:

- `InvalidOperationException`: The task is not in one of the final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

#### Remarks
The `Task` class implements the `IDisposable` interface because internally it uses resources that also implement `IDisposable`. However, there is no need to call `Task.Dispose` unless performance or scalability testing indicates that, based on your usage patterns, your app's performance would be improved by disposing of tasks. For more information, see Do I need to dispose of Tasks? in the Parallel Programming with .NET blog.

## Task.FromCanceled(CancellationToken) method

```csharp
public static System.Threading.Tasks.Task FromCanceled (System.Threading.CancellationToken <example-value>);
```

Creates a `Task` that's completed due to cancellation with a specified cancellation token.

Parameters:

- `cancellationToken`: The cancellation token with which to complete the task.

Returns: The canceled task.

Exceptions:

- `ArgumentOutOfRangeException`: Cancellation has not been requested for `cancellationToken`; its `CancellationToken.IsCancellationRequested` property is `false`.

To be added.

## Task.FromCanceled<TResult>(CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TResult> FromCanceled<TResult> (System.Threading.CancellationToken <example-value>);
```

Creates a `Task<T>` that's completed due to cancellation with a specified cancellation token.

Parameters:

- `TResult`: The type of the result returned by the task.
- `cancellationToken`: The cancellation token with which to complete the task.

Returns: The canceled task.

Exceptions:

- `ArgumentOutOfRangeException`: Cancellation has not been requested for `cancellationToken`; its `CancellationToken.IsCancellationRequested` property is `false`.

To be added.
