---
title: "SortDescriptionCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SortDescriptionCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortDescriptionCollection class

Namespace: `System.ComponentModel`

```csharp
public class SortDescriptionCollection : System.Collections.ObjectModel.Collection<System.ComponentModel.SortDescription>, System.Collections.Specialized.INotifyCollectionChanged
```

Represents a collection of `SortDescription` objects.

To be added.

## SortDescriptionCollection.SortDescriptionCollection() constructor

```csharp
public SortDescriptionCollection ();
```

Initializes a new instance of the `SortDescriptionCollection` class.

To be added.

## SortDescriptionCollection.ClearItems() method

```csharp
protected override void ClearItems ();
```

Removes all items from the collection.

#### Remarks
The base class calls this method when the list is being cleared. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.ClearItems` method of the `Collection<T>` base class.

## SortDescriptionCollection.InsertItem(Int32, SortDescription) method

```csharp
protected override void InsertItem (int index, System.ComponentModel.SortDescription item);
```

Inserts an item into the collection at the specified index.

Parameters:

- `index`: The zero-based index where the `item` is inserted.
- `item`: The object to insert.

#### Remarks
The base class calls this method when an item is added to the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.InsertItem` method of the `Collection<T>` base class.

## SortDescriptionCollection.RemoveItem(Int32) method

```csharp
protected override void RemoveItem (int index);
```

Removes the item at the specified index in the collection.

Parameters:

- `index`: The zero-based index of the element to remove.

#### Remarks
The base class calls this method when an item is removed from the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.RemoveItem` method of the `Collection<T>` base class.

## SortDescriptionCollection.SetItem(Int32, SortDescription) method

```csharp
protected override void SetItem (int index, System.ComponentModel.SortDescription item);
```

Replaces the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to replace.
- `item`: The new value for the element at the specified index.

#### Remarks
The base class calls this method when an item is set in the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.SetItem` method of the `Collection<T>` base class.

## SortDescriptionCollection.Empty field

```csharp
public static readonly System.ComponentModel.SortDescriptionCollection Empty;
```

Gets an empty and non-modifiable instance of `SortDescriptionCollection`.

To be added.

## SortDescriptionCollection.CollectionChanged event

```csharp
protected event System.Collections.Specialized.NotifyCollectionChangedEventHandler CollectionChanged;
```

Occurs when an item is added or removed.

To be added.

## SortDescriptionCollection.System.Collections.Specialized.INotifyCollectionChanged.CollectionChanged event

```csharp
event System.Collections.Specialized.NotifyCollectionChangedEventHandler System.Collections.Specialized.INotifyCollectionChanged.CollectionChanged;
```

Occurs when an item is added or removed.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `SortDescriptionCollection` instance is cast to an `INotifyCollectionChanged` interface.
