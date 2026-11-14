---
title: "BindingList<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BindingList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindingList<T> class

Namespace: `System.ComponentModel`

```csharp
public class BindingList<T> : System.Collections.ObjectModel.Collection<T>, System.ComponentModel.IBindingList, System.ComponentModel.ICancelAddNew, System.ComponentModel.IRaiseItemChangedEvents
```

Provides a generic collection that supports data binding.

Parameters:

- `T`: The type of elements in the list.

#### Remarks
The `BindingList<T>` class can be used as a base class to create a two-way data-binding mechanism. `BindingList<T>` provides a concrete, generic implementation of the `IBindingList` interface. This is an alternative to implementing the complete `IBindingList` interface, which can be difficult because of the subtle interaction between `IBindingList`, `IEditableObject`, and the associated `CurrencyManager`. However, the typical solutions programmer will use a class that provides data binding functionality, such as `BindingSource`, instead of directly using `BindingList<T>`.

`BindingList<T>` supports factory-created instances through the extensible `BindingList<T>.AddNew` method. (This same type of extensibility is also found in other classes, such as `BindingSource`) In addition, since this class implements the `ICancelAddNew` interface, it enables transactional commits or rollbacks of the new item through the `BindingList<T>.EndNew` and `BindingList<T>.CancelNew` methods.

#### Examples
The following code example demonstrates binding to a `BindingList<T>` component containing a business object. This is a complete example that contains a `Main` method.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.BindingList() constructor

```csharp
public BindingList ();
```

Initializes a new instance of the `BindingList<T>` class using default values.

#### Remarks
The following table shows initial property values for an instance of `BindingList<T>` class.

| Property                                                           | Initial Value |
|--------------------------------------------------------------------|---------------|
| `BindingList<T>.AllowEdit`              | `true`        |
| `BindingList<T>.AllowNew`               | `true` if the list type has a parameterless constructor; otherwise, `false`. |
| `BindingList<T>.AllowRemove`            | `true`        |
| `BindingList<T>.RaiseListChangedEvents` | `true`        |

#### Examples
The following code example demonstrates how to construct a new `BindingList<T>`. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.BindingList(IList<T>) constructor

```csharp
public BindingList (System.Collections.Generic.IList<T> list);
```

Initializes a new instance of the `BindingList<T>` class with the specified list.

Parameters:

- `list`: An `IList<T>` of items to be contained in the `BindingList<T>`.

#### Remarks
Use this `BindingList<T>.%23ctor` to create a `BindingList<T>` that is backed by `list`, which ensures that changes to `list` are reflected in the `BindingList<T>`.

The following table shows initial property values for an instance of `BindingList<T>` class.

|Property|Initial Value|
|--------------|-------------------|
|`BindingList<T>.AllowEdit`|`true`|
|`BindingList<T>.AllowNew`|`true` if the list type has a parameterless constructor; otherwise, `false`.|
|`BindingList<T>.AllowRemove`|`true`|
|`BindingList<T>.RaiseListChangedEvents`|`true`|

## BindingList<T>.AllowEdit property

```csharp
public bool AllowEdit { get; set; }
```

Gets or sets a value indicating whether items in the list can be edited.

Returns: `true` if list items can be edited; otherwise, `false`. The default is `true`.

#### Remarks
The `AllowEdit` property is typically used by other components to determine if editing of items in the list is allowed. When `BindingList<T>.AllowEdit` is set to a new value, a `ListChanged` event of type `Reset` will occur.

#### Examples
The following code example demonstrates how to set the `AllowEdit` property. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.AllowNew property

```csharp
public bool AllowNew { get; set; }
```

Gets or sets a value indicating whether you can add items to the list using the `BindingList<T>.AddNew` method.

Returns: `true` if you can add items to the list with the `BindingList<T>.AddNew` method; otherwise, `false`. The default depends on the underlying type contained in the list.

