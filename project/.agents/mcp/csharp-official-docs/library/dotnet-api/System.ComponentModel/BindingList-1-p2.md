---
title: "BindingList<T> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BindingList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindingList<T> class (part 2 of 3)

## BindingList<T>.System.ComponentModel.IBindingList.SupportsChangeNotification property

```csharp
bool System.ComponentModel.IBindingList.SupportsChangeNotification { get; }
```

For a description of this member, see `IBindingList.SupportsChangeNotification`.

Returns: `true` if a `IBindingList.ListChanged` event is raised when the list changes or when an item changes; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.SupportsSearching property

```csharp
bool System.ComponentModel.IBindingList.SupportsSearching { get; }
```

For a description of this member, see `IBindingList.SupportsSearching`.

Returns: `true` if the list supports searching using the `IBindingList.Find` method; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.SupportsSorting property

```csharp
bool System.ComponentModel.IBindingList.SupportsSorting { get; }
```

For a description of this member, see `IBindingList.SupportsSorting`.

Returns: `true` if the list supports sorting; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IRaiseItemChangedEvents.RaisesItemChangedEvents property

```csharp
bool System.ComponentModel.IRaiseItemChangedEvents.RaisesItemChangedEvents { get; }
```

Gets a value indicating whether item property value changes raise `BindingList<T>.ListChanged` events of type `ListChangedType.ItemChanged`. This member cannot be overridden in a derived class.

Returns: `true` if the list type implements `INotifyPropertyChanged`, otherwise, `false`. The default is `false`.

#### Remarks
`BindingList<T>.System%23ComponentModel%23IRaiseItemChangedEvents%23RaisesItemChangedEvents` checks the list type to see if it implements the `INotifyPropertyChanged` interface to indicate that it raises `ListChanged` events of `ItemChanged` when property values are changed on individual list items. This member cannot be overridden in a derived class.

## BindingList<T>.AddNew() method

```csharp
public T AddNew ();
```

Adds a new item to the collection.

Returns: The item added to the list.

Exceptions:

- `InvalidOperationException`: The `BindingSource.AllowNew` property is set to `false`.

-or-

A public parameterless constructor could not be found for the current item type.

#### Remarks
The `BindingList<T>.AddNew` method adds a new item to the collection represented by the `Items` property. To add a new item, the following logic is used:

1. The `AddingNew` event is automatically raised.

This event can be programmatically handled to construct a new custom item. This is accomplished in the event handler by setting the `NewObject` property of the `AddingNewEventArgs` parameter to the new item.

Otherwise, the new item is automatically created through its public parameterless constructor.

2. The position of the new item is tracked, but it is not added to the list until one of the following conditions are met:

- The item is explicitly committed by a call to `BindingList<T>.EndNew`.
- The item is implicitly committed by some other operation that changed the contents of the list, such as an insertion or removal of an item.

In contrast, calling the `BindingList<T>.CancelNew` method before the item is committed will cause the new item to be discarded.

This method raises the `ListChanged` event when the new item is committed.

#### Examples
The following code example demonstrates how to use the `BindingList<T>.AddNew` method. `BindingList<T>`. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.AddNewCore() method

```csharp
protected virtual object? AddNewCore ();
```

Adds a new item to the end of the collection.

Returns: The item that was added to the collection.

Exceptions:

- `InvalidCastException`: The new item is not the same type as the objects contained in the `BindingList<T>`.

#### Remarks
The `BindingList<T>.AddNewCore` method adds a new item to the collection represented by the `Items` property. `BindingList<T>.AddNewCore` raises the `AddingNew` event. This allows you to add a new item by setting the `NewObject` property of the `AddingNewEventArgs` parameter to the new item. Otherwise, the new item is automatically created through its public parameterless constructor.

## BindingList<T>.ApplySortCore(PropertyDescriptor, ListSortDirection) method

