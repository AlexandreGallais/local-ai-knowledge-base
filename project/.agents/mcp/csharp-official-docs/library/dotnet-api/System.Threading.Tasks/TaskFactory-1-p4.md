---
title: "TaskFactory<TResult> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory<TResult> class (part 4 of 4)

## TaskFactory<TResult>.FromAsync<TArg1,TArg2,TArg3>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, TArg3, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TArg3> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the third argument passed to `beginMethod` delegate.
- `TArg3`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `arg3`: The third argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync<TArg1,TArg2,TArg3>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, TArg3, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TArg3> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the third argument passed to `beginMethod` delegate.
- `TArg3`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `arg3`: The third argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: An object that controls the behavior of the created task.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.StartNew(Func<TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<TResult> function);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors, and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Object,TResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<object?,TResult> function, object? state);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object that contains data to be used by the `function` delegate.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Func<TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<TResult> function, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The cancellation token <example-value> that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Func<TResult>, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<TResult> function, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Object,TResult>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object that contains data to be used by the `function` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The cancellation token <example-value> that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Object,TResult>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<object?,TResult> function, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object that contains data to be used by the `function` delegate.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Func<TResult>, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<TResult> function, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The cancellation token <example-value> that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.

## TaskFactory<TResult>.StartNew(Object,TResult>, Object, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> StartNew (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task.

Parameters:

- `function`: A function delegate that returns the future result to be available through the task.
- `state`: An object that contains data to be used by the `function` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The cancellation token <example-value> that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a task by using one of the `Task<T>` constructors and then calling the `Task.Start` method to schedule it for execution.

However, unless creation and scheduling must be separated, `StartNew` is the recommended approach for both simplicity and performance.
