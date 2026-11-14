---
title: "ValueTaskAwaiter struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ValueTaskAwaiter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTaskAwaiter struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ValueTaskAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
```

Provides an awaiter for a `ValueTask`.

To be added.

## ValueTaskAwaiter.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the `ValueTask` has completed.

Returns: `true` if the ValueTask has completed; otherwise, `false`.

To be added.

## ValueTaskAwaiter.GetResult() method

```csharp
public void GetResult ();
```

Gets the result of the ValueTask.

To be added.

## ValueTaskAwaiter.OnCompleted(Action) method

```csharp
public void OnCompleted (Action continuation);
```

Schedules the continuation action for this `ValueTask`.

Parameters:

- `continuation`: The continuation action for this `ValueTask`.

To be added.

## ValueTaskAwaiter.UnsafeOnCompleted(Action) method

```csharp
public void UnsafeOnCompleted (Action continuation);
```

Schedules the continuation action for this ValueTask.

Parameters:

- `continuation`: The continuation action for this `ValueTask`.

To be added.
