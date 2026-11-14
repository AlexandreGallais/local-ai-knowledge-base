---
title: "ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredValueTaskAwaitable`1+ConfiguredValueTaskAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredValueTaskAwaitable<TResult>.ConfiguredValueTaskAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for a `ConfiguredValueTaskAwaitable<T>`.

Parameters:

- `TResult`: The type of the result produced by the task.

To be added.

## ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the `ConfiguredValueTaskAwaitable<T>` has completed.

Returns: `true` if the `ConfiguredValueTaskAwaitable<T>` has completed; otherwise, `false`.

To be added.

## ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter.GetResult() method

```csharp
public TResult GetResult ();
```

Gets the result of the `ValueTask<T>`.

Returns: The result of the `ValueTask<T>`.

To be added.

## ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action for the `ConfiguredValueTaskAwaitable<T>`.

Parameters:

- `continuation`: The continuation action for the `ConfiguredValueTaskAwaitable<T>`.

To be added.

## ConfiguredValueTaskAwaitable<TResult>+ConfiguredValueTaskAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for the `ConfiguredValueTaskAwaitable<T>`.

Parameters:

- `continuation`: The continuation action for the `ConfiguredValueTaskAwaitable<T>`.

To be added.
