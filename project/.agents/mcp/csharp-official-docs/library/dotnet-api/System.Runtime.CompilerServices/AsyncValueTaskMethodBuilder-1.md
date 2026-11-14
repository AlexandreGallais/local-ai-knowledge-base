---
title: "AsyncValueTaskMethodBuilder<TResult> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncValueTaskMethodBuilder`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValueTaskMethodBuilder<TResult> struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct AsyncValueTaskMethodBuilder<TResult>
```

Represents a builder for asynchronous methods that returns a `ValueTask<T>`.

Parameters:

- `TResult`: The type of the result produced by the task.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.Task property

```csharp
public System.Threading.Tasks.ValueTask<TResult> Task { get; }
```

Gets the task for this builder.

Returns: The task for this builder.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

```csharp
public void AwaitOnCompleted<TAwaiter,TStateMachine> (ref TAwaiter awaiter, ref TStateMachine stateMachine) where TAwaiter : System.Runtime.CompilerServices.INotifyCompletion where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Schedules the state machine to proceed to the next action when the specified awaiter completes.

Parameters:

- `TAwaiter`: The type of the awaiter.
- `TStateMachine`: The type of the state machine.
- `awaiter`: The awaiter.
- `stateMachine`: The state machine.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

```csharp
public void AwaitUnsafeOnCompleted<TAwaiter,TStateMachine> (ref TAwaiter awaiter, ref TStateMachine stateMachine) where TAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Schedules the state machine to proceed to the next action when the specified awaiter completes.

Parameters:

- `TAwaiter`: The type of the awaiter.
- `TStateMachine`: The type of the state machine.
- `awaiter`: The awaiter.
- `stateMachine`: The state machine.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.Create() method

```csharp
public static System.Runtime.CompilerServices.AsyncValueTaskMethodBuilder<TResult> Create ();
```

Creates an instance of the `AsyncValueTaskMethodBuilder<T>` struct.

Returns: The initialized instance.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Marks the task as failed and binds the specified exception to the task.

Parameters:

- `exception`: The exception to bind to the task.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.SetResult(TResult) method

```csharp
public void SetResult (TResult result);
```

Marks the task as successfully completed.

Parameters:

- `result`: The result to use to complete the task.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.SetStateMachine(IAsyncStateMachine) method

```csharp
public void SetStateMachine (System.Runtime.CompilerServices.IAsyncStateMachine stateMachine);
```

Associates the builder with the specified state machine.

Parameters:

- `stateMachine`: The state machine instance to associate with the builder.

To be added.

## AsyncValueTaskMethodBuilder<TResult>.Start<TStateMachine>(TStateMachine) method

```csharp
public void Start<TStateMachine> (ref TStateMachine stateMachine) where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Begins running the builder with the associated state machine.

Parameters:

- `TStateMachine`: The type of the state machine.
- `stateMachine`: The state machine instance, passed by reference.

To be added.
