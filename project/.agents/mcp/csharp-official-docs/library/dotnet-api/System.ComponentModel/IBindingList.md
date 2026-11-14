---
title: "IBindingList interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IBindingList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBindingList interface

Namespace: `System.ComponentModel`

```csharp
public interface IBindingList : System.Collections.IList
```

Provides the features required to support both complex and simple scenarios when binding to a data source.

#### Remarks
This interface is implemented by the `DataView` class. Implementation of a method should exhibit the same behavior as the implementation of that method in the `DataView` class.

When you call the `IBindingList.ApplySort` or `IBindingList.RemoveSort` methods, you should raise a `ListChanged` event with the `Reset` enumeration.

When you call the `IBindingList.AddNew` method, you should raise a `ListChanged` event with the `ItemAdded` enumeration carrying the appropriate index. The added row is in a state where pressing the ESC on a `DataGridView` control can remove the new row. Raising the `ListChanged` event with the `ItemAdded` enumeration a second time on this row indicates that the item is now a row not in the "new" state.

When you remove an item or call the `IEditableObject.CancelEdit` method on a new row (if that row implements `IEditableObject`), you should raise a `ListChanged` event with the `ItemDeleted` enumeration carrying the appropriate index.

#### Examples
The following example provides a simple implementation of the `IBindingList` interface. The `CustomerList` class stores customer information in a list. This example assumes that you have used the `Customer` class that can be found in the example in the `IEditableObject` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IBindingList/Overview/binding_editable.cs._

## IBindingList.AllowEdit property

```csharp
public bool AllowEdit { get; }
```

Gets whether you can update items in the list.

Returns: `true` if you can update the items in the list; otherwise, `false`.

To be added.

## IBindingList.AllowNew property

```csharp
public bool AllowNew { get; }
```

Gets whether you can add items to the list using `IBindingList.AddNew`.

Returns: `true` if you can add items to the list using `IBindingList.AddNew`; otherwise, `false`.

#### Remarks
If `IList.IsFixedSize` or `IList.IsReadOnly` is `true`, this property returns `false`.

## IBindingList.AllowRemove property

```csharp
public bool AllowRemove { get; }
```

Gets whether you can remove items from the list, using `IList.Remove` or `IList.RemoveAt`.

Returns: `true` if you can remove items from the list; otherwise, `false`.

#### Remarks
If `IList.IsFixedSize` or `IList.IsReadOnly` is `true`, this property returns `false`.

> **Note:**
>  If `IBindingList.AllowRemove` returns `false`, `IList.Remove` and `IList.RemoveAt` throw a `NotSupportedException`.

## IBindingList.IsSorted property

```csharp
public bool IsSorted { get; }
```

Gets whether the items in the list are sorted.

Returns: `true` if `IBindingList.ApplySort` has been called and `IBindingList.RemoveSort` has not been called; otherwise, `false`.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSorting` is `false`.

#### Remarks
This property is supported if `IBindingList.SupportsSorting` is `true`; otherwise, this property throws a `NotSupportedException`.

If `IBindingList.IsSorted` returns `true`, items are added or removed in the order of the sort.

## IBindingList.SortDirection property

```csharp
public System.ComponentModel.ListSortDirection SortDirection { get; }
```

Gets the direction of the sort.

Returns: One of the `ListSortDirection` values.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSorting` is `false`.

#### Remarks
This property is supported if `IBindingList.SupportsSorting` is `true`; otherwise, this property throws a `NotSupportedException`.

## IBindingList.SortProperty property

```csharp
public System.ComponentModel.PropertyDescriptor? SortProperty { get; }
```

Gets the `PropertyDescriptor` that is being used for sorting.

