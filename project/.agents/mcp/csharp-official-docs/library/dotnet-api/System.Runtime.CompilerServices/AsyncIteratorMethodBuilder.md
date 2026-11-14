---
title: "AsyncIteratorMethodBuilder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncIteratorMethodBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncIteratorMethodBuilder struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct AsyncIteratorMethodBuilder
```

Represents a builder for asynchronous iterators.

To be added.

## AsyncIteratorMethodBuilder.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncIteratorMethodBuilder.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncIteratorMethodBuilder.Complete() method

```csharp
public void Complete ();
```

Marks iteration as being completed, whether successfully or otherwise.

To be added.

## AsyncIteratorMethodBuilder.Create() method

```csharp
public static System.Runtime.CompilerServices.AsyncIteratorMethodBuilder Create ();
```

Creates an instance of the `AsyncIteratorMethodBuilder` struct.

Returns: The initialized instance.

To be added.

## AsyncIteratorMethodBuilder.MoveNext<TStateMachine>(TStateMachine) method

```csharp
public void MoveNext<TStateMachine> (ref TStateMachine stateMachine) where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Invokes `IAsyncStateMachine.MoveNext` on the state machine while guarding the `ExecutionContext`.

Parameters:

- `TStateMachine`: The type of the state machine.
- `stateMachine`: The state machine instance, passed by reference.

To be added.
