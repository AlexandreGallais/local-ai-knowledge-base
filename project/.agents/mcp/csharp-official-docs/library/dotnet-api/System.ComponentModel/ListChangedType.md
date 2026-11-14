---
title: "ListChangedType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListChangedType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListChangedType enum

Namespace: `System.ComponentModel`

```csharp
public enum ListChangedType
```

Specifies how the list changed.

#### Remarks
Used by the `ListChangedType` property of the `ListChangedEventArgs` class to indicate the way an `IBindingList` object changes.

#### Examples
For an example of using this class, see Handling DataView Events.

## ListChangedType.ItemAdded field

```csharp
ItemAdded
```

An item added to the list. `ListChangedEventArgs.NewIndex` contains the index of the item that was added.

## ListChangedType.ItemChanged field

```csharp
ItemChanged
```

An item changed in the list. `ListChangedEventArgs.NewIndex` contains the index of the item that was changed.

## ListChangedType.ItemDeleted field

```csharp
ItemDeleted
```

An item deleted from the list. `ListChangedEventArgs.NewIndex` contains the index of the item that was deleted.

## ListChangedType.ItemMoved field

```csharp
ItemMoved
```

An item moved within the list. `ListChangedEventArgs.OldIndex` contains the previous index for the item, whereas `ListChangedEventArgs.NewIndex` contains the new index for the item.

## ListChangedType.PropertyDescriptorAdded field

```csharp
PropertyDescriptorAdded
```

A `PropertyDescriptor` was added, which changed the schema.

## ListChangedType.PropertyDescriptorChanged field

```csharp
PropertyDescriptorChanged
```

A `PropertyDescriptor` was changed, which changed the schema.

## ListChangedType.PropertyDescriptorDeleted field

```csharp
PropertyDescriptorDeleted
```

A `PropertyDescriptor` was deleted, which changed the schema.

## ListChangedType.Reset field

```csharp
Reset
```

Much of the list has changed. Any listening controls should refresh all their data from the list.
