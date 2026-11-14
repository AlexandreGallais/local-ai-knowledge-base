---
title: "IComponent interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IComponent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IComponent interface

Namespace: `System.ComponentModel`

```csharp
public interface IComponent : IDisposable
```

Provides functionality required by all components.

#### Remarks
`Component` is the default implementation of `IComponent` and serves as the base class for all components in the common language runtime.

You can contain components in a container. In this context, containment refers to logical containment, not visual containment. You can use components and containers in a variety of scenarios, both visual and non visual.

`Control` inherits from `Component`, the default implementation of `IComponent`.

A component interacts with its container primarily through a container-provided `ISite`, which is a repository of container-specific per-component information.

#### Examples
The following code example demonstrates how to implement the `IComponent`, `ISite`, and `IContainer` interfaces.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentCollection/Overview/librarycontainer.cs._

## IComponent.Site property

```csharp
public System.ComponentModel.ISite? Site { get; set; }
```

Gets or sets the `ISite` associated with the `IComponent`.

Returns: The `ISite` object associated with the component; or `null`, if the component does not have a site.

#### Remarks
Sites can also serve as a repository for container-specific, per-component information, such as the component name.

## IComponent.Disposed event

```csharp
event EventHandler? Disposed;
```

Represents the method that handles the `IComponent.Disposed` event of a component.

#### Remarks
When you create a `Disposed` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.
