---
title: "ContainerFilterService class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ContainerFilterService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContainerFilterService class

Namespace: `System.ComponentModel`

```csharp
public abstract class ContainerFilterService
```

Provides a base class for the container filter service.

#### Remarks
The `Container` and `NestedContainer` classes call the `ContainerFilterService.FilterComponents` method each time they need to construct a component collection for return to a caller. `ContainerFilterService.FilterComponents` may return an updated collection of components. This enables an external service to modify the view of components that are returned from a container.

## ContainerFilterService.ContainerFilterService() constructor

```csharp
protected ContainerFilterService ();
```

Initializes a new instance of the `ContainerFilterService` class.

To be added.

## ContainerFilterService.FilterComponents(ComponentCollection) method

```csharp
public virtual System.ComponentModel.ComponentCollection FilterComponents (System.ComponentModel.ComponentCollection components);
```

Filters the component collection.

Parameters:

- `components`: The component collection to filter.

Returns: A `ComponentCollection` that represents a modified collection.

#### Remarks
The `ContainerFilterService.FilterComponents` method filters the component collection by optionally returning a new, modified collection. The default implementation returns the input collection, thereby performing no filtering.