#### Remarks
The `AllowNew` property is typically used by other components to determine if the creation of new items is allowed. `BindingList<T>.AllowNew` defaults to `true` if the type contained in the list has a parameterless constructor or the `AddingNew` event is handled. If the `AddingNew` event is not handled or the list type does not have a parameterless constructor, then `BindingList<T>.AllowNew` defaults to `false`.

If `BindingList<T>.AllowNew` is explicitly set, the set value will always be used by bound objects to determine if new items can be added to the list. Whether `BindingList<T>.AllowNew` is `true` or `false`, new items can be added by explicitly calling `BindingList<T>.AddNew` if the list type has a parameterless constructor or the `AddingNew` event is handled. In addition, setting `BindingList<T>.AllowNew` causes a `ListChanged` event of type `Reset` to occur.

#### Examples
The following code example demonstrates how to set the `AllowNew` property. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.AllowRemove property

```csharp
public bool AllowRemove { get; set; }
```

Gets or sets a value indicating whether you can remove items from the collection.

Returns: `true` if you can remove items from the list with the `BindingList<T>.RemoveItem` method otherwise, `false`. The default is `true`.

#### Remarks
The `AllowRemove` property is typically used by other components to determine if the removal of items is allowed.

When `BindingList<T>.AllowRemove` is set to a new value, a `ListChanged` event of type `Reset` occurs.

#### Examples
The following code example demonstrates how to set the `AllowRemove` property. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.IsSortedCore property

```csharp
protected virtual bool IsSortedCore { get; }
```

Gets a value indicating whether the list is sorted.

Returns: `true` if the list is sorted; otherwise, `false`. The default is `false`.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of sorting, so `BindingList<T>.IsSortedCore` always returns `false` by default.

The `BindingList<T>` class does not provide a base implementation of sorting. To enable sorting, derive a class from `BindingList<T>` and:

- Override `BindingList<T>.ApplySortCore` and implement sorting raising the `ListChanged` event when sorting is complete.

- Override `BindingList<T>.RemoveSortCore` and implement sort removal.

- Override `BindingList<T>.SupportsSortingCore` and set `BindingList<T>.SupportsSortingCore` to `true`.

In addition, you may want to implement the supplemental `BindingList<T>.SortDirectionCore` and `BindingList<T>.SortPropertyCore`s sorting properties.

## BindingList<T>.RaiseListChangedEvents property

```csharp
public bool RaiseListChangedEvents { get; set; }
```

Gets or sets a value indicating whether adding or removing items within the list raises `BindingList<T>.ListChanged` events.

Returns: `true` if adding or removing items raises `BindingList<T>.ListChanged` events; otherwise, `false`. The default is `true`.

#### Remarks
Set the `RaiseListChangedEvents` property to `false` if you wish to suppress `ListChanged` events from occurring on the list.

#### Examples
The following code example demonstrates how use the `BindingList<T>.RaiseListChangedEvents` method. For the complete example, see the `BindingList<T>` class overview topic.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/Overview/Form1.cs._

## BindingList<T>.SortDirectionCore property

```csharp
protected virtual System.ComponentModel.ListSortDirection SortDirectionCore { get; }
```

Gets the direction the list is sorted.

Returns: One of the `ListSortDirection` values. The default is `ListSortDirection.Ascending`.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of sorting, so `BindingList<T>.SortDirectionCore` always returns `Ascending` by default. For more information about sorting, see the `IBindingList.ApplySort` method.

## BindingList<T>.SortPropertyCore property

```csharp
protected virtual System.ComponentModel.PropertyDescriptor? SortPropertyCore { get; }
```

Gets the property descriptor that is used for sorting the list if sorting is implemented in a derived class; otherwise, returns `null`.

Returns: The `PropertyDescriptor` used for sorting the list.

#### Remarks
`BindingList<T>.SortPropertyCore` returns `null` by default because the `BindingList<T>` class does not provide a base implementation of sorting. To enable sorting, derive a class from `BindingList<T>` and:

- Override `BindingList<T>.ApplySortCore` and implement sorting.

- Override `BindingList<T>.RemoveSortCore` and implement sort removal.

- Override `BindingList<T>.SupportsSortingCore` and set `BindingList<T>.SupportsSortingCore` to `true`.

