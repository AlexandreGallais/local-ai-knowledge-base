---
title: "ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredValueTaskAwaitable.ConfiguredValueTaskAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for a `ConfiguredValueTaskAwaitable`.

To be added.

## ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the `ConfiguredValueTaskAwaitable` has completed.

Returns: `true` if the `ConfiguredValueTaskAwaitable` has completed; otherwise, `false`.

To be added.

## ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter.GetResult() method

```csharp
public void GetResult ();
```

Gets the result of the ValueTask.

To be added.

## ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action for the `ConfiguredValueTaskAwaitable`.

Parameters:

- `continuation`: The continuation action for the `ConfiguredValueTaskAwaitable`.

To be added.

## ConfiguredValueTaskAwaitable+ConfiguredValueTaskAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for the `ConfiguredValueTaskAwaitable`.

Parameters:

- `continuation`: The continuation action for the `ConfiguredValueTaskAwaitable`.

To be added.
