---
title: "PoolingAsyncValueTaskMethodBuilder<TResult> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/PoolingAsyncValueTaskMethodBuilder`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PoolingAsyncValueTaskMethodBuilder<TResult> struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct PoolingAsyncValueTaskMethodBuilder<TResult>
```

Represents a builder for asynchronous methods that returns a `ValueTask<T>`.

Parameters:

- `TResult`: The type of the result.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.Task property

```csharp
public System.Threading.Tasks.ValueTask<TResult> Task { get; }
```

Gets the value task for this builder.

Returns: To be added.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

```csharp
public void AwaitOnCompleted<TAwaiter,TStateMachine> (ref TAwaiter awaiter, ref TStateMachine stateMachine) where TAwaiter : System.Runtime.CompilerServices.INotifyCompletion where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Schedules the state machine to proceed to the next action when the specified awaiter completes.

Parameters:

- `TAwaiter`: The type of the awaiter.
- `TStateMachine`: The type of the state machine.
- `awaiter`: the awaiter
- `stateMachine`: The state machine.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

```csharp
public void AwaitUnsafeOnCompleted<TAwaiter,TStateMachine> (ref TAwaiter awaiter, ref TStateMachine stateMachine) where TAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Schedules the state machine to proceed to the next action when the specified awaiter completes.

Parameters:

- `TAwaiter`: The type of the awaiter.
- `TStateMachine`: The type of the state machine.
- `awaiter`: the awaiter
- `stateMachine`: The state machine.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.Create() method

```csharp
public static System.Runtime.CompilerServices.PoolingAsyncValueTaskMethodBuilder<TResult> Create ();
```

Creates an instance of the `PoolingAsyncValueTaskMethodBuilder<T>` struct.

Returns: The initialized instance.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Marks the value task as failed and binds the specified exception to the value task.

Parameters:

- `exception`: The exception to bind to the value task.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.SetResult(TResult) method

```csharp
public void SetResult (TResult result);
```

Marks the value task as successfully completed.

Parameters:

- `result`: The result to use to complete the value task.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.SetStateMachine(IAsyncStateMachine) method

```csharp
public void SetStateMachine (System.Runtime.CompilerServices.IAsyncStateMachine stateMachine);
```

Associates the builder with the specified state machine.

Parameters:

- `stateMachine`: The state machine instance to associate with the builder.

To be added.

## PoolingAsyncValueTaskMethodBuilder<TResult>.Start<TStateMachine>(TStateMachine) method

```csharp
public void Start<TStateMachine> (ref TStateMachine stateMachine) where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Begins running the builder with the associated state machine.

Parameters:

- `TStateMachine`: The type of the state machine.
- `stateMachine`: The state machine instance, passed by reference.

To be added.
