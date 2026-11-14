---
title: "AsyncHelpers class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncHelpers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncHelpers class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class AsyncHelpers
```

Provides helpers for awaiting tasks and awaiters in runtime-managed asynchronous methods.

This type supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await(ConfiguredTaskAwaitable) method

```csharp
public static void Await (System.Runtime.CompilerServices.ConfiguredTaskAwaitable configuredAwaitable);
```

Awaits the specified configured task awaitable and throws any exception produced by the operation.

Parameters:

- `configuredAwaitable`: The configured awaitable to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await(ConfiguredValueTaskAwaitable) method

```csharp
public static void Await (System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable configuredAwaitable);
```

Awaits the specified configured value task awaitable and throws any exception produced by the operation.

Parameters:

- `configuredAwaitable`: The configured value task awaitable to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await(Task) method

```csharp
public static void Await (System.Threading.Tasks.Task task);
```

Awaits the specified `Task` and throws any exception produced by the operation.

Parameters:

- `task`: The task to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await(ValueTask) method

```csharp
public static void Await (System.Threading.Tasks.ValueTask task);
```

Awaits the specified `ValueTask` and throws any exception produced by the operation.

Parameters:

- `task`: The value task to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await<T>(ConfiguredTaskAwaitable<T>) method

```csharp
public static T Await<T> (System.Runtime.CompilerServices.ConfiguredTaskAwaitable<T> configuredAwaitable);
```

Awaits the specified configured task awaitable and returns its result, throwing any exception produced by the operation.

Parameters:

- `T`: The result type produced by the awaitable.
- `configuredAwaitable`: The configured awaitable to await.

Returns: The result of the awaitable.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await<T>(ConfiguredValueTaskAwaitable<T>) method

```csharp
public static T Await<T> (System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable<T> configuredAwaitable);
```

Awaits the specified configured value task awaitable and returns its result, throwing any exception produced by the operation.

Parameters:

- `T`: The result type produced by the awaitable.
- `configuredAwaitable`: The configured awaitable to await.

Returns: The result of the awaitable.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await<T>(Task<T>) method

```csharp
public static T Await<T> (System.Threading.Tasks.Task<T> task);
```

Awaits the specified `Task<T>` and returns its result, throwing any exception produced by the task.

Parameters:

- `T`: The result type produced by the task.
- `task`: The task to await.

Returns: The result of the task.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.Await<T>(ValueTask<T>) method

```csharp
public static T Await<T> (System.Threading.Tasks.ValueTask<T> task);
```

Awaits the specified `ValueTask<T>` and returns its result, throwing any exception produced by the operation.

Parameters:

- `T`: The result type produced by the value task.
- `task`: The value task to await.

Returns: The result of the value task.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.AwaitAwaiter<TAwaiter>(TAwaiter) method

```csharp
public static void AwaitAwaiter<TAwaiter> (TAwaiter awaiter) where TAwaiter : System.Runtime.CompilerServices.INotifyCompletion;
```

Awaits the specified awaiter and returns when the awaiter has completed.

Parameters:

- `TAwaiter`: The awaiter type.
- `awaiter`: The awaiter to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.HandleAsyncEntryPoint(Task) method

```csharp
public static void HandleAsyncEntryPoint (System.Threading.Tasks.Task task);
```

This method is intended to be used by a compiler-generated async entry point.

Parameters:

- `task`: The result from the main entry point to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.HandleAsyncEntryPoint(Int32>) method

```csharp
public static int HandleAsyncEntryPoint (System.Threading.Tasks.Task<int> task);
```

This method is intended to be used by a compiler-generated async entry point.

Parameters:

- `task`: The result from the main entry point to await.

Returns: The exit code returned by the entry point on non-browser platforms, or a placeholder value on browser platforms.

This member supports .NET infrastructure and is not intended to be used directly from your code.

## AsyncHelpers.UnsafeAwaitAwaiter<TAwaiter>(TAwaiter) method

```csharp
public static void UnsafeAwaitAwaiter<TAwaiter> (TAwaiter awaiter) where TAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion;
```

Awaits the specified awaiter using unsafe continuation registration and returns when the awaiter has completed.

Parameters:

- `TAwaiter`: The awaiter type.
- `awaiter`: The awaiter to await.

This member supports .NET infrastructure and is not intended to be used directly from your code.
