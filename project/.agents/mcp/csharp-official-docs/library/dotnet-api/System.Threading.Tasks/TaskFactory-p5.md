---
title: "TaskFactory class (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 5 of 8)

## TaskFactory.FromAsync(IAsyncResult, IAsyncResult>) method

```csharp
public System.Threading.Tasks.Task FromAsync (IAsyncResult asyncResult, Action<IAsyncResult> endMethod);
```

Creates a `Task` that executes an end method action when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The action delegate that processes the completed `asyncResult`.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.

## TaskFactory.FromAsync(IAsyncResult>, IAsyncResult>, Object) method

```csharp
public System.Threading.Tasks.Task FromAsync (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, object? state);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on.  This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync(IAsyncResult, IAsyncResult>, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task FromAsync (IAsyncResult asyncResult, Action<IAsyncResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task` that executes an end method action when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The action delegate that processes the completed `asyncResult`.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task`.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: paramref name="creationOptions" /> specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.

## TaskFactory.FromAsync(IAsyncResult>, IAsyncResult>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task FromAsync (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task`.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid TaskCreationOptions value.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`. The `TaskCreationOptions` values `PreferFairness`, `LongRunning` and `AttachedToParent` are all mutually exclusive. In the FromAsync methods, either `LongRunning` or `AttachedToParent` by themselves will cause an `ArgumentOutOfRangeException` to be thrown.

## TaskFactory.FromAsync(IAsyncResult, IAsyncResult>, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task FromAsync (IAsyncResult asyncResult, Action<IAsyncResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a `Task` that executes an end method action when a specified `IAsyncResult` completes.

Parameters:

- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The action delegate that processes the completed `asyncResult`.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task`.
- `scheduler`: The `TaskScheduler` that is used to schedule the task that executes the end method.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.

## TaskFactory.FromAsync<TArg1>(IAsyncResult>, IAsyncResult>, TArg1, Object) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, object? state);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1>(IAsyncResult>, IAsyncResult>, TArg1, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task`.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TResult>(IAsyncResult, IAsyncResult,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TResult> (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod);
```

Creates a `Task<T>` that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `TResult`: The type of the result available through the task.
- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.

Returns: A `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.

## TaskFactory.FromAsync<TResult>(IAsyncResult>, IAsyncResult,TResult>, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TResult> (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, object? state);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TResult>(IAsyncResult, IAsyncResult,TResult>, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TResult> (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task<T>` that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `TResult`: The type of the result available through the task.
- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.

Returns: A `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.

## TaskFactory.FromAsync<TResult>(IAsyncResult>, IAsyncResult,TResult>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TResult> (Func<AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TResult>(IAsyncResult, IAsyncResult,TResult>, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TResult> (IAsyncResult asyncResult, Func<IAsyncResult,TResult> endMethod, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a `Task<T>` that executes an end method function when a specified `IAsyncResult` completes.

Parameters:

- `TResult`: The type of the result available through the task.
- `asyncResult`: The IAsyncResult whose completion should trigger the processing of the `endMethod`.
- `endMethod`: The function delegate that processes the completed `asyncResult`.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.
- `scheduler`: The `TaskScheduler` that is used to schedule the task that executes the end method.

Returns: A `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

-or-

`endMethod` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid TaskCreationOptions value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks

> **Tip:**
>  The `TaskFactory.FromAsync` overloads that take an `asyncResult` parameter are not as efficient as the overloads that take a `beginMethod` parameter. If performance is an issue, use the overloads that provide the `beginMethod`/`endMethod` pattern.
