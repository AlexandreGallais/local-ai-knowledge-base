---
title: "AsyncVoidMethodBuilder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncVoidMethodBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncVoidMethodBuilder struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public struct AsyncVoidMethodBuilder
```

Represents a builder for asynchronous methods that do not return a value.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncVoidMethodBuilder.AwaitOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncVoidMethodBuilder.AwaitUnsafeOnCompleted<TAwaiter,TStateMachine>(TAwaiter, TStateMachine) method

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

## AsyncVoidMethodBuilder.Create() method

```csharp
public static System.Runtime.CompilerServices.AsyncVoidMethodBuilder Create ();
```

Creates an instance of the `AsyncVoidMethodBuilder` class.

Returns: A new instance of the builder.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncVoidMethodBuilder.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Binds an exception to the method builder.

Parameters:

- `exception`: The exception to bind.

Exceptions:

- `ArgumentNullException`: `exception` is `null`.
- `InvalidOperationException`: The builder is not initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncVoidMethodBuilder.SetResult() method

```csharp
public void SetResult ();
```

Marks the method builder as successfully completed.

Exceptions:

- `InvalidOperationException`: The builder is not initialized.

#### Remarks
This type and its members are intended for use by the compiler.

## AsyncVoidMethodBuilder.SetStateMachine(IAsyncStateMachine) method

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

## AsyncVoidMethodBuilder.Start<TStateMachine>(TStateMachine) method

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
