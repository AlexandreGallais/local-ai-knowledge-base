---
title: "ValueTaskAwaiter<TResult> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ValueTaskAwaiter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTaskAwaiter<TResult> struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ValueTaskAwaiter<TResult> : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for a `ValueTask<T>`.

Parameters:

- `TResult`: The type of the result produced by the task.

To be added.

## ValueTaskAwaiter<TResult>.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the `ValueTask<T>` has completed.

Returns: `true` if the `ValueTask<T>` has completed; otherwise, `false`.

To be added.

## ValueTaskAwaiter<TResult>.GetResult() method

```csharp
public TResult GetResult ();
```

Gets the result of the ValueTask.

Returns: The result of the completed task.

To be added.

## ValueTaskAwaiter<TResult>.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action for this `ValueTask<T>`.

Parameters:

- `continuation`: The action to perform when the wait operation completes.

To be added.

## ValueTaskAwaiter<TResult>.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for this ValueTask.

Parameters:

- `continuation`: The continuation action for this `ValueTask<T>`.

To be added.
