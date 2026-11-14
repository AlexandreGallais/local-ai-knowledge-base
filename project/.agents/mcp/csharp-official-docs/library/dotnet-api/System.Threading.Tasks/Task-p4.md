---
title: "Task class (part 4 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 4 of 11)

## Task.ContinueWith(Object>, Object, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task,object?> continuationAction, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that receives caller-supplied state information and a cancellation token and that executes when the target `Task` completes. The continuation executes based on a set of specified conditions and uses a specified scheduler.

Parameters:

- `continuationAction`: An action to run when the `Task` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its  execution.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter  are not met, the continuation task will be canceled instead of scheduled.

## Task.ContinueWith<TResult>(Task,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,TResult> continuationFunction);
```

Creates a continuation that executes asynchronously when the target `Task<T>` completes and returns a value.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.

Returns: A new continuation task.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is null.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

#### Examples
The following example shows how to use the ContinueWith method:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/continuationsimple.cs._

## Task.ContinueWith<TResult>(Object,TResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,object?,TResult> continuationFunction, object? state);
```

Creates a continuation that receives caller-supplied state information and executes asynchronously when the target `Task` completes and returns a value.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith<TResult>(Task,TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that executes asynchronously when the target `Task` completes and returns a value. The continuation receives a cancellation token.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `TaskFactory.CancellationToken` that will be assigned to the new continuation task.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.

-or-

The `CancellationTokenSource` that created the token has already been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is null.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith<TResult>(Task,TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes according to the specified continuation options and returns a value.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run according to the condition specified in `continuationOptions`. When run, the delegate will be passed the completed task as an argument.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is null.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

## Task.ContinueWith<TResult>(Task,TResult>, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes asynchronously when the target `Task` completes and returns a value. The continuation uses a specified scheduler.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be passed the completed task as an argument.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is null.

-or-

The `scheduler` argument is null.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith<TResult>(Object,TResult>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,object?,TResult> continuationFunction, object? state, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that executes asynchronously when the target `Task` completes and returns a value. The continuation receives caller-supplied state information and a cancellation token.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith<TResult>(Object,TResult>, Object, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,object?,TResult> continuationFunction, object? state, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes based on the specified task continuation options when the target `Task` completes. The continuation receives caller-supplied state information.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

## Task.ContinueWith<TResult>(Object,TResult>, Object, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,object?,TResult> continuationFunction, object? state, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes asynchronously when the target `Task` completes. The continuation receives caller-supplied state information and uses a specified scheduler.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run when the `Task` completes.  When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation function.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task.ContinueWith<TResult>(Task,TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWith<TResult> (Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes according to the specified continuation options and returns a value. The continuation is passed a cancellation token and uses a specified scheduler.

Parameters:

- `TResult`: The type of the result produced by the continuation.
- `continuationFunction`: A function to run according to the specified `continuationOptions.` When run, the delegate will be passed the completed task as an argument.
- `cancellationToken`: The `TaskFactory.CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.

-or-

The `CancellationTokenSource` that created the token has already been disposed.
- `ArgumentNullException`: The `continuationFunction` argument is null.

-or-

The `scheduler` argument is null.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task<T>` will not be scheduled for execution until the current task has completed. If the criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

#### Examples
The following example shows how to use the ContinueWith method with continuation options:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/continuationoptions.cs._
