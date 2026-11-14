---
title: "ExecutionContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ExecutionContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExecutionContext class

Namespace: `System.Threading`

```csharp
public sealed class ExecutionContext : IDisposable, System.Runtime.Serialization.ISerializable
```

Manages the execution context for the current thread. This class cannot be inherited.

#### Remarks
The `ExecutionContext` class provides a single container for all information relevant to a logical thread of execution. It includes impersonation context and culture, but excludes security context, call context, and synchronization context. For more information, see ExecutionContext vs SynchronizationContext.

The `ExecutionContext` class provides the functionality for user code to capture and transfer this context across user-defined asynchronous points. The common language runtime ensures that the `ExecutionContext` is consistently transferred across runtime-defined asynchronous points within the managed process.

## ExecutionContext.Capture() method

```csharp
public static System.Threading.ExecutionContext? Capture ();
```

Captures the execution context from the current thread.

Returns: An `ExecutionContext` object representing the execution context for the current thread.

#### Remarks
The captured execution context can be used as the `executionContext` parameter for the `ExecutionContext.Run` method.

## ExecutionContext.CreateCopy() method

```csharp
public System.Threading.ExecutionContext CreateCopy ();
```

Creates a copy of the current execution context.

Returns: An `ExecutionContext` object representing the current execution context.

Exceptions:

- `InvalidOperationException`: This context cannot be copied because it is used. Only newly captured contexts can be copied.

#### Remarks
This method is useful for propagating an execution context from one thread to another.

## ExecutionContext.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ExecutionContext` class.

#### Remarks
Call `Dispose` when you are finished using the `ExecutionContext`. The `Dispose` method leaves the `ExecutionContext` in an unusable state. After calling `Dispose`, you must release all references to the `ExecutionContext` so the garbage collector can reclaim the memory that the `ExecutionContext` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `ExecutionContext`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `ExecutionContext` object's `Finalize` method.

## ExecutionContext.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the specified `SerializationInfo` object with the logical context information needed to recreate an instance of the current execution context.

Parameters:

- `info`: The `SerializationInfo` object to be populated with serialization information.
- `context`: The `StreamingContext` structure representing the destination context of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ExecutionContext.IsFlowSuppressed() method

```csharp
public static bool IsFlowSuppressed ();
```

Indicates whether the flow of the execution context is currently suppressed.

Returns: `true` if the flow is suppressed; otherwise, `false`.

#### Remarks
The `ExecutionContext.IsFlowSuppressed` method is used by infrastructure components to determine whether to transfer the `ExecutionContext` during asynchronous operations.

## ExecutionContext.Restore(ExecutionContext) method

```csharp
public static void Restore (System.Threading.ExecutionContext executionContext);
```

Restores a captured execution context on to the current thread.

Parameters:

- `executionContext`: The ExecutionContext to set.

Exceptions:

- `InvalidOperationException`: `executionContext` is `null`.

#### Remarks

To revert to the current execution context; capture it before calling Restore, and then call Restore it again.

## ExecutionContext.RestoreFlow() method

```csharp
public static void RestoreFlow ();
```

Restores the flow of the execution context across asynchronous threads.

Exceptions:

- `InvalidOperationException`: The context flow cannot be restored because it is not being suppressed.

#### Remarks
`ExecutionContext.RestoreFlow` reverses the effect of a prior `ExecutionContext.SuppressFlow` method call.

This method is called by the `AsyncFlowControl.Undo` method of the `AsyncFlowControl` structure returned by the `ExecutionContext.SuppressFlow` method.  You should use the `AsyncFlowControl.Undo` method to restore the flow of the execution context, not the `ExecutionContext.RestoreFlow` method.

## ExecutionContext.Run(ExecutionContext, ContextCallback, Object) method

```csharp
public static void Run (System.Threading.ExecutionContext executionContext, System.Threading.ContextCallback callback, object? state);
```

Runs a method in a specified execution context on the current thread.

Parameters:

- `executionContext`: The `ExecutionContext` to set.
- `callback`: A `ContextCallback` delegate that represents the method to be run in the provided execution context.
- `state`: The object to pass to the callback method.

Exceptions:

- `InvalidOperationException`: `executionContext` is `null`.

-or-

`executionContext` was not acquired through a capture operation.

-or-

`executionContext` has already been used as the argument to a `ExecutionContext.Run` call.

#### Remarks
The execution context and synchronization contexts of the calling thread are returned to their previous states when the method completes.

## ExecutionContext.SuppressFlow() method

```csharp
public static System.Threading.AsyncFlowControl SuppressFlow ();
```

Suppresses the flow of the execution context across asynchronous threads.

Returns: An `AsyncFlowControl` structure for restoring the flow.

Exceptions:

- `InvalidOperationException`: The context flow is already suppressed.

#### Remarks
Use this method to suppress the flow of the `ExecutionContext` on the current thread.

You must use the `AsyncFlowControl.Undo` method on the returned `AsyncFlowControl` structure to restore the flow of the `ExecutionContext`.
