---
title: "TaskFactory class (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 6 of 8)

## TaskFactory.FromAsync<TArg1,TArg2>(IAsyncResult>, IAsyncResult>, TArg1, TArg2, Object) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1,TArg2> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, TArg2 arg2, object? state);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2>(IAsyncResult>, IAsyncResult>, TArg1, TArg2, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1,TArg2> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, TArg2 arg2, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
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

## TaskFactory.FromAsync<TArg1,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TResult> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, object? state);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TResult> (Func<TArg1,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2,TArg3>(IAsyncResult>, IAsyncResult>, TArg1, TArg2, TArg3, Object) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1,TArg2,TArg3> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

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

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2,TArg3>(IAsyncResult>, IAsyncResult>, TArg1, TArg2, TArg3, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task FromAsync<TArg1,TArg2,TArg3> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Action<IAsyncResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

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
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task`.

Returns: The created `Task` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TResult> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, object? state);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TResult> (Func<TArg1,TArg2,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.FromAsync<TArg1,TArg2,TArg3,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, TArg3, Object) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TArg3,TResult> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the third argument passed to `beginMethod` delegate.
- `TArg3`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `arg3`: The third argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.
