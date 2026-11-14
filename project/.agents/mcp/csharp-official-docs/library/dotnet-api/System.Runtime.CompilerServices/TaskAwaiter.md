---
title: "TaskAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/TaskAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct TaskAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an object that waits for the completion of an asynchronous task.

#### Remarks

This type is intended for compiler use only.

## TaskAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the asynchronous task has completed.

Returns: `true` if the task has completed; otherwise, `false`.

Exceptions:

- `NullReferenceException`: The `TaskAwaiter` object was not properly initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## TaskAwaiter.GetResult() method

```csharp
public void GetResult ();
```

Ends the wait for the completion of the asynchronous task.

Exceptions:

- `NullReferenceException`: The `TaskAwaiter` object was not properly initialized.
- `OperationCanceledException`: The task was canceled.
- `Exception`: The task completed in a `TaskStatus.Faulted` state.
- `TaskCanceledException`: The task was canceled.

To be added.

## TaskAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Sets the action to perform when the `TaskAwaiter` object stops waiting for the asynchronous task to complete.

Parameters:

- `continuation`: The action to perform when the wait operation completes.

Exceptions:

- `ArgumentNullException`: `continuation` is `null`.
- `NullReferenceException`: The `TaskAwaiter` object was not properly initialized.
- `InvalidOperationException`: The awaiter was not properly initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## TaskAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for the asynchronous task that is associated with this awaiter.

Parameters:

- `continuation`: The action to invoke when the await operation completes.

Exceptions:

- `ArgumentNullException`: `continuation` is `null`.
- `InvalidOperationException`: The awaiter was not properly initialized.

This method is intended for compiler user rather than use directly in code.
