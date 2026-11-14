---
title: "ISite interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ISite.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISite interface

Namespace: `System.ComponentModel`

```csharp
public interface ISite : IServiceProvider
```

Provides functionality required by sites.

#### Remarks
Sites bind a `Component` to a `Container` and enable communication between them, as well as provide a way for the container to manage its components.

Sites can also serve as a repository for container-specific, per-component information, such as the component name.

#### Examples
The following example demonstrates the implementation of `ISite`, `IComponent`, and `IContainer` for use in a library container.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentCollection/Overview/librarycontainer.cs._

## ISite.Component property

```csharp
public System.ComponentModel.IComponent Component { get; }
```

Gets the component associated with the `ISite` when implemented by a class.

Returns: The `IComponent` instance associated with the `ISite`.

#### Remarks
A valid value for this property (that is, the value is not `null`) indicates that the component has been added to a container.

## ISite.Container property

```csharp
public System.ComponentModel.IContainer? Container { get; }
```

Gets the `IContainer` associated with the `ISite` when implemented by a class.

Returns: The `IContainer` instance associated with the `ISite`.

#### Remarks
`null` for the `Container` property indicates that the `IComponent` instance does not have an `ISite`.

## ISite.DesignMode property

```csharp
public bool DesignMode { get; }
```

Determines whether the component is in design mode when implemented by a class.

Returns: `true` if the component is in design mode; otherwise, `false`.

#### Remarks
The design mode indicator is stored in the `ISite`; therefore, if the `Component` does not have an `ISite` associated with it, this property is always `false`.

## ISite.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the component associated with the `ISite` when implemented by a class.

Returns: The name of the component associated with the `ISite`; or `null`, if no name is assigned to the component.

#### Remarks
The components within a container might or might not be named. If a component is given a name, the name must be unique among all the components within the container.