```csharp
protected virtual void ApplySortCore (System.ComponentModel.PropertyDescriptor prop, System.ComponentModel.ListSortDirection direction);
```

Sorts the items if overridden in a derived class; otherwise, throws a `NotSupportedException`.

Parameters:

- `prop`: A `PropertyDescriptor` that specifies the property to sort on.
- `direction`: One of the `ListSortDirection` values.

Exceptions:

- `NotSupportedException`: Method is not overridden in a derived class.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of sorting, so `BindingList<T>.ApplySortCore` always throws a `NotSupportedException` by default. To enable sorting, derive from `BindingList<T>` and perform the following tasks:

- Override `BindingList<T>.ApplySortCore` and implement sorting, raising the `ListChanged` event when sorting is complete.

- Override `BindingList<T>.RemoveSortCore` and implement sort removal.

- Override `BindingList<T>.SupportsSortingCore` and set `BindingList<T>.SupportsSortingCore` to `true`.

In addition, you may want to implement the supplemental `BindingList<T>.SortDirectionCore` and `BindingList<T>.SortPropertyCore` sorting properties.

## BindingList<T>.CancelNew(Int32) method

```csharp
public virtual void CancelNew (int itemIndex);
```

Discards a pending new item.

Parameters:

- `itemIndex`: The index of the of the new item to be added.

#### Remarks
The `BindingList<T>.CancelNew` method rolls back a pending new item that was added through the `BindingList<T>.AddNew` method, but has not yet been committed.

For more information about adding and committing new items, see the `BindingList<T>.AddNew` method

#### Examples
The following code example demonstrates how use the `BindingList<T>.CancelNew` method. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.ClearItems() method

```csharp
protected override void ClearItems ();
```

Removes all elements from the collection.

#### Remarks
The `BindingList<T>.ClearItems` method removes all the items from the collection represented by the `Items` property.

`BindingList<T>.ClearItems` calls the `BindingList<T>.EndNew` method before clearing out the collection and raises the `ListChanged` event after it has been cleared.

## BindingList<T>.EndNew(Int32) method

```csharp
public virtual void EndNew (int itemIndex);
```

Commits a pending new item to the collection.

Parameters:

- `itemIndex`: The index of the new item to be added.

#### Remarks
The `BindingList<T>.EndNew` method commits a pending new item that was added through the `BindingList<T>.AddNew` method. If there is no new item waiting to be committed, then this method does nothing.

For more information about adding and committing new items, see the `BindingList<T>.AddNew` method.

## BindingList<T>.FindCore(PropertyDescriptor, Object) method

```csharp
protected virtual int FindCore (System.ComponentModel.PropertyDescriptor prop, object key);
```

Searches for the index of the item that has the specified property descriptor with the specified value, if searching is implemented in a derived class; otherwise, a `NotSupportedException`.

Parameters:

- `prop`: The `PropertyDescriptor` to search for.
- `key`: The value of `prop` to match.

Returns: The zero-based index of the item that matches the property descriptor and contains the specified value.

Exceptions:

- `NotSupportedException`: `BindingList<T>.FindCore` is not overridden in a derived class.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of searching, and so `BindingList<T>.FindCore` always throws a `NotSupportedException` by default. To enable searching, derive from `BindingList<T>` and perform the following tasks:

- Override `BindingList<T>.SupportsSearchingCore` to set the `SupportsSearchingCore` property to `true`.

- Override `BindingList<T>.FindCore` to implement the find algorithm.

#### Examples
The following code example demonstrates how to use the `BindingList<T>.FindCore` member.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/FindCore/Form1.cs._

## BindingList<T>.InsertItem(Int32, T) method

```csharp
protected override void InsertItem (int index, T item);
```

Inserts the specified item in the list at the specified index.

Parameters:

- `index`: The zero-based index where the item is to be inserted.
- `item`: The item to insert in the list.

#### Remarks
`BindingList<T>.InsertItem` performs the following operations:

