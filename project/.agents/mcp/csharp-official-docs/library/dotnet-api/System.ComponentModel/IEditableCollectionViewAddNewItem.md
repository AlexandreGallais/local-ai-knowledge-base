---
title: "IEditableCollectionViewAddNewItem interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IEditableCollectionViewAddNewItem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEditableCollectionViewAddNewItem interface

Namespace: `System.ComponentModel`

```csharp
public interface IEditableCollectionViewAddNewItem : System.ComponentModel.IEditableCollectionView
```

Defines methods and properties that a `CollectionView` implements to enable specifying adding items of a specific type.

#### Remarks
The `IEditableCollectionViewAddNewItem` interface enables application developers to specify what type of object to add to a collection. This interface extends `IEditableCollectionView`, so you can add, edit, and remove items in a collection. `IEditableCollectionViewAddNewItem` adds the `IEditableCollectionViewAddNewItem.AddNewItem` method, which takes an object that is added to the collection. This method is useful when the collection and objects that you want to add have one or more of the following characteristics:

- The objects in the `CollectionView` are different types.

- The objects do not have a parameterless constructor.

- The object already exists.

- You want to add a `null` object to the collection.

#### Examples
The following example enables a user to add various types of items to a collection. The user can enter a new item and submit the entry or cancel the transaction. The example gets an `IEditableCollectionViewAddNewItem` from the `Items` property of a `ListBox` and creates an object, whose type is determined by the user. Then the example calls the `IEditableCollectionViewAddNewItem.AddNewItem` method to add the object to the collection.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/window1.xaml.cs._

The following example creates the user interface for the previous example.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/window1.xaml._
The following example creates the `AddItemWindow` in which the user adds data for a new item.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/additem.xaml._
The following example shows the logic for the `AddItemWindow`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/additem.xaml.cs._

The following example shows the data types and collection that is used in the previous examples.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/data.cs._

## IEditableCollectionViewAddNewItem.CanAddNewItem property

```csharp
public bool CanAddNewItem { get; }
```

Gets a value that indicates whether a specified object can be added to the collection.

Returns: `true` if a specified object can be added to the collection; otherwise, `false`.

#### Remarks
If the `CanAddNewItem` property is `true`, you can specify an object to add to the collection by calling the `IEditableCollectionViewAddNewItem.AddNewItem` method. `IEditableCollectionViewAddNewItem.CanAddNewItem` is `false` if items cannot be added to the collection by using `IEditableCollectionViewAddNewItem.AddNewItem`. If `IEditableCollectionViewAddNewItem.CanAddNewItem` is `false`, you may still be able to add an object by using the `IEditableCollectionView.AddNew` method. For example, you can add objects to an ADO.NET source by using `IEditableCollectionView.AddNew`, but not by using `IEditableCollectionViewAddNewItem.AddNewItem`.

## IEditableCollectionViewAddNewItem.AddNewItem(Object) method

```csharp
public object AddNewItem (object newItem);
```

Adds the specified object to the collection.

Parameters:

- `newItem`: The object to add to the collection.

Returns: The object that is added to the collection.

#### Remarks
When you calling the `IEditableCollectionViewAddNewItem.AddNewItem` method, it begins an add transaction. You should call the `IEditableCollectionView.CommitNew` or `IEditableCollectionView.CancelNew` methods to end the add transaction.

A new item always appears in the collection view. Any filtering, sorting, or grouping that is applied to the view is applied to the new item when `IEditableCollectionView.CommitNew` is called.

#### Examples
The following example calls the `IEditableCollectionViewAddNewItem.AddNewItem` method to add an object to a collection. For the complete example, see the `IEditableCollectionViewAddNewItem` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionViewAddNewItem/Overview/window1.xaml.cs._
