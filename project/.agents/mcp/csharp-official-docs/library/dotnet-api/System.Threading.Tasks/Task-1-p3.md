---
title: "Task<TResult> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task<TResult> class (part 3 of 4)

## Task<TResult>.ContinueWith(Task<TResult>>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>> continuationAction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes according the condition specified in `continuationOptions`.

Parameters:

- `continuationAction`: An action to run according the condition specified in `continuationOptions`. When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled. For more information, see Chaining Tasks by Using Continuation Tasks.

## Task<TResult>.ContinueWith(Object>, Object, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>,object?> continuationAction, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as  well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its  execution.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter  are not met, the continuation task will be canceled instead of scheduled.

## Task<TResult>.ContinueWith<TNewResult>(Task<TResult>,TNewResult>) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,TNewResult> continuationFunction);
```

Creates a continuation that executes asynchronously when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith<TNewResult>(Object,TNewResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,object?,TNewResult> continuationFunction, object? state);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current  task has completed, whether it completes due to running to completion successfully, faulting due  to an unhandled exception, or exiting out early due to being canceled.

#### Examples
The following example creates a chain of continuation tasks. Each task provides the current time, a `DateTime` object, for the state argument of the `ContinueWith` method. Each `DateTime` value represents the time at which the continue task is created. Each task produces as its result a second `DateTime` value that represents the time at which the task finishes. After all tasks finish, the example displays the date and times at which each continuation task starts and finishes.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task`1/ContinueWith/continuationstate.cs._

## Task<TResult>.ContinueWith<TNewResult>(Task<TResult>,TNewResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,TNewResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that executes asynchronously when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new task.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith<TNewResult>(Task<TResult>,TNewResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,TNewResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes according the condition specified in `continuationOptions`.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run according the condition specified in `continuationOptions`.

When run, the delegate will be passed the completed task as an argument.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

The `continuationFunction`, when executed, should return a `Task<T>`.

## Task<TResult>.ContinueWith<TNewResult>(Task<TResult>,TNewResult>, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,TNewResult> continuationFunction, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes asynchronously when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith<TNewResult>(Object,TNewResult>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,object?,TNewResult> continuationFunction, object? state, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new task.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current  task has completed, whether it completes due to running to completion successfully, faulting due  to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith<TNewResult>(Object,TNewResult>, Object, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,object?,TNewResult> continuationFunction, object? state, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current  task has completed, whether it completes due to running to completion successfully, faulting due  to an unhandled exception, or exiting out early due to being canceled.

The `continuationFunction`, when executed, should return a `Task<T>`. This task's completion state will be transferred to the task returned from the ContinueWith call.

## Task<TResult>.ContinueWith<TNewResult>(Object,TNewResult>, Object, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TNewResult> ContinueWith<TNewResult> (Func<System.Threading.Tasks.Task<TResult>,object?,TNewResult> continuationFunction, object? state, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `TNewResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.
