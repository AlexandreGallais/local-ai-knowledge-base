---
title: "INestedContainer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/INestedContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INestedContainer interface

Namespace: `System.ComponentModel`

```csharp
public interface INestedContainer : IDisposable, System.ComponentModel.IContainer
```

Provides functionality for nested containers, which logically contain zero or more other components and are owned by a parent component.

#### Remarks
The `INestedContainer` interface adds the concept of an owning component to the `IContainer` interface. A nested container is an object that logically, but not necessarily visually, contains zero or more child components and is owned by some parent component. For visual containment, the owning component is often another container.

Nested containers allow sections of a control to be designable, without requiring an explicit serialized member variable or a custom serializer for each subcontrol. Instead, the form designer maintains one primary container of components. Each component's site may have a nested container that provides a place to put extra components. When a component is sited in a nested container, the name it receives is a combination of its given name and its owning component's name. Additionally, components added to a nested container have full access to the services of the parent container, and the nested container provides the same behavior of the parent with respect to adding new components. The nested container will create the designer for each component it contains, thereby enabling design-time support. Because standard code serializers do not look at nested containers, these components are only serialized if a path to them can be obtained by walking the components in the primary container.

Nested containers can be found by querying a component's site for services of type `INestedContainer`.

## INestedContainer.Owner property

```csharp
public System.ComponentModel.IComponent Owner { get; }
```

Gets the owning component for the nested container.

Returns: The `IComponent` that owns the nested container.

#### Remarks
The owning component is the characteristic that differentiates nested containers from ordinary containers.
