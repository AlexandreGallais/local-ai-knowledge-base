---
title: "AsyncValueTaskMethodBuilder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncValueTaskMethodBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValueTaskMethodBuilder struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct AsyncValueTaskMethodBuilder
```

Represents a builder for asynchronous methods that return a `ValueTask`.

To be added.

## AsyncValueTaskMethodBuilder.Task property

```csharp
public System.Threading.Tasks.ValueTask Task { get; }
```

Gets the task for this builder.

Returns: The task for this builder.

To be added.

## AsyncValueTaskMethodBuilder.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncValueTaskMethodBuilder.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncValueTaskMethodBuilder.Create() method

```csharp
public static System.Runtime.CompilerServices.AsyncValueTaskMethodBuilder Create ();
```

Creates an instance of the `AsyncValueTaskMethodBuilder` struct.

Returns: The initialized instance.

To be added.

## AsyncValueTaskMethodBuilder.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Marks the task as failed and binds the specified exception to the task.

Parameters:

- `exception`: The exception to bind to the task.

To be added.

## AsyncValueTaskMethodBuilder.SetResult() method

```csharp
public void SetResult ();
```

Marks the task as successfully completed.

To be added.

## AsyncValueTaskMethodBuilder.SetStateMachine(IAsyncStateMachine) method

```csharp
public void SetStateMachine (System.Runtime.CompilerServices.IAsyncStateMachine stateMachine);
```

Associates the builder with the specified state machine.

Parameters:

- `stateMachine`: The state machine instance to associate with the builder.

To be added.

## AsyncValueTaskMethodBuilder.Start<TStateMachine>(TStateMachine) method

```csharp
public void Start<TStateMachine> (ref TStateMachine stateMachine) where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Begins running the builder with the associated state machine.

Parameters:

- `TStateMachine`: The type of the state machine.
- `stateMachine`: The state machine instance, passed by reference.

To be added.
