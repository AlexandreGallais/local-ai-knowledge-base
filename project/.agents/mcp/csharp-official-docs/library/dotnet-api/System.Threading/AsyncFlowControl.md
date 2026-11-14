---
title: "AsyncFlowControl struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/AsyncFlowControl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncFlowControl struct

Namespace: `System.Threading`

```csharp
public struct AsyncFlowControl : IDisposable, IEquatable<System.Threading.AsyncFlowControl>
```

Provides the functionality to restore the migration, or flow, of the execution context between threads.

#### Remarks
An execution context contains all execution-related information for a logical thread. The flow of the execution context to other threads can be prevented by using the `ExecutionContext.SuppressFlow` method, which returns an `AsyncFlowControl` structure. The `AsyncFlowControl.Undo` method of the returned `AsyncFlowControl` structure can be used to undo the flow suppression. The `AsyncFlowControl` structure must be used on the same thread on which it was created.

## AsyncFlowControl.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `AsyncFlowControl` class.

Exceptions:

- `InvalidOperationException`: The `AsyncFlowControl` structure is not used on the thread where it was created.

-or-

The `AsyncFlowControl` structure has already been used to call `AsyncFlowControl.Dispose` or `AsyncFlowControl.Undo`.

#### Remarks
Call `Dispose` when you are finished using the `AsyncFlowControl`. The `Dispose` method leaves the `AsyncFlowControl` in an unusable state. After calling `Dispose`, you must release all references to the `AsyncFlowControl` so the garbage collector can reclaim the memory that the `AsyncFlowControl` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `AsyncFlowControl`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `AsyncFlowControl` object's `Finalize` method.

## AsyncFlowControl.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current `AsyncFlowControl` structure.

Parameters:

- `obj`: An object to compare with the current structure.

Returns: `true` if `obj` is an `AsyncFlowControl` structure and is equal to the current `AsyncFlowControl` structure; otherwise, `false`.

To be added.

## AsyncFlowControl.Equals(AsyncFlowControl) method

```csharp
public bool Equals (System.Threading.AsyncFlowControl obj);
```

Determines whether the specified `AsyncFlowControl` structure is equal to the current `AsyncFlowControl` structure.

Parameters:

- `obj`: An `AsyncFlowControl` structure to compare with the current structure.

Returns: `true` if `obj` is equal to the current `AsyncFlowControl` structure; otherwise, `false`.

To be added.

## AsyncFlowControl.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets a hash code for the current `AsyncFlowControl` structure.

Returns: A hash code for the current `AsyncFlowControl` structure.

To be added.

## AsyncFlowControl.op_Equality(AsyncFlowControl, AsyncFlowControl) method

```csharp
public static bool operator == (System.Threading.AsyncFlowControl a, System.Threading.AsyncFlowControl b);
```

Compares two `AsyncFlowControl` structures to determine whether they are equal.

Parameters:

- `a`: An `AsyncFlowControl` structure.
- `b`: An `AsyncFlowControl` structure.

Returns: `true` if the two structures are equal; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## AsyncFlowControl.op_Inequality(AsyncFlowControl, AsyncFlowControl) method

```csharp
public static bool operator != (System.Threading.AsyncFlowControl a, System.Threading.AsyncFlowControl b);
```

Compares two `AsyncFlowControl` structures to determine whether they are not equal.

Parameters:

- `a`: An `AsyncFlowControl` structure.
- `b`: An `AsyncFlowControl` structure.

Returns: `true` if the structures are not equal; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## AsyncFlowControl.Undo() method

```csharp
public void Undo ();
```

Restores the flow of the execution context between threads.

Exceptions:

- `InvalidOperationException`: The `AsyncFlowControl` structure is not used on the thread where it was created.

-or-

The `AsyncFlowControl` structure has already been used to call `AsyncFlowControl.Dispose` or `AsyncFlowControl.Undo`.

#### Remarks
The `ExecutionContext.SuppressFlow` method returns an `AsyncFlowControl` structure that is used to restore the flow.

The `AsyncFlowControl.Undo` method must be called only on the `AsyncFlowControl` structure returned by its associated `ExecutionContext.SuppressFlow` method.
