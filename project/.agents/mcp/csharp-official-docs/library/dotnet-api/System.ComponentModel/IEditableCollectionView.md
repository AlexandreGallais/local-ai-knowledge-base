---
title: "IEditableCollectionView interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IEditableCollectionView.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEditableCollectionView interface

Namespace: `System.ComponentModel`

```csharp
public interface IEditableCollectionView
```

Defines methods and properties that a `CollectionView` implements to provide editing capabilities to a collection.

#### Remarks
When a collection view implements the `IEditableCollectionView` interface, you can directly change the underlying collection, if it allows changes to be made, by using the methods and properties that `IEditableCollectionView` exposes, regardless of the collection's type.

The types `ItemCollection`, `BindingListCollectionView`, and `ListCollectionView` are the types that ship with Windows Presentation Foundation (WPF) that inherit from `CollectionView`.  These types also implement the `IEditableCollectionView`, so you can edit a collection that uses one of those types.  `ItemCollection`, in particular, is often used because the `Items` property is an `ItemCollection`.

#### Examples
The following example shows how to add an item to a collection by using methods that are defined by `IEditableCollectionView`.  This application displays a list of items for sale and gives the user the option of adding, editing, or removing an item.  When the user adds or edits an item, a form prompts the user to enter a new item.  If the user submits the form, the item is committed to the collection.  If the user cancels the form, the item is discarded. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CanAddNew property

```csharp
public bool CanAddNew { get; }
```

Gets a value that indicates whether a new item can be added to the collection.

Returns: `true` if a new item can be added to the collection; otherwise, `false`.

#### Remarks
An `IEditableCollectionView` can add a new item if the following are true:

- An item can be added to the underlying collection.  For example, if the collection is read-only, `IEditableCollectionView.CanAddNew` is `false`.

- The `IEditableCollectionView` can create an object of the type that is in the collection.  For example, if the collection is of type `ObservableCollection<T>`, the `IEditableCollectionView` must be able to create an object of type `T`.

#### Examples
The following example checks whether an item can be added to the collection.  If `IEditableCollectionView.CanAddNew` is `false`, the example tells the user that an item cannot be added.  Otherwise, it shows a form that prompts the user to add a new item. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample .

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CanCancelEdit property

```csharp
public bool CanCancelEdit { get; }
```

Gets a value that indicates whether the collection view can discard pending changes and restore the original values of an edited object.

Returns: `true` if the collection view can discard pending changes and restore the original values of an edited object; otherwise, `false`.

#### Remarks
`IEditableCollectionView.CanCancelEdit` is `true` if the view supports the notion of "pending changes" on the currently edited item.   For example, a collection view might return `true` if the edited item implements `IEditableObject`, or if the view has information about the item's state that it can use to roll back changes. `IEditableCollectionView.CanCancelEdit` is `false` if the view cannot revert changes on an object.  In that case, call `IEditableCollectionView.CancelEdit` to cause the view to exit the edit state and provide logic to revert the changes on the object that was edited.

#### Examples
The following example gets `IEditableCollectionView.CanCancelEdit` to check whether the original values of the edited item can be restored before it calls `IEditableCollectionView.CancelEdit`.  If the values cannot be restored, you must supply additional logic to do so.  If they can be, the values are restored when the example calls `IEditableCollectionView.CancelEdit`.   For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CanRemove property

```csharp
public bool CanRemove { get; }
```

Gets a value that indicates whether an item can be removed from the collection.

Returns: `true` if an item can be removed from the collection; otherwise, `false`.

#### Remarks
`IEditableCollectionView.CanRemove` is `false` if the underlying collection is read-only.

#### Examples
The following example calls `IEditableCollectionView.CanRemove` to check whether an item can be removed from the collection.  If an item can be removed, the example prompts the user to confirm the action and calls `IEditableCollectionView.Remove` if the user clicks **Yes**. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CurrentAddItem property

```csharp
public object CurrentAddItem { get; }
```

Gets the item that is being added during the current add transaction.

Returns: The item that is being added if `IEditableCollectionView.IsAddingNew` is `true`; otherwise, `null`.

To be added.

## IEditableCollectionView.CurrentEditItem property

```csharp
public object CurrentEditItem { get; }
```

Gets the item in the collection that is being edited.

Returns: The item in the collection that is being edited if `IEditableCollectionView.IsEditingItem` is `true`; otherwise, `null`.

To be added.

## IEditableCollectionView.IsAddingNew property

```csharp
public bool IsAddingNew { get; }
```

Gets a value that indicates whether an add transaction is in progress.

Returns: `true` if an add transaction is in progress; otherwise, `false`.

#### Remarks
You begin an add transaction by calling `IEditableCollectionView.AddNew` and end the add transaction by calling `IEditableCollectionView.CommitNew` or `IEditableCollectionView.CancelNew`.

