---
title: "HostExecutionContextManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/HostExecutionContextManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostExecutionContextManager class

Namespace: `System.Threading`

```csharp
public class HostExecutionContextManager
```

Provides the functionality that allows a common language runtime host to participate in the flow, or migration, of the execution context.

#### Remarks
If the current `AppDomainManager` has a reference to a `HostExecutionContextManager` in its `HostExecutionContextManager` property, then the common language runtime calls the manager every time a call to the `ExecutionContext.Run` method occurs, to allow the host to participate in the flow of the execution context.

## HostExecutionContextManager.HostExecutionContextManager() constructor

```csharp
public HostExecutionContextManager ();
```

Initializes a new instance of the `HostExecutionContextManager` class.

To be added.

## HostExecutionContextManager.Capture() method

```csharp
public virtual System.Threading.HostExecutionContext? Capture ();
```

Captures the host execution context from the current thread.

Returns: A `HostExecutionContext` object representing the host execution context of the current thread.

#### Remarks
The `HostExecutionContext` is created using a safe handle containing the `IUnknown` pointer for the host executing the current thread.

## HostExecutionContextManager.Revert(Object) method

```csharp
public virtual void Revert (object previousState);
```

Restores the host execution context to its prior state.

Parameters:

- `previousState`: The previous context state to revert to.

Exceptions:

- `InvalidOperationException`: `previousState` is `null`.

-or-

`previousState` was not created on the current thread.

-or-

`previousState` is not the last state for the `HostExecutionContext`.

#### Remarks
`previousState` must be the object returned by the `HostExecutionContextManager.SetHostExecutionContext` method.

## HostExecutionContextManager.SetHostExecutionContext(HostExecutionContext) method

```csharp
public virtual object SetHostExecutionContext (System.Threading.HostExecutionContext hostExecutionContext);
```

Sets the current host execution context to the specified host execution context.

Parameters:

- `hostExecutionContext`: The `HostExecutionContext` to be set.

Returns: An object for restoring the `HostExecutionContext` to its previous state.

Exceptions:

- `InvalidOperationException`: `hostExecutionContext` was not acquired through a capture operation.

-or-

`hostExecutionContext` has been the argument to a previous `HostExecutionContextManager.SetHostExecutionContext` method call.

#### Remarks
The `HostExecutionContextManager.SetHostExecutionContext` method sets the host execution context for the current `HostExecutionContext`.  A `HostExecutionContext` that has been used as the argument to another `HostExecutionContextManager.SetHostExecutionContext` method call cannot be passed in as the parameter for this method. Instead, use the `HostExecutionContext.CreateCopy` method to create a copy of a `HostExecutionContext` object and then use the copy to set the host execution context.

Call the `HostExecutionContextManager.Revert` method using the object returned by this method to restore the `HostExecutionContext` to its previous state.
