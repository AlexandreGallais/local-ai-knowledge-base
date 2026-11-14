---
title: "MarshalByValueComponent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MarshalByValueComponent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MarshalByValueComponent class

Namespace: `System.ComponentModel`

```csharp
public class MarshalByValueComponent : IDisposable, IServiceProvider, System.ComponentModel.IComponent
```

Implements `IComponent` and provides the base implementation for remotable components that are marshaled by value (a copy of the serialized object is passed).

#### Remarks
A component can be contained in a container. For each component in a container, the container creates a site that it uses to manage the component. The component interacts with its container primarily through a container-provided `ISite`, which is a repository of container-specific, per-component information.

## MarshalByValueComponent.MarshalByValueComponent() constructor

```csharp
public MarshalByValueComponent ();
```

Initializes a new instance of the `MarshalByValueComponent` class.

#### Remarks
A component can be contained in a container. For each component in a container, the container creates a site that it uses to manage the component. The component interacts with its container primarily through a container-provided `ISite`, which is a repository of container-specific, per-component information.

## MarshalByValueComponent.Container property

```csharp
public virtual System.ComponentModel.IContainer? Container { get; }
```

Gets the container for the component.

Returns: An object implementing the `IContainer` interface that represents the component's container, or `null` if the component does not have a site.

To be added.

## MarshalByValueComponent.DesignMode property

```csharp
public virtual bool DesignMode { get; }
```

Gets a value indicating whether the component is currently in design mode.

Returns: `true` if the component is in design mode; otherwise, `false`.

#### Remarks
If the component does not have a site, this method always returns `false`.

## MarshalByValueComponent.Events property

```csharp
protected System.ComponentModel.EventHandlerList Events { get; }
```

Gets the list of event handlers that are attached to this component.

Returns: An `EventHandlerList` that provides the delegates for this component.

To be added.

## MarshalByValueComponent.Site property

```csharp
public virtual System.ComponentModel.ISite? Site { get; set; }
```

Gets or sets the site of the component.

Returns: An object implementing the `ISite` interface that represents the site of the component.

#### Remarks
A valid value for this property - that is, the value is not `null`, indicates that the component has been added to a container.

When the value of this property is `null`, the property indicates that the component is being removed from a container. However, this property does not remove the component from the container.

## MarshalByValueComponent.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `MarshalByValueComponent`.

#### Remarks
Call `MarshalByValueComponent.Dispose` when you are finished using the `MarshalByValueComponent`. The `MarshalByValueComponent.Dispose` method leaves the `MarshalByValueComponent` in an unusable state. After calling `MarshalByValueComponent.Dispose`, you must release all references to the `MarshalByValueComponent` so the garbage collector can reclaim the memory that the `MarshalByValueComponent` was occupying. For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `MarshalByValueComponent.Dispose` before you release your last reference to the `MarshalByValueComponent`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `MarshalByValueComponent` object's `Finalize` method.

## MarshalByValueComponent.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `MarshalByValueComponent` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `MarshalByValueComponent` references. This method invokes the `Dispose()` method of each referenced object.

## MarshalByValueComponent.Finalize() method

```csharp
~MarshalByValueComponent ();
```

Allows an object to try to free resources and perform other cleanup operations before it is reclaimed by garbage collection.

To be added.

## MarshalByValueComponent.GetService(Type) method

```csharp
public virtual object? GetService (Type service);
```

Gets the implementer of the `IServiceProvider`.

Parameters:

- `service`: A `Type` that represents the type of service you want.

Returns: An `Object` that represents the implementer of the `IServiceProvider`.

To be added.

## MarshalByValueComponent.ToString() method

```csharp
public override string? ToString ();
```

Returns a `String` containing the name of the `Component`, if any. This method should not be overridden.

Returns: A `String` containing the name of the `Component`, if any.

`null` if the `Component` is unnamed.

#### Remarks
A `Component` may or may not have a name. If a `Component` is given a name, the name is unique among other `Component` objects within its `IContainer`.

The `ISite` stores the `Component`'s name. A `Component` can only have a `ISite` if it has been added to an `IContainer` and the `IContainer` assigns an `ISite` to it.

## MarshalByValueComponent.Disposed event

```csharp
public event EventHandler? Disposed;
```

Adds an event handler to listen to the `MarshalByValueComponent.Disposed` event on the component.

To be added.