- Optionally, override the `BindingList<T>.SortPropertyCore` to return the `PropertyDescriptor` used for sorting.

## BindingList<T>.SupportsChangeNotificationCore property

```csharp
protected virtual bool SupportsChangeNotificationCore { get; }
```

Gets a value indicating whether `BindingList<T>.ListChanged` events are enabled.

Returns: `true` if `BindingList<T>.ListChanged` events are supported; otherwise, `false`. The default is `true`.

#### Remarks
`BindingList<T>.SupportsChangeNotificationCore` provides the implementation for `IBindingList.SupportsChangeNotification`. You can derive a class from `BindingList<T>` and override the default value.

## BindingList<T>.SupportsSearchingCore property

```csharp
protected virtual bool SupportsSearchingCore { get; }
```

Gets a value indicating whether the list supports searching.

Returns: `true` if the list supports searching; otherwise, `false`. The default is `false`.

#### Remarks
The `BindingList<T>` class does not provide a base implementation of searching, so `BindingList<T>.SupportsSearchingCore` always returns `false` by default. For more information about implementing searching, see the `BindingList<T>.System%23ComponentModel%23IBindingList%23Find` method.

#### Examples
The following code example demonstrates how to use the `BindingList<T>.SupportsSearchingCore` member.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BindingListT/FindCore/Form1.cs._

## BindingList<T>.SupportsSortingCore property

```csharp
protected virtual bool SupportsSortingCore { get; }
```

Gets a value indicating whether the list supports sorting.

Returns: `true` if the list supports sorting; otherwise, `false`. The default is `false`.

#### Remarks
The `SupportsSortingCore` property indicates whether the `BindingList<T>` supports sorting with the `BindingList<T>.ApplySortCore` method.

The `BindingList<T>` class does not provide a base implementation of sorting, so `BindingList<T>.SupportsSortingCore` always returns `false` by default. For more information about implementing sorting, see the `BindingList<T>.ApplySortCore` method.

## BindingList<T>.System.ComponentModel.IBindingList.AllowEdit property

```csharp
bool System.ComponentModel.IBindingList.AllowEdit { get; }
```

Gets a value indicating whether items in the list can be edited.

Returns: `true` if list items can be edited; otherwise, `false`. The default is `true`.

#### Remarks
The `AllowEdit` property is typically used by other components to determine if editing of items in the list is allowed.

## BindingList<T>.System.ComponentModel.IBindingList.AllowNew property

```csharp
bool System.ComponentModel.IBindingList.AllowNew { get; }
```

Gets a value indicating whether new items can be added to the list using the `BindingList<T>.AddNew` method.

Returns: `true` if you can add items to the list with the `BindingList<T>.AddNew` method; otherwise, `false`. The default depends on the underlying type contained in the list.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.AllowRemove property

```csharp
bool System.ComponentModel.IBindingList.AllowRemove { get; }
```

Gets a value indicating whether items can be removed from the list.

Returns: `true` if you can remove items from the list with the `BindingList<T>.RemoveItem` method; otherwise, `false`. The default is `true`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.IsSorted property

```csharp
bool System.ComponentModel.IBindingList.IsSorted { get; }
```

For a description of this member, see `IBindingList.IsSorted`.

Returns: `true` if `IBindingListView.ApplySort` has been called and `IBindingList.RemoveSort` has not been called; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.SortDirection property

```csharp
System.ComponentModel.ListSortDirection System.ComponentModel.IBindingList.SortDirection { get; }
```

For a description of this member, see `IBindingList.SortDirection`.

Returns: One of the `ListSortDirection` values.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.

## BindingList<T>.System.ComponentModel.IBindingList.SortProperty property

```csharp
System.ComponentModel.PropertyDescriptor? System.ComponentModel.IBindingList.SortProperty { get; }
```

For a description of this member, see `IBindingList.SortProperty`.

Returns: The `PropertyDescriptor` that is being used for sorting.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `BindingList<T>` instance is cast to an `IBindingList` interface.