## IEditableCollectionView.IsEditingItem property

```csharp
public bool IsEditingItem { get; }
```

Gets a value that indicates whether an edit transaction is in progress.

Returns: `true` if an edit transaction is in progress; otherwise, `false`.

#### Remarks
You begin an edit transaction by calling `IEditableCollectionView.EditItem` and end the transaction by calling `IEditableCollectionView.CommitEdit` or `IEditableCollectionView.CancelEdit`.

## IEditableCollectionView.NewItemPlaceholderPosition property

```csharp
public System.ComponentModel.NewItemPlaceholderPosition NewItemPlaceholderPosition { get; set; }
```

Gets or sets the position of the new item placeholder in the collection view.

Returns: One of the enumeration values that specifies the position of the new item placeholder in the collection view.

To be added.

## IEditableCollectionView.AddNew() method

```csharp
public object AddNew ();
```

Adds a new item to the collection.

Returns: The new item that is added to the collection.

#### Remarks
Calling `IEditableCollectionView.AddNew` begins an add transaction.  You should call `IEditableCollectionView.CommitNew` or `IEditableCollectionView.CancelNew` to end the add transaction. A new item always appears in the collection view. Any filtering, sorting, or grouping that is applied to the view is applied to the new item when `IEditableCollectionView.CommitNew` is called.

#### Examples
The following example creates a `Window` that prompts the user to add a new item.  Then it calls `IEditableCollectionView.AddNew` to create a new object and sets the `FrameworkElement.DataContext` of the `Window` to that object. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CancelEdit() method

```csharp
public void CancelEdit ();
```

Ends the edit transaction and, if possible, restores the original value to the item.

#### Remarks
`IEditableCollectionView.CancelEdit` sets `IEditableCollectionView.CurrentEditItem` to `null` and causes the collection view to exit the edit state.  If `IEditableCollectionView.CanCancelEdit` is `true`, `IEditableCollectionView.CancelEdit` also restores the original values of the edited object.

#### Examples
The following example gets `IEditableCollectionView.CanCancelEdit` to check whether the original values of the edited item can be restored before it calls `IEditableCollectionView.CancelEdit`.  If the values cannot be restored, you must supply additional logic to do so.  If they can be, the values are restored when the example calls `IEditableCollectionView.CancelEdit`. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CancelNew() method

```csharp
public void CancelNew ();
```

Ends the add transaction and discards the pending new item.

#### Examples
The following example displays a form that prompts the user to add a new item.  If the user submits the form, the example calls `IEditableCollectionView.CommitNew` to add the item to the collection.  If the user cancels the form, the example calls `IEditableCollectionView.CancelNew` to discard the item. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CommitEdit() method

```csharp
public void CommitEdit ();
```

Ends the edit transaction and saves the pending changes.

#### Examples
The following example creates a form that prompts the user to edit an existing item.  If the user submits the form, the example calls `IEditableCollectionView.CommitEdit` to save the changes to the collection.  If the user cancels the form, the example calls `IEditableCollectionView.CancelEdit` to discard the changes. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.CommitNew() method

```csharp
public void CommitNew ();
```

Ends the add transaction and saves the pending new item.

#### Remarks
Any filtering, sorting, or grouping that is applied to the `CollectionView` is applied to the new item when `IEditableCollectionView.CommitNew` is called.

#### Examples
The following example displays a form that prompts the user to add a new item.  If the user submits the form, the example calls `IEditableCollectionView.CommitNew` to add the item to the collection.  If the user cancels the form, the example calls `IEditableCollectionView.CancelNew` to discard the item. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.EditItem(Object) method

```csharp
public void EditItem (object item);
```

Begins an edit transaction of the specified item.

Parameters:

- `item`: The item to edit.

#### Examples
The following example creates a form that prompts the user to edit an existing item.  If the user submits the form, the changes are committed to the collection.  If the user cancels the form, the changes are discarded. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample .

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.Remove(Object) method

```csharp
public void Remove (object item);
```

Removes the specified item from the collection.

Parameters:

- `item`: The item to remove.

#### Remarks
If `item` is not in the collection, `IEditableCollectionView.Remove` does nothing.

#### Examples
The following example calls `IEditableCollectionView.CanRemove` to check whether an item can be removed from the collection.  If an item can be removed, the example prompts the user to confirm the action and calls `IEditableCollectionView.Remove` if the user clicks **Yes**. For the entire sample, see Changing a Collection by Using IEditableCollectionView Sample.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IEditableCollectionView/Overview/Window1.xaml.cs._
## IEditableCollectionView.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the item at the specified position from the collection.

Parameters:

- `index`: The position of the item to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than the number of items in the collection view.

#### Remarks
`index` is relative to the collection view, not the collection.  For example, if the collection has 10 items and the view has a `ICollectionView.Filter` so that 7 items appear, the valid values of `index` are 0 through 6.
