---
title: "IContainer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IContainer interface

Namespace: `System.ComponentModel`

```csharp
public interface IContainer : IDisposable
```

Provides functionality for containers. Containers are objects that logically contain zero or more components.

#### Remarks
Containers are objects that encapsulate and track zero or more components. In this context, containment refers to logical containment, not visual containment. You can use components and containers in a variety of scenarios, including scenarios that are both visual and not visual.

#### Examples
The following code example demonstrates how to implement the `IContainer` interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentCollection/Overview/librarycontainer.cs._

## IContainer.Components property

```csharp
public System.ComponentModel.ComponentCollection Components { get; }
```

Gets all the components in the `IContainer`.

Returns: A collection of `IComponent` objects that represents all the components in the `IContainer`.

To be added.

## IContainer.Add(IComponent) method

```csharp
public void Add (System.ComponentModel.IComponent? component);
```

Adds the specified `IComponent` to the `IContainer` at the end of the list.

Parameters:

- `component`: The `IComponent` to add.

#### Remarks
The new `IComponent` is added at the end of the list.

## IContainer.Add(IComponent, String) method

```csharp
public void Add (System.ComponentModel.IComponent? component, string? name);
```

Adds the specified `IComponent` to the `IContainer` at the end of the list, and assigns a name to the component.

Parameters:

- `component`: The `IComponent` to add.
- `name`: The unique, case-insensitive name to assign to the component.

-or-

`null` that leaves the component unnamed.

#### Remarks
The new `IComponent` is added at the end of the list.

## IContainer.Remove(IComponent) method

```csharp
public void Remove (System.ComponentModel.IComponent? component);
```

Removes a component from the `IContainer`.

Parameters:

- `component`: The `IComponent` to remove.

To be added.
