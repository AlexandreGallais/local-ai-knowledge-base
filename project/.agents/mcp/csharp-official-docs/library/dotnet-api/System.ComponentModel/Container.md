---
title: "Container class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Container.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Container class

Namespace: `System.ComponentModel`

```csharp
public class Container : IDisposable, System.ComponentModel.IContainer
```

Encapsulates zero or more components.

#### Remarks
The `Container` class is the default implementation for the `IContainer` interface.

Containers are objects that encapsulate and track zero or more components. In this context, containment refers to logical containment, not visual containment. You can use components and containers in a variety of scenarios, including scenarios that are both visual and not visual.

The components in a container are tracked in a first-in, first-out list, which also defines the order of the components within the container. Added components are appended to the end of the list.

## Container.Container() constructor

```csharp
public Container ();
```

Initializes a new instance of the `Container` class.

To be added.

## Container.Components property

```csharp
public virtual System.ComponentModel.ComponentCollection Components { get; }
```

Gets all the components in the `Container`.

Returns: A collection that contains the components in the `Container`.

#### Remarks
This method can be overridden by a derived class.

The components in the collection are stored in the same order as they were added to the `Container`.

## Container.Add(IComponent) method

```csharp
public virtual void Add (System.ComponentModel.IComponent? component);
```

Adds the specified `Component` to the `Container`. The component is unnamed.

Parameters:

- `component`: The component to add.

Exceptions:

- `ArgumentNullException`: `component` is `null`.

#### Remarks
This method can be overridden by a derived class.

The new `Component` is added to the end of the list.

## Container.Add(IComponent, String) method

```csharp
public virtual void Add (System.ComponentModel.IComponent? component, string? name);
```

Adds the specified `Component` to the `Container` and assigns it a name.

Parameters:

- `component`: The component to add.
- `name`: The unique, case-insensitive name to assign to the component.

-or-

`null`, which leaves the component unnamed.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `ArgumentException`: `name` is not unique.

#### Remarks
This method can be overridden by a derived class.

The new `Component` is added to the end of the list.

## Container.CreateSite(IComponent, String) method

```csharp
protected virtual System.ComponentModel.ISite CreateSite (System.ComponentModel.IComponent component, string? name);
```

Creates a site `ISite` for the given `IComponent` and assigns the given name to the site.

Parameters:

- `component`: The `IComponent` to create a site for.
- `name`: The name to assign to `component`, or `null` to skip the name assignment.

Returns: The newly created site.

#### Remarks
If the `name` parameter is `null`, the `IComponent` is added to the `Container` without an identifying name.

This method can be overridden by a derived class. Implementers that need to override the `Container.CreateSite` method can provide a custom implementation through a class that implements the `ISite` interface.

## Container.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Container`.

#### Remarks
Call `Container.Dispose` when you are finished using the `Container`. The `Container.Dispose` method leaves the `Container` in an unusable state. After calling `Container.Dispose`, you must release all references to the `Container` so the garbage collector can reclaim the memory that the `Container` was occupying. For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Container.Dispose` before you release your last reference to the `Container`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `Container` object's `Finalize` method.

## Container.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Container`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `Container` references. This method invokes the `Dispose` method of each referenced object.

## Container.Finalize() method

```csharp
~Container ();
```

Releases unmanaged resources and performs other cleanup operations before the `Container` is reclaimed by garbage collection.

#### Remarks
This method overrides `Object.Finalize`. Application code should not call this method; an object's `Finalize` method is automatically invoked during garbage collection, unless finalization by the garbage collector has been disabled by a call to the `GC.SuppressFinalize` method.

## Container.GetService(Type) method

```csharp
protected virtual object? GetService (Type service);
```

Gets the service object of the specified type, if it is available.

Parameters:

- `service`: The `Type` of the service to retrieve.

Returns: An `Object` implementing the requested service, or `null` if the service cannot be resolved.

#### Remarks
The default implementation of this method returns the current instance of the class if `service` is an `IContainer`; otherwise, it returns `null`. You can override this method to provide a custom implementation to return a service object. For more information, see the `IServiceProvider.GetService` method.

## Container.Remove(IComponent) method

```csharp
public virtual void Remove (System.ComponentModel.IComponent? component);
```

Removes a component from the `Container`.

Parameters:

- `component`: The component to remove.

#### Remarks
This method can be overridden by a derived class.

## Container.RemoveWithoutUnsiting(IComponent) method

```csharp
protected void RemoveWithoutUnsiting (System.ComponentModel.IComponent? component);
```

Removes a component from the `Container` without setting `IComponent.Site` to `null`.

Parameters:

- `component`: The component to remove.

#### Remarks
The `Container.RemoveWithoutUnsiting` method cleans up the site as usual, but it does not set the component's `Site` property to `null`.

## Container.ValidateName(IComponent, String) method

```csharp
protected virtual void ValidateName (System.ComponentModel.IComponent component, string? name);
```

Determines whether the component name is unique for this container.

Parameters:

- `component`: The named component.
- `name`: The component name to validate.

Exceptions:

- `ArgumentNullException`: `component` is `null`.
- `ArgumentException`: `name` is not unique.

#### Remarks
The `Container.ValidateName` method is called by the `Container.Add` method to determine if the name of the `component` being added is unique for this `Container`. If the `name` parameter is not `null` and is not unique, an `ArgumentException` is thrown.
