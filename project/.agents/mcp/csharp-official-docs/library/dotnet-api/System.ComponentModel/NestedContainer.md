---
title: "NestedContainer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/NestedContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NestedContainer class

Namespace: `System.ComponentModel`

```csharp
public class NestedContainer : System.ComponentModel.Container, IDisposable, System.ComponentModel.IContainer, System.ComponentModel.INestedContainer
```

Provides the base implementation for the `INestedContainer` interface, which enables containers to have an owning component.

#### Remarks
The `NestedContainer` class is a simple implementation of the `INestedContainer` interface, which defines a component that logically contains zero or more other components and is owned by a parent component. The behavior of nested containers differs from a standard `Container` in a number of ways, including the following:

- Site characteristics such as `Component.DesignMode` and `Component.GetService` are routed through the owning component's site.

- The site's `Name` property is a qualified name that includes the owning component's name followed by a period (.) and the child component's name.

-   `NestedContainer.GetService` provides support for the `INestedContainer` as a service.

- When the owning component is disposed, the container is disposed as well.

In addition, designers treat nested containers differently. A designer host is only interested in one container - the one associated with the host. Therefore, component add and remove events are not raised when a component is added to or removed from a nested container. However, because services flow through to the nested container, component change events are raised when a component in a nested container is changed.

This disparity in event tracking also impacts undo functionality, which is closely tied to serialization. The standard undo engine uses `IReferenceService` to track changes made to components. If the undo engine cannot identify a name for a component through the reference service, the engine will ignore any changes for that component. This service automatically recognizes changes to contained components only if they are exposed as public read-only properties of the same name in their owners. Otherwise, the developer must pass <example-value> change events up to the owner. For example, if a nested component's `Text` property is resurfaced on its owning component as an `Address` property, when the `Text` property is changed, a property change must be programmatically made for the corresponding `Address` property or else that change will not be tracked by undo.

## NestedContainer.NestedContainer(IComponent) constructor

```csharp
public NestedContainer (System.ComponentModel.IComponent owner);
```

Initializes a new instance of the `NestedContainer` class.

Parameters:

- `owner`: The `IComponent` that owns this nested container.

Exceptions:

- `ArgumentNullException`: `owner` is `null`.

#### Remarks
This constructor enlists in its owner's `Disposed` event so that the nested container's `NestedContainer.Dispose` method will automatically be called.

## NestedContainer.Owner property

```csharp
public System.ComponentModel.IComponent Owner { get; }
```

Gets the owning component for this nested container.

Returns: The `IComponent` that owns this nested container.

#### Remarks
The owning component is the characteristic that differentiates nested containers from ordinary containers.

## NestedContainer.OwnerName property

```csharp
protected virtual string? OwnerName { get; }
```

Gets the name of the owning component.

Returns: The name of the owning component.

#### Remarks
This property may be overridden to provide a custom owner name. The default implementation searches the owner's site for `INestedSite` and calls `INestedSite.FullName`, or `ISite.Name` if there is no nested site. If neither is available, this property returns `null`.

## NestedContainer.CreateSite(IComponent, String) method

```csharp
protected override System.ComponentModel.ISite CreateSite (System.ComponentModel.IComponent component, string? name);
```

Creates a site for the component within the container.

Parameters:

- `component`: The `IComponent` to create a site for.
- `name`: The name to assign to `component`, or `null` to skip the name assignment.

Returns: The newly created `ISite`.

Exceptions:

- `ArgumentNullException`: `component` is `null`.

#### Remarks
If the `name` parameter is `null`, the `IComponent` is added to the nested container without an identifying name.

## NestedContainer.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the nested container.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `NestedContainer` references. This method invokes the `Dispose()` method of each referenced object.

## NestedContainer.GetService(Type) method

```csharp
protected override object? GetService (Type service);
```

Gets the service object of the specified type, if it is available.

Parameters:

- `service`: The `Type` of the service to retrieve.

Returns: An `Object` that implements the requested service, or `null` if the service cannot be resolved.

#### Remarks
This method overrides the `Container.GetService` method. This implementation only resolves requests for the `INestedContainer` and `IContainer` services.
