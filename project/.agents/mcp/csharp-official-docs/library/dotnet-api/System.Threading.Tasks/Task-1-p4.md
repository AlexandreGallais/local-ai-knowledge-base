---
title: "Task<TResult> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task<TResult> class (part 4 of 4)

## Task<TResult>.ContinueWith<TNewResult>(Task<TResult>,TNewResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,TNewResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes according the condition specified in `continuationOptions`.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run according the condition specified in `continuationOptions`.

When run, the delegate will be passed as an argument this completed task.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

The `continuationFunction`, when executed, should return a `Task<T>`.

## Task<TResult>.ContinueWith<TNewResult>(Object,TNewResult>, Object, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,object?,TNewResult> continuationFunction, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The  `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

The `continuationFunction`, when executed, should return a `Task<T>`. This task's completion state will be transferred to the task returned from the `Task<T>.ContinueWith` call.

## Task<TResult>.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.TaskAwaiter<TResult> GetAwaiter ();
```

Gets an awaiter used to await this `Task<T>`.

Returns: An awaiter instance.

#### Remarks

This method is intended for compiler use rather than use directly in code.

## Task<TResult>.WaitAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> WaitAsync (System.Threading.CancellationToken <example-value>);
```

Gets a `Task<T>` that will complete when this `Task<T>` completes or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task<T>` representing the asynchronous wait. It may or may not be the same instance as the current instance.

To be added.

## Task<TResult>.WaitAsync(TimeSpan) method

```csharp
public System.Threading.Tasks.Task<TResult> WaitAsync (TimeSpan timeout);
```

Gets a `Task<T>` that will complete when this `Task<T>` completes or when the specified timeout expires.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.

Returns: The `Task<T>` representing the asynchronous wait. It may or may not be the same instance as the current instance.

To be added.

## Task<TResult>.WaitAsync(TimeSpan, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> WaitAsync (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Gets a `Task<T>` that will complete when this `Task<T>` completes, when the specified timeout expires, or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task<T>` representing the asynchronous wait. It may or may not be the same instance as the current instance.

To be added.

## Task<TResult>.WaitAsync(TimeSpan, TimeProvider) method

```csharp
public System.Threading.Tasks.Task<TResult> WaitAsync (TimeSpan timeout, TimeProvider timeProvider);
```

Gets a `Task<T>` that will complete when this `Task<T>` completes or when the specified timeout expires.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.

Returns: The `Task<T>` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

To be added.

## Task<TResult>.WaitAsync(TimeSpan, TimeProvider, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> WaitAsync (TimeSpan timeout, TimeProvider timeProvider, System.Threading.CancellationToken <example-value>);
```

Gets a `Task<T>` that will complete when this `Task<T>` completes, when the specified timeout expires, or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.
- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task<T>` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

To be added.