Returns: The `PropertyDescriptor` that is being used for sorting.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSorting` is `false`.

#### Remarks
This property is supported if `IBindingList.SupportsSorting` is `true`; otherwise, this property throws a `NotSupportedException`.

## IBindingList.SupportsChangeNotification property

```csharp
public bool SupportsChangeNotification { get; }
```

Gets whether a `IBindingList.ListChanged` event is raised when the list changes or an item in the list changes.

Returns: `true` if a `IBindingList.ListChanged` event is raised when the list changes or when an item changes; otherwise, `false`.

#### Remarks
Objects in the list must notify the list when they change, so the list can raise a `ListChanged` event.

## IBindingList.SupportsSearching property

```csharp
public bool SupportsSearching { get; }
```

Gets whether the list supports searching using the `IBindingList.Find` method.

Returns: `true` if the list supports searching using the `IBindingList.Find` method; otherwise, `false`.

#### Examples
The following code example demonstrates how to implement the `SupportsSearching` property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/FindCore/Form1.cs._

## IBindingList.SupportsSorting property

```csharp
public bool SupportsSorting { get; }
```

Gets whether the list supports sorting.

Returns: `true` if the list supports sorting; otherwise, `false`.

#### Remarks
If this property is `true`, then `IBindingList.IsSorted`, `IBindingList.SortProperty`, `IBindingList.SortDirection`, `IBindingList.ApplySort`, and `IBindingList.RemoveSort` are supported.

## IBindingList.AddIndex(PropertyDescriptor) method

```csharp
public void AddIndex (System.ComponentModel.PropertyDescriptor property);
```

Adds the `PropertyDescriptor` to the indexes used for searching.

Parameters:

- `property`: The `PropertyDescriptor` to add to the indexes used for searching.

#### Remarks
The list must support this method. However, support for this method can be a nonoperation.

## IBindingList.AddNew() method

```csharp
public object? AddNew ();
```

Adds a new item to the list.

Returns: The item added to the list.

Exceptions:

- `NotSupportedException`: `IBindingList.AllowNew` is `false`.

#### Remarks
This method is supported only if `IBindingList.AllowNew` is `true`; otherwise, a `NotSupportedException` is thrown.

Implementing this method means that the `IBindingList` list must understand the type of objects to add to the list and must understand how to create a new instance of that type. For example, if you have a collection of `myCustomer` objects, the `IBindingList.AddNew` method should add a new `myCustomer` object to the list.

> **Note:**
>  If the objects in this list implement the `IEditableObject` interface, calling the `IEditableObject.CancelEdit` method should discard an object, not add it to the list, when the object was created using the `IBindingList.AddNew` method. The object should only be added to the list when the `IEditableObject.EndEdit` method is called. Therefore, you must synchronize the object and the list carefully.

When this method is called, you should raise a `ListChanged` event with the `ItemAdded` enumeration carrying the appropriate index. The added row is in a state where hitting Esc on a `DataGridView` control can remove the new row. Raising the `ListChanged` event with the `ItemAdded` enumeration a second time on this row indicates that the item is now a normal row (not in new state).

## IBindingList.ApplySort(PropertyDescriptor, ListSortDirection) method

```csharp
public void ApplySort (System.ComponentModel.PropertyDescriptor property, System.ComponentModel.ListSortDirection direction);
```

Sorts the list based on a `PropertyDescriptor` and a `ListSortDirection`.

Parameters:

- `property`: The `PropertyDescriptor` to sort by.
- `direction`: One of the `ListSortDirection` values.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSorting` is `false`.

#### Remarks
If items are added or removed, these items are placed in the order of the sort.

This method is supported if `IBindingList.SupportsSorting` is `true`; otherwise, this method throws a `NotSupportedException`.

## IBindingList.Find(PropertyDescriptor, Object) method

```csharp
public int Find (System.ComponentModel.PropertyDescriptor property, object key);
```

Returns the index of the row that has the given `PropertyDescriptor`.

Parameters:

- `property`: The `PropertyDescriptor` to search on.
- `key`: The value of the `property` parameter to search for.

Returns: The index of the row that has the given `PropertyDescriptor`.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSearching` is `false`.

#### Remarks
This method will select the first row where the value of the `property` parameter equals the value of the `key` parameter.

This method is supported if `IBindingList.SupportsSearching` is `true`, otherwise this method throws a `NotSupportedException`.

#### Examples
The following code example demonstrates how to implement the `IBindingList.Find` method.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/FindCore/Form1.cs._

## IBindingList.RemoveIndex(PropertyDescriptor) method

```csharp
public void RemoveIndex (System.ComponentModel.PropertyDescriptor property);
```

Removes the `PropertyDescriptor` from the indexes used for searching.

Parameters:

- `property`: The `PropertyDescriptor` to remove from the indexes used for searching.

#### Remarks
The list must support this method. However, support for this method can be a nonoperation.

## IBindingList.RemoveSort() method

```csharp
public void RemoveSort ();
```

Removes any sort applied using `IBindingList.ApplySort`.

Exceptions:

- `NotSupportedException`: `IBindingList.SupportsSorting` is `false`.

#### Remarks
This property is supported if `IBindingList.SupportsSorting` is `true`; otherwise, this property throws a `NotSupportedException`.

When you call this method, you should raise a `ListChanged` event with the `Reset` enumeration.

## IBindingList.ListChanged event

```csharp
event System.ComponentModel.ListChangedEventHandler ListChanged;
```

Occurs when the list changes or an item in the list changes.

#### Remarks
This event is raised only if the `SupportsChangeNotification` property is `true`.
