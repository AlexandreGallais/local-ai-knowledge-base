---
title: "Component class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Component.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Component class

Namespace: `System.ComponentModel`

```csharp
public class Component : MarshalByRefObject, IDisposable, System.ComponentModel.IComponent
```

Provides the base implementation for the `IComponent` interface and enables object sharing between applications.

#### Remarks
`Component` is the base class for all components in the common language runtime that marshal by reference. `Component` is remotable and derives from the `MarshalByRefObject` class. `Component` provides an implementation of the `IComponent` interface. The `MarshalByValueComponent` provides an implementation of `IComponent` that marshals by value.

You can host a `Component` in any object that implements the `IContainer` interface, and you can query and get services from its container. The container creates an `ISite` for each `Component` it contains. The container uses the site to manage the `Component` and is used by the `Component` to communicate with its container.

A `Component` should release resources explicitly by calls to its `Component.Dispose` method, without waiting for automatic memory management through an implicit call to the `Object.Finalize` method. When a `Container` is disposed, all components within the `Container` are also disposed.

## Component.Component() constructor

```csharp
public Component ();
```

Initializes a new instance of the `Component` class.

To be added.

## Component.CanRaiseEvents property

```csharp
protected virtual bool CanRaiseEvents { get; }
```

Gets a value indicating whether the component can raise an event.

Returns: `true` if the component can raise events; otherwise, `false`. The default is `true`.

#### Remarks
The default implementation of this property always returns `true`. Classes that inherit from the `Component` class should override this property to provide the ability to disable the raising of events. For example, in the `Control` class, if the control is being hosted as an ActiveX control, the `CanRaiseEvents` property returns `false` if the ActiveX control has its events frozen.

## Component.Container property

```csharp
public System.ComponentModel.IContainer? Container { get; }
```

Gets the `IContainer` that contains the `Component`.

Returns: The `IContainer` that contains the `Component`, if any, or `null` if the `Component` is not encapsulated in an `IContainer`.

#### Remarks
The components in a container are tracked in a first-in, first-out list, which also defines the order of the components within the container. The last component added is the last component in the list.

## Component.DesignMode property

```csharp
protected bool DesignMode { get; }
```

Gets a value that indicates whether the `Component` is currently in design mode.

Returns: `true` if the `Component` is in design mode; otherwise, `false`.

#### Remarks
The design mode indicator is stored in the `ISite`; therefore, if the `Component` does not have an `ISite` associated with it, the value of this property is `false`.

## Component.Events property

```csharp
protected System.ComponentModel.EventHandlerList Events { get; }
```

Gets the list of event handlers that are attached to this `Component`.

Returns: An `EventHandlerList` that provides the delegates for this component.

#### Remarks
For more information about how to handle events, see Handling and Raising Events.

## Component.Site property

```csharp
public virtual System.ComponentModel.ISite? Site { get; set; }
```

Gets or sets the `ISite` of the `Component`.

Returns: The `ISite` associated with the `Component`, or `null` if the `Component` is not encapsulated in an `IContainer`, the `Component` does not have an `ISite` associated with it, or the `Component` is removed from its `IContainer`.

#### Remarks
A `Component` will have an `ISite` if it has been added to an `IContainer` and the `IContainer` assigns an `ISite` to it. The `IContainer` is responsible for assigning the `ISite` to the `Component`. Changing the value of the component's `ISite` does not necessarily change the name of the site the `Component` is assigned to. The `Site` property should be set only by an `IContainer`.

The property value is `null` if the `Component` is removed from its `IContainer`. Assigning `null` to this property does not necessarily remove the `Component` from the `IContainer`.

A `Component` might or might not have a name. If a `Component` is given a name, the name must be unique among other `Component` objects within its `IContainer`. The `ISite` stores the name of the `Component`; therefore, you can only name a `Component` if it has an `ISite` associated with it.

## Component.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Component`.

#### Remarks
Call `Component.Dispose` when you are finished using the `Component`. The `Component.Dispose` method leaves the `Component` in an unusable state. After calling `Component.Dispose`, you must release all references to the `Component` so the garbage collector can reclaim the memory that the `Component` was occupying. For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Component.Dispose` before you release your last reference to the `Component`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `Component` object's `Finalize` method.

## Component.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Component` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `Component` references. This method invokes the `Dispose()` method of each referenced object.

## Component.Finalize() method

```csharp
~Component ();
```

Releases unmanaged resources and performs other cleanup operations before the `Component` is reclaimed by garbage collection.

#### Remarks
This method overrides `Object.Finalize`. Application code should not call this method; an object's `Finalize` method is automatically invoked during garbage collection, unless finalization by the garbage collector has been disabled by a call to the `GC.SuppressFinalize` method.

## Component.GetService(Type) method

```csharp
protected virtual object? GetService (Type service);
```

Returns an object that represents a service provided by the `Component` or by its `Container`.

Parameters:

- `service`: A service provided by the `Component`.

Returns: An `Object` that represents a service provided by the `Component`, or `null` if the `Component` does not provide the specified service.

#### Remarks
This method can be overridden by a derived class.

## Component.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` containing the name of the `Component`, if any. This method should not be overridden.

Returns: A `String` containing the name of the `Component`, if any, or `null` if the `Component` is unnamed.

#### Remarks
A `Component` may or may not have a name. If a `Component` is given a name, the name is unique among other `Component` objects within its `IContainer`.

The `ISite` stores the name of the `Component`. A `Component` can only have an `ISite` if it has been added to an `IContainer` and the `IContainer` assigns an `ISite` to it.

## Component.Disposed event

```csharp
public event EventHandler? Disposed;
```

Occurs when the component is disposed by a call to the `Component.Dispose` method.

#### Remarks
When you create a `Disposed` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about the event handler delegates, see Handling and Raising Events.
