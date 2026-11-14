---
title: "IItemProperties interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IItemProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IItemProperties interface

Namespace: `System.ComponentModel`

```csharp
public interface IItemProperties
```

Defines a property that provides information about an object's properties.

#### Remarks
A `CollectionView` can implement the `IItemProperties` interface to provide information about the properties that are available on the items in its collection.

## IItemProperties.ItemProperties property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.ComponentModel.ItemPropertyInfo> ItemProperties { get; }
```

Gets a collection that contains information about the properties that are available on the items in a collection.

Returns: A collection that contains information about the properties that are available on the items in a collection.

To be added.
