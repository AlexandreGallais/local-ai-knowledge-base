---
title: "TaskFactory class (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 8 of 8)

## TaskFactory.StartNew<TResult>(Func<TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<TResult> function);
```

Creates and starts a task of type `TResult` for the specified function delegate.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.

#### Remarks
Calling `TaskFactory.StartNew` is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can call the `Run<T>` method as a quick way to call `TaskFactory.StartNew` with default parameters. Note, however, that there is a difference in behavior between the two methods regarding : `Run<T>` by default does not allow child tasks started with the `AttachedToParent` option to attach to the current `Task<T>` instance, whereas `StartNew<T>` does. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example is a simple addition app that generates two random numbers and prompts the user to enter their sum. It then indicates whether the answer is correct or, if the user's response is not a valid number, prompts the user to re-enter a valid number. The `TaskFactory.StartNew` is used to create the `Task<T>` objects that return the random numbers to add.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run5.cs._

## TaskFactory.StartNew<TResult>(Object,TResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<object?,TResult> function, object? state);
```

Creates and starts a task of type `TResult` for the specified function delegate and state.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object containing data to be used by the `function` delegate.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: `function` is `null`.

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew<TResult>(Func<TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<TResult> function, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task of type `TResult` for the specified function delegate and cancellation token.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `function` is `null`.

#### Remarks
Calling `TaskFactory.StartNew` is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Run<T>` method as a quick way to call `StartNew<T>` with default parameters. Note, however, that there is a difference in behavior between the two methods regarding : `Run<T>` by default does not allow child tasks started with the `AttachedToParent` option to attach to the current `Task<T>` instance, whereas `StartNew<T>` does. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example uses two tasks to compute the Fibonacci sequence ending in F100 = F100-1 + F100-2 with seed values F1= 1, F2 = 1 and F1 = 0, F2= 1. Approximately half of the time, a cancellation token is set as the operations execute. The output from the example shows the result if the two tasks complete successfully and if the token is cancelled.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run9.cs._

## TaskFactory.StartNew<TResult>(Func<TResult>, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<TResult> function, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task of type `TResult` for the specified function delegate and creation options.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: `function` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew<TResult>(Object,TResult>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task of type `TResult` for the specified function delegate, state and cancellation token.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object containing data to be used by the `function` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `function` is `null`.

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew<TResult>(Object,TResult>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<object?,TResult> function, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task of type `TResult` for the specified function delegate, state and creation options.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object containing data to be used by the `function` delegate.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: `function` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew<TResult>(Func<TResult>, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<TResult> function, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task of type `TResult` for the specified function delegate, cancellation token, creation options and task scheduler.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `function` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew<TResult>(Object,TResult>, Object, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew<TResult> (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task of type `TResult` for the specified function delegate, state, cancellation token, creation options and task scheduler.

Parameters:

- `TResult`: The type of the result available through the task.
- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object containing data to be used by the `function` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `function` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a `Task<T>` using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see the entry Task.Run vs. Task.Factory.StartNew in the Parallel Programming with .NET blog.