- Calls `BindingList<T>.EndNew` to commit any uncommitted items added through the `AddingNew` event.

- Inserts the item at the specified index

- Raises a `ListChanged` event of type `ItemAdded` indicating the index of the item that was inserted.

## BindingList<T>.OnAddingNew(AddingNewEventArgs) method

```csharp
protected virtual void OnAddingNew (System.ComponentModel.AddingNewEventArgs e);
```

Raises the `BindingList<T>.AddingNew` event.

Parameters:

- `e`: An `AddingNewEventArgs` that contains the event data.

#### Remarks
The `AddingNew` event and the `BindingList<T>.AddNew` method allow custom-created items to be added to the list.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `BindingList<T>.OnAddingNew` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

## BindingList<T>.OnListChanged(ListChangedEventArgs) method

```csharp
protected virtual void OnListChanged (System.ComponentModel.ListChangedEventArgs e);
```

Raises the `BindingList<T>.ListChanged` event.

Parameters:

- `e`: A `ListChangedEventArgs` that contains the event data.

#### Remarks
The `BindingList<T>.OnListChanged` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

## BindingList<T>.RemoveItem(Int32) method

```csharp
protected override void RemoveItem (int index);
```

Removes the item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: You are removing a newly added item and `IBindingList.AllowRemove` is set to `false`.

#### Remarks
This method raises the `ListChanged` event of type `ItemDeleted`.

## BindingList<T>.RemoveSortCore() method

```csharp
protected virtual void RemoveSortCore ();
```

Removes any sort applied with `BindingList<T>.ApplySortCore` if sorting is implemented in a derived class; otherwise, raises `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Method is not overridden in a derived class.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of sorting, so `BindingList<T>.RemoveSortCore` always throws a `NotSupportedException` by default. For more information about sorting, see the `BindingList<T>.ApplySortCore` method.

## BindingList<T>.ResetBindings() method

```csharp
public void ResetBindings ();
```

Raises a `BindingList<T>.ListChanged` event of type `ListChangedType.Reset`.

#### Remarks
When the `BindingList<T>` is bound to Windows Forms controls, the `BindingList<T>.ResetBindings` method causes a refresh of all controls bound to the list.

## BindingList<T>.ResetItem(Int32) method

```csharp
public void ResetItem (int position);
```

Raises a `BindingList<T>.ListChanged` event of type `ListChangedType.ItemChanged` for the item at the specified position.

Parameters:

- `position`: A zero-based index of the item to be reset.

#### Remarks
When the `BindingList<T>` is bound to Windows Forms controls, the `BindingList<T>.ResetItem` method causes a refresh of controls bound to the item at the specified position.

## BindingList<T>.SetItem(Int32, T) method

```csharp
protected override void SetItem (int index, T item);
```

Replaces the item at the specified index with the specified item.

Parameters:

- `index`: The zero-based index of the item to replace.
- `item`: The new value for the item at the specified index. The value can be `null` for reference types.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `Collection<T>.Count`.

#### Remarks
After the item is set, `BindingList<T>.SetItem` raises a `ListChanged` event of type `ItemChanged` indicating the index of the item that was set.

## BindingList<T>.System.ComponentModel.IBindingList.AddIndex(PropertyDescriptor) method

```csharp
void IBindingList.AddIndex (System.ComponentModel.PropertyDescriptor prop);
```

For a description of this member, see `IBindingList.AddIndex`.

Parameters:

- `prop`: The `PropertyDescriptor` to add as a search criteria.

#### Remarks
The base implementation of this method does nothing. If this functionality is desired, a derived class must implement it.

This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.AddNew() method

```csharp
object IBindingList.AddNew ();
```

Adds a new item to the list. For more information, see `IBindingList.AddNew`.

Returns: The item added to the list.

Exceptions:

- `NotSupportedException`: This method is not supported.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

This implementation calls `BindingList<T>.AddNewCore` to add a new item to the list.
