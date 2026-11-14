---
title: "ObservableCollection<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ObservableCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObservableCollection<T> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class ObservableCollection<T> : System.Collections.ObjectModel.Collection<T>, System.Collections.Specialized.INotifyCollectionChanged, System.ComponentModel.INotifyPropertyChanged
```

Represents a dynamic data collection that provides notifications when items get added or removed, or when the whole list is refreshed.

Parameters:

- `T`: The type of elements in the collection.

The `ObservableCollection<T>` class represents a dynamic data collection that provides notifications when items get added or removed, or when the whole list is refreshed.

In many cases, the data that you work with is a collection of objects. For example, a common scenario in data binding is to use an `ItemsControl` such as a `ListBox`, `ListView`, or `TreeView` to display a collection of records.

You can enumerate over any collection that implements the `IEnumerable` interface. However, to set up dynamic bindings so that insertions or deletions in the collection update the UI automatically, the collection must implement the `INotifyCollectionChanged` interface. This interface exposes the `CollectionChanged` event, an event that should be raised whenever the underlying collection changes.

The `ObservableCollection<T>` class is a data collection type that implements the `INotifyCollectionChanged` interface.

Before implementing your own collection, consider using `ObservableCollection<T>` or one of the existing collection classes, such as `List<T>`, `Collection<T>`, and `BindingList<T>`, among many others. If you have an advanced scenario and want to implement your own collection, consider using `IList`, which provides a non-generic collection of objects that can be individually accessed by index. Implementing `IList` provides the best performance with the data binding engine.

> **Note:**
> To fully support transferring data values from binding source objects to binding targets, each object in your collection that supports bindable properties must implement an appropriate property changed notification mechanism such as the `INotifyPropertyChanged` interface.

#### Notes on XAML usage

`ObservableCollection<T>` can be used as a XAML object element in Windows Presentation Foundation (WPF), in versions 3.0 and 3.5. However, the usage has substantial limitations.

- `ObservableCollection<T>` must be the root element, because the `x:TypeArguments` attribute that must be used to specify the constrained type of the generic `ObservableCollection<T>` is only supported on the object element for the root element.

- You must declare an `x:Class` attribute (which entails that the build action for this XAML file must be `Page` or some other build action that compiles the XAML).

- `ObservableCollection<T>` is in a namespace and assembly that are not initially mapped to the default XML namespace. You must map a prefix for the namespace and assembly, and then use that prefix on the object element tag for `ObservableCollection<T>`.

A more straightforward way to use `ObservableCollection<T>` capabilities from XAML in an application is to declare your own non-generic custom collection class that derives from `ObservableCollection<T>`, and constrains it to a specific type. Then map the assembly that contains this class, and reference it as an object element in your XAML.

## ObservableCollection<T>.ObservableCollection() constructor

```csharp
public ObservableCollection ();
```

Initializes a new instance of the `ObservableCollection<T>` class.

To be added.

## ObservableCollection<T>.ObservableCollection(IEnumerable<T>) constructor

```csharp
public ObservableCollection (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `ObservableCollection<T>` class that contains elements copied from the specified collection.

Parameters:

- `collection`: The collection from which the elements are copied.

Exceptions:

- `ArgumentNullException`: The `collection` parameter cannot be `null`.

#### Remarks
The elements are copied onto the `ObservableCollection<T>` in the same order they are read by the enumerator of the collection.

## ObservableCollection<T>.ObservableCollection(List<T>) constructor

```csharp
public ObservableCollection (System.Collections.Generic.List<T> list);
```

Initializes a new instance of the `ObservableCollection<T>` class that contains elements copied from the specified list.

Parameters:

- `list`: The list from which the elements are copied.

Exceptions:

- `ArgumentNullException`: The `list` parameter cannot be `null`.

#### Remarks
The elements are copied onto the `ObservableCollection<T>` in the same order they are read by the enumerator of the list.

## ObservableCollection<T>.BlockReentrancy() method

```csharp
protected IDisposable BlockReentrancy ();
```

Disallows reentrant attempts to change this collection.

Returns: An `IDisposable` object that can be used to dispose of the object.

#### Examples
The typical usage is to wrap an `ObservableCollection<T>.OnCollectionChanged` call within a `using` scope, as in the following example:

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ObservableCollectionT/BlockReentrancy/DataSource.cs._

## ObservableCollection<T>.CheckReentrancy() method

```csharp
protected void CheckReentrancy ();
```

Checks for reentrant attempts to change this collection.

Exceptions:

- `InvalidOperationException`: If there was a call to `ObservableCollection<T>.BlockReentrancy` of which the `IDisposable` return value has not yet been disposed of. Typically, this means when there are additional attempts to change this collection during a `ObservableCollection<T>.CollectionChanged` event. However, it depends on when derived classes choose to call `ObservableCollection<T>.BlockReentrancy`.

To be added.

## ObservableCollection<T>.ClearItems() method

```csharp
protected override void ClearItems ();
```

Removes all items from the collection.

#### Remarks
The base class calls this method when the list is being cleared. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.ClearItems` method of the `Collection<T>` base class.

## ObservableCollection<T>.InsertItem(Int32, T) method

```csharp
protected override void InsertItem (int index, T item);
```

Inserts an item into the collection at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert.

#### Remarks
The base class calls this method when an item is added to the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `ObservableCollection<T>.InsertItem` method of the `Collection<T>` base class.

## ObservableCollection<T>.Move(Int32, Int32) method

```csharp
public void Move (int oldIndex, int newIndex);
```

Moves the item at the specified index to a new location in the collection.

Parameters:

- `oldIndex`: The zero-based index specifying the location of the item to be moved.
- `newIndex`: The zero-based index specifying the new location of the item.

#### Remarks
Subclasses can override the `ObservableCollection<T>.MoveItem` method to provide custom behavior for this method.

## ObservableCollection<T>.MoveItem(Int32, Int32) method

```csharp
protected virtual void MoveItem (int oldIndex, int newIndex);
```

Moves the item at the specified index to a new location in the collection.

Parameters:

- `oldIndex`: The zero-based index specifying the location of the item to be moved.
- `newIndex`: The zero-based index specifying the new location of the item.

#### Remarks
This implementation raises the `CollectionChanged` event.

Subclasses can override this protected method to provide custom behavior for the `ObservableCollection<T>.Move` method.

## ObservableCollection<T>.OnCollectionChanged(NotifyCollectionChangedEventArgs) method

```csharp
protected virtual void OnCollectionChanged (System.Collections.Specialized.NotifyCollectionChangedEventArgs e);
```

Raises the `ObservableCollection<T>.CollectionChanged` event with the provided arguments.

Parameters:

- `e`: Arguments of the event being raised.

#### Remarks
Properties and methods that modify this collection raise the `CollectionChanged` event through this `virtual` method.

#### Examples
When overriding this method, either call the base implementation or use the `ObservableCollection<T>.BlockReentrancy` method to handle reentrant collection changes, as in the following example:

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ObservableCollectionT/BlockReentrancy/DataSource.cs._

## ObservableCollection<T>.OnPropertyChanged(PropertyChangedEventArgs) method

```csharp
protected virtual void OnPropertyChanged (System.ComponentModel.PropertyChangedEventArgs e);
```

Raises the `ObservableCollection<T>.PropertyChanged` event with the provided arguments.

Parameters:

- `e`: Arguments of the event being raised.

To be added.

## ObservableCollection<T>.RemoveItem(Int32) method

```csharp
protected override void RemoveItem (int index);
```

Removes the item at the specified index of the collection.

Parameters:

- `index`: The zero-based index of the element to remove.

#### Remarks
The base class calls this method when an item is removed from the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.RemoveItem` method of the `Collection<T>` base class.

## ObservableCollection<T>.SetItem(Int32, T) method

```csharp
protected override void SetItem (int index, T item);
```

Replaces the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to replace.
- `item`: The new value for the element at the specified index.

#### Remarks
The base class calls this method when an item is set in the collection. This implementation raises the `CollectionChanged` event.

For more information, see the `Collection<T>.SetItem` method of the `Collection<T>` base class.

## ObservableCollection<T>.CollectionChanged event

```csharp
public virtual event System.Collections.Specialized.NotifyCollectionChangedEventHandler? CollectionChanged;
```

Occurs when an item is added, removed, or moved, or the entire list is refreshed.

To be added.

## ObservableCollection<T>.PropertyChanged event

```csharp
protected virtual event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
```

Occurs when a property value changes.

To be added.

## ObservableCollection<T>.System.ComponentModel.INotifyPropertyChanged.PropertyChanged event

```csharp
event System.ComponentModel.PropertyChangedEventHandler? System.ComponentModel.INotifyPropertyChanged.PropertyChanged;
```

Occurs when a property value changes.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ObservableCollection<T>` instance is cast to an `INotifyPropertyChanged` interface.
