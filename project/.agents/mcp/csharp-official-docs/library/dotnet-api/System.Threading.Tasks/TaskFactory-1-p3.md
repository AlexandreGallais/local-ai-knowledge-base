---
title: "TaskFactory<TResult> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory<TResult> class (part 3 of 4)

## TaskFactory<TResult>.ContinueWhenAny<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid enumeration value.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.
- `scheduler`: The `TaskScheduler` that is used to schedule the created continuation `Task<T>`.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is null.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid TaskContinuationOptions value.
- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.FromAsync(IAsyncResult, IAsyncResult,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod);
```

Creates a task that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The `IAsyncResult` whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.

Returns: A `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `asyncResult` argument is `null`.

-or-

The `endMethod` argument is `null`.

To be added.

## TaskFactory<TResult>.FromAsync(IAsyncResult>, IAsyncResult,TResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, object? state);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync(IAsyncResult, IAsyncResult,TResult>, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a task that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The `IAsyncResult` whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: A task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `asyncResult` argument is `null`.

-or-

The `endMethod` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value.

To be added.

## TaskFactory<TResult>.FromAsync(IAsyncResult>, IAsyncResult,TResult>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync(IAsyncResult, IAsyncResult,TResult>, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a task that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The `IAsyncResult` whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the task that executes the end method.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `asyncResult` argument is `null`.

-or-

The `endMethod` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

To be added.

## TaskFactory<TResult>.FromAsync<TArg1>(IAsyncResult>, IAsyncResult,TResult>, TArg1, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, object? state);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync<TArg1>(IAsyncResult>, IAsyncResult,TResult>, TArg1, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync<TArg1,TArg2>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, object? state);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.

## TaskFactory<TResult>.FromAsync<TArg1,TArg2>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a task that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: An object that controls the behavior of the created `Task<T>`.

Returns: The created task that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `beginMethod` argument is `null`.

-or-

The `endMethod` argument is `null`.
- `ArgumentOutOfRangeException`: The `creationOptions` parameter specifies an invalid value.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`. Exceptions for `endmethod` are thrown when waiting on the returned task.
