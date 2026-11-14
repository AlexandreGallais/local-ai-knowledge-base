---
title: "AsyncTaskMethodBuilder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncTaskMethodBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncTaskMethodBuilder struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct AsyncTaskMethodBuilder
```

Represents a builder for asynchronous methods that return a task.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncTaskMethodBuilder.Task property

```csharp
public System.Threading.Tasks.Task Task { get; }
```

Gets the task for this builder.

Returns: The task for this builder.

Exceptions:

- `InvalidOperationException`: The builder is not initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncTaskMethodBuilder.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncTaskMethodBuilder.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncTaskMethodBuilder.Create() method

```csharp
public static System.Runtime.CompilerServices.AsyncTaskMethodBuilder Create ();
```

Creates an instance of the `AsyncTaskMethodBuilder` type.

Returns: A new instance of the builder.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncTaskMethodBuilder.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Marks the task as failed and binds the specified exception to the task.

Parameters:

- `exception`: The exception to bind to the task.

Exceptions:

- `ArgumentNullException`: `exception` is `null`.
- `InvalidOperationException`: The task has already completed.

-or-

The builder is not initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncTaskMethodBuilder.SetResult() method

```csharp
public void SetResult ();
```

Marks the task as successfully completed.

Exceptions:

- `InvalidOperationException`: The task has already completed.

-or-

The builder is not initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncTaskMethodBuilder.SetStateMachine(IAsyncStateMachine) method

```csharp
public void SetStateMachine (System.Runtime.CompilerServices.IAsyncStateMachine stateMachine);
```

Associates the builder with the specified state machine.

Parameters:

- `stateMachine`: The state machine instance to associate with the builder.

Exceptions:

- `ArgumentNullException`: `stateMachine` is `null`.
- `InvalidOperationException`: The state machine was previously set.

To be added.

## AsyncTaskMethodBuilder.Start<TStateMachine>(TStateMachine) method

```csharp
public void Start<TStateMachine> (ref TStateMachine stateMachine) where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine;
```

Begins running the builder with the associated state machine.

Parameters:

- `TStateMachine`: The type of the state machine.
- `stateMachine`: The state machine instance, passed by reference.

Exceptions:

- `ArgumentNullException`: `stateMachine` is `null`.

To be added.
