---
title: "ICollectionView interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ICollectionView.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICollectionView interface

Namespace: `System.ComponentModel`

```csharp
public interface ICollectionView : System.Collections.IEnumerable, System.Collections.Specialized.INotifyCollectionChanged
```

Enables collections to have the functionalities of current record management, custom sorting, filtering, and grouping.

#### Remarks
The interface is implemented by the `CollectionView` class, which is the base class for `BindingListCollectionView`, `ListCollectionView`, and `ItemCollection`.

## ICollectionView.CanFilter property

```csharp
public bool CanFilter { get; }
```

Gets a value that indicates whether this view supports filtering via the `ICollectionView.Filter` property.

Returns: `true` if this view support filtering; otherwise, `false`.

To be added.

## ICollectionView.CanGroup property

```csharp
public bool CanGroup { get; }
```

Gets a value that indicates whether this view supports grouping via the `ICollectionView.GroupDescriptions` property.

Returns: `true` if this view supports grouping; otherwise, `false`.

To be added.

## ICollectionView.CanSort property

```csharp
public bool CanSort { get; }
```

Gets a value that indicates whether this view supports sorting via the `ICollectionView.SortDescriptions` property.

Returns: `true` if this view supports sorting; otherwise, `false`.

To be added.

## ICollectionView.Culture property

```csharp
public System.Globalization.CultureInfo Culture { get; set; }
```

Gets or sets the cultural info for any operations of the view that may differ by culture, such as sorting.

Returns: The culture to use during sorting.

To be added.

## ICollectionView.CurrentItem property

```csharp
public object CurrentItem { get; }
```

Gets the current item in the view.

Returns: The current item of the view or `null` if there is no current item.

To be added.

## ICollectionView.CurrentPosition property

```csharp
public int CurrentPosition { get; }
```

Gets the ordinal position of the `ICollectionView.CurrentItem` within the view.

Returns: The ordinal position of the `ICollectionView.CurrentItem` within the view.

To be added.

## ICollectionView.Filter property

```csharp
public Predicate<object> Filter { get; set; }
```

Gets or sets a callback used to determine if an item is suitable for inclusion in the view.

Returns: A method used to determine if an item is suitable for inclusion in the view.

To be added.

## ICollectionView.GroupDescriptions property

```csharp
public System.Collections.ObjectModel.ObservableCollection<System.ComponentModel.GroupDescription> GroupDescriptions { get; }
```

Gets a collection of `GroupDescription` objects that describe how the items in the collection are grouped in the view.

Returns: A collection of `GroupDescription` objects that describe how the items in the collection are grouped in the view.

To be added.

## ICollectionView.Groups property

```csharp
public System.Collections.ObjectModel.ReadOnlyObservableCollection<object> Groups { get; }
```

Gets the top-level groups.

Returns: A read-only collection of the top-level groups or `null` if there are no groups.

To be added.

## ICollectionView.IsCurrentAfterLast property

```csharp
public bool IsCurrentAfterLast { get; }
```

Gets a value that indicates whether the `ICollectionView.CurrentItem` of the view is beyond the end of the collection.

Returns: `true` if the `ICollectionView.CurrentItem` of the view is beyond the end of the collection; otherwise, `false`.

To be added.

## ICollectionView.IsCurrentBeforeFirst property

```csharp
public bool IsCurrentBeforeFirst { get; }
```

Gets a value that indicates whether the `ICollectionView.CurrentItem` of the view is beyond the beginning of the collection.

Returns: `true` if the `ICollectionView.CurrentItem` of the view is beyond the beginning of the collection; otherwise, `false`.

To be added.

## ICollectionView.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Returns a value that indicates whether the resulting view is empty.

Returns: `true` if the resulting view is empty; otherwise, `false`.

To be added.

## ICollectionView.SortDescriptions property

```csharp
public System.ComponentModel.SortDescriptionCollection SortDescriptions { get; }
```

Gets a collection of `SortDescription` objects that describe how the items in the collection are sorted in the view.

Returns: A collection of `SortDescription` objects that describe how the items in the collection are sorted in the view.

To be added.

## ICollectionView.SourceCollection property

```csharp
public System.Collections.IEnumerable SourceCollection { get; }
```

Returns the underlying collection.

Returns: An `IEnumerable` object that is the underlying collection.

To be added.

## ICollectionView.Contains(Object) method

```csharp
public bool Contains (object item);
```

Returns a value that indicates whether a given item belongs to this collection view.

Parameters:

- `item`: The object to check.

Returns: `true` if the item belongs to this collection view; otherwise, `false`.

#### Remarks
This method does not make any assumptions about whether the item belongs to the underlying collection.

## ICollectionView.DeferRefresh() method

```csharp
public IDisposable DeferRefresh ();
```

Enters a defer cycle that you can use to merge changes to the view and delay automatic refresh.

Returns: An `IDisposable` object that you can use to dispose of the calling object.

To be added.

## ICollectionView.MoveCurrentTo(Object) method

```csharp
public bool MoveCurrentTo (object item);
```

Sets the specified item to be the `ICollectionView.CurrentItem` in the view.

Parameters:

- `item`: The item to set as the `ICollectionView.CurrentItem`.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is within the view; otherwise, `false`.

To be added.

## ICollectionView.MoveCurrentToFirst() method

```csharp
public bool MoveCurrentToFirst ();
```

Sets the first item in the view as the `ICollectionView.CurrentItem`.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is an item within the view; otherwise, `false`.

To be added.

## ICollectionView.MoveCurrentToLast() method

```csharp
public bool MoveCurrentToLast ();
```

Sets the last item in the view as the `ICollectionView.CurrentItem`.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is an item within the view; otherwise, `false`.

To be added.

## ICollectionView.MoveCurrentToNext() method

```csharp
public bool MoveCurrentToNext ();
```

Sets the item after the `ICollectionView.CurrentItem` in the view as the `ICollectionView.CurrentItem`.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is an item within the view; otherwise, `false`.

To be added.

## ICollectionView.MoveCurrentToPosition(Int32) method

```csharp
public bool MoveCurrentToPosition (int position);
```

Sets the item at the specified index to be the `ICollectionView.CurrentItem` in the view.

Parameters:

- `position`: The index to set the `ICollectionView.CurrentItem` to.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is an item within the view; otherwise, `false`.

To be added.

## ICollectionView.MoveCurrentToPrevious() method

```csharp
public bool MoveCurrentToPrevious ();
```

Sets the item before the `ICollectionView.CurrentItem` in the view as the `ICollectionView.CurrentItem`.

Returns: `true` if the resulting `ICollectionView.CurrentItem` is an item within the view; otherwise, `false`.

To be added.

## ICollectionView.Refresh() method

```csharp
public void Refresh ();
```

Recreates the view.

To be added.

## ICollectionView.CurrentChanged event

```csharp
event EventHandler CurrentChanged;
```

When implementing this interface, raise this event after the current item has been changed.

#### Remarks
Classes that are implementing this interface should raise the `CurrentChanging` event and check the `Cancel` property value before changing the currency and raising `CurrentChanged` event.

## ICollectionView.CurrentChanging event

```csharp
event System.ComponentModel.CurrentChangingEventHandler CurrentChanging;
```

When implementing this interface, raise this event before changing the current item. Event handler can cancel this event.

#### Remarks
Classes that are implementing this interface should raise the `CurrentChanging` event and check the `Cancel` property value before changing the currency and raising `CurrentChanged` event.
