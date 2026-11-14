---
title: "TaskToAsyncResult class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskToAsyncResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskToAsyncResult class

Namespace: `System.Threading.Tasks`

```csharp
public static class TaskToAsyncResult
```

Provides methods for using `Task` to implement the Asynchronous Programming Model pattern based on "Begin" and "End" methods.

To be added.

## TaskToAsyncResult.Begin(Task, AsyncCallback, Object) method

```csharp
public static IAsyncResult Begin (System.Threading.Tasks.Task task, AsyncCallback? callback, object? state);
```

Creates a new `IAsyncResult` from the specified `Task`, optionally invoking `callback` when the task has completed.

Parameters:

- `task`: The `Task` to be wrapped in an `IAsyncResult`.
- `callback`: The callback to be invoked upon `task`'s completion. If `null`, no callback will be invoked.
- `state`: The state to be stored in the `IAsyncResult`.

Returns: An `IAsyncResult` to represent the task's asynchronous operation. This instance will also be passed to `callback` when it's invoked.

Exceptions:

- `ArgumentNullException`: `task` is `null`.

In conjunction with the `TaskToAsyncResult.End` or `TaskToAsyncResult.End<T>` methods, this method may be used to implement the Begin/End pattern (also known as the Asynchronous Programming Model pattern, or APM). It is recommended to not expose this pattern in new code; the methods on `TaskToAsyncResult` are intended only to help implement such Begin/End methods when they must be exposed, for example because a base class provides virtual methods for the pattern, or when they've already been exposed and must remain for compatibility.  These methods enable implementing all of the core asynchronous logic via `Task`s and then easily implementing Begin/End methods around that functionality.

## TaskToAsyncResult.End(IAsyncResult) method

```csharp
public static void End (IAsyncResult asyncResult);
```

Waits for the `Task` wrapped by the `IAsyncResult` returned by `TaskToAsyncResult.Begin` to complete.

Parameters:

- `asyncResult`: The `IAsyncResult` for which to wait.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not produced by a call to `TaskToAsyncResult.Begin`.

This will propagate any exception stored in the wrapped `Task`.

## TaskToAsyncResult.End<TResult>(IAsyncResult) method

```csharp
public static TResult End<TResult> (IAsyncResult asyncResult);
```

Waits for the `Task<T>` wrapped by the `IAsyncResult` returned by `TaskToAsyncResult.Begin` to complete.

Parameters:

- `TResult`: The type of the result produced.
- `asyncResult`: The `IAsyncResult` for which to wait.

Returns: The result of the `Task<T>` wrapped by the `IAsyncResult`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not produced by a call to `TaskToAsyncResult.Begin`.

This will propagate any exception stored in the wrapped `Task<T>`.

## TaskToAsyncResult.Unwrap(IAsyncResult) method

```csharp
public static System.Threading.Tasks.Task Unwrap (IAsyncResult asyncResult);
```

Extracts the underlying `Task` from an `IAsyncResult` created by `TaskToAsyncResult.Begin`.

Parameters:

- `asyncResult`: The `IAsyncResult` created by `TaskToAsyncResult.Begin`.

Returns: The `Task` wrapped by the `IAsyncResult`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not produced by a call to `TaskToAsyncResult.Begin`.

To be added.

## TaskToAsyncResult.Unwrap<TResult>(IAsyncResult) method

```csharp
public static System.Threading.Tasks.Task<TResult> Unwrap<TResult> (IAsyncResult asyncResult);
```

Extracts the underlying `Task<T>` from an `IAsyncResult` created by `TaskToAsyncResult.Begin`.

Parameters:

- `TResult`: The type of the result produced by the returned task.
- `asyncResult`: The `IAsyncResult` created by `TaskToAsyncResult.Begin`.

Returns: The `Task<T>` wrapped by the `IAsyncResult`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not produced by a call to `TaskToAsyncResult.Begin`,
or the `Task<T>` provided to `TaskToAsyncResult.Begin` was used a generic type parameter
that's different from the `TResult` supplied to this call.

To be added.
