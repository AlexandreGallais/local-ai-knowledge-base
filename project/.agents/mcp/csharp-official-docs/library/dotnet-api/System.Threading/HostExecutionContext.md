---
title: "HostExecutionContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/HostExecutionContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostExecutionContext class

Namespace: `System.Threading`

```csharp
public class HostExecutionContext : IDisposable
```

Encapsulates and propagates the host execution context across threads.

#### Remarks
The `HostExecutionContext` is part of a larger `ExecutionContext`. The host context migrates, or flows, with the execution context.

## HostExecutionContext.HostExecutionContext() constructor

```csharp
public HostExecutionContext ();
```

Initializes a new instance of the `HostExecutionContext` class.

#### Remarks
The parameterless constructor creates a host execution context whose `State` property value is `null`.

## HostExecutionContext.HostExecutionContext(Object) constructor

```csharp
public HostExecutionContext (object? state);
```

Initializes a new instance of the `HostExecutionContext` class using the specified state.

Parameters:

- `state`: An object representing the host execution context state.

#### Remarks
The `HostExecutionContext` is included with the `ExecutionContext`. The `state` represents a safe handle containing the `IUnknown` pointer for the host.

## HostExecutionContext.State property

```csharp
protected internal object? State { get; set; }
```

Gets or sets the state of the host execution context.

Returns: An object representing the host execution context state.

#### Remarks
The `State` property value represents a safe handle containing the `IUnknown` pointer for the host.

## HostExecutionContext.CreateCopy() method

```csharp
public virtual System.Threading.HostExecutionContext CreateCopy ();
```

Creates a copy of the current host execution context.

Returns: A `HostExecutionContext` object representing the host context for the current thread.

#### Remarks
The copy can be used as the parameter to a `HostExecutionContextManager.SetHostExecutionContext` method call.

## HostExecutionContext.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `HostExecutionContext` class.

#### Remarks
Call `Dispose` when you are finished using the `HostExecutionContext`. The `Dispose` method leaves the `HostExecutionContext` in an unusable state. After calling `Dispose`, you must release all references to the `HostExecutionContext` so the garbage collector can reclaim the memory that the `HostExecutionContext` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `HostExecutionContext`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `HostExecutionContext` object's `Finalize` method.

## HostExecutionContext.Dispose(Boolean) method

```csharp
public virtual void Dispose (bool disposing);
```

When overridden in a derived class, releases the unmanaged resources used by the `WaitHandle`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the `Dispose` method overload and the finalizer. `Dispose` invokes this protected method with the `disposing` parameter set to `true`. The finalizer invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HostExecutionContext` references. This method invokes the `Dispose` method of each referenced object.

This method can be called multiple times by other objects. When overriding this method, be careful not to reference objects that have been previously disposed in an earlier call.
