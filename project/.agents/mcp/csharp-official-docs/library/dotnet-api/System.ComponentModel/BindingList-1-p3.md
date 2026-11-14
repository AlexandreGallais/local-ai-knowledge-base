---
title: "BindingList<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BindingList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindingList<T> class (part 3 of 3)

## BindingList<T>.System.ComponentModel.IBindingList.ApplySort(PropertyDescriptor, ListSortDirection) method

```csharp
void IBindingList.ApplySort (System.ComponentModel.PropertyDescriptor prop, System.ComponentModel.ListSortDirection direction);
```

Sorts the list based on a `PropertyDescriptor` and a `ListSortDirection`. For a complete description of this member, see `IBindingList.ApplySort`.

Parameters:

- `prop`: The `PropertyDescriptor` to sort by.
- `direction`: One of the `ListSortDirection` values.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.Find(PropertyDescriptor, Object) method

```csharp
int IBindingList.Find (System.ComponentModel.PropertyDescriptor prop, object key);
```

For a description of this member, see `IBindingList.Find`.

Parameters:

- `prop`: The `PropertyDescriptor` to search on.
- `key`: The value of the `prop` parameter to search for.

Returns: The index of the row that has the given `PropertyDescriptor`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.RemoveIndex(PropertyDescriptor) method

```csharp
void IBindingList.RemoveIndex (System.ComponentModel.PropertyDescriptor prop);
```

For a description of this member, see `IBindingList.RemoveIndex`.

Parameters:

- `prop`: A `PropertyDescriptor` to remove from the indexes used for searching.

#### Remarks
The base implementation of this method does nothing. If this functionality is desired, a derived class must implement it.

This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.RemoveSort() method

```csharp
void IBindingList.RemoveSort ();
```

For a description of this member, see `IBindingList.RemoveSort`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.AddingNew event

```csharp
public event System.ComponentModel.AddingNewEventHandler AddingNew;
```

Occurs before an item is added to the list.

#### Remarks
The `AddingNew` event occurs before a new object is added to the collection represented by the `Items` property. This event is raised after the `BindingList<T>.AddNew` method is called, but before the new item is created and added to the internal list. By handling this event, the programmer can provide custom item creation and insertion behavior without being forced to derive from the `BindingList<T>` class.

For more information about supplying custom new item functionality, see the `BindingList<T>.AddNew` method. For more information about how to handle events, see Handling and Raising Events.

#### Examples
The following code example demonstrates how to handle the `AddingNew` event. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.ListChanged event

```csharp
public event System.ComponentModel.ListChangedEventHandler ListChanged;
```

Occurs when the list or an item in the list changes.

#### Remarks
`ListChanged` notifications for item value changes are only raised if the list item type implements the `INotifyPropertyChanged` interface.

For more information about how to handle events, see Handling and Raising Events.

#### Examples
The following code example demonstrates how handle the `ListChanged` event. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._
