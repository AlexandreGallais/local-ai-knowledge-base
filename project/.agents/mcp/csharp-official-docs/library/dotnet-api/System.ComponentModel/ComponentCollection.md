---
title: "ComponentCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ComponentCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComponentCollection class

Namespace: `System.ComponentModel`

```csharp
public class ComponentCollection : System.Collections.ReadOnlyCollectionBase
```

Provides a read-only container for a collection of `IComponent` objects.

#### Remarks
This collection inherits from `ReadOnlyCollectionBase`. The only way to add `IComponent` objects to this collection is to use the class constructor.

This collection provides two indexer properties, a string indexer and an integer indexer. The string indexer property returns a component in the collection by name if the `Site` property of a component in the collection is not `null` and the `Name` property of the `Site` property of the component matches the specified string. The integer indexer property returns the `IComponent` at the specified collection index. The `ComponentCollection.CopyTo` method copies the contents of the collection to a specified array, beginning writing to the array at the specified index.

#### Examples
The following code example demonstrates how to use a `ComponentCollection` to enumerate a collection of custom `BookComponent` objects.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentCollection/Overview/librarycontainer.cs._

## ComponentCollection.ComponentCollection(IComponent[]) constructor

```csharp
public ComponentCollection (System.ComponentModel.IComponent[] components);
```

Initializes a new instance of the `ComponentCollection` class using the specified array of components.

Parameters:

- `components`: An array of `IComponent` objects to initialize the collection with.

#### Remarks
This method adds each `IComponent` in the specified `IComponent` array to the collection.

#### Examples
The following code example demonstrates how to create a `ComponentCollection` from an array of `BookComponent` objects.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentCollection/Overview/librarycontainer.cs._

## ComponentCollection.Item property

```csharp
public virtual System.ComponentModel.IComponent? this[int index] { get; }
```

Gets the `Component` in the collection at the specified collection index.

Parameters:

- `index`: The collection index of the `Component` to get.

Returns: The `IComponent` at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: If the specified index is not within the index range of the collection.

#### Remarks
This method can be overridden by a derived class.

## ComponentCollection.Item property

```csharp
public virtual System.ComponentModel.IComponent? this[string? name] { get; }
```

Gets any component in the collection matching the specified name.

Parameters:

- `name`: The name of the `IComponent` to get.

Returns: A component with a name matching the name specified by the `name` parameter, or `null` if the named component cannot be found in the collection.

#### Remarks
This method can be overridden by a derived class.

This property returns an `IComponent` in the collection if its `Site` property is not `null` and the `Name` property of its `Site` property matches the specified string.

> **Note:**
>  This string indexer works only when the component is sited, which typically occurs only at design time. To site a `Component` at run time, set the `Site` property of the `Component`. The `Name` property of the `ISite` set to the `Site` property must also be set for this property to return the component.

## ComponentCollection.CopyTo(IComponent[], Int32) method

```csharp
public void CopyTo (System.ComponentModel.IComponent[] array, int index);
```

Copies the entire collection to an array, starting writing at the specified array index.

Parameters:

- `array`: An `IComponent` array to copy the objects in the collection to.
- `index`: The index of the `array` at which copying to should begin.

To be added.
