---
title: "ConfiguredTaskAwaitable+ConfiguredTaskAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredTaskAwaitable+ConfiguredTaskAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredTaskAwaitable+ConfiguredTaskAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredTaskAwaitable.ConfiguredTaskAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for an awaitable (`ConfiguredTaskAwaitable`) object.

#### Remarks
This type is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable+ConfiguredTaskAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that specifies whether the task being awaited is completed.

Returns: `true` if the task being awaited is completed; otherwise, `false`.

Exceptions:

- `NullReferenceException`: The awaiter was not properly initialized.

#### Remarks
This property is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable+ConfiguredTaskAwaiter.GetResult() method

```csharp
public void GetResult ();
```

Ends the await on the completed task.

Exceptions:

- `NullReferenceException`: The awaiter was not properly initialized.
- `OperationCanceledException`: The task was canceled.
- `Exception`: The task completed in a faulted state.
- `TaskCanceledException`: The task was canceled.

#### Remarks
This method is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable+ConfiguredTaskAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action for the task associated with this awaiter.

Parameters:

- `continuation`: The action to invoke when the await operation completes.

Exceptions:

- `ArgumentNullException`: The `continuation` argument is `null`.
- `NullReferenceException`: The awaiter was not properly initialized.

#### Remarks
This method is intended for compiler use; do not use it directly in your code.

## ConfiguredTaskAwaitable+ConfiguredTaskAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for the task associated with this awaiter.

Parameters:

- `continuation`: The action to invoke when the await operation completes.

Exceptions:

- `ArgumentNullException`: The `continuation` argument is `null`.
- `NullReferenceException`: The awaiter was not properly initialized.

#### Remarks
This method is intended for compiler use; do not use it directly in your code.
